// [video, duration]
const videos = [
    ["https://www.youtube.com/embed/4OYVc6unRpk", 198], // https://www.youtube.com/watch?v=4OYVc6unRpk
    ["https://www.youtube.com/embed/QgyW9qjgIf4", 234], // https://www.youtube.com/watch?v=QgyW9qjgIf4
    ["https://www.youtube.com/embed/saDuWchd3x4", 79], // https://www.youtube.com/watch?v=saDuWchd3x4
    ["https://www.youtube.com/embed/ek6dQ9IGOvQ", 165], // https://www.youtube.com/watch?v=ek6dQ9IGOvQ
    ["https://www.youtube.com/embed/klPD-stNou0", 138], // https://www.youtube.com/watch?v=klPD-stNou0
    ["https://www.youtube.com/embed/CzJbz9qSsd0", 254], // https://www.youtube.com/watch?v=CzJbz9qSsd0
    ["https://www.youtube.com/embed/DfcWOPpmw14", 220], // https://www.youtube.com/watch?v=DfcWOPpmw14
    ["https://www.youtube.com/embed/JyGKewWVgEQ", 208], // https://www.youtube.com/watch?v=JyGKewWVgEQ
    ["https://www.youtube.com/embed/NWrZ__uGAf4", 565] // https://www.youtube.com/watch?v=NWrZ__uGAf4

]

let video = document.createElement("iframe");
let video_index = 0;
const interval_ms = 10000; //ms
const interval_s = interval_ms / 1000;

function getRandomVideoIndex() {
    return Math.floor(Math.random() * videos.length);
}

function getRandomTime() {
    return Math.floor(Math.random() * (videos[video_index][1] - interval_s));
}

function setVideoSrc() {
    video.src = videos[video_index][0] + "?autoplay=1&mute=1&controls=0&showinfo=0&start=" + getRandomTime();
}

window.onload = () => {
    video_index = getRandomVideoIndex();
    setVideoSrc();
    video.width = "112%";
    video.height = "112%";
    document.body.appendChild(video);
}

setInterval(switch_video, interval_ms);
function switch_video() {
    //get new video and ensure it is not the current video
    let new_video_index;
    do {
        new_video_index = getRandomVideoIndex();
    } while (new_video_index == video_index);

    video_index = new_video_index;
    setVideoSrc();
}

var player;
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('video', {
        height: '112%',
        width: '112%',
        videoId: 'JyGKewWVgEQ',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'mute': 1,
            'showinfo': 0,
            'start': 30
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        player.unloadModule("captions");
        player.unloadModule("cc");
    }
}
