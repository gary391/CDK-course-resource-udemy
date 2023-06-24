import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import {Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';

interface PhotosHandlerStackProps extends cdk.StackProps {

    targetBucketArn: string
}



export class PhotosHandlerStack extends cdk.Stack {

    // Using props sharing resources in CDK
    constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
      super(scope, id, props);
    // If we are importing this here which means that we 
    // will have to export the bucket from the other stack. 
    //   const targetBucket = Fn.importValue('photos-bucket')
        // This lambda function refer to a bucket
      new LambdaFunction (this, 'PhotosHandler', {
        runtime: Runtime.NODEJS_16_X,
        handler: 'index.handler',
        code: Code.fromInline(`
        exports.handler = async(event) => {
            console.log("hello! World Bucket: " + process.env.TARGET_BUCKET)
        };`),

        // Here we are specifying that the target bucket is target bucket that we got from the 
        // export. 
        environment:{
            TARGET_BUCKET: props.targetBucketArn, 
        },
      });
     
    }

}