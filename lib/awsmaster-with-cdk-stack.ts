import * as cdk from 'aws-cdk-lib'
import * as sqs from 'aws-cdk-lib/aws-sqs'
import type { Construct } from 'constructs'

export class AwsmasterWithCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here

    // example resource
    const _queue = new sqs.Queue(this, 'AwsmasterWithCdkQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    })
  }
}
