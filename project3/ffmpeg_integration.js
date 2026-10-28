const childProcess = require('child_process');

const createVideo = `ffmpeg -framerate 12 -f image2 -pattern_type glob -i './ugc/image.png' -c:v libx264 -pix_fmt yuv420p ./ugc/out.mp4`;

const appendImageToVideo = `ffmpeg -y -i './ugc/out.mp4' -i './ugc/image.png' -f lavfi -i anullsrc -filter_complex '[0:v] [1:v] concat=n=2:v=1 [v]' -c:v libx264 -strict -2 -map '[v]' ./ugc/out1.mp4`;

const renameVideo = `ffmpeg -y -i './ugc/out1.mp4' -c copy './ugc/out.mp4'`

function addFrameOrCreateVideo() {
    childProcess.exec(createVideo, (error, stdout, stderr) => {
        console.log('img -> video');
        if (error) console.log(error);
    });
    childProcess.exec(appendImageToVideo, (error, stdout, stderr) => {
        console.log('video += img');
        if (error) console.log(error);
    });
}

function copyVideo() {
    childProcess.exec(renameVideo, (error, stdout, stderr) => {
        console.log('out1 -> out');
        if (error) console.log('all the time... ', error);
    });
}

module.exports = {addFrameOrCreateVideo, copyVideo} 
