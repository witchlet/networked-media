const express = require('express');
const app = express();
const nunjucks = require("nunjucks");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

nunjucks.configure("views", {
    autoescape: true,
    express: app,
});
app.set("view engine", "njk");

allData = [];

app.get('/', (request, response)=>{
    response.render('home.njk');
});

app.get('/contact', (request, response)=>{
    response.render('contact.njk');
});

app.listen(3000, '0.0.0.0', ()=>{
    console.log('http://67.207.83.79:3000/')
    console.log('http://frameplusplus.mays.computer')
    console.log('http://127.0.0.1:3000/')
});
