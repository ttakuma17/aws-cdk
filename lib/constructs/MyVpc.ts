import type * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface VpcProps {
    systemName?: string;
    environment?: string;
    createSubnetProtected?: boolean;
    cidrBits?: string;
}

export class MyVpc extends Construct {
    public readonly vpc: ec2.Vpc;
    public readonly internetGateway: ec2.CfnInternetGateway;
    public readonly routeTablePublic: ec2.CfnRouteTable;
    public readonly subnetPublicA: ec2.Subnet;
    public readonly subnetPublicC: ec2.Subnet;
    public readonly subnetPublicD: ec2.Subnet;
    public readonly eipnatGatewayA?: ec2.CfnEIP;
    public readonly natGatewayA?: ec2.CfnNatGateway;
    public readonly routeTableProtectedA?: ec2.CfnRouteTable;
    public readonly routeTableProtectedC?: ec2.CfnRouteTable;
    public readonly routeTableProtectedD?: ec2.CfnRouteTable;
    public readonly subnetProtectedA?: ec2.Subnet;
    public readonly subnetProtectedC?: ec2.Subnet;
    public readonly subnetProtectedD?: ec2.Subnet;
    public readonly routeTablePrivate: ec2.CfnRouteTable;
    public readonly subnetPrivateA: ec2.Subnet;
    public readonly subnetPrivateC: ec2.Subnet;
    public readonly subnetPrivateD: ec2.Subnet;
    public readonly vpcEndpointGatewayDynamoDb: ec2.VpcEndpoint;
    public readonly vpcEndpointGatewayS3: ec2.VpcEndpoint;

    public constructor(scope: Construct, id: string, props: VpcProps) {
        super(scope, id);
        // さすがにフィールド多すぎなので、コンストラクトを4つにわけて見通しを良くしてあげる
        // VPC
        // PublicSubnet
        // ProtectedSubnet
        // PrivateSubnet
    }
}
