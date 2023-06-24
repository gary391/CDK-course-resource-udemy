#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PhotosStack } from '../lib/photsStack';
import { PhotosHandlerStack } from '../lib/photosHandlerStack';

const app = new cdk.App();
const photosStack = new PhotosStack(app, 'PhotosStack');

// Now we also need to provide an object with this target Bucket ARN
// Which we will get from the photosStack, which we can do using export
// inside the photosstack where it is being created. 
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photosStack.photosBucketArn
})