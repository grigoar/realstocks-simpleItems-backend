import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { awsDynamoDBConnection } from './services/db-connections';

interface ISimpleItem {
  content: string;
}

// exports.handler = async (event) => {
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  console.log('++++++++Event---------------');
  console.log(event);
  console.log('++++++++Context---------------');
  console.log(context);
  const requestPayload: ISimpleItem = JSON.parse(JSON.stringify(event));
  console.log('++++++++ITEM---------------');
  console.log(requestPayload);
  console.log(requestPayload.content);

  const dbClient = awsDynamoDBConnection();
  const itemID = uuidv4();
  console.log('----------------Item ID--------------');
  console.log(itemID);
  const params = {
    TableName: 'simpleItems',
    Item: {
      itemID: { S: itemID },
      content: { S: requestPayload.content },
    },
  };
  try {
    const data = await dbClient.putItem(params).promise();

    console.log('-------------------------++++++++++++++++++++');
    console.log('Success', data);
    const response = {
      statusCode: 201,
      headers: headers,
      body: JSON.stringify('Item Added!'),
    };
    return response;
  } catch (err) {
    console.log('Error', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request' }),
      headers,
    };
  }
};
