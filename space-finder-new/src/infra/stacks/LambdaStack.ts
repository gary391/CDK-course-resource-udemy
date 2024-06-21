import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';




export class LambdaStack extends Stack {

    public readonly helloLambdaIntegration: LambdaIntegration
    // constructor
    constructor(scope: Construct, id: string, props?: StackProps){
        super(scope, id, props)


        const helloLambda = new LambdaFunction(this, 'HelloLambda', {
            // What runtime will lambda use
            runtime: Runtime.NODEJS_18_X,
            // This identifies the code that will be executed inside the lambda
            handler: 'hello.main',
            // How can see add the code to the lambda
            // Pass in the path of our code
            code: Code.fromAsset(join(__dirname, '..','..', 'services'))

        })
        this.helloLambdaIntegration = new LambdaIntegration(helloLambda)
    }
}