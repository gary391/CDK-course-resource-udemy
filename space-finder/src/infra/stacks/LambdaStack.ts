import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from "constructs";
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}

export class LambdaStack extends Stack {

    // Public property named helloLambdaIntegration of type LambdaIntegration
    public readonly helloLamdbaIntegration: LambdaIntegration

    // Constructor
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        const helloLambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'hello.main',
            // Navigating the folders to find the file i.e. from the lambda to main file.
            // last entry here is the name of the file, which in this case is hello
            // This information is already, mentioned in the handler.  
            code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName
            }
        })
        // The helloLamdbaIntegration we defined here is an instance of LambdaIntegration that 
        // Takes the helloLambda value
        this.helloLamdbaIntegration = new LambdaIntegration(helloLambda)
    }
}