#!/usr/bin/env node
/**
 * Validate all JSON Schema files under docs/contracts/schemas/
 * Usage: npm run validate-schemas (from docs/contracts/)
 */
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const { globSync } = require('glob');

const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');
const FIXTURES_DIR = path.join(__dirname, '..', 'tests', 'fixtures');

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const schemaFiles = globSync('**/*.schema.json', { cwd: SCHEMAS_DIR });
let failed = 0;

console.log(`Validating ${schemaFiles.length} schema file(s)...\n`);

for (const rel of schemaFiles) {
  const full = path.join(SCHEMAS_DIR, rel);
  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(full, 'utf8'));
    ajv.compile(schema);
    console.log(`  OK  ${rel}`);
  } catch (err) {
    console.error(`  FAIL ${rel}: ${err.message}`);
    failed++;
    continue;
  }

  const fixturePath = path.join(FIXTURES_DIR, rel.replace('.schema.json', '.fixture.json'));
  if (fs.existsSync(fixturePath)) {
    const validate = ajv.getSchema(schema.$id) || ajv.compile(schema);
    const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
    const valid = validate(fixture);
    if (!valid) {
      console.error(`  FAIL fixture ${rel}:`, validate.errors);
      failed++;
    } else {
      console.log(`  OK  fixture ${rel.replace('.schema.json', '.fixture.json')}`);
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} validation error(s).`);
  process.exit(1);
}
console.log('\nAll schemas valid.');
