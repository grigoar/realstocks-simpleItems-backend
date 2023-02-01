import * as AWS from 'aws-sdk';
import constants from '../utils/constants';

const awsDynamoDBConnection = () => {
  AWS.config.update({ region: process.env.AWS_REGION });
  const dbClient = new AWS.DynamoDB({ apiVersion: constants.AWS_API_VERSION });

  return dbClient;
};

export { awsDynamoDBConnection };
