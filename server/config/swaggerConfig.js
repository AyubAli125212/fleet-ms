const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');
const path = require('path');

// load and parse YAML files
const loadSwaggerFile = (fileName) =>
  yaml.parse(fs.readFileSync(path.join(__dirname, `../docs/${fileName}`), 'utf8'));

// Load Swagger files
const swaggerFiles = ['common.swagger.yml', 'auth.swagger.yml', 'manager.swagger.yml', ];
const [commonSwagger, ...moduleSwaggers] = swaggerFiles.map(loadSwaggerFile);

// Merge Swagger files
const combinedSwagger = moduleSwaggers.reduce(
  (acc, curr) => ({
    ...acc,
    paths: { ...acc.paths, ...curr.paths },
    tags: [...(acc.tags || []), ...(curr.tags || [])],
  }),
  commonSwagger
);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(combinedSwagger),
};
