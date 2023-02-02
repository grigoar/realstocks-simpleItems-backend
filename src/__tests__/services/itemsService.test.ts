import { v4 as uuidv4 } from 'uuid';
import ISimpleItem from '../../models/ISimpleItem';
import { buildItemDBParams } from '../../services/itemsService';
import constants from '../../utils/constants';

describe('buildItemDBParams', () => {
  it('test if the if the buildItemDBParams returns a valid object for adding a item to DB', () => {
    expect.assertions(2);
    const item: ISimpleItem = { content: 'test item' };
    const result = buildItemDBParams(item);
    const expected = {
      TableName: constants.DATABASE_NAME,
      Item: {
        itemID: { S: uuidv4() },
        content: { S: 'test item' },
      },
    };

    expect(result.Item.content).toEqual(expected.Item.content);
    expect(result.Item.itemID).toBeDefined();
  });
});
