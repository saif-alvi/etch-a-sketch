const body = document.querySelector('body');
const container = document.querySelector('#container');

const infoContainer = document.createElement('div');
    infoContainer.classList.add("infoContainer");
    
const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent ='SKETCH PAD';
const toolbar = document.createElement('div');
    toolbar.classList.add("toolbar");


const densityButton = document.createElement('button');
    densityButton.addEventListener('click',UpdateGrid);
    densityButton.classList.add("toolButton");
    densityButton.textContent = "Set Density";

const blackButton = document.createElement('button');   
    blackButton.classList.add("toolButton");
    blackButton.textContent = "Black";
const colorButton = document.createElement('button');
    colorButton.classList.add("toolButton");
    colorButton.textContent = "Color";
const gradientButton = document.createElement('button');
    gradientButton.classList.add("toolButton");
    gradientButton.textContent = "Gradient";

const eraserButton = document.createElement('button');
    eraserButton.classList.add("toolButton");
    eraserButton.textContent = "Eraser";
    eraserButton.addEventListener("click", () =>{
        const tiles = document.querySelectorAll(".tileRow");
        tiles.forEach(tile => addEraserListener(tile));
    });

const resetButton = document.createElement('button');
    resetButton.classList.add("toolButton");
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", () => {
        const tiles = document.querySelectorAll(".tileRow");
        tiles.forEach(tile => tile.classList.remove("colorBlack"));
    })



body.insertBefore(infoContainer,container);
infoContainer.append(title);
infoContainer.append(toolbar);
toolbar.appendChild(densityButton);
toolbar.appendChild(blackButton);
toolbar.appendChild(colorButton);
toolbar.appendChild(gradientButton);
toolbar.appendChild(eraserButton);
toolbar.appendChild(resetButton);



function UpdateGrid(){
    
    let input = prompt('Please enter desired pixel density (Warning: This resets grid)');
    if (input === null) return;
    else if (Number.isNaN(+input)) alert("Must be a number!");
    else {
        const columnsToBeRemoved = document.querySelectorAll(".tileColumn");
        columnsToBeRemoved.forEach(column => container.removeChild(column));
        input = +input;
        for (i=1; i<=input; i++){
            const tileColumn =document.createElement('div')
            tileColumn.classList.add("tileColumn");
            container.appendChild(tileColumn);
            }
        const tileColumns = document.querySelectorAll('.tileColumn');
        tileColumns.forEach(column => {
            for (i=1; i<=input; i++){
                const tileRow = document.createElement('div');
                tileRow.classList.add("tileRow");
                column.appendChild(tileRow);
            }
        });
        
    const tiles = document.querySelectorAll('.tileRow');
    tiles.forEach(tile => tile.addEventListener('mouseover', tileWhiteToBlack) );
    tiles.forEach(tile => tile.addEventListener('click', tileWhiteToBlack2) );
    return tiles;
    }
}

function removeListeners(e) {
    e.removeEventListener('mouseover',tileWhiteToBlack);
    e.removeEventListener('click',tileWhiteToBlack2);
}

function addBlackListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileWhiteToBlack)
    e.addEventListener('click',tileWhiteToBlack2);
}

function addColorListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileWhiteToBlack)
    e.addEventListener('click',tileWhiteToBlack2);
}

function addGradientListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileWhiteToBlack)
    e.addEventListener('click',tileWhiteToBlack2);
}

function addEraserListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileBlackToWhite);
    e.addEventListener('click',tileBlackToWhite2);
}



function tileBlackToWhite(e){
    if (e.buttons== 1 || e.buttons == 3) e.target.classList.remove('colorBlack');
}
function tileBlackToWhite2(e){
   e.target.classList.remove('colorBlack');
}

function tileWhiteToBlack(e){
    if (e.buttons== 1 || e.buttons == 3) e.target.classList.add('colorBlack');
}
function tileWhiteToBlack2(e){
   e.target.classList.add('colorBlack');
}





