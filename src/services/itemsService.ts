import { v4 as uuidv4 } from 'uuid';
import ISimpleItem from '../models/ISimpleItem';
import constants from '../utils/constants';

export const buildItemDBParams = (item: ISimpleItem) => {
  const itemID = uuidv4();

  const params = {
    TableName: constants.DATABASE_NAME,
    Item: {
      itemID: { S: itemID },
      content: { S: item.content },
    },
  };

  return params;
};
