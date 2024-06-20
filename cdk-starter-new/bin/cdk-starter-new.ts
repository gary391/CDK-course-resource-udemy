#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterNewStack } from '../lib/cdk-starter-new-stack';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';
import { BucketTagger } from './Tagger';


// We need this simple CDK application that is required to run our application.
const app = new cdk.App();
// This is the initialization of the stack.
// Stack defined in the lib folder.
new CdkStarterNewStack(app, 'CdkStarterNewStack');
const photoStack = new PhotosStack(app, 'PhotosStack');
// new PhotosHandlerStack(app, 'PhotosHandlerStack'); // Before extending the props interface
// After extending the prop interface we need provide an object with this target bucket arn.
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photoStack.photosBucketArn// targetBucketArn, we get from the PhotosStack via export
});

const tagger = new BucketTagger('level', 'test');
// Now apply this tagger to our whole application 
cdk.Aspects.of(app).add(tagger);