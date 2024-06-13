import { DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


// Best Practice initialize the dynamodb Client outside the function 
// For using the dynamoDB client we will have to inject it is inside the function as we are injecting the event of type API
// ProxyEvent 


// When we are adding an entry in the dynamoDB, we need to pass in with unique id 
// We even before we get the data we should have random id 
// Using uuid
// Get the body of our request 

export async function updateSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // For getting data via a query string parameter, id and body is present then only do the update  

    if(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body){
        //  Get the Id
        const parsedBody  = JSON.parse(event.body) // event.body is string, so we need to parse it. 
        const spaceId = event.queryStringParameters['id'];

        // get the entry from the event body - 
        // To make it simple we will only take the first item from the event body. 
        // We will have to make separate request to update any other parameter 
        const requestBodyKey = Object.keys(parsedBody)[0];
        const requestBodyValue = parsedBody[requestBodyKey];

        // building the query
        
        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id' : {S: spaceId}
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues: {
                ':new': {
                    S: requestBodyValue
                }
            }, 
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            }, 
            ReturnValues: 'UPDATED_NEW'
        }));
        return {
            statusCode: 204,
            body: JSON.stringify(updateResult.Attributes)
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right args!!')
    }
    
}