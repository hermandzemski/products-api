import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult, SQSEvent } from "aws-lambda";
import productsService from "@services/index";

export const catalogBatchProcess = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
    console.log('sqs event:', event);

    try {
      //const id = event.pathParameters.id;

      //const product = await productsService.getById(id);

      event.Records.forEach(async record => {
        const { title, description, price, count } = JSON.parse(record.body);

        await productsService.create({
            title, description, price, count
        });
      });

      return formatJSONResponse('');
    } catch (err) {
      return formatJSONResponse(err, 500);
    }
};