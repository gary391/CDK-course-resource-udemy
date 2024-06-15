#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterNewStack } from '../lib/cdk-starter-new-stack';


// We need this simple CDK application that is required to run our application.
const app = new cdk.App();
// This is the initialization of the stack.
// Stack defined in the lib folder.
new CdkStarterNewStack(app, 'CdkStarterNewStack');

