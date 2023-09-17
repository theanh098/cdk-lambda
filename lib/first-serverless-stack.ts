import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RustFunction, Settings } from 'rust.aws-cdk-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class FirstServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'FirstServerlessQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    Settings.WORKSPACE_DIR = 'rust-lambdas';

    new RustFunction(this, 'HelloKitty', {
      package: 'hello-kitty',
      setupLogging: true,
      target: 'x86_64-unknown-linux-gnu'
    });

    new RustFunction(this, 'HelloWorld', {
      package: 'hello-world',
      setupLogging: true,
      target: 'x86_64-unknown-linux-gnu'
    });

    const handler = new lambda.Function(this, 'ThoAnh', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('dist/lambdas/thoanh'),
      handler: 'index.handler'
    });

    // const api = new apigateway.RestApi(this, 'ThoAnhApi', {
    //   restApiName: 'thoanh service',
    //   description: 'thoanh <3'
    // });

    // api.root.addMethod(
    //   'POST',
    //   new apigateway.LambdaIntegration(handler, {
    //     requestTemplates: { 'application/json': '{ "statusCode": "200" }' }
    //   })
    // );
  }
}
