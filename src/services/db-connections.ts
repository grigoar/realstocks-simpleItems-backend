import * as AWS from 'aws-sdk';

const awsDynamoDBConnection = () => {
  AWS.config.update({ region: process.env.AWS_REGION });
  const dbClient = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  return dbClient;
};

export { awsDynamoDBConnection };
