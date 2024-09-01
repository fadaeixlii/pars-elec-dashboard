interface AnyParams {
  [key: string]: any
}

export default function getFilteredParams(params: AnyParams): AnyParams {
  const filteredParams: AnyParams = {}

  // Loop through each key in params
  for (const key in params) {
    // Check if the value is defined
    if (params[key] || params[key] === 0 || params[key] === false) {
      // Add the key-value pair to filteredParams
      filteredParams[key] = params[key]
    }
  }

  return filteredParams
}
