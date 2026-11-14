import { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

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
