This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## **Installation and running this solution (ensure Docker is installed on your machine):** 

Run the following commands in your terminal:

1) Build the project with "npm run buildConverter"

2) cd .. and make sure nightlify-converter is in the current directory.

3) docker build -t nightlify-converter nightlify-converter

4) docker run -d nightlify-converter

Open your browser to http://localhost:8081/ (takes a few seconds to start)