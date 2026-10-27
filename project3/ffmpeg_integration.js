const childProcess = require('child_process');
const ffmpeg = require('ffmpeg');

const createVideo = `ffmpeg -framerate 12 -pattern_type glob -i './ugc/*.png' -c:v libx264 -pix_fmt yuv420p out.mp4`;

const appendVideoToVideo = `ffmpeg -framerate 12 -i './ugc/video' -i './ugc/image' -f lavfi -i anullsrc -filter_complex '[0:v] [0:a] [1:v] [2:a] concat=n=2:v=1:a=1 [v] [a]' -c:v libx264 -c:a aac -strict -2 -map '[v]' -map '[a]' out.mp4`;

function addFrameOrCreateVideo() {
    let errCode = 0;
    exec(appendImageToVideo, (error, stdout, stderr) => {
        if (error) { //need to create video
            exec(createVideo, (error, stdout, stderr) => {
                errCode |= 0b1;
            });
        }
    });
    return errCode;
}
