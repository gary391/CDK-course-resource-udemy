import { Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from "constructs";
import { getSuffixFromStack } from '../Utils';


export class DataStack extends Stack {

    // Property name spacesTable which is of Interface type ITable
    public readonly spacesTable: ITable

    // Constructor
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);


        // get the string from the physical id
        const suffix = getSuffixFromStack(this);


        // Dynamodb table 

        this.spacesTable = new Table(this, 'SpacesTable', {
            partitionKey: {
               name: 'id',
               type: AttributeType.STRING 
            }, 
            tableName: `SpaceTable-${suffix}`
        })
    }
}