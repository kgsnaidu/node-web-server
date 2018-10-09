const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('welcome', text => {
    return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    const log = `${new Date().toString()}: ${req.method} - ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) throw err;
    });
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home',
        pageHeader: 'Home',
        welcomeMsg: 'welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
        pageHeader: 'About',
    });
});

app.listen(3000, () => {
    console.log('Sever started and listening at 3000...');
});