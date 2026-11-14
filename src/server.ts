import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routerHandler from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request",req);
    // console.log("Response",res);
    // console.log(req.url);
    // console.log(req.method);

    routerHandler(req, res)
   
  },
);

server.listen(5000, () => {
  console.log("Server is running successfully!!");
});
