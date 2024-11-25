export const Works = () => {
  return (
    <>
      <div className="flex flex-col w-full space-y-4 p-6">
        <div className="flex items-center justify-center text-center text-3xl font-bold">
          How it works?
        </div>
        <div className="flex flex-col items-start justify-start text-left">
          <span>
            In a computer with 4 cores, different architectural setups can be
            employed to efficiently manage and process network requests. The
            utilization of these cores varies depending on the architecture
            chosen, but the general concept involves dividing the roles among
            the cores to optimize performance and scalability. Here's how it
            works:
          </span>
        </div>
        <div className="flex flex-col pt-2 items-start justify-start text-left">
          <div className="flex flex-col items-start justify-start">
            <span className="text-2xl font-bold underline">
              Role Distribution :
            </span>
            <div className="flex flex-col space-y-4 mt-2">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-left w-full">
                <span className="text-xl font-bold w-full lg:w-1/6">
                  Client:
                </span>
                <span className="w-full lg:w-5/6">
                  Some cores are designated as clients, responsible for
                  generating and sending requests.
                </span>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-left w-full">
                <span className="text-xl font-bold w-full lg:w-1/6">
                  Fog Nodes:
                </span>
                <span className="w-full lg:w-5/6">
                  In architectures involving fog nodes, certain cores act as
                  intermediaries that process requests before forwarding them to
                  the server. This helps in reducing latency and managing
                  traffic more effectively.
                </span>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-left w-full">
                <span className="text-xl font-bold w-full lg:w-1/6">
                  Servers:
                </span>
                <span className="w-full lg:w-5/6">
                  The remaining cores function as servers, processing and
                  responding to the requests sent by the clients or fog nodes.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-2 items-start justify-start text-left">
          <div className="flex flex-col items-start justify-start">
            <span className="text-2xl font-bold underline">Process Flow :</span>
            <div className="flex flex-col space-y-4 mt-2">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-left w-full">
                <span className="text-xl font-bold w-full lg:w-1/6">
                  Client Requests:
                </span>
                <span className="w-full lg:w-5/6">
                  The client cores initiate requests, which can either be sent
                  directly to the server or routed through fog nodes depending
                  on the architecture.
                </span>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-left w-full">
                <span className="text-xl font-bold w-full lg:w-1/6">
                  Intermediary Processing:
                </span>
                <span className="w-full lg:w-5/6">
                  In setups with fog nodes, these intermediary cores handle
                  initial processing of requests, offloading some of the work
                  from the server and providing quicker responses to clients.
                </span>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-left w-full">
                <span className="text-xl font-bold w-full lg:w-1/6">
                  Server Processing:
                </span>
                <span className="w-full lg:w-5/6">
                  The server cores receive the processed requests (either
                  directly from clients or through fog nodes) and perform the
                  final processing and response generation.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-2 items-start justify-start text-left">
          <div className="flex flex-col items-start justify-start">
            <span className="text-2xl font-bold underline">
              Parallel Processing :
            </span>
            <ul className="list-disc mt-2 space-y-4">
              <li>
                The use of multiple clients and fog nodes allows for parallel
                processing of requests, enhancing the system's ability to handle
                a large number of requests simultaneously.
              </li>
              <li>
                This parallelism ensures that the system remains responsive and
                efficient even under heavy load.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col pt-2 items-start justify-start text-left">
          <div className="flex flex-col items-start justify-start">
            <span className="text-2xl font-bold underline">
              Scalability and Efficiency :
            </span>
            <ul className="list-disc mt-2 space-y-4">
              <li>
                By distributing tasks across different cores, the system can
                scale efficiently. Additional clients, fog nodes, or servers can
                be added as needed to balance the load and maintain performance.
              </li>
              <li>
                This architecture leverages the multi-core capabilities of
                modern computers to ensure that each core is utilized
                effectively, minimizing bottlenecks and maximizing throughput.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
