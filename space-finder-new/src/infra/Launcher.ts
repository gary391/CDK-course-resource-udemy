import { App } from 'aws-cdk-lib'
import { DataStack } from './stacks/DataStack';
import { ApiStack } from './stacks/ApiStack';
import { LambdaStack } from './stacks/LambdaStack';


const app = new App();
// Call the DataStack inside the launcher stack.
new DataStack(app, 'DataStack');
// Call the lambda stack 
const lambdaStack = new LambdaStack(app, 'LambdaStack');
new ApiStack(app, 'ApiStack', {
    helloLambdaIntegration: lambdaStack.helloLambdaIntegration
})
