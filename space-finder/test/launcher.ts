import { spacehandler } from "../src/services/spaces/spacehandler";

process.env.AWS_REGION = 'us-east-1';
process.env.TABLE_NAME = 'SpaceTable-0a20d40f9c6d'
spacehandler({
    // httpMethod: 'GET',
    // queryStringParameters: {
    //         id: '15e3af1c-f61b-40ea-84f9-3d2d3ae21525'
    // }
    // body: JSON.stringify({
    //     location: 'London'
    // })
    httpMethod: 'DELETE', 
    queryStringParameters: {
        id: 'ae2211e4-4f43-49a4-8ad5-1370bff45ae9'
    },
    // body: JSON.stringify({
    //     location: 'Delhi update'
    // })
} as any, {} as any);