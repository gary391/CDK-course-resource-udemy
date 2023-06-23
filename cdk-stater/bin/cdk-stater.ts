#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PhotosStack } from '../lib/photsStack';

const app = new cdk.App();
new PhotosStack(app, 'PhotosStack');