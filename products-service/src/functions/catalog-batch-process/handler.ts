import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyResult, SQSEvent } from "aws-lambda";
import productsService from "@services/index";
import { PublishCommand, PublishCommandInput, SNSClient } from "@aws-sdk/client-sns";
import { REGION } from "src/consts";

const snsClient = new SNSClient({ region: REGION });

const TOPIC_ARN = process.env.SNS_ARN; 

export const catalogBatchProcess = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
    console.log('sqs event:', event);

    try {
      //const id = event.pathParameters.id;

      //const product = await productsService.getById(id);

      event.Records.forEach(async record => {
        console.log('sqs record:', record)
        const { title, description, price, count } = JSON.parse(record.body);

        if (!title || !price || !count) {
            return formatJSONResponse({ message: 'missing required parameters'}, 400);
         }

        

        await productsService.create({
            title, description, price, count
        });

        const params: PublishCommandInput = {
            Message: `Product ${title} has been processed`,
            Subject: 'Added new product',
            TopicArn: TOPIC_ARN
        }

        snsClient.send(new PublishCommand(params));
      });

      return formatJSONResponse('');
    } catch (err) {
      return formatJSONResponse(err, 500);
    }
};