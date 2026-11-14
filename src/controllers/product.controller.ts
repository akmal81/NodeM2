import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProducts } from "../types/product";
import { bodyParser } from "../utils/parseBody";
// import { IProducts } from '../types/product';

const productController = async (req: IncomingMessage, res: ServerResponse) => {

  const url = req.url;
  const method = req.method;

  // extract id from url
  const urlParams = url?.split("/");
  const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  // 

  // console.log(id);
  // console.log(urlParams);

  // get all products
  if (url === '/products' && method === "GET") {
    const products = productService()
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrives successfull",
        data: products
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = productService()

    const product = products.find((p: IProducts) => p.id === id)
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrives successfull",
        data: product
      }),
    );

  } else if (method === "POST" && url === "/products") {

    const body = await bodyParser(req)
    // console.log(body);
    const newProduct = {
      id: Date.now(),
      ...body
    }
    const products = productService();
    products.push(newProduct);

    createProduct(products);

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Created successfull",
        data: newProduct
      }),
    );

  } else if (method === "PUT" && id !== null) {

    const body = await bodyParser(req);
    const products = productService();

    const index = products.findIndex((p: IProducts) => p.id === id)
    // console.log(index);

    if (index < 0) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products Not found",
          // data: newProduct
        }),
      );
    }

    // console.log(products[index]);

    products[index] = {
      id: products[index].id,
      ...body
    }

    createProduct(products);

    res.writeHead(201, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products updated successfull",
        // data: newProduct
      }),
    );
  }

  else if (method === "DELETE" && id !== null) {

     const products = productService();

     const index = products.findIndex((p: IProducts) => p.id === id)

      if (index < 0) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products Not found",
          // data: newProduct
        }),
      );
    }
    // 

    products.splice(index, 1)

    createProduct(products)

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Delete successfull",
        
      }),
    );


  }

}
export default productController;
