import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'

interface PhotosHandlerStackProps extends cdk.StackProps {
  // as we only need the arn for bucket
  targetBucketArn: string
}


export class PhotosHandlerStack extends cdk.Stack {


    constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    // Before extending the StackProp
    // constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
      // The properties object is of type cdk.StackProp and it is an 
      // and its is an optional property.
      // We can extend the stack properties which is an iterface to 
      // get some required properties.


      // Initialize the bucket inside the constructor
      // If we are importing this here which means that we 
      // will have to export the bucket from the other stack.
      // const targetBucket = Fn.importValue('photos-bucket')

      // Here this Lambda function needs to access a bucket
      // Using the arrow function 
      new LambdaFunction (this, 'PhotosHandler', {
        runtime: Runtime.NODEJS_16_X,
        handler: 'index.handler',
        code: Code.fromInline(`
          exports.hander = async (event) => {
            console.log("Hello!: " + process.env.TAEGET_BUCKET)
            };
        `),
        environment: {
          // TARGET_BUCKET: targetBucket, // Before when we us import values for the target bucket
          TARGET_BUCKET: props.targetBucketArn, // Here we are getting the value from the targetBucketArn
        },

      });
    }


}