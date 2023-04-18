import { getAllProducts } from "./handler";

import productsService from "@services/index";
import { Product } from "@models/product";


describe('Get all products', () => {
    const mockedProducts: Product[] = [{ id: 1, title: 'test', price: 1000}];

    it('should return 200', async () => {
        const spy = jest.spyOn(productsService, 'getAll').mockReturnValueOnce(Promise.resolve(mockedProducts));

        const event = {
            httpMethod: 'get',
            headers: {
                "Content-Type": ""
            }
        } as any;


        const result = await getAllProducts(event, { timeoutEarlyInMillis: 0 } as any);

        expect(spy).toHaveBeenCalled();
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toEqual(mockedProducts);
    });
});