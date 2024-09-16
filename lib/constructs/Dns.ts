import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export interface DnsProps {
    systemName: string;
    domainName: string;
    environment: string;
}

export class Dns extends Construct {
    public readonly hostedZone: route53.HostedZone;
    public readonly hostedZoneDomainName: string;
    public readonly hostedZoneNameServer1?: string;
    public readonly hostedZoneNameServer2?: string;
    public readonly hostedZoneNameServer3?: string;
    public readonly hostedZoneNameServer4?: string;
    public readonly recordSetCaa?: route53.RecordSet | undefined;

    public constructor(scope: Construct, id: string, props: DnsProps) {
        super(scope, id);

        const isProd = props.environment === 'prod';

        this.hostedZone = new route53.HostedZone(this, 'Default1', {
            zoneName: isProd ? props.domainName : `${props.environment}.${props.domainName}`,
            comment: `${props.systemName}-${props.domainName}-hostedzone`,
        });
        this.hostedZoneDomainName = this.hostedZone.zoneName;
        this.hostedZoneNameServer1 = this.hostedZone.hostedZoneNameServers?.at(0);
        this.hostedZoneNameServer2 = this.hostedZone.hostedZoneNameServers?.at(1);
        this.hostedZoneNameServer3 = this.hostedZone.hostedZoneNameServers?.at(2);
        this.hostedZoneNameServer4 = this.hostedZone.hostedZoneNameServers?.at(3);
        this.recordSetCaa = isProd
            ? new route53.CaaRecord(this, 'Default2', {
                  zone: this.hostedZone,
                  recordName: props.domainName,
                  values: [
                      {
                          flag: 0,
                          tag: route53.CaaTag.ISSUE,
                          value: 'amazon.com',
                      },
                  ],
                  ttl: cdk.Duration.hours(1),
              })
            : undefined;

        // サブドメインもまとめて証明書をあてておく
        new acm.Certificate(this, 'Default3', {
            domainName: props.domainName,
            subjectAlternativeNames: [`*.${props.domainName}`],
            validation: acm.CertificateValidation.fromDns(this.hostedZone),
        });
    }
}
