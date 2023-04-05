import { Product } from "@models/product";

const products: Product[] = [{
    id: 1,
    title: 'IPhone 13',
    price: 1400
}, {
    id: 2,
    title: 'IPhone 14',
    price: 1600
}];

export default class ProductsService {
    async getAll(): Promise<Product[]> {
        return Promise.resolve(products);
    }

    async getById(id: number): Promise<Product> {
        const product = products.find(pr => pr.id === id);

        return Promise.resolve(product);
    }
}