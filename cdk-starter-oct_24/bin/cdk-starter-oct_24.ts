#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterOct24Stack } from '../lib/cdk-starter-oct_24-stack';

const app = new cdk.App(); // CDK app which is required to run our stacks 
// All the stack belong to an application. This is initialization of a new stack.
// This is how we can have multiple stacks.
new CdkStarterOct24Stack(app, 'CdkStarterOct24Stack');