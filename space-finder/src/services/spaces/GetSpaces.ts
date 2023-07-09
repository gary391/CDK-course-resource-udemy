import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


// Best Practice initialize the dynamodb Client outside the function 
// For using the dynamoDB client we will have to inject it is inside the function as we are injecting the event of type API
// ProxyEvent 


// When we are adding an entry in the dynamoDB, we need to pass in with unique id 
// We even before we get the data we should have random id 
// Using uuid
// Get the body of our request 

export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // For getting data via a query string parameter 

    if(event.queryStringParameters){
        if('id' in event.queryStringParameters) {
            const spaceId = event.queryStringParameters['id'];
            // make a query using the id 
            const getItemResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME, 
                Key: {
                    'id' :{S: spaceId}
                }
            }))
            if((await getItemResponse).Item) {
                const unmashalledItem = unmarshall (getItemResponse.Item)
                return {
                    statusCode: 200,
                    body: JSON.stringify(unmashalledItem)
                }
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify(`Space with id ${spaceId} not found!`)
            }
        }
    } else {
        return {
            statusCode: 400, 
            body: JSON.stringify('Id required!')
        }
    }

    }
   const result  = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
   })); 
   /**
    * The arrow function item => unmarshall(item) 
    * can be read as "for each item in the array, 
    * call the unmarshall function with that item as an argument." 
    */
   const unmarshallItems = result.Items?.map(item => unmarshall(item))
   console.log(result.Items);

   return {
    statusCode: 201,
    body: JSON.stringify(unmarshallItems)
   }


}