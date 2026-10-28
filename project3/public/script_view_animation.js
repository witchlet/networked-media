const message = document.getElementById('message');
const animation = document.createElement('video');

animation.addEventListener('error', (error) => {
    if (error) {
        setAnimationSrc('out'); //very first frame!!!
        console.log(error);
        message.innerText = 'YOU DREW THE VERY FIRST FRAME OF THIS!!! SO PROUD ANAK...❤️‍🩹🩹';
    }
})

message.innerText = 'YOU DREW THE LAST FRAME OF THIS!!! SO PROUD ANAK...❤️‍🩹🩹';

function setAnimationSrc(filename) {
    animation.src = `http://localhost:3000/ugc/${filename}.mp4`;
}

setAnimationSrc('out1');
animation.muted = true;
animation.autoplay = true;
animation.loop = true;
animation.id = 'animation';
document.getElementById('video_container').appendChild(animation);


