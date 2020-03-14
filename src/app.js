require('dotenv').config()
const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and templates location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
app.set('partials', partialsDir);
hbs.registerPartials(partialsDir);

//Setup static directory to serve
app.use(express.static(publicDir));
//Setup api-docs to serve
app.use('/help', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Justin Adams'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Website',
        name: 'Justin Adams'
    })
});

app.get('/api', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address,  (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                latitude: latitude,
                longitude: longitude,
                location: location,
                forecastData: forecastData
        });
        });
    });
});

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Error',
        name: 'Justin Adams',
        errorMessage: 'Help article you were looking for was not found'
    })
});;

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Error',
        name: 'Justin Adams',
        errorMessage: 'Page Not Found'
    })
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});