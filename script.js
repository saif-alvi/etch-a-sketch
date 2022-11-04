const body = document.querySelector('body');
const container = document.querySelector('#container');
const toolbar = document.createElement('div');
    toolbar.classList.add("toolbar");
const densityButton = document.createElement('button');
densityButton.addEventListener('click',UpdateGrid);
    densityButton.classList.add("densityButton");
    densityButton.textContent = "Set Density"
body.insertBefore(toolbar,container);
toolbar.appendChild(densityButton);


function UpdateGrid(){
    const columnsToBeRemoved = document.querySelectorAll(".tileColumn");
    columnsToBeRemoved.forEach(column => container.removeChild(column));

    let input = prompt('Please enter desired pixel density (Warning: This resets grid)');
    if (input == null) return;
    else if (typeof +input !== 'number')  alert("Must be a number!");
    else {
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
    densityButton.classList.add("densityButton");

    }
}

function tileWhiteToBlack(e){
    if (e.buttons== 1 || e.buttons == 3) this.classList.add('colorBlack');
}
function tileWhiteToBlack2(e){
   this.classList.add('colorBlack');
}





