"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Chrono } from "react-chrono";

export const Description = () => {
  const items = [
    {
      title: "",
      cardTitle: "Client-Server",
      url: "http://www.history.com",
      cardDetailedText:
        "The client-server architecture is a traditional network structure where a single client send requests to a centralized server. The server processes these requests and sends back responses. This architecture is simple and widely used in web applications and services due to its straightforward design and ease of implementation.",
      media: {
        type: "IMAGE",
        source: {
          url: "./a1.jpg",
        },
      },
    },
    {
      title: "",
      cardTitle: "Client-Fog Node-Server",
      url: "http://www.history.com",
      cardDetailedText:
        "In the client-fog node-server architecture, clients send requests to an intermediary fog node rather than directly to the server. The fog node, acting as a decentralized processing unit, processes the requests partially or completely before forwarding them to the server if needed. This setup reduces latency and bandwidth usage, making it suitable for applications requiring real-time processing and quick responses.",
      media: {
        type: "IMAGE",
        source: {
          url: "./a2.jpg",
        },
      },
    },
    {
      title: "",
      cardTitle: "Client-Multiple Fog Node-Server",
      url: "http://www.history.com",
      cardDetailedText:
        "This architecture extends the client-fog node-server model by incorporating multiple fog nodes. Clients send requests to the nearest or most appropriate fog node, which processes the requests and communicates with the server. The distribution of processing tasks among multiple fog nodes enhances scalability, reliability, and efficiency, especially in large-scale or geographically distributed networks.",
      media: {
        type: "IMAGE",
        source: {
          url: "./a3.jpg",
        },
      },
    },
    {
      title: "",
      cardTitle: "Multiple Client-Multiple Fog Node-Server",
      url: "http://www.history.com",
      cardDetailedText:
        "The multiple client-multiple fog node-server architecture involves multiple clients interacting with multiple fog nodes, which in turn connect to the server. This highly decentralized model allows for significant parallel processing, reducing server load and improving response times. It is ideal for large-scale IoT systems, smart cities, and applications that demand high availability and fault tolerance.",
      media: {
        type: "IMAGE",
        source: {
          url: "./a4.jpg",
        },
      },
    },
  ];
  return (
    <>
      <div className="flex flex-col w-full space-y-5">
        <div className="flex items-center justify-center text-center text-3xl font-bold">
          Architecture
        </div>
        {/* <div className="flex flex-col space-y-6">
          {data.map((item, index) => (
            <div key={index} className="space-y-2 flex flex-col items-start">
              <div className="text-2xl font-semibold">
                {index + 1}. {item.title}
              </div>
              <div className="text-base text-left">{item.description}</div>
            </div>
          ))}
        </div> */}

        <div className="flex flex-col items-center">
          <Chrono
            items={items}
            theme={{
              primary: "black",
              secondary: "#037e13",
              cardBgColor: "#59bb668f",
              titleColor: "#037e13",
              titleColorActive: "white",
              cardTitleColor: "currentColor",
            }}
            mode="VERTICAL_ALTERNATING"
            disableToolbar
            disableClickOnCircle
            activeItemIndex="5"
          />
        </div>
        <div>
          <Link href="/explore">
            <Button
              variant="destructive"
              size="lg"
              style={{ background: "#b4c917" }}
              className="text-1xl"
            >
              Explore More
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
