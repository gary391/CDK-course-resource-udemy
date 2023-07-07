# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Initialize CDK Project from Sratch 
* Create folder 
* npm init -y 
* install dependencies 
* create launcher.ts file 
* create empty stack 
* create cdk.json file

## CDK aspects: Check or modify resources after they were created 
* Visitor pattern 
* simple usecase: add tags 
* popular usecase: enforce security or best practice (like a code linter)%

## Dependency Management: [Problem]
* Runnable application code is made up of two set of code i.e APP Code and Dependencies code:

  * app code
  * Dependencies (Node Modules)
    * other
    * AWS SDK

Q: How can we make sure that when we are deploying our code we are not deploying our dependencies and not developer dependencies i.e. dependencies via AWS SDK

## Typescript complilation and bundling

* Runnable Application
  * TS APP CODE --> JS
  * DEPENDENCIES --> USED
  * DEPENDENCIES --> NOT USED

Example if we have a library that has a lot of feature, and out of those features we only use a few. It doesn't make sense to deploy the complete library if we only use a part of it - Like a function or two from a big library. This is called tree shaking.

The problem related to dependency management and bundling can be resolved using NodeJsFunction CDK Construct.

1. Bundles all code with three shaking
2. Complies TS to JS
3. Leaves out AWS-SDK dependencies
4. Completely editable
5. Library: esbuild --> Takes your code and creates a unity bundle.
    1. Past solution: webpack - slow and hard to configure.

```
For getting the type dependencies for lambda 

npm i -D @types/aws-lambda
```

### Test a little changes:
 
 - Deploy 
 - invoke
 - read cloudwatch logs

---

