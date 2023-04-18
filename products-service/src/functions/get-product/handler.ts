import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import productsService from "@services/index";

export const getProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('get product:', event.pathParameters.id);

    try {
      const id = event.pathParameters.id;

      const product = await productsService.getById(id);
  
      if (!product) {
        return formatJSONResponse({
          message: 'Product not found'
        }, 404)
      }

      return formatJSONResponse(product);
    } catch (err) {
      return formatJSONResponse(err, 500);
    }
});