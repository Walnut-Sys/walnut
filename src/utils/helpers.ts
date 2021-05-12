import { Readable } from 'stream';

/**
 * If passed value is supported returns this value in standardized format.
 * Otherwise returns default value
 * @param value
 * @param {any[]} supportedValues
 * @param {any} defaultValue
 * @return {any}
 */
export const standardizeValue = (value: any, supportedValues: any[], defaultValue: any) => {
  const supportedValue = supportedValues.find(supportedValue => {
    if (typeof value === 'string') {
      return supportedValue.toLowerCase() === value.toLowerCase();
    }
    else {
      return supportedValue === value;
    }
  });
  return supportedValue ?? defaultValue;
};

/**
 * Converts readable stream into string
 * @param {Readable} stream
 * @return {Promise<string>}
 */
export const streamToString = async (stream: Readable): Promise<string> => {
  let result = '';
  for await (const chunk of stream) {
    result += chunk;
  }
  return result;
};
