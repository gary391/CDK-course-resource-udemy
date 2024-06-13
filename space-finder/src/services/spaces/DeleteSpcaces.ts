import { DeleteItemCommand, DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


// Best Practice initialize the dynamodb Client outside the function 
// For using the dynamoDB client we will have to inject it is inside the function as we are injecting the event of type API
// ProxyEvent 


// When we are adding an entry in the dynamoDB, we need to pass in with unique id 
// We even before we get the data we should have random id 
// Using uuid
// Get the body of our request 

export async function deleteSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // For getting data via a query string parameter, id and body is present then only do the update  

    if(event.queryStringParameters && ('id' in event.queryStringParameters)){
        //  Get the Id
        const spaceId = event.queryStringParameters['id'];
       
        const deleteResult = await ddbClient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id' : {S: spaceId}
            }
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(`Deleted spaces with id ${spaceId}`)
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right args!!')
    }
    
}