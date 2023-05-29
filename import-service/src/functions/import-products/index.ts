
import { handlerPath } from '@libs/handler-resolver';
import type { AWS } from '@serverless/typescript';

export const importProductsFile: AWS['functions'][0] = {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import/{name}',
        cors: true,
        authorizer: {
          type: 'request',
          arn: 'arn:aws:lambda:us-east-1:442312567108:function:authorization-service-dev-basicAuthorizer',

        },
      },
    },
  ],
  
};
