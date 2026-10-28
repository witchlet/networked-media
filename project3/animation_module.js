const url = require('url');

video_url = url.pathToFileURL('../public/ugc/out1.mp4');
//animation = document.createElement('video');
//video.src = video_url;

function getVideoUrl() {
    return video_url;
}

module.exports = {getVideoUrl};
