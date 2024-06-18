import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


export class PhotosStack extends cdk.Stack {

    private stackSuffix: string; 
    
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
      this.initalizeSuffix();
      const myBucket = new Bucket (this, 'PhotosBucket2', {
        bucketName: `photo-bucket-${this.stackSuffix}`
      });
    // By casting the bucket to a cfn bucket we can override the logical ID
      // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId("PhotosBucket20240615")
    }
    // Using the stackID which is unique for every stack, we can avoid any name collision between 
    // resources between different stacks, and we know which resource belong to which stack.
    private initalizeSuffix(){ // private method only accsssible within the class 
      // We can get the stack Id when the stack is being constructed using this.stackId)
      const shortStackId = Fn.select(2,Fn.split('/', this.stackId))
      this. stackSuffix = Fn.select(4,Fn.split('-', shortStackId))
    }
}