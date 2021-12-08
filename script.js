const canva = document.getElementById('canva');
const clear = document.getElementById('clear');
const gridSize = document.getElementById('gridSize');
const colorButton = document.getElementById('colorButton');
const rainbowButton = document.getElementById('rainbowButton');
const eraser = document.getElementById('eraser');
const pencil = document.getElementById('pencil');
let colorChoice = colorButton.value;
let currentMode = 'default';
let mouseState = 'up';

function setGridSize(newSize) {
    gridSizeValue = newSize;
    clearCanva();
}

function setCurrentMode(newMode) {
    currentMode = newMode;
} 

function setColor(newColor) {
    colorChoice = newColor;
}

function setMouseState(state) {
    mouseState = state;
}

function grayScale(e) {
    let currentColor = e.target.style.backgroundColor;
    let shade = parseInt(currentColor.slice(4,7));
    if (currentColor.length === 0) {
        e.target.style.backgroundColor = 'rgb(225, 225, 225)';
    } else if (shade >= 0 && shade <= 225) {
        e.target.style.backgroundColor = `rgb(${shade-25}, ${shade-25}, ${shade-25})`;
    } else if (currentColor) {
        e.target.style.backgroundColor = 'rgb(225, 225, 225)';
    }
}

colorButton.onchange = (e) => setColor(e.target.value);

colorButton.onclick = () => {
    setCurrentMode('default');
    canva.style.cursor = 'url(images/pencil.png) 0 32, auto';
}

rainbowButton.onclick = () => {
    setCurrentMode('rainbow');
    canva.style.cursor = 'url(images/pencil.png) 0 32, auto';
}

pencil.onclick = () => {
    setCurrentMode('pencil');
    canva.style.cursor = 'url(images/pencil.png) 0 32, auto';
}
eraser.onclick = () => {
    setCurrentMode('eraser');
    canva.style.cursor = 'url(images/eraser.png) 10 42, auto';
}

gridSize.onchange = (e) => setGridSize(e.target.value);

//Set the state of the mouse. Window event listener is necessary in case the user
// release the mouse outside of the page.
canva.onmousedown = () => setMouseState('down');
window.addEventListener('mouseup', function() {
    setMouseState('up');
})

//Disable the drag function on the canva to prevent the click and drag bug when drawing.
canva.ondragstart = function(){return false;};

function draw(e) {
    if (mouseState === 'down') {
        if (currentMode === 'default') {
            e.target.style.backgroundColor = colorChoice;
        } else if (currentMode === 'rainbow') {
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else if (currentMode === 'eraser') {
            e.target.style.backgroundColor = '';
        } else if (currentMode === 'pencil') {
            grayScale(e);
        }
    }
}

function setUpGrid() {
    let gridSizeValue = gridSize.value;
    let gridSizeValueSquared = Math.pow(gridSize.value, 2);
    canva.style.gridTemplateColumns = `repeat(${gridSizeValue}, 1fr)`;
    canva.style.gridTemplateRows = `repeat(${gridSizeValue}, 1fr)`;
    for (let i = 1; i <= gridSizeValueSquared; i++) {
        let div = document.createElement('div');
        div.className = 'pixel';
        div.addEventListener('mouseover', draw);
        canva.appendChild(div);
    }
}

setUpGrid();

function clearCanva() {
    canva.innerHTML = '';
    setUpGrid();
};

clear.addEventListener('click', function() {
    clearCanva();
});