let drawingCanvas = document.getElementById('canv');
let context = drawingCanvas.getContext('2d');
let num;
let figures = [];
context.strokeStyle = "black";
context.globalAlpha = 80/100;

function Click(e) {
    let cursor_x;
    let cursor_y;
    if (e.pageX != undefined && e.pageY != undefined) {
        cursor_x = e.pageX;
        cursor_y = e.pageY;
    }
    else {
        cursor_x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        cursor_y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    cursor_x -= drawingCanvas.offsetLeft;
    cursor_y -= drawingCanvas.offsetTop;

    for (let i = figures.length - 1; i >= 0; i--){
        if (figures[i].type == 'circle'){
            if (Math.sqrt((cursor_x - figures[i].x)**2 + (cursor_y - figures[i].y)**2) <= figures[i].size)
            {
                changeColor(i);
                break;
            }
        }
        else if (figures[i].type == 'triangle'){
            if ((cursor_y <= figures[i].y +figures[i].size) && (cursor_y - cursor_x + (figures[i].x - figures[i].y) >= 0) && (cursor_y + cursor_x - (figures[i].x + figures[i].y) >= 0))
            {
                changeColor(i);
                break;
            }
        }
        if (figures[i].type == 'square'){
            if ((figures[i].x <= cursor_x) && (cursor_x <= figures[i].x + figures[i].size) && (figures[i].y <= cursor_y) && (cursor_y <= figures[i].y + figures[i].size))
            {
                changeColor(i);
                break;
            }
        }
    }
}

function doubleClick(e) {
    let cursor_x;
    let cursor_y;
    if (e.pageX != undefined && e.pageY != undefined) {
        cursor_x = e.pageX;
        cursor_y = e.pageY;
    }
    else {
        cursor_x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        cursor_y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    cursor_x -= drawingCanvas.offsetLeft;
    cursor_y -= drawingCanvas.offsetTop;

    for (let i = figures.length - 1; i >= 0; i--) {
        if (figures[i].type == 'circle'){
            if (Math.sqrt((cursor_x - figures[i].x)**2 + (cursor_y - figures[i].y)**2) <= figures[i].size)
            {
                deleteFigure(i);
                break;
            }
        }
        else if (figures[i].type == 'triangle'){
            if ((cursor_y <= figures[i].y +figures[i].size) && (cursor_y - cursor_x + (figures[i].x - figures[i].y) >= 0) && (cursor_y + cursor_x - (figures[i].x + figures[i].y) >= 0))
            {
                deleteFigure(i);
                break;
            }
        }
        if (figures[i].type == 'square'){
            if ((figures[i].x <= cursor_x) && (cursor_x <= figures[i].x + figures[i].size) && (figures[i].y <= cursor_y) && (cursor_y <= figures[i].y + figures[i].size))
            {
                deleteFigure(i);
                break;
            }
        }
    }
}

function addCircles() {
    num = document.getElementById("frm").elements[0].value;
    let r;
    for (let i = 0; i < num; i++) {
        r = Math.floor(Math.random() * 120) + 10;
        figures.push({
            type: 'circle',
            size: r,
            x: Math.floor(Math.random() * (1900 - (r*2))) + r,
            y: Math.floor(Math.random() * (800 - (r*2))) + r,
            color: 'green',
        });
        drawCircle(figures.length - 1);
    }
}

function addTriangles() {
    num = document.getElementById("frm").elements[0].value;
    let height;
    for (let i = 0; i < num; i++) {
        height = Math.floor(Math.random() * 120) + 20;
        figures.push({
            type: 'triangle',
            size: height,
            x: Math.floor(Math.random() * (1900 - height*2)) + height,
            y: Math.floor(Math.random() * (800 - height*2)) + height,
            color: 'blue',
        });
        drawTriangle(figures.length - 1);
    }
}

function addSquares() {
    num = document.getElementById("frm").elements[0].value;
    let side;
    for (let i = 0; i < num; i++) {
        side = Math.floor(Math.random() * 250) + 25;
        figures.push({
            type: 'square',
            size: side,
            x: Math.floor(Math.random() * (1900 - side)),
            y: Math.floor(Math.random() * (800 - side)),
            color: 'red',
        });
        drawSquare(figures.length - 1);
    }
}

function drawCircle(index) {
    context.fillStyle = figures[index].color;
    context.beginPath();
    context.arc(figures[index].x, figures[index].y, figures[index].size, 0, Math.PI*2);
    context.closePath();
    context.stroke();
    context.fill();
}

function drawTriangle(index) {
    context.fillStyle = figures[index].color;
    context.beginPath();
    context.moveTo(figures[index].x, figures[index].y);
    context.lineTo(figures[index].x + figures[index].size, figures[index].y + figures[index].size);
    context.lineTo(figures[index].x - figures[index].size, figures[index].y + figures[index].size);
    context.lineTo(figures[index].x, figures[index].y);
    context.stroke();
    context.fill();
}

function drawSquare(index) {
    context.fillStyle = figures[index].color;
    context.strokeRect(figures[index].x, figures[index].y, figures[index].size, figures[index].size);
    context.fillRect(figures[index].x, figures[index].y, figures[index].size, figures[index].size);
}

function changeColor(index) {
    context.fillStyle = "white";
    context.globalAlpha = 100/100;
    context.fillRect(0,0,drawingCanvas.width,drawingCanvas.height);
    context.globalAlpha = 80/100;

    if (figures[index].color == 'yellow') {
        if (figures[index].type == 'circle')
            figures[index].color = 'green';
        else if (figures[index].type == 'triangle')
            figures[index].color = 'blue';
        else if (figures[index].type == 'square')
            figures[index].color = 'red';
    }
    else figures[index].color = 'yellow';

    for(let j in figures) {
        if (figures[j].type == 'circle')
            drawCircle(j);
        else if (figures[j].type == 'triangle')
            drawTriangle(j);
        else if (figures[j].type == 'square')
            drawSquare(j);
    }
}

function deleteFigure(index) {
    context.fillStyle = "white";
    context.globalAlpha = 100/100;
    context.fillRect(0,0,drawingCanvas.width,drawingCanvas.height);
    context.globalAlpha = 80/100;

    figures.splice(index, 1);

    for(let j in figures) {
        if (figures[j].type == 'circle')
            drawCircle(j);
        else if (figures[j].type == 'triangle')
            drawTriangle(j);
        else if (figures[j].type == 'square')
            drawSquare(j);
    }
}