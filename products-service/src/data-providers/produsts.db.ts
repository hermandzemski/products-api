
import { PRODUCT_TABLE, STOCK_TABLE } from './consts';
import { Product } from '@models/product';
import { Stock } from '@models/stock';
import { query, scan, put } from './db';
import * as crypto from 'crypto';

const PRODUCT_PARAMS = (id: string) => ({
    TableName: PRODUCT_TABLE,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {':id': id}
});

const STOCK_PARAMS = (id: string) => ({
    TableName: STOCK_TABLE,
    KeyConditionExpression: 'product_id = :id',
    ExpressionAttributeValues: { ':id': id }
});

export namespace ProductsDB {
    export const getAll = async (): Promise<Product[]> => {
        const products = await scan<Product>(PRODUCT_TABLE);
        const stocks = await scan<Stock>(STOCK_TABLE);

        return products.map(pr => {
            const count = stocks.find(s => s.product_id === pr.id).count;

            return { ...pr, count };
        });
    }

    export const getById = async (id: string): Promise<Product> => {
        const product = await query<Product>(PRODUCT_PARAMS(id));
        const stock = await query<Stock>(STOCK_PARAMS(id));

        return { ...product, count: stock.count };
    }

    export const add = async (product: Omit<Product, 'id'>): Promise<any>  =>{
        const id = crypto.randomUUID();

        try {
            await put<Product>(PRODUCT_TABLE, { ...product, id });
            await put<Stock>(STOCK_TABLE, { product_id: id, count: product.count });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}