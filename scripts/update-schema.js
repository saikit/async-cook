import fs from 'fs/promises';

const API_URL = 'http://localhost:8000/api/recipes/tomato-garlic-pasta';
const SCHEMA_PATH = 'data/schema.json';

/**
 * Simple function to generate a JSON schema from a JSON object
 * This is a basic implementation - for complex schemas, consider using a library
 */
function generateSchema(obj, title = 'Recipe') {
  function getType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  function processObject(obj) {
    const schema = {
      type: 'object',
      properties: {}
    };

    for (const [key, value] of Object.entries(obj)) {
      const type = getType(value);
      const isOptional = value === null || value === undefined;

      if (type === 'array') {
        schema.properties[key] = {
          type: 'array',
          items: value.length > 0 ? processValue(value[0]) : { type: 'string' }
        };
      } else if (type === 'object') {
        schema.properties[key] = processObject(value);
      } else {
        schema.properties[key] = { type };
      }

      if (isOptional) {
        schema.properties[key].description = `${type} (optional)`;
      } else {
        schema.properties[key].description = type;
      }
    }

    return schema;
  }

  function processValue(value) {
    const type = getType(value);
    if (type === 'array') {
      return {
        type: 'array',
        items: value.length > 0 ? processValue(value[0]) : { type: 'string' }
      };
    } else if (type === 'object') {
      return processObject(value);
    } else {
      return { type };
    }
  }

  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title,
    ...processObject(obj)
  };
}

async function updateSchema() {
  try {
    console.log('Fetching recipe data from API...');
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data fetched successfully');

    // Generate schema from the data
    const schema = generateSchema(data, 'Recipe Schema');
    console.log('Schema generated');

    // Write to file
    const schemaJson = JSON.stringify(schema, null, 2);
    await fs.writeFile(SCHEMA_PATH, schemaJson, 'utf8');
    console.log(`Schema updated and written to ${SCHEMA_PATH}`);

  } catch (error) {
    console.error('Error updating schema:', error.message);
    process.exit(1);
  }
}

updateSchema();