import * as cdk from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { AdminGroup } from '../constructs/AdminGroup';
import { AdminUser } from '../constructs/AdminUser';
import { Dns } from '../constructs/Dns';
require('dotenv').config();

export class AwsmasterWithCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const adminGroup = new AdminGroup(this, 'AdminGroup');
        const adminUsers = [
            new AdminUser(this, 'AdminUser1', { userName: 'admin1' }),
            new AdminUser(this, 'AdminUser2', { userName: 'admin2' }),
            new AdminUser(this, 'AdminUser3', { userName: 'admin3' }),
        ];
        for (const user of adminUsers) {
            adminGroup.group.addUser(user.user);
        }

        new Dns(this, 'DomainSetting', {
            // 本来は環境変数の値を読ませる
            systemName: 'awsmaster',
            domainName: 'awsmaster.jp',
            environment: 'prod',
        });
    }
}
