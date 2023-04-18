import * as AWS from 'aws-sdk';

function createDB() {
    // if (process.env.IS_OFFLINE) {
    //     return new AWS.DynamoDB.DocumentClient({
    //       region: "localhost",
    //       endpoint: "http://localhost:5001",
    //     });
    // }

    return new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
}

const dynamo = createDB();

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

export const put = async <T extends AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap>(tableName: string, item: T) => {
    const putResult = await dynamo.put({
        TableName: tableName,
        Item: item
    }).promise();

    return putResult;
}