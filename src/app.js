const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Добовляем путь 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Устанавливаем путь для hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Устанавливаем статическую директорию
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Paul Koul'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Paul Koul'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Ring me to help',
        title: 'Help', 
        name: 'Paul'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            } 
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    } 

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMessege: 'Страница помощи не найдена.'
    });
});

app.get('*', (req, res) => {
    res.render('404page', {
        errorMessege: 'Страница не найдена'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});