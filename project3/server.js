const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const multer = require('multer');
const ffmpeg_integration = require('./ffmpeg_integration.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'njk');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>  {
        cb(null, './ugc/');
    },
    filename: (req, file, cb) =>  {
        cb(null, file.originalname);
    },
});
const upload = multer({storage: storage});

app.get('/', (request, response) => {
    response.render('home.njk');
});

app.get('/contact', (request, response) => {
    response.render('contact.njk');
});

app.get('/faq', (request, response) => {
    response.render('faq.njk');
});

app.get('/draw', (request, response) => {
    response.render('draw.njk');
});

app.post('/upload', upload.single('canvasImage'), (request, response) => {
    console.log(request.file);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('http://67.207.83.79:3000/')
    console.log('http://frameplusplus.mays.computer')
    console.log('http://127.0.0.1:3000/')
});
