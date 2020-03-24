const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');
const uuid = require('uuid');

// Set up AWS
AWS.config.update({
    region: "us-east-1"
});

// Use a local DB for the example.
// const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
const ddb = new AWS.DynamoDB();

// Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'places');

// Instantiate the table manager
const placesManager = new ddbGeo.GeoDataManager(config);

// Use GeoTableUtil to help construct a CreateTableInput.
const createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(config);

// Tweak the schema as desired
createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;

console.log('Creating table with schema:');
console.dir(createTableInput, { depth: null });

// Create the table
ddb.createTable(createTableInput).promise()
    // Wait for it to become ready
    .then(function () { return ddb.waitFor('tableExists', { TableName: config.tableName }).promise() })
    .then(console.log)
    .catch(console.warn)
    .then(() => process.exit(0));