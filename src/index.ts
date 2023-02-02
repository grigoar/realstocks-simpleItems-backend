import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import ISimpleItem from './models/ISimpleItem';
import { awsDynamoDBConnection } from './services/dbConnection';
import validateFields from './services/validate';
import { buildItemDBParams } from './services/itemsService';
import constants from './utils/constants';

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const requestPayload: ISimpleItem = JSON.parse(JSON.stringify(event));

  const message = validateFields({
    [constants.SIMPLE_STRING_FIELD]: requestPayload.content.trim(),
  });

  if (message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message }),
    };
  }

  const dbClient = awsDynamoDBConnection();

  const itemDBParams = buildItemDBParams(requestPayload);

  try {
    await dbClient.putItem(itemDBParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Item Added!' }),
    };
  } catch (err) {
    console.log('Error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something Went Wrong. Please try again!',
      }),
    };
  }
};
