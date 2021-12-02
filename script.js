const canva = document.getElementById('canva');
const clear = document.getElementById('clear');
const gridSize = document.getElementById('gridSize');
const colorButton = document.getElementById('colorButton');
const rainbowButton = document.getElementById('rainbowButton');
const eraser = document.getElementById('eraser');
let gridSizeValue = gridSize.value;
let gridSizeValueSquared = Math.pow(gridSize.value, 2);
let colorChoice = colorButton.value;
let currentMode = 'default';



function setGridSize(newSize) {
    gridSizeValue = newSize;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
} 

function setColor(newColor) {
    colorChoice = newColor;
}

colorButton.onchange = (e) => setColor(e.target.value);
colorButton.onclick = () => setCurrentMode('default');
rainbowButton.onclick = () => setCurrentMode('rainbow');
eraser.onclick = () => setCurrentMode('eraser');
gridSize.onchange = (e) => setGridSize(e.target.value);


gridSize.addEventListener('change', function () {
        clearCanva();
});

function draw(e) {
    if (currentMode === 'default') {
       e.target.style.backgroundColor = colorChoice; 
    } else if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}


function setUpGrid() {
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