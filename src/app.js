const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('../src/util/fore-cast')
const geoCode = require('../src/util/geo-code')
const app = express()
port = process.env.PORT || 3000;
// yield
//declare the path for express config
const publicDirectorPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup HandleBars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectorPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Express",
        header: "Express Start",
        footer: "Copy right of harshal sood"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        header: "About",
        footer: "Copy right of harshal sood"
    });
})
// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: "its raining",
//         location: "manali"
//     })
// })

app.get('/help', (req, res) => {
    res.render('help', {
        title1: "help",
        header: "Help",
        title2: "About",
        footer: "Copy right of harshal sood",
        title3: "weather",
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }
    if (req.query.address) {
        geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            if (!(latitude && longitude && location)) {
                return res.send({
                    error: 'unable to find the address'
                })
            }
            forecast(latitude, longitude, (error, { temprature, perception, observationTime }) => {
                if (error) {
                    if (error) {
                        return res.send({
                            error
                        })
                    }
                }
                if (!(temprature && perception && observationTime)) {
                    return res.send({
                        location: 'location not found'
                    })
                }
                return res.send({
                    forecast: perception,
                    location,
                    temprature,
                    observationTime
                })
            })
        })
    }
    // res.render('weather', {
    //     title: "Weather", header: "Weather",
    //     footer: "Copy right of harshal sood",
    // });
})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide an search"
        })
    }
    res.send({
        product: []
    })
})



app.get('/weather/*', (req, res) => {
    res.render('error', {
        header: "Error",
        footer: "Copy right of harshal sood",
        error: "weather artcile  not found"
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        header: "Error",
        footer: "Copy right of harshal sood",
        error: "Page not found"
    })
})
app.listen(port, () => {
    console.log('server starting on ' + port);
})