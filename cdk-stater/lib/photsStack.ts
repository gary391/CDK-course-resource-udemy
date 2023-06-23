import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
 
      const myBucket =  new Bucket(this, 'PhotosBucket4', {
        bucketName: 'photosbucket-234kj3465'
      });

      // Using this command you can avoid running into an issue where it says the
      // resource already exists. This is being done, but assigning a specific logical id
      // name of the bucket. Thus even if you change the stack Id, the below command 
      // will override the AWS generated logicalId with this hardcoded value. 
      
      (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotoBucket2234kj34')

      // Create a new resource 
      // delete the old one 

    }
}