import { v4 as uuidv4 } from 'uuid';
import ISimpleItem from '../models/ISimpleItem';

export const buildItemDBParams = (item: ISimpleItem) => {
  const itemID = uuidv4();

  const params = {
    TableName: 'simpleItems',
    Item: {
      itemID: { S: itemID },
      content: { S: item.content },
    },
  };

  return params;
};
