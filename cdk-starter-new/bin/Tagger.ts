import { IAspect} from "aws-cdk-lib";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";

export class BucketTagger implements IAspect {

    // This bucket has a key and value
    private key:string;
    private value:string;

    constructor(key: string, value:string){
        this.key = key;
        this.value = value;
    }
    // Add a method called "visit" as we are implementing Interface IAspect
    visit(node: IConstruct): void {
        // Here we are iterating over all the resouces 
        console.log("Visiting: " + node.node.id);
        // If the notde is an instance of a bucket then add tags
        if (node instanceof CfnBucket) {
            node.tags.setTag(this.key, this.value);

        }
        
        
    }
}