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

colorButton.onchange = (e) => setColor(e.target.value);
colorButton.onclick = () => setCurrentMode('default');
rainbowButton.onclick = () => setCurrentMode('rainbow');
pencil.onclick = () => setCurrentMode('pencil');
eraser.onclick = () => setCurrentMode('eraser');
gridSize.onchange = (e) => setGridSize(e.target.value);

//Set the state of the mouse. Window event listener is necessary in case the user
//release the mouse outside of the page.
canva.onmousedown = () => setMouseState('down');
window.addEventListener('mouseup', function() {
    setMouseState('up');
})

//Disable the drag function on the canva to prevent the click and drag bug.
canva.ondragstart = function(){return false;};


function draw(e) {
    if (mouseState === 'down') {
        if (currentMode === 'default') {
            e.target.style.backgroundColor = colorChoice; 
        } else if (currentMode === 'rainbow') {
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else if (currentMode === 'eraser') {
            e.target.style.backgroundColor = 'white';
        } else if (currentMode === 'pencil') {
            e.target.style.backgroundColor = `hsl(0, 1%, 90%)`;
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