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

if (cluster.isMaster) {
  const roleMapping = {
    1: { clients: 1, servers: 3 },
  };

  const { clients, servers } = roleMapping[1] || {
    clients: 1,
    servers: 3,
  };

  let clientCount = 0;
  let serverCount = 0;

  for (let i = 0; i < numCPUs; i++) {
    if (clientCount < clients) {
      const worker = cluster.fork();
      worker.send({ role: "client", numRequests });
      //console.log(`Forking client worker with PID: ${worker.process.pid}`);
      clientCount++;
    } else if (serverCount < servers) {
      const port = 8000 + serverCount + 1;
      const worker = cluster.fork();
      worker.send({ role: "server", port });
      // console.log(
      //   `Forking server worker with PID: ${worker.process.pid}, listening on port: ${port}`
      // );
      serverCount++;
    }
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is started`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} has terminated.`);
    console.log("Initiating replacement worker.");
    cluster.fork();
  });

  // Terminate the master process after a reasonable timeout
  setTimeout(() => {
    console.log("Master process exiting");
    process.exit(0);
  }, 10000); // Adjust the timeout as needed

  console.log("Clustered server started");
} else {
  process.on("message", async (msg) => {
    // console.log(
    //   `Worker ${process.pid} received message: ${JSON.stringify(msg)}`
    // );
    if (msg.role === "client") {
      await runClient(msg.numRequests);
    } else if (msg.role === "server") {
      runServer(msg.port);
    }
  });
}

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

const runClient = async (numRequests) => {
  const data = await readCSVData();

  let successfulRequests = 0;
  let failedRequests = 0;

  const requests = [];

  let currentServerIndex = 0;

  const serverArray = [8001, 8002, 8003];

  for (let i = 0; i < numRequests; i++) {
    requests.push((callback) => {
      const postData = JSON.stringify(data[i]);
      const options = {
        hostname: "localhost",
        port: serverArray[currentServerIndex],
        path: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      // console.log(
      //   `Client worker ${process.pid} sending request to port: ${serverArray[currentServerIndex]}`
      // );

      currentServerIndex = (currentServerIndex + 1) % serverArray.length;

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

    process.exit(0);
  });
};

const runServer = (port) => {
  http
    .createServer((req, res) => {
      if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          const requestData = JSON.parse(body);
          // console.log(
          //   `Server worker ${process.pid} on port ${port} received request: ${requestData["User ID"]}`
          // );

          if (
            requestData.Country &&
            requestData.Country.toLowerCase() === "canada"
          ) {
            fs.appendFile(
              "architecture.csv",
              `${JSON.stringify(requestData)}\n`,
              (err) => {
                if (err) {
                  console.error("Error saving data to architecture.csv:", err);
                }
              }
            );

            res.writeHead(200);
            res.end(`Request ${requestData["User ID"]} processed.`);
          } else {
            res.writeHead(200);
            res.end(`Request ${requestData["User ID"]} processed.`);
          }
        });
      } else {
        res.writeHead(405);
        res.end("Method Not Allowed");
      }
    })
    .listen(port, () => {
      console.log(`Server worker listening on port ${port}`);
    });
};
