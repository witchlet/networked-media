const childProcess = require('child_process');
const ffmpeg = require('ffmpeg');

const createVideo = `ffmpeg -framerate 12 -pattern_type glob -i './ugc/*.png' -c:v libx264 -pix_fmt yuv420p ./ugc/out.mp4`;

const appendImageToVideo = `ffmpeg -framerate 12 -i './ugc/out.mp4' -i './ugc/image.png' -f lavfi -i anullsrc -filter_complex '[0:v] [0:a] [1:v] [2:a] concat=n=2:v=1:a=1 [v] [a]' -c:v libx264 -c:a aac -strict -2 -map '[v]' -map '[a]' ./ugc/out.mp4`;

function addFrameOrCreateVideo() {
    console.log('addFrameOrCreateVideo() running!');
    let errCode = 0;
    childProcess.exec(appendImageToVideo, (error, stdout, stderr) => {
        console.log('childProcess execing!');
        if (error) { //need to create video
            //console.log('error:', error);
            childProcess.exec(createVideo, (error, stdout, stderr) => {
                console.log("making video!");
                if (error) console.log('error:', error);
                errCode |= 0b1;
            });
        }
    });
    return errCode;
}

module.exports = {addFrameOrCreateVideo} 
