import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductsById, createProduct } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'products-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_DB_NAME: 'Products',
      STOCK_DB_NAME: 'Stocks',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Scan',
              'dynamodb:Query',
              'dynamodb:PutItem'
            ],
            Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.PRODUCTS_DB_NAME}"
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Scan',
              'dynamodb:Query',
              'dynamodb:PutItem'
            ],
            Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.STOCK_DB_NAME}"
          }
        ]
      }
    }
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 3003
    },
    dynamodb: {
      start: {
        port: 5001,
        inMemory: true,
        migrate: true
      },
      stages: [ 'dev' ]
    }
  },
  // resources: {
  //   Resources: {
  //     ProductsTable: {
  //       Type: 'AWS::DynamoDB::Table',
  //       DeletionPolicy: Retain
  //       Properties: {
  //         TableName: "${self:provider.environment.PRODUCTS_DB_NAME}",
  //         AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S'}],
  //         KeySchema: [{ AttributeName: 'id', KeyType: 'HASH'}],
  //         ProvisionedThroughput: {
  //           ReadCapacityUnits: 1,
  //           WriteCapacityUnits: 1
  //         }
  //       }
  //     },
  //     StocksTable: {
  //       Type: 'AWS::DynamoDB::Table',
  //       Properties: {
  //         TableName: "${self:provider.environment.STOCK_DB_NAME}",
  //         AttributeDefinitions: [{ AttributeName: 'product_id', AttributeType: 'S'}],
  //         KeySchema: [{ AttributeName: 'product_id', KeyType: 'HASH'}],
  //         ProvisionedThroughput: {
  //           ReadCapacityUnits: 1,
  //           WriteCapacityUnits: 1
  //         }
  //       }
  //     }
  //   }
  // }
};

module.exports = serverlessConfiguration;
