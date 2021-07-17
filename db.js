var AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
});

export async function scan() {
    return dynamoDb.scan( { TableName: 'transactions' } ).promise();
}

