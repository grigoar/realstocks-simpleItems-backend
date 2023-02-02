import * as AWS from 'aws-sdk';
import { awsDynamoDBConnection } from '../../services/dbConnection';
import constants from '../../utils/constants';

describe('awsDynamoDBConnection', () => {
  beforeEach(() => {
    process.env.AWS_REGION = 'us-west-2';
  });

  afterEach(() => {
    delete process.env.AWS_REGION;
  });

  it('creates a new AWS DynamoDB client', () => {
    expect.assertions(3);
    const client = awsDynamoDBConnection();

    expect(AWS.config.region).toEqual('us-west-2');
    expect(client).toBeInstanceOf(AWS.DynamoDB);
    expect(client.config.apiVersion).toEqual(constants.AWS_API_VERSION);
  });
});
