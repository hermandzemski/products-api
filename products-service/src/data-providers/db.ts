import * as AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient({ region: ''});

export const scan = async <T>(table: string) => {
    const scanResults = await dynamo.scan({
        TableName: table
    }).promise();

    return scanResults.Items as T[];
}

export const query = async <T>(params: AWS.DynamoDB.DocumentClient.QueryInput) => {
    const queryResults = await dynamo.query(params).promise();

    return queryResults.Items[0] as T;
}