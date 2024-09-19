import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface IamUserProps {
    userName: string;
}

export class AdminUser extends Construct {
    public readonly user: iam.User;

    constructor(scope: Construct, id: string, props: IamUserProps) {
        super(scope, id);

        this.user = new iam.User(this, 'AdminUser', {
            userName: props.userName,
            password: cdk.SecretValue.unsafePlainText(
                process.env.ADMIN_PASSWORD ?? 'default_password',
            ),
            passwordResetRequired: true,
        });
    }
}
