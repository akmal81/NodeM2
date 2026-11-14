import path from "node:path";
import fs from "fs";
import type { IProducts } from "../types/product";

const filePath = path.join(process.cwd(), "./src/database/db.json")

export const productService = () => {
    const result = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(result);
}


export const createProduct = (payload: IProducts) => {

    fs.writeFileSync(filePath, JSON.stringify(payload))

}