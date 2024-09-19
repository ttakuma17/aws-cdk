import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class AdminGroup extends Construct {
    public readonly group: iam.Group;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.group = new iam.Group(this, 'AdministratorsGroup', {
            groupName: 'AdministratorsCdk',
            managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
        });
    }
}
