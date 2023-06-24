import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {

    // Instance variable
    private stackSuffix: string;
    public readonly photosBucketArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
 
      // Initialize a method inside the constructor
      this.initializeSuffix();

      const photosBucket = new Bucket(this, 'PhotosBucket4', {
        bucketName: `photosbucket-${this.stackSuffix}`
      });

      this.photosBucketArn = photosBucket.bucketArn;

      // We need to export the bucket from here using CfnOutput
      new CfnOutput(this, 'photos-bucket', {
        value:photosBucket.bucketArn,
        exportName: 'photos-bucket'
      })
      /*

      // Using this command you can avoid running into an issue where it says the
      // resource already exists. This is being done, but assigning a specific logical id
      // name of the bucket. Thus even if you change the stack Id, the below command 
      // will override the AWS generated logicalId with this hardcoded value. 


      // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotoBucket2234kj34')

      // Create a new resource 
      // delete the old one 
      
      */
    }

    // Create a function InitializeSuffix that creates assigns a value to the stackSuffix variable a value.  
    private initializeSuffix (){

      // Get the stack ID using intrinsic function
      // console.log("Hello world! " + Fn.select(2,[this.stackId]))
      const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
      this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    }
}