import { Product } from "@models/product";
import { ProductsDB } from "@data-providers/produsts.db";
import Ajv from "ajv";

const ajv = new Ajv();

export default class ProductsService {
    async getAll(): Promise<Product[]> {
        return ProductsDB.getAll();
    }

    async getById(id: string): Promise<Product> {
        return ProductsDB.getById(id);
    }

    async create(product: Omit<Product, 'id'>): Promise<any> {        
        return ProductsDB.add(product);
    }
}