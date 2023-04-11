
import { PRODUCT_TABLE, STOCK_TABLE } from './consts';
import { Product } from '@models/product';
import { Stock } from '@models/stock';
import { query, scan } from './db';

const PRODUCT_PARAMS = (id: number) => ({
    TableName: PRODUCT_TABLE,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {':id': id}
});

const STOCK_PARAMS = (id: number) => ({
    TableName: STOCK_TABLE,
    KeyConditionExpression: 'productId = :id',
    ExpressionAttributeValues: { ':id': id }
});

export namespace ProductsDB {
    export const getAll = async (): Promise<Product[]> => {
        const products = await scan<Product>(PRODUCT_TABLE);
        const stocks = await scan<Stock>(STOCK_TABLE);

        return products.map(pr => {
            const count = stocks.find(s => s.productId === pr.id).count;

            return { ...pr, count };
        });
    }

    export const getById = async (id: number): Promise<Product> => {
        const product = await query<Product>(PRODUCT_PARAMS(id));
        const stock = await query<Stock>(STOCK_PARAMS(id));

        return { ...product, count: stock.count };
    }
}