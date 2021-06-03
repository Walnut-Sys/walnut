import crypto from 'crypto';

/**
 * If passed value is supported returns this value in standardized format.
 * Otherwise returns default value
 * @param value
 * @param {any[]} supportedValues
 * @param {any} defaultValue
 * @return {any}
 */
export const standardizeValue = (value: any, supportedValues: any[], defaultValue: any) => {
  const supportedValue = supportedValues.find((supportedValue) => {
    if (typeof value === 'string') {
      return supportedValue.toLowerCase() === value.toLowerCase();
    } else {
      return supportedValue === value;
    }
  });
  return supportedValue ?? defaultValue;
};

/**
 * Returns checksum of passed data using passed algorithm and encoding
 * @param  {any} data
 * @param  {} {algorithm='md5'
 * @param  {} inputEncoding='utf-8'ascrypto.Encoding
 * @param  {} outputEncoding='hex'ascrypto.BinaryToTextEncoding}={}
 */
export const generateCheckSum = (
  data: any,
  {
    algorithm = 'md5',
    inputEncoding = 'utf-8' as crypto.Encoding,
    outputEncoding = 'hex' as crypto.BinaryToTextEncoding
  } = {}
): string => {
  return crypto.createHash(algorithm).update(data, inputEncoding).digest(outputEncoding);
};
