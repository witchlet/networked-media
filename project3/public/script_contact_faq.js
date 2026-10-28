const body = document.querySelector('body');
var bool = true;
const startElements = document.querySelectorAll('a, span');

for (let i = 0; i < 10; i++) {
    startElements.forEach(element => {
        let copy = element.cloneNode(true);
        body.appendChild(copy);
    });
}
const elements = document.querySelectorAll('a, span');

randomize();

document.addEventListener('click', function(event) {
    invertColors();
    randomize();
});

function randomize() {
    elements.forEach(element => {
        element.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
        element.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
        element.style.letterSpacing = Math.floor(Math.random() * 50) + 'px';
    });
}

function invertColors() {
    if (bool) {
        bool = false;
        body.style.background = 'rgb(226, 226, 226)';
        elements.forEach(element => {
            element.style.color = 'rgb(226, 226, 226)';
            element.style.backgroundColor = 'black';
        });
        
    } else if (!bool) {
        bool = true;
        body.style.background = 'black';
        elements.forEach(element => {
            element.style.color = 'black';
            element.style.backgroundColor = 'rgb(226, 226, 226)';
        });
        
    }
}
