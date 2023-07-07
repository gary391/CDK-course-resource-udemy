/*
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
*/
// Using NodeJS lambda instead of calling lambda function


import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from "constructs";
// import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}

export class LambdaStack extends Stack {

    // Public property named helloLambdaIntegration of type LambdaIntegration
    public readonly helloLamdbaIntegration: LambdaIntegration
    public readonly spacesLamdbaIntegration: LambdaIntegration

    // Constructor
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        const helloLambda = new NodejsFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            // Navigating the folders to find the file i.e. from the lambda to main file.
            // last entry here is the name of the file, which in this case is hello
            // This information is already, mentioned in the handler.  
            entry: (join(__dirname, '..', '..', 'services', 'hello.ts')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName
            }
        });
        
        // For lambda to access the s3 bucket it will need read access policies 
        helloLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions:[
                's3:ListAllMyBuckets',
                's3:ListBucket'
            ],
            resources:["*"] // bad practice!!
        }))

        /**
         * SpacesLambda
         */
        const spacesLambda = new NodejsFunction(this, 'spacesLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'spacehandler',
            entry: (join(__dirname, '..', '..', 'services', 'spaces', 'spacehandler.ts')),
            environment:{
                TABLE_NAME: props.spacesTable.tableName
            }
        });


        // The helloLamdbaIntegration we defined here is an instance of LambdaIntegration that 
        // Takes the helloLambda value
        this.helloLamdbaIntegration = new LambdaIntegration(helloLambda)
        this.spacesLamdbaIntegration = new LambdaIntegration(spacesLambda)
    }
}
