
import { handlerPath } from '@libs/handler-resolver';
import type { AWS } from '@serverless/typescript';

export const importFileParser: AWS['functions'][0] = {
  handler: `${handlerPath(__dirname)}/handler.importFileParser`,
  events: [
    {
      s3: {
        bucket: '${self:provider.environment.BUCKET_NAME}',
        event: 's3:ObjectCreated:*',
        rules: [{ prefix: 'uploaded/' }],
        existing: true
      }
    },
  ],
  
};