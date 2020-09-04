const request = require('request');

const geoCode = (address, callback) => {
    if (!address) {
        return console.log('please provide adress in args')
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic29vZGhhcnNoYWwiLCJhIjoiY2tlM3BkemdyMDFmZzJybGI2c3NrczN0cCJ9.jhA-LneVSqnYyUD76tjI7w&limit=1`
    request({ url, json: true }, (error, { body } = {}) => {
        const map_box = {
            latitude: body && body.features.length ? body.features[0].center[0] : null,
            location: body && body.features.length? body.features[0].place_name : null,
            longitude: body && body.features.length ? body.features[0].center[1] : null
        }
        console.log(map_box)
        callback(error, map_box)
    })
}

module.exports = geoCode;


