import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

// L3 constructs extends from Constructs class.
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super (scope, id);
    
    new Bucket(this, 'MyL3Bucket', {
      // file to expired
      lifecycleRules: [{
        expiration: cdk.Duration.days(expiration)
      }]
    });

  }
}

export class CdkStarterOct24Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    /*
    We are inside the constructor because everything that happens inside 
    CDK usually is put inside the constructors.

    - For any CDK resource or construct, we need to provide a scope and 
    this bucket belongs to whick is the stack where the bucket belongs. so 
    you must pass a reference inside its constructor so `this` represents the existing 
    stack.
    - ID  which is nothing but a identifier
    - Property which here are optional

    */
    // Create an s3 bucket 3 ways:
    
    // Using L1 construct 
    // When we delete the stack, the bucket will be deleted as well.
    // As this is created using L1 construct, beacuse if doesn't have cdk removalpolicy 
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    });

    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number'

    })

    // Using L2 construct 
    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      // file to expired
      lifecycleRules: [{
        // expiration: cdk.Duration.days(2)
        expiration: cdk.Duration.days(duration.valueAsNumber)
      }]
    });
    console.log('Bucket Name: ' +  myL2Bucket.bucketName) // This will not print the bucket name
    // Using cloudformation output we can get the bucketname.
    
    new cdk.CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    })
    // L3 Construct.
    new L3Bucket(this, 'MyL3bucket', 3)

  }
}
