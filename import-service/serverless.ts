import type { AWS } from '@serverless/typescript';

import { importProductsFile } from '@functions/index';
import { importFileParser } from '@functions/import-file-parser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BUCKET_NAME: 'products-csv-parser',
      QUEUE_URL: 'https://sqs.us-east-1.amazonaws.com/442312567108/CatalogItemsQueue'
    },
    httpApi: { cors: true },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 's3:ListBucket',
            Resource: "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}"
          },
          {
            Effect: 'Allow',
            Action: 's3:*',
            Resource: "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*"
          },
        ]
      }
    }
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
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
  },
};

module.exports = serverlessConfiguration;
