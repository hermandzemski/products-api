import { Product } from "@models/product";
import { ProductsDB } from "src/data-providers/produsts.db";

const products: Product[] = [{
    id: 1,
    title: 'IPhone 13',
    price: 1400,
    count: 1
}, {
    id: 2,
    title: 'IPhone 14',
    price: 1600,
    count: 5
}];



export default class ProductsService {
    async getAll(): Promise<Product[]> {
        return ProductsDB.getAll();
    }

    async getById(id: number): Promise<Product> {
        return ProductsDB.getById(id);
    }
}