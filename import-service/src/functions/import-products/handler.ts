import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  getSignedUrl
} from "@aws-sdk/s3-request-presigner";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const REGION = "us-east-1";
const BUCKET = "products-csv-parser";

export const importProductsFile = middyfy(async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const fileName = event.pathParameters.name;

  if  (!fileName) {
    console.log('Missing input parameter `name`');
    return formatJSONResponse({ message: 'Missing input parameter `name`'}, 500);
  }

  console.log('File name:', fileName);

  //const client = new S3Client({ region: REGION, credentials: { accessKeyId: "ASIAWN67CFFCCLE5UOGD", secretAccessKey: "7GZ3WXxRUT6Y7NO/0yEYqXDVNP8e44LW5G1Nudpg" } });
  const client = new S3Client({ region: REGION });

  const command = new PutObjectCommand({ Bucket: BUCKET, Key: `uploaded/${fileName}` });
  const signedUrl =  await getSignedUrl(client, command, { expiresIn: 3600 });


  return formatJSONResponse({
    url: signedUrl,
  });
});
