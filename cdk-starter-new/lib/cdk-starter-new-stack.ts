import * as cdk from 'aws-cdk-lib';
import { CfnParameter, Duration } from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// Creating an L3 construct by extending the construct class
class L3CBucket extends Construct{
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    // Create an S3 bucket using L3 construct
    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
        }]
    });
  }
}

export class CdkStarterNewStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket using 3 ways:

    // Using L1 resources
    // When we delete the stack, the bucket will be deleted as well. 
    // As this is created using L1 construct, beacuse if doesn't have cdk removalpolicy 
    new CfnBucket(this, "MyL1Bucket", {
      lifecycleConfiguration:{
        rules:[{
          expirationInDays:1,
          status: "Enabled"
        }]
    }
  });
    // We are inside the constructor because everything that happens inside CDK
    // usually is put inside constructors.

    // We need to pass in some arguments, i.e. scope, id, props
    // Here the scope is where does this bucket belong to stack i.e CdkStarterNewStack.
    // We need to pass a reference inside the constructor so I can a reference which can 
    // 'this' in our case, we are saying that the bucket belong to the existing stack. 
    // Also pass in properties related to the bucket. 

  const duration = new CfnParameter(this, 'duration', {
    default: 6,
    minValue: 1,
    maxValue: 10,
    type: "Number"
  })
  const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
    lifecycleRules: [{
      expiration: Duration.days(duration.valueAsNumber)
    }]
  });
  // console.log(`bucket name: ${myL2Bucket.bucketName}`)
  new CfnOutput(this, "MyL2BucketName", {
    value: myL2Bucket.bucketName
  })


  // Call the L3Bucket construct inside the stack
    new L3CBucket(this, 'MyL3Bucket', 3);

  }
}
