import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
// import { v4 } from "uuid";


// Best Practice initialize the dynamodb Client outside the function 
// For using the dynamoDB client we will have to inject it is inside the function as we are injecting the event of type API
// ProxyEvent 


// When we are adding an entry in the dynamoDB, we need to pass in with unique id 
// We even before we get the data we should have random id 
// Using uuid
// Get the body of our request 

export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

   // const randomId = v4();
   const item = JSON.parse(event.body);

   // Passing the random id to the item 
   // Making the ddb call 


   item.id = Math.random;
   const result  = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        // Item: item // this will give you an error "cannot read properties of undefined (reading o) dynamoDB" sdk v2 
        
        // Using marshalling we can directly add the Type Attribute automatically. 
        Item: marshall(item)
        
        // Adding the type attribute individually to the items 
        
        // Item: {
        //     id: {
        //         S: randomId
        //     }, 
        //     location :{
        //         S: item.location
        //     }
        // }

   })); 

   console.log(result)

   return {
    statusCode: 201,
    body: JSON.stringify({id:   item.id})
   }


}