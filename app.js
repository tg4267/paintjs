const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white"
ctx.fillRect(0,0,700,700);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick(){
    if (filling == true){
        ctx.fillRect(0, 0, 700, 700);
    }
}

function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

function handleRangeChange(event){
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize;
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

function handleSaveClick(){
    let check = confirm("Would you save or not?")
    if (check == true) {
        const image = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = image;
        link.download = "PaintJS";
        link.click();
    }
}

if(save){
    save.addEventListener("click", handleSaveClick);
}