const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Auto-generated Swagger docs',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js']; // your entry point, swagger-autogen will scan

swaggerAutogen(outputFile, endpointsFiles, doc);
