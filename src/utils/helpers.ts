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
