Number.prototype.fixToDecimal = function (decimalPlaces: number): string {
  // const factor = Math.pow(10, decimalPlaces)
  // return String(Math.floor(this * factor) / factor)
  return this.toFixed(decimalPlaces);
};

export function replacePlaceholdersInString(
  template: string,
  data: any
): string {
  return template.replace(/{([^{}]*)}/g, (match, key) => {
    const value = data[key.trim()];
    return value !== undefined ? value : match;
  });
}

export function generateRandomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getChangesInForm(initialValues: object, values: object) {
  const changes: object = {};
  for (const key in initialValues) {
    if (initialValues[key] !== values[key]) {
      changes[key] = values[key];
    }
  }

  return changes;
}
