# How to create a simple app using CDK 

* `cd cdk-starter`
* cdk init
* cdk init --language=typescript (For simple project)

# Folder structures inside the project 

* lib folder - This folder will contains the actual cloudformation
* bin folder - Contains the code to initialize the application stacks
* The dependencies are stored in package.json file. 
  * There are primary two types of dependencies 
    * devdependencies
    * dependencies
      * aws-cdk-lib - Construct lib
      * constructs 
      * These will generate types.


# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.
 * "app": "npx ts-node --prefer-ts-exts bin/cdk-starter-new.ts" - This node execute.
 * This is the entry point into our project. This is what is called when we call different cdk command 
 * inside our project, and makes it a CDK project.

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
* create launcher.ts file - This is like the bin folder for the app
* create empty stack 
* create cdk.json file
  
```
cd space-finder-new
npm init -y 
npm i -D aws-cdk aws-cdk lib constructs
npm i -D typescript ts-node
npm i -D @types/node
```

## CDK aspects: Check or modify resources after they were created 
* Visitor pattern 
* simple usecase: add tags 
* popular usecase: enforce security or best practice (like a code linter)%
* Use case will be tagging for existing resources.

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
-  They are the basic building blocks for a CDK application.

#### Low level constructs - L1
 - cfn (cloud formation) resources. When used, we must configure all properties.
 - No pre configured options, requires all options to be build from scratch. ()

#### AWS resources with a higher-level - L2
- CDK provides additional functionality like defaults, boiler plate and type safety for many parameters.
- One level of abstractions above the low level.
  
#### Patterns - L3
- Combine multiple types of resources and help with common tasks in AWS. 
- Example LambdaRestAPI - Which is combination of lambda and api gateway combined together.

#### When to use which CDK construct?
- L1 - Most AWS resources are migrated to L2. Use of new services that are still not migrated.
- L2 - Most of the time
- L3 - Matter of preference of company policy. What degree of abstraction do I want?

#### What is the difference between cloudformation vs CDK?

- In cloudformation:
  - All the resources are organized into stacks, and these stack are formed use L1 resources/constructs.
   
- In CDK:
  -  CDK has a layer application just as an internal tool i.e. CDK app, it requries this application, 
  -  but let's talk about these constructs for AWS. 
  - Where as the stack formed from the CDK app can contain a combination of L1, L2 and L3 constructs. 
    - But in the end the CDK generates i.e. cdk sync L1 constructs.
  
#### CDK Commands:

cdk init app --language typescript - We need to provide the app for which we need to initialize the project.
cdk bootstrap -  This is create a starter environment for all our applications.
cdk synth - Only generates a cloudformation template for each stack.
cdk deploy - Used to deploy the stack. If we have only one stack we can just call the cdk deploy.
cdk list - list the number of stacks - This is done locally.
cdk diff - Gives the delta between what we have locally and what is there remotely.

- By default the CDK resources that are created, example s3 bucket has a default removal policy.
- Due to which the s3 bucket will be orpaned when the stack is deleted.
- Additionally the assets bucket has the IAM polices etc., if that is deleted, you will not be able to 
- delete the stack.

#### What happens when you change the logical ID or construct ID of a resource?
-  Cloudformation will create a new-resource
-  Delete the old one 

#### What are different type of IDs 
-  Construct ID, Logical ID, Physical ID when a stack is created 
   -  Logical ID is requried by cloudformaton to use this ID inside Cloudformation.
   -  The physical ID is required by AWS. "ARN" - This is how a resource is referenced outside the stack.

#### What happens when construct ID of resource is changed?
- The corresponding logical ID will also change of that resource.
  - If the logical ID of a resource changes, AWS will create and replace it.
  - This means 
    - AWS will create a new resources
    - AWS will delete the old once.

#### What is an intrinsic function ?
- Short definition: build-in function to help manager our stacks.

```
CDK code --[synth]--> cf template ---[deploy]---> AWS CF
```
At the Deployment step: 
 - stack is created. Available information:
  - stack name, stack id
  - deployment parameters, external parameters
- Resource1 is created. Ex: s3 bucket. Available info: bucket name, id
- Resource2 is created. Ex: s3 bucket. Available info: bucket name, id
...
...

 Deployment finished. 

The point is that CDK and cloudformation let us do this in the order we choose, if we choose one 
resource list to be created before another resource. This is important because maybe one resource 
needs information from another resouce. And here is where cloudformation instrinsic function come 
into place.

exmaple: Ref function, conditional function example: Fn:If
#### Handling multiple stacks 

#### Why would we ever need multiple stacks and not put all our resources into one stack?

- Some stacks may contain sensetivie info (IAM roles, secrets)
- Some stacks may take a lot of time for deployment or deletion 
  - Allows us to deploy incremental changes corresponding to individual stacks.
- Resources get big and the need organizaton.

#### How to organize stacks?

- There are no documented rules, not even best practices
  - Separate stacks for resources with state(databases, buckets)
  - Separate stacks for IAM roles, polices, secrets 
  - Separate stacks for resources with complex initialization (VPCs, DNS)
  
#### Challenge: Cross stack references

- CDK consider alphabetical order for deployment.
- If there is dependency between the stack, if the stacks are not deployed in sequence,
- the deployment will fail.

#### How to delete a stack that has reference from other stack non production environment?

- Delete the stack that don't have any references first 
- Once that is done, than delete the remaining stacks
- Using this approach you will not run into "rollback state"