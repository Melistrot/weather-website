const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/22e0ac691a1f8123ea40726583578d40/' + latitude + ','+ longtitude + '?units=si&lang=ru';

    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Невозможно подключиться к сервису погоды!', undefined);
        } else if (response.body.error) {
            callback('Невозможно найти место.', undefined);
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' Сегодня ' + response.body.currently.temperature + ' градусов. Вероятность дождя ' + response.body.currently.precipProbability + '%.');
        }
    });
}

module.exports = forecast;