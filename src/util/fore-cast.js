const request = require('request');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const foreCast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=91eaaad007d7fb4cd5b109126cd904f5&query=${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}&units=f`;
    request({ url, json: true }, (error, { body }) => {
        const weather_stack = {
            temprature: body.current ? body.current.temperature : null,
            perception: body.current ? body.current.weather_descriptions[0] : null,
            observationTime: body.current ? body.current.observation_time : null
        }
        callback(error, weather_stack)
    })
}

module.exports = foreCast;


