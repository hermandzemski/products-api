

import { getProduct } from "./handler";

import productsService from "@services/index";
import { Product } from "@models/product";


describe('Get product by id', () => {
    const mockedProduct: Product = { id: 1, name: 'test', price: 1000};
    const event = {
        httpMethod: 'get',
        headers: {
            "Content-Type": ""
        },
        pathParameters: {
            id: 1
        }
    } as any;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return 500', async () => {
        const spy = jest.spyOn(productsService, 'getById').mockReturnValueOnce(Promise.resolve(undefined));

        const result = await getProduct({ ...event, id: 5 }, { timeoutEarlyInMillis: 0 } as any);

        expect(spy).toHaveBeenCalled();
        expect(result.statusCode).toEqual(404);
    });

    it('should return 200', async () => {
        const spyFn = jest.spyOn(productsService, 'getById').mockReturnValueOnce(Promise.resolve(mockedProduct));


        const result = await getProduct(event, { timeoutEarlyInMillis: 0 } as any);

        expect(spyFn).toHaveBeenCalled();
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toEqual(mockedProduct);
    });
});