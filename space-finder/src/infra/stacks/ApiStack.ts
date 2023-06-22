import { Stack, StackProps } from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
    helloLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {

    // Constructor
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'SpacesApi');

        // resources
        // Why do we need to add a resource here ?

        const spacesResource = api.root.addResource('spaces')
        // Here we need to integrate the the lambda here to the api 
        // We will have to export the LambdaIntegration from the lambda stack 
        spacesResource.addMethod('GET', props.helloLambdaIntegration)
    }
}