const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const multer = require('multer');
const ffmpeg_integration = require('./ffmpeg_integration.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/ugc', express.static('./ugc'));

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
        //the non-randomized names allow for the last stored image to be written over instead of having a new file created, which is convenient bc the last image needs to be deleted anyways.
        //additionally, this allows the ffmpg integration to locate the image and video files via hard-coded names in the commands
        cb(null, file.originalname);
    },
});
const upload = multer({storage: storage});

//also store video in RAM so that it can be streamed to the client
const uploadToMemory = multer({storage: multer.memoryStorage()});


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

app.get('/view-animation', (request, response) => {
    response.render('view-animation.njk');
})

// uploads drawings to server as './ugc/image.png' thank u multer
// also stores two videos of the animation, one including the most recent frame and one without
app.post('/upload', upload.single('canvasImage'), (request, response) => {
    console.log('uploading to disk: ', request.file);
    ffmpeg_integration.copyVideo();
    ffmpeg_integration.addFrameOrCreateVideo();
    //response.redirect('/view-animation');
});

app.listen(3000, '0.0.0.0', () => {
    console.log('http://67.207.83.79:3000/')
    console.log('http://frameplusplus.mays.computer')
    console.log('http://127.0.0.1:3000/')
});
