import { Stack, StackProps } from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

// This is allow cross stack referencing 
interface ApiStackProps extends StackProps{
    helloLambdaIntegration: LambdaIntegration; 

}

export class ApiStack extends Stack {
    // constructor
    constructor(scope: Construct, id: string, props: ApiStackProps){
        super(scope, id, props)

        const api = new RestApi(this, 'SpacesApi');
        // Add resource manually
        const spacesResource = api.root.addResource('spaces');
        // Link this to our lambda
        // export this lambda intergration from the lambda stack
        spacesResource.addMethod('GET', props.helloLambdaIntegration)

        
    }
}