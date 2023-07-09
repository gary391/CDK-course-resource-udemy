
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { escape } from "querystring";
import { getSpaces } from "./GetSpaces";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { postSpacesWithDoc } from "./PostSpacesWithDoc";

// Best Practice initialize the dynamodb Client outside the function 
// in basic understanding we can create a connection and then keep using the same connection
// over and over instead of creating a new connection every time 


// This client requires an empty file 
const ddbClient = new DynamoDBClient({}); 
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Here we have types in our events
async function spacehandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                return getResponse
            case 'POST':
                // const response = await postSpaces (event, ddbClient);
                const response = await postSpacesWithDoc (event, ddbDocClient);
                return response
        
            default:
                break;
        }
    } catch (error) {
        console.error (error)
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)

        
    }


    }
    // What we are receiving in response 
    const response: APIGatewayProxyResult  = {
        statusCode: 200,
        body: JSON.stringify(message)
    }

    console.log(event);
    return response;

    // In order for this handler to be accessible form AWS Lambda
    // Is to export this handler


}
export { spacehandler }