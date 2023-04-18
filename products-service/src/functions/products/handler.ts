import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import productsService from '@services/index';


export const getProductsList = middyfy(async (): Promise<APIGatewayProxyResult> => {
  console.log('get products');
  
  try {
    const products = await productsService.getAll();

    return formatJSONResponse(products);
  } catch (err) {
    return formatJSONResponse(err, 500);
  }
});
