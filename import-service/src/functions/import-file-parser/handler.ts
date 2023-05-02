import { formatJSONResponse } from '@libs/api-gateway';
// import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult, S3Event } from "aws-lambda";

import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client, S3 } from "@aws-sdk/client-s3";
import { BUCKET, QUEUE_URL, REGION } from 'src/const';
const csv = require('csv-parser')
import { Readable } from 'stream';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: REGION });

export const importFileParser = async (event: S3Event): Promise<any> => {
  const fileName = event.Records[0].s3.object.key;

  if  (!fileName) {
    console.log('Missing input parameter `name`');
    return formatJSONResponse({ message: 'Missing input parameter `name`'}, 500);
  }

  console.log('File name:', fileName);

  const client = new S3Client({ region: REGION });

  const fileStream = (await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: fileName} )));

  const results = [];

  const pr = new Promise((resolve, reject) => {
    (fileStream.Body as Readable).pipe(csv()).on('data', data => {
      results.push(data);
    }).on('end', async() => {
      console.log('file parsed');
      console.log(results);

      try {

        results.forEach(async row => {
          const params = {
            DelaySeconds: 10,
            MessageBody: JSON.stringify(row),
            QueueUrl: QUEUE_URL
          };

          console.log('params:', params);

          await sqsClient.send(new SendMessageCommand(params))
            .then(
              data => {
                console.log('Data sent to SQS: ', data);
              },
              error => {
                console.log('Failed sending the message to SQS: ', error);
              }
            );
        });
      } catch (err) {
        reject(err);
        console.log(err);
      }



      const copyCommand = new CopyObjectCommand({
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${fileName}`,
        Key: fileName.replace('uploaded', 'parsed')
      });
    
      // console.log('copy command:', copyCommand);
    
      await client.send(copyCommand);
    
      const deleteCommand = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
      });
    
      // console.log('delete command:', deleteCommand);
    
      await client.send(deleteCommand);
      resolve(null);
    });

  });


  console.log('finished');
  return Promise.all([pr]);
};

async function fileParsedHandler() {

}

// async function getObject(params) {
//   const s3ResponseStream = (await s3.getObject(params)).Body
//   const chunks = []

//   for await (const chunk of s3ResponseStream) {
//     chunks.push(chunk)
//   }

//   const responseBuffer = Buffer.concat(chunks)
//   return JSON.parse(responseBuffer.toString())
// }
