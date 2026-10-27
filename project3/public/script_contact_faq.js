const element = document.querySelectorAll('a, span');
randomize();

const body = document.querySelector('body');
var bool = true;

//on click
document.addEventListener('click', function(event) {
    invertColors();
    randomize();
});


//random position + letter spacing
function randomize() {
    element.forEach(element => {
        element.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
        element.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
        element.style.letterSpacing = Math.floor(Math.random() * 50) + 'px';
    });
}

//colors invert on click
function invertColors() {
    if (bool) {
        bool = false;
        body.style.background = 'rgb(226, 226, 226)';
        element.forEach(element => {
            element.style.color = 'rgb(226, 226, 226)';
            element.style.backgroundColor = 'black';
        });
        
    } else if (!bool) {
        bool = true;
        body.style.background = 'black';
        element.forEach(element => {
            element.style.color = 'black';
            element.style.backgroundColor = 'rgb(226, 226, 226)';
        });
        
    }
}
