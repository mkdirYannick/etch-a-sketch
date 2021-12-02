const canva = document.getElementById('canva');
const clear = document.getElementById('clear');
let gridSize = document.getElementById('gridSize');
let colorButton = document.getElementById('colorButton')



let gridSizeValue = gridSize.value;
let gridSizeValueSquared = Math.pow(gridSize.value, 2);

function setGridSize(newSize) {
    gridSizeValue = newSize;
}

gridSize.onchange = (e) => setGridSize(e.target.value); 

gridSize.addEventListener('change', function () {
        clearCanva();
});




let colorChoice = colorButton.value;

function setColor(newColor) {
    colorChoice = newColor;
}

colorButton.onchange = (e) => setColor(e.target.value);

function draw(e) {
    e.target.style.backgroundColor = colorChoice;
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