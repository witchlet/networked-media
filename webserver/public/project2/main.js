// [video, duration]
const videos = [
    ["4OYVc6unRpk", 197], // https://www.youtube.com/watch?v=4OYVc6unRpk underscores - stupid
    ["QgyW9qjgIf4", 234], // https://www.youtube.com/watch?v=QgyW9qjgIf4 jane remover - dancing with your eyes closed
    ["saDuWchd3x4", 79], // https://www.youtube.com/watch?v=saDuWchd3x4 gabby start - looking for alaska
    ["ek6dQ9IGOvQ", 158], // https://www.youtube.com/watch?v=ek6dQ9IGOvQ yt ft. lancey foux - black & tan
    ["klPD-stNou0", 130], // https://www.youtube.com/watch?v=klPD-stNou0 jim legxacy - father
    ["CzJbz9qSsd0", 254], // https://www.youtube.com/watch?v=CzJbz9qSsd0 porter robinson - cheerleader
    ["DfcWOPpmw14", 215], // https://www.youtube.com/watch?v=DfcWOPpmw14 magdalena bay - image 
    ["JyGKewWVgEQ", 208], // https://www.youtube.com/watch?v=JyGKewWVgEQ neko case - man
    ["NWrZ__uGAf4", 565], // https://www.youtube.com/watch?v=NWrZ__uGAf4 tsubi club - laced up
    ["ca7zUSNpL70", 268], // https://www.youtube.com/watch?v=ca7zUSNpL70 yeule - sulky baby
    ["8oeOwmJa8vk", 4166] // https://www.youtube.com/watch?v=8oeOwmJa8vk quadeca - vanisher, horizon scaper
]

var player0, player1;
let video_index = -1;
const interval = 5000; //ms
let intervals_passed = 0;

window.onYouTubeIframeAPIReady = function() {
    player0 = createPlayer('video0');
    player1 = createPlayer('video1');
}

function createPlayer(div_id) {
    return new YT.Player(div_id, {
        height: '112%',
        width: '112%',
        videoId: getNewVideoId(),
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'mute': 1,
            'showinfo': 0,
            'start': getRandomTime()
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
        event.target.unloadModule("captions");
        event.target.unloadModule("cc");
    }
}

function getNewVideoId() {
    let new_video_index;
    do {
        new_video_index = Math.floor(Math.random() * videos.length);
    } while (new_video_index == video_index); //ensure new video is not the current video
    video_index = new_video_index;
    return videos[video_index][0];
}

// max start time is (interval / 500) seconds before the end of the video,
// so a video never gets loaded in such a way where it will end halfway through
// each video lasts interval * 2 seconds because of the double buffer design
function getRandomTime() {
    return Math.floor(Math.random() * (videos[video_index][1] - (interval / 500))); 
}

setTimeout(() => {
    document.getElementById('video0').style.opacity = 1;
    document.getElementById('video1').style.opacity = 1;

    document.getElementById('video0').style.zIndex = 1;
    document.getElementById('video1').style.zIndex = 2;
}, 5500); //hide first loading process and pause button

setInterval(switchVideo, interval);
function switchVideo() {
    if (intervals_passed % 2) {
        document.getElementById('video0').style.zIndex = 2;
        document.getElementById('video1').style.zIndex = 1;
        player1.loadVideoById(getNewVideoId(), getRandomTime());
    } else {
        document.getElementById('video0').style.zIndex = 1;
        document.getElementById('video1').style.zIndex = 2;
        player0.loadVideoById(getNewVideoId(), getRandomTime());
    }
    intervals_passed++;
}