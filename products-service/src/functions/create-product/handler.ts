import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import productsService from "@services/index";
import { CreateProductDTO } from "@models/product";

export const createProduct = middyfy(async (event: APIGatewayEvent & CreateProductDTO): Promise<APIGatewayProxyResult> => {
    console.log('create product:', event.body);

    try {
     const { title, description, price, count } = event.body;

     if (!title || !price || !count) {
        return formatJSONResponse({ message: 'missing required parameters'}, 400);
     }

      await productsService.create({
        title, description, price, count
      });


      return formatJSONResponse({ message: `Product ${title} successfully added`});
    } catch (err) {
      return formatJSONResponse(err, 500);
    }
  });