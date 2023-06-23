import * as cdk from 'aws-cdk-lib';
import { CfnOutput, CfnParameter, Duration } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { MAGIC_V2NEXT } from 'aws-cdk-lib/cx-api/lib/private/flag-modeling';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

/*
Note: Anything that happens in CDK happens inside the constructors
*/
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'MyL3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }]
    });

  }
}

export class CdkStaterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    

    // Create an s3 bucket 3 ways:

    //Using L1
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration:{
        rules:[{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    })

    const duration = new CfnParameter(this, 'duration', {
      default: 6, 
      minValue:1,
      maxValue:10,
      type: 'Number'
    })

    //Using L2
    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules:[{
        expiration: Duration.days(duration.valueAsNumber)}]
    });
    console.log('This is my bucket name: ' + myL2Bucket)

    new CfnOutput(this, 'MyL2NucketName', {
      value: myL2Bucket.bucketName
    })

    // Using L3
    new L3Bucket(this, 'MyL3Bucket', 3)
  }
}
