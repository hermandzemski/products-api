import { APIGatewayRequestAuthorizerEvent, AuthResponse } from "aws-lambda";
import * as crypto from 'crypto';

export const basicAuthorizer = (event: APIGatewayRequestAuthorizerEvent, context, callback) => {
    console.log(event);

    const authHeader = event.headers.Authorization;

    if (!authHeader) {
        callback(null, getAuthResponse(event, 'Deny'));
    }

    try {

        const encodedCreds = authHeader.split(" ")[1];
        const [username, password] = Buffer.from(encodedCreds, "base64").toString().split(':');

        const savedPassword = process.env[username];

        if (!savedPassword || (savedPassword !== password)) {
            callback(null, getAuthResponse(event, 'Deny'));
        }
    } catch(err) {
        console.log(err);
        callback(null, getAuthResponse(event, 'Deny'));
    }

    callback(null, getAuthResponse(event, 'Allow')); 
}

const getAuthResponse = (event: APIGatewayRequestAuthorizerEvent, effect: 'Allow' | 'Deny'): AuthResponse => {
    return  {
        principalId: crypto.randomUUID(),
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: event.methodArn
            }]
        }
    };
}