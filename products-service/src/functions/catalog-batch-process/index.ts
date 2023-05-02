import { handlerPath } from "@libs/handler-resolver";

export const getProductsById = {
    handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
    events: [
        {
            sqs: {
                arn: {
                    'Fn::GetAtt': ['CatalogItemsQueue', 'Arn']
                },
                batchSize: 5,
            },
        },
    ],
  };