import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {

    private stackSuffix: String;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      this.initializeSuffix();
    //   const myBucket = new Bucket(this, 'PhotosBucket', {
      new Bucket(this, 'PhotosBucket', {
        bucketName: `photos-bucket-cdk-${this.stackSuffix}` // Here we are giving a specific name to the bucket instead of auto assigned one.
      });

      // Using this we are creating a special logical ID, that will override the existing one 
      // So that the resource is not deleted and recreated again. 

    //   (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket22345kj346')
    }
    // Get the stack ID which is available when the stack is constructed. 
    private initializeSuffix() {
        const stackIdParts = Fn.split('/', this.stackId);
        const shortStackId = Fn.select(2, stackIdParts); // Select the first part after the "/"
        const stackSuffix = Fn.select(4, Fn.split('-', shortStackId)); // Use another part of the split result
        
        this.stackSuffix = stackSuffix;
    }

}