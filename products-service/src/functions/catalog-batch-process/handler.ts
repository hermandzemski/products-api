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

        for (let record of event.Records) {

    //   event.Records.forEach(async record => {
            console.log('sqs record:', record);
            console.log('sqs record body:', record.body);
            const { title, description, price, count } = JSON.parse(record.body);

            if (!title || !price || !count) {
                return formatJSONResponse({ message: 'missing required parameters'}, 400);
            }

            

            await productsService.create({
                title, description, price: Number(price), count: Number(count)
            });

            const params: PublishCommandInput = {
                Message: `Product ${title} has been processed`,
                Subject: 'Added new product',
                TopicArn: TOPIC_ARN,
                MessageAttributes: {
                    price: {
                        DataType: 'Number',
                        StringValue: price
                    }
                }
            }

            console.log(params);
            await snsClient.send(new PublishCommand(params))
                .then(() => {
                    console.log('sns published');
                }).catch((err) => {
                    console.error('sns failed:', err);
                });
        }

      return formatJSONResponse('');
    } catch (err) {
        console.error(err);
      return formatJSONResponse(err, 500);
    }
};