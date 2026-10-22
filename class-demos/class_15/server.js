const express = require("express");
/************
 * import our templating library
 ************/
const nunjucks = require("nunjucks");

// app is express server that uses express library variable
const app = express();

// app.use is middleware
// these are settings for our server that happen ebtween when the server runs and when it receives a request
// all css and front-end js will go in public folder
app.use(express.static("public"));
// express.urlencoded allows us to process POST requests
// if we have app.post, we NEED this line
// allows us to use request.body
app.use(express.urlencoded({ extended: true }));
// more settings to set up our njk files
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

// store data on our server using an array variable
let allData = [];

// respobse.render always goes inside an app.get OR an app.post
app.get('/', (request, response)=>{
    // regular home page rendering
    /*****************************
     * new!!!! changed render file
     ****************************/
    response.render('home.njk');
})

// for every new njk file, we need a new app.get
app.get('/form', (request, response)=>{
    response.render('form.njk');
})

// display all my data on my array
app.get('/view-all', (request, response)=>{
    // optional second param in response.render: data from the server
    // it is always an object
    response.render('view-all.njk', { messagesArrayFromServer: allData });
})

// for every <form> we need an app.post
app.post('/send-message', (request, response)=>{
    // this action will handle:
    // 1. storing the data from the form on the server (in the data array)
    console.log(request.body);
    allData.push(request.body);
    // 2. redirect to where we want the data to be displayed
    response.redirect('/view-all');
})

// ALWAYS GOES LAST
// start our server to run
// app.listen is now listening for requests
app.listen(8080, '0.0.0.0', ()=>{
    console.log('http://localhost:8080')
})
