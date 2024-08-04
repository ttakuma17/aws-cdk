import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import type { Construct } from 'constructs'

export class AwsmasterWithCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        // IAMグループの作成
        const iamGroup = new iam.Group(this, 'Administrators', {
            groupName: 'Administrators',
            managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
        })

        const iamUser = new iam.User(this, 'MyAdminUser', {
            userName: 'MyAdminUser',
            password: cdk.SecretValue.unsafePlainText(
                process.env.ADMIN_PASSWORD ?? 'default_password',
            ),
            passwordResetRequired: true,
        })

        iamGroup.addUser(iamUser)
    }
}
