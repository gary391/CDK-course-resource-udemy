import { Stack, StackProps } from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from "constructs";


// Using interface we will have to setup a way to integrate two stack i.e. lambda stack with the API stack. 
interface ApiStackProps extends StackProps {
    helloLambdaIntegration: LambdaIntegration
    spacesLambbaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {

    // Constructor
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'SpacesApi');

        // resources
        // Why do we need to add a resource here ?

        const spacesResource = api.root.addResource('spaces')
        // Here we need to integrate the  lambda here to the api which is in other stack lambda stack 
        // We will have to export the LambdaIntegration from the lambda stack, and import it here. 
        // spacesHelloLambdaResource.addMethod('GET', props.helloLambdaIntegration)
        // H
        const sdkspacesResource = api.root.addResource('sdkspaces')
        spacesResource.addMethod('GET', props.helloLambdaIntegration)
        sdkspacesResource.addMethod('GET', props.spacesLambbaIntegration)
        sdkspacesResource.addMethod('POST', props.spacesLambbaIntegration)
    }
}