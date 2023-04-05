import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import productsService from "@services/index";

export const getProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = Number(event.pathParameters.id);

      const product = await productsService.getById(id);
  
      if (!product) {
        return formatJSONResponse({
          message: 'Product not found'
        }, 404)
      }

      return formatJSONResponse(product);
    } catch (e) {
      return formatJSONResponse({
        message: e
      }, 500);
    }
  
  
  });