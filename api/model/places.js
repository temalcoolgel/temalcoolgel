const ddbGeo = require('dynamodb-geo');
let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

// Use a local DB for the example.
// const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
const ddb = new AWS.DynamoDB();

// let db = new AWS.DynamoDB({endpoint: 'http://localhost:8000',    apiVersion: '2012-08-10'});
let db = new AWS.DynamoDB();
// Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
let config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'places');

// Instantiate the table manager
let placesManager = new ddbGeo.GeoDataManager(config);

export const getNearestPlaces = (radius, lat, long) => {
    return new Promise((res, rej) => {

        console.log(lat)
        console.log(long)
        placesManager.queryRadius({
            RadiusInMeter: radius,
            CenterPoint: {
                latitude: parseFloat(lat),
                longitude: parseFloat(long)
            }
        }).then((locations) => {
            const newLocations = locations.map(
                (record) => {
                    let res = AWS.DynamoDB.Converter.unmarshall(record)
                    console.log(res)
                    return {
                        name: res.name,
                        geoJson: JSON.parse(res.geoJson),
                        votes: res.votes,
                    }
                }
          );
            console.log(newLocations);
            res(newLocations);
        }
        ).catch(reason => rej(reason));
    });
}
