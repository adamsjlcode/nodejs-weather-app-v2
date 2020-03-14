const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API + '/' + encodeURIComponent(latitude) + ',' +encodeURIComponent(longitude);
    request({url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather services', undefined);
        }else if (body.error) {
            callback('Unable to find location', undefined);
        }else {
            callback(undefined, {
                today: body.daily.data[0],
                day2: body.daily.data[1],
                day3: body.daily.data[2],
                day4: body.daily.data[3],
                day5: body.daily.data[4],
                day6: body.daily.data[5],
                day7: body.daily.data[6],
                icon: body.currently.icon,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureLow: body.daily.data[0].temperatureLow,
                precipProbability: body.currently.precipProbability * 100,
                temperature: body.currently.temperature,
                dewPoint: body.currently.dewPoint,
                humidity: body.currently.humidity * 100,
                pressure: body.currently.pressure,
                windSpeed: body.currently.windSpeed,
                windGust: body.currently.windGust,
                uvIndex: body.currently.uvIndex,
            })
        }
    })
};
module.exports = forecast;