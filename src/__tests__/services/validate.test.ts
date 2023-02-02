import { validateFields } from '../../services/validate';
import constants from '../../utils/constants';

describe('validateFields', () => {
  it('check if the field is valid', () => {
    expect.assertions(1);
    const receivedFields = { [constants.SIMPLE_STRING_FIELD]: 'valid string' };
    const result = validateFields(receivedFields);
    expect(result).toBeUndefined();
  });

  it('returns an error if the item content contains HTML code', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]: '<script>alert("invalid")</script>',
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.ITEM_CONTENT_USER_DISPLAY} is dangerous! Marked as HTML.`
    );
  });
  it('returns an error if the item content contains programming code', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]: 'if(a>b) return;',
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.ITEM_CONTENT_USER_DISPLAY} is dangerous! Marked as programming language`
    );
  });
  it('returns an error if the item content contains programming code', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]: 'if(a>b) return;',
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.ITEM_CONTENT_USER_DISPLAY} is dangerous! Marked as programming language`
    );
  });
  it('returns an error if the item content contains URL', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]:
        'https://www.google.com/ this items contains an URL',
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.ITEM_CONTENT_USER_DISPLAY} is dangerous! Marked as URL.`
    );
  });
  it('returns an error if the item content is null or undefined', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]: null,
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.SIMPLE_STRING_FIELD} is missing!`
    );
  });
  it('returns an error if the item content fails multiple tests', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]: 'r{',
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.ITEM_CONTENT_USER_DISPLAY} is too short! - 2 ch*The ${constants.ITEM_CONTENT_USER_DISPLAY} is dangerous! Marked as programming language.`
    );
  });
  it('returns an error if the item content is too short', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]: 'nn',
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.ITEM_CONTENT_USER_DISPLAY} is too short! - 2 ch`
    );
  });
  it('returns an error if the item content is too long', () => {
    expect.assertions(2);
    const receivedFields = {
      [constants.SIMPLE_STRING_FIELD]:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopq',
    };
    const result = validateFields(receivedFields);
    expect(typeof result).toBe('string');
    expect(result).toContain(
      `The ${constants.ITEM_CONTENT_USER_DISPLAY} is too long! - 141 ch`
    );
  });
});
