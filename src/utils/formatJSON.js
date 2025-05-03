/**
 * Formats JSON string with syntax highlighting HTML
 * @param {string} jsonString - The JSON string to format
 * @returns {string} HTML string with syntax highlighting
 */
export const formatJSON = (jsonString) => {
  // Replace the quotation marks around keys
  const formattedJSON = jsonString
  .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      // Identify the type of value
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
          // Remove the colon from the key
          match = match.replace(/:$/, '');
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      
      return `<span class="${cls}">${match}</span>`;
    })
    // Add missing colon after keys
    .replace(/<\/span><span class="string">|<\/span><span class="number">|<\/span><span class="boolean">|<\/span><span class="null">/g, '</span>: <span class="$1">')
    .replace(/<\/span>: <span class="(\w+)">/g, '</span>: <span class="$1">');
  
  return formattedJSON;
};

/**
 * Creates a formatted JSON HTML element from a JSON object or string
 * @param {object|string} json - The JSON object or string to format
 * @returns {string} HTML string with the formatted JSON
 */
export const createJSONBlock = (json) => {
  let jsonString;
  
  if (typeof json === 'string') {
    // Try to parse if it's a string to ensure it's valid JSON
    try {
      const parsed = JSON.parse(json);
      jsonString = JSON.stringify(parsed, null, 2);
    } catch (e) {
      // If it's not valid JSON, use as is
      jsonString = json;
    }
  } else {
    // If it's already an object, stringify it
    jsonString = JSON.stringify(json, null, 2);
  }
  
  return `<div class="mono-code-json">${formatJSON(jsonString)}</div>`;
};

export default createJSONBlock; 