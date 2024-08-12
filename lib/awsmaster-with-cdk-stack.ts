import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import type { Construct } from 'constructs';
require('dotenv').config();

export class AwsmasterWithCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const iamGroup = new iam.Group(this, 'Administrators', {
            groupName: 'Administrators',
            managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
        });

        const iamUser = new iam.User(this, 'MyAdminUser', {
            userName: 'MyAdminUser',
            password: cdk.SecretValue.unsafePlainText(
                process.env.ADMIN_PASSWORD ?? 'default_password',
            ),
            passwordResetRequired: true,
        });

        iamGroup.addUser(iamUser);

        const iamRole = new iam.Role(this, 'MyRole', {
            roleName: 'S3AccessRole',
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
        });

        iamRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
    }
}
