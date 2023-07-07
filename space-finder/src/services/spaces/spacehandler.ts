
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


// Here we have types in our events
async function spacehandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    switch (event.httpMethod) {
        case 'GET':
            message = 'Hello from GET!'
            break;
        case 'POST':
            message = 'Hello from POST!'
            break;
    
        default:
            break;
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