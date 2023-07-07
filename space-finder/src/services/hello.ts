
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid';
import { S3Client, ListBucketsCommand} from '@aws-sdk/client-s3';
// This is the code for the lambda. 
// Main async function that receives two arguments event, context. 
// We need to 

// exports.main = async function (event, context) {
//     // Returns status code and body!
//     return {
//         statusCode: 200, 
//         body: JSON.stringify(`Hello! I will read from ${process.env.TABLE_NAME}`)
//     }
// }

//=================================================================//
//=================================================================//

// * Make sure you initialize the CLient outside the handler function *

// so the lambda can reuse this client. This is considered an intensive operation 
// so we want to do this once.

// It also needs an configuration object. Here we are passing in an empty configuration. 
//=================================================================//
//=================================================================//

const s3Client = new S3Client({});



// Here we have types in our events
async function handler(event: APIGatewayProxyEvent, context: Context) {

    // This command also accepts a configuration, here we are passing empty object  
    const command = new ListBucketsCommand({})
    const listBucketsResult = (await s3Client.send(command)).Buckets;

    // What we are receiving in response 
    const response: APIGatewayProxyResult  = {
        statusCode: 200,
        // body: JSON.stringify('Hello from NodeJS lambda, this is the id: ' + v4())
        body: JSON.stringify('Hello from NodeJS lambda, here are your buckets: ' + JSON.stringify(listBucketsResult))

    }

    console.log(event);
    return response;

    // In order for this handler to be accessible form AWS Lambda
    // Is to export this handler


}
export { handler }