import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from "aws-lambda";

import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client, S3 } from "@aws-sdk/client-s3";
import { BUCKET, REGION } from 'src/const';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';



export const importFileParser = async (event: any): Promise<APIGatewayProxyResult> => {
  const fileName = event.Records[0].s3.object.key;

  if  (!fileName) {
    console.log('Missing input parameter `name`');
    return formatJSONResponse({ message: 'Missing input parameter `name`'}, 500);
  }

  console.log('File name:', fileName);

  const client = new S3Client({ region: REGION });

  // const fileStream = (await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: fileName} )));

  // const results = [];

  // (fileStream.Body as Readable).pipe(csvParser()).on('data', data => {
  //   results.push(data);
  // }).on('end', () => {
  //   console.log('file parsed')
  // });

  const copyCommand = new CopyObjectCommand({
    Bucket: BUCKET,
    CopySource: `${BUCKET}/${fileName}`,
    Key: fileName.replace('uploaded', 'parsed')
  });

  console.log('copy command:', copyCommand);

  await client.send(copyCommand);

  const deleteCommand = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
  });

  console.log('delete command:', deleteCommand);

  await client.send(deleteCommand);


  return formatJSONResponse({});
};

// async function getObject(params) {
//   const s3ResponseStream = (await s3.getObject(params)).Body
//   const chunks = []

//   for await (const chunk of s3ResponseStream) {
//     chunks.push(chunk)
//   }

//   const responseBuffer = Buffer.concat(chunks)
//   return JSON.parse(responseBuffer.toString())
// }
