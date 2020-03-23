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

console.log('Loading sample data from places.json');
const data = require('./places.json');
const putPointInputs = data.map(function (place) {
  return {
    RangeKeyValue: { S: uuid.v4() }, // Use this to ensure uniqueness of the hash/range pairs.
    GeoPoint: {
      latitude: place.latitude,
      longitude: place.longitude
    },
    PutItemInput: {
      Item: AWS.DynamoDB.Converter.marshall(place.data)
    }
  }
});

const BATCH_SIZE = 25;
const WAIT_BETWEEN_BATCHES_MS = 1000;
var currentBatch = 1;

function resumeWriting() {
  if (putPointInputs.length === 0) {
    return Promise.resolve();
  }
  const thisBatch = [];
  for (var i = 0, itemToAdd = null; i < BATCH_SIZE && (itemToAdd = putPointInputs.shift()); i++) {
    thisBatch.push(itemToAdd);
  }
  console.log('Writing batch ' + (currentBatch++) + '/' + Math.ceil(data.length / BATCH_SIZE));
  return placesManager.batchWritePoints(thisBatch).promise()
    .then(function () {
      return new Promise(function (resolve) {
        setInterval(resolve, WAIT_BETWEEN_BATCHES_MS);
      });
    })
    .then(function () {
      return resumeWriting()
    });
}

resumeWriting().catch(function (error) {
  console.warn(error);
}).then(console.log).then(function () {
  process.exit(0);
});