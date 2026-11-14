# Init typescript project with node
-git init
- create file gitignore
- npm init
- npm i -D typescript
- npx tsc init
- Ins tall node type 
- npm install -D @types/node
- create 
    src/server.ts
- import createServer from http
- create server function
- listen server function

```ts
import { createServer } from "http";

const server:Server = createServer((req:Incomming, res)=>{
    // console.log("Request", req);
    console.log("Response", res);
})

server.listen(5000, ()=>{
    console.log("Server is running successfully!!");
})
```



<!-- Create Route -->

```ts
const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request",req);
    // console.log("Response",res);
    // console.log(req.url);
    // console.log(req.method);

    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
      // console.log("This is root route");
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "This is root route!!",
        }),
      );
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "This is Products route!!",
        }),
      );
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "This content is not available!!",
        }),
      );
    }
  },
);
```

<!-- Organizing file moduler -->
/src
--/routes
  --/route.ts
--/controllers
  --/product.controller.ts
--/services
  --/product.service.ts


  Server 
  ```ts
  const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
 
    routerHandler(req, res)
   
  },
);

server.listen(5000, () => {
  console.log("Server is running successfully!!");
});
  ```

Route
  ```ts
const routerHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
        // console.log("This is root route");
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(
            JSON.stringify({
                message: "This is root route!!",
            }),
        );
    } else if (url?.startsWith("/products")) {

        productController(req, res);
        
    } else {
        res.writeHead(404, { "Content-type": "application/json" });
        res.end(
            JSON.stringify({
                message: "This content is not available!!",
            }),
        );
    }
};

export default routerHandler;
  ```