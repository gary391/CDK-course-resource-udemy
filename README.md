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
### AWS Lambda Architecture

1. One approach will be to create multiple lambdas each corresponding to a specific method for each resource.
2. Second approach will be group all our lambda togather per resources, which will handle all methods. 
3. Monolithic Lambda - A single lambda for all the resources example: /spaces and /reservations able to handle all the methods - NOT RECOMMENDED
4. A good approach will be
   1. Apigateway handles routing 
   2. Lambda handles HTTP method


### Dynamodb Section

1. Dynamodb db - NoSQL DB
2. Ideal for Documents and key-value models
3. Handle Simple Queries 
4. Cheap, fast, scalable and limited indexing
5. Handles simple Queries

- Section deals with putting all queries inside a lamdba and api gateway.
- Web Application can be handled via the internet 

### Problems when querying ddb 
- `cannot read properties of undefined`  - We get this if don't define the type correctly when defining the values in the ddb
- Solutions:
  - marshall & unmarshalling from @aws-cdk/util-dynamodb
  - DynamoDBDocumentClient from @aws-sdk/lib-dynamodb
  
### General concepts:

cdk code ---[synth]---> CF template ----[deploy]---->AWS CF
where synth and deploy are two commands

1. bin folder will have the initializtion code.
2. lib folder will have the actual cloudformation template i.e. the code that will translate to cloudformation.
3. package.json will have the dependencies that cdk will install.
   1. The dependencies will be of two types i.e Dev dependencies and dependencies.
      1. using the ts-node dependencies we don't have to build and could directly run the typescript code.
      2. What makes this project a cdk project is the dependencies i.e the aws-cdk dependencies, and the two construct lib i.e. constructs, and aws-cdk-lib.
      3. Additionally it also has a cdk.json file which configures the cdk inside this project.
         1. app command "npx ts-node --prefer-ts-exts bin/cdk-starter-new.ts" will be called when we call different cdk commands. 
            1. npx is node execute, which will execute the ts-node library which allows direct execution of the typescript. 
               1. then we have a path to our bin folder with cdk starter file, this is the entry point into our project. This is what is being called when we execute different cdk commands. Inside this project.

### AWS Constructs

#### Low level constructs
 - cfn (cloud formation) resources. When used, we must configure all properties.
 - No pre configured options, requires all options to be build from scratch. ()

#### AWS resources with a higher-level 
- CDK provides additional functionality like defaults, boiler plate and type safety for many parameters.
- One level of abstractions above the low level.
  
#### Patterns:
- Combine multiple types of resources and help with common tasks in AWS. 
- Example LambdaRestAPI - Which is combination of lambda and api gateway combined together.

#### When to use which CDK construct?
- L1 - Most AWS resources are migrated to L2. Use of new services that are still not migrated.
- L2 - Most of the time
- L3 - Matter of preference of company policy. What degree of abstraction do I want?