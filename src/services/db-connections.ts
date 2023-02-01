import * as AWS from 'aws-sdk';

// const awsRemoteConfig = {
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// };

const awsDynamoDBConnection = () => {
  AWS.config.update({ region: process.env.AWS_REGION });
  const dbClient = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  return dbClient;
};

export { awsDynamoDBConnection };
