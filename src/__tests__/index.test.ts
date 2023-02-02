import { handler } from '..';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as validateFields from '../services/validate';

describe('Handler function', () => {
  it('should return a 400 Bad Request response if item name is invalid', async () => {
    jest
      .spyOn(validateFields, 'validateFields')
      .mockReturnValue('The item name is not valid');
    const event: APIGatewayProxyEvent = {
      content: '{',
    } as any;
    const result = await handler(event);

    expect(result.statusCode).toEqual(400);
    expect(JSON.parse(result.body).message).toBeDefined();
  });

  it('should return a 500 error response if there is a problem when adding a new item', async () => {
    jest.spyOn(validateFields, 'validateFields').mockReturnValue('');
    const event: APIGatewayProxyEvent = {
      content: 'valid item',
    } as any;
    const result = await handler(event);

    expect(result.statusCode).toEqual(500);
    expect(JSON.parse(result.body).message).toEqual(
      'Something Went Wrong. Please try again!'
    );
  });
});
