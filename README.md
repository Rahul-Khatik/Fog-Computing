## Fog Computing System

This project implements a fog computing system using the Node.js cluster module, where client requests are processed by fog nodes running on separate CPU cores, and only necessary information is forwarded to the server node. The goal is to reduce the load on the central server and minimize request execution time by distributing tasks across fog nodes.

# Tech Stack

- Frontend: Next.js
- Backend: Node.js, Express.js, Cluster Module

# Getting Started

Prerequisites
- Node.js and npm installed

# Setup Instructions :- 

1. Clone the repository:

  - git clone https://github.com/Rahul-Khatik/Fog-Computing.git

2. Install dependencies:
   
  - npm install

# Running the Application

- Frontend

  npm run dev

- Backed :-

  npm start