
let AWS = require('aws-sdk');
let ddbGeo = require('dynamodb-geo');
AWS.config.update({region: 'us-east-1'});

// Use a local DB for the example.
// const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
let db = new AWS.DynamoDB();

// Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
let config = new ddbGeo.GeoDataManagerConfiguration(db, 'places');

// Instantiate the table manager
let placesManager = new ddbGeo.GeoDataManager(config);

export const getNearestPlaces = (radius, lat, long) => {
    return new Promise((res, rej) => {
        placesManager.queryRadius({
            RadiusInMeter: radius,
            CenterPoint: {
                latitude: parseFloat(lat),
                longitude: parseFloat(long)
            }
        }).then((locations) => {
            let newLocations = locations.map(
                (record) => {
                    let res = AWS.DynamoDB.Converter.unmarshall(record)
                    return {
                        name: res.name,
                        geoJson: JSON.parse(res.geoJson),
                        votes: res.votes,
                    }
                }
          );            
            res(newLocations);
        }
        ).catch(reason => rej(reason));
    });
}
