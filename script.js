const body = document.querySelector('body');
const container = document.querySelector('#container');

const infoContainer = document.createElement('div');
    infoContainer.classList.add("infoContainer");
    
const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent ='SKETCH-PAD';
const toolbar = document.createElement('div');
    toolbar.classList.add("toolbar");

const densityButton = document.createElement('button');
    densityButton.addEventListener('click',UpdateGrid);
    densityButton.classList.add("toolButton");
    densityButton.textContent = "Set Density";

const blackButton = document.createElement('button');   
    blackButton.classList.add("toolButton");
    blackButton.textContent = "Black";
    blackButton.addEventListener("click", () =>{
        buttonPressHighlight(blackButton);
        const tiles = document.querySelectorAll(".tileRow");
        tiles.forEach(tile => addBlackListener(tile));
    });

const colorButton = document.createElement('button');
    colorButton.classList.add("toolButton");
    colorButton.textContent = "Color";
    colorButton.addEventListener("click", () =>{
        buttonPressHighlight(colorButton);
        const tiles = document.querySelectorAll(".tileRow");
        tiles.forEach(tile => addColorListener(tile));
    });

const gradientButton = document.createElement('button');
    gradientButton.classList.add("toolButton");
    gradientButton.textContent = "Gradient";
    gradientButton.addEventListener("click", () =>{
        buttonPressHighlight(gradientButton);
        const tiles = document.querySelectorAll(".tileRow");
        tiles.forEach(tile => addGradientListener(tile));
    });

const eraserButton = document.createElement('button');
    eraserButton.classList.add("toolButton");
    eraserButton.textContent = "Eraser";
    eraserButton.addEventListener("click", () =>{
        buttonPressHighlight(eraserButton);
        const tiles = document.querySelectorAll(".tileRow");
        tiles.forEach(tile => addEraserListener(tile));
    });

const resetButton = document.createElement('button');
    resetButton.classList.add("toolButton");
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", () => {
        const tiles = document.querySelectorAll(".tileRow");
        tiles.forEach(tile => tile.style.background="white");
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
    tiles.forEach(tile => tile.addEventListener('mouseover', tileBlack) );
    tiles.forEach(tile => tile.addEventListener('click', tileBlack2) );
    return tiles;
    }
}

function buttonPressHighlight(curButton){
    buttons = document.querySelectorAll('.toolButton');
    buttons.forEach(button => button.classList.remove("buttonHighlight"))
    curButton.classList.add('buttonHighlight');
}

function removeListeners(e) {
    e.removeEventListener('mouseover', tileBlack);
    e.removeEventListener('click', tileBlack2);
    e.removeEventListener('mouseover', tileWhite);
    e.removeEventListener('click', tileWhite2);
    e.removeEventListener('mouseover', tileColor);
    e.removeEventListener('click', tileColor2);
    e.removeEventListener('mouseover', tileGradient);
    e.removeEventListener('click', tileGradient2);
}

function addBlackListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileBlack)
    e.addEventListener('click', tileBlack2);
}

function addColorListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileColor)
    e.addEventListener('click', tileColor2);
}

function addGradientListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileGradient)
    e.addEventListener('click', tileGradient2);
}

function addEraserListener(e){
    removeListeners(e);
    e.addEventListener('mouseover', tileWhite);
    e.addEventListener('click', tileWhite2);
}

function tileGradient(e){
    if (e.target.style.background!='black'){
        if (e.buttons== 1 || e.buttons == 3){
                    if (e.target.style.background ==''){
                        e.target.style.background ="rgb(0,0,0,0.1)";
                    }
                    else{
                        let values = e.target.style.background;
                        values = values.slice(5,-1);
                        values = values.split(',');
                        if (values.length == 4){
                            transparency = Number(values[values.length-1]);
                            if (transparency != 0.9) {
                                transparency += 0.1;
                                values.pop();
                                values.push(transparency.toString());
                                e.target.style.background =`rgb(${values.toString()})`;
                            }
                            else if (transparency == 0.9){
                                e.target.style.background="black";
                            }
                        }
                        else {
                            e.target.style.background ="rgb(0,0,0,0.1)";
                        }
                
                    }
        }
    }
}

function tileGradient2(e){
    if (e.target.style.background!='black'){
            if (e.target.style.background ==''){
                e.target.style.background ="rgb(0,0,0,0.1)";
            }
            else{
                let values = e.target.style.background;
                values = values.slice(5,-1);
                values = values.split(',');
                if (values.length == 4){
                    transparency = Number(values[values.length-1]);
                    if (transparency != 0.9) {
                        transparency += 0.1;
                        values.pop();
                        values.push(transparency.toString());
                        e.target.style.background =`rgb(${values.toString()})`;
                        console.log(e.target.style.background)
                        console.log(values)
                    }
                    else if (transparency == 0.9){
                        e.target.style.background="black";
                    }
                }
                else {
                    e.target.style.background ="rgb(0,0,0,0.1)";
                }
        
            }
    }
}

function tileColor(e){
    let x = Math.floor(Math.random()*255);
    let y = Math.floor(Math.random()*255);
    let z = Math.floor(Math.random()*255);
    console.log(`${x},${y},${z}`);
    if (e.buttons== 1 || e.buttons == 3) e.target.style.background=`rgb(${x},${y},${z})`;
}
function tileColor2(e){
    let x = Math.floor(Math.random()*255);
    let y = Math.floor(Math.random()*255);
    let z = Math.floor(Math.random()*255);
    e.target.style.background=`rgb(${x},${y},${z})`;
}


function tileWhite(e){
    if (e.buttons== 1 || e.buttons == 3) e.target.style.background='white';
}
function tileWhite2(e){
    e.target.style.background='white';
}


function tileBlack(e){
    if (e.buttons== 1 || e.buttons == 3) e.target.style.background='black';
}
function tileBlack2(e){
    e.target.style.background='black';
}





