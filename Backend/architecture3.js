const cluster = require("cluster");
const { cpus } = require("os");
const http = require("http");
const fs = require("fs");
const csv = require("csv-parser");
const async = require("async");
const { performance } = require("perf_hooks");

const numCPUs = cpus().length;
const numRequests = process.env.NUM_REQUESTS
  ? parseInt(process.env.NUM_REQUESTS)
  : 5;

const readCSVData = () => {
  return new Promise((resolve, reject) => {
    let data = [];
    const stream = fs
      .createReadStream("Netflix.csv")
      .pipe(csv())
      .on("data", (row) => {
        if (data.length < numRequests) {
          data.push(row);
        } else {
          stream.destroy();
          resolve(data);
        }
      })
      .on("end", () => {
        if (data.length < numRequests) {
          resolve(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

if (cluster.isMaster) {
  const roleMapping = {
    1: { clients: 1, fogNodes: 2, servers: 1 },
  };

  const { clients, fogNodes, servers } = roleMapping[1] || {
    clients: 1,
    fogNodes: 2,
    servers: numCPUs - 3,
  };

  let clientCount = 0;
  let fogNodeCount = 0;
  let serverCount = 0;

  for (let i = 0; i < numCPUs; i++) {
    if (clientCount < clients) {
      const worker = cluster.fork();
      worker.send({ role: "client" });
      clientCount++;
    } else if (fogNodeCount < fogNodes) {
      const port = 9000 + fogNodeCount + 1;
      const worker = cluster.fork();
      worker.send({ role: "fogNode", port });
      fogNodeCount++;
    } else if (serverCount < servers) {
      const port = 8000 + serverCount + 1;
      const worker = cluster.fork();
      worker.send({ role: "server", port });
      serverCount++;
    }
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} has terminated.`);
    console.log("Initiating replacement worker.");
    cluster.fork();
  });

  setTimeout(() => {
    console.log("Master process exiting");

    // Send a termination message to all workers
    for (const id in cluster.workers) {
      cluster.workers[id].send({ role: "terminate" });
    }

    setTimeout(() => {
      process.exit(0);
    }, 1000); // Give workers a second to exit gracefully
  }, 20000);

  console.log("Clustered server started");
} else {
  process.on("message", async (msg) => {
    if (msg.role === "terminate") {
      console.log(`Worker ${process.pid} terminating`);
      process.exit(0);
    } else if (msg.role === "client") {
      const data = await readCSVData();

      let successfulRequests = 0;
      let failedRequests = 0;

      const requests = [];

      let index = 0;

      const fogNodeArray = [9001, 9002];
      for (let i = 0; i < numRequests; i++) {
        requests.push((callback) => {
          const postData = JSON.stringify(data[i]);
          const options = {
            hostname: "localhost",
            port: fogNodeArray[index],
            path: "/process",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(postData),
            },
          };

          index = (index + 1) % fogNodeArray.length;

          const req = http.request(options, (res) => {
            let responseData = "";
            res.on("data", (chunk) => {
              responseData += chunk;
            });
            res.on("end", () => {
              successfulRequests++;
              callback(null, responseData);
            });
          });

          req.on("error", (e) => {
            console.error(`Client problem with request: ${e.message}`);
            failedRequests++;
            callback(e);
          });

          req.write(postData);
          req.end();
        });
      }

      const startTime = performance.now();

      async.parallel(requests, (err, results) => {
        const endTime = performance.now();
        const totalTime = (endTime - startTime).toFixed(2);

        if (err) {
          console.error("Error processing requests:", err);
        }

        console.log(`Total time taken: ${totalTime} ms`);
        console.log(`Successful requests: ${successfulRequests}`);
        console.log(`Failed requests: ${failedRequests}`);
      });
    } else if (msg.role === "fogNode") {
      const serverArray = [8001];

      http
        .createServer((req, res) => {
          if (req.method === "POST" && req.url === "/process") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              const requestData = JSON.parse(body);

              if (
                requestData.Country &&
                requestData.Country.toLowerCase() === "canada"
              ) {
                const options = {
                  hostname: "localhost",
                  port: serverArray[0],
                  path: "/",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(body),
                  },
                };

                const reqToServer = http.request(options, (serverRes) => {
                  let serverResponseData = "";
                  serverRes.on("data", (chunk) => {
                    serverResponseData += chunk;
                  });
                  serverRes.on("end", () => {
                    res.writeHead(200);
                    res.end(
                      `Request ${requestData["User ID"]} processed by server: ${serverResponseData}`
                    );
                  });
                });

                reqToServer.on("error", (e) => {
                  console.error(
                    `FogNode problem with forwarding request: ${e.message}`
                  );
                  res.writeHead(500);
                  res.end("Error forwarding request to server.");
                });

                reqToServer.write(body);
                reqToServer.end();
              } else {
                res.writeHead(200);
                res.end(`Request ${requestData["User ID"]} not processed.`);
              }
            });
          } else {
            res.writeHead(405);
            res.end("Method Not Allowed");
          }
        })
        .listen(msg.port, () => {
          console.log(`FogNode worker listening on port ${msg.port}`);
        });
    } else if (msg.role === "server") {
      http
        .createServer((req, res) => {
          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });

            req.on("end", () => {
              const requestData = JSON.parse(body);

              fs.appendFile(
                "architecture3.csv",
                `${JSON.stringify(requestData)}\n`,
                (err) => {
                  if (err) {
                    console.error(
                      "Error saving data to architecture3.csv:",
                      err
                    );
                    res.writeHead(500);
                    res.end("Error saving data.");
                  } else {
                    //console.log("Data saved to architecture2.csv");
                    res.writeHead(200);
                    res.end(`Request ${requestData["User ID"]} processed.`);
                  }
                }
              );
            });
          } else {
            res.writeHead(405);
            res.end("Method Not Allowed");
          }
        })
        .listen(msg.port, () => {
          console.log(`Server worker listening on port ${msg.port}`);
        });
    }
  });
}
