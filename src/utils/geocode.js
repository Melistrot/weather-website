const request = require('request');

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress +'.json?access_token=pk.eyJ1IjoiaXJvZ2xpZmlrIiwiYSI6ImNqeDJ6cWszNjBhYnE0NG8zaHZ0ZXN2cXMifQ.RbVdNjvpfRRl-Qq3dsMQog';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Невозможно подключиться к сервису!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Невозможно найти место.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}   

module.exports = geocode;