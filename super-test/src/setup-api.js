const fs = require('fs');
const express = require('express');

const mappingDir = '../rest-assured/src/test/resources/mappings';

const setupApi = () => {
  const app = express();

  fs.readdirSync(mappingDir)
    .map((filename) => fs.readFileSync(`${mappingDir}/${filename}`, 'UTF-8'))
    .map((json) => JSON.parse(json))
    .forEach((mapping) => {
      const method = mapping.request.method.toLowerCase();
      const path = mapping.request.url;
      const contentType = mapping.response.headers['Content-Type'];
      const status = mapping.response.status;
      const jsonBody = mapping.response.jsonBody;

      app[method](path, (request, response) =>
        response.type(contentType).status(status).json(jsonBody)
      );
    });

  return app;
};

module.exports = setupApi;
