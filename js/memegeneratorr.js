'use strict';

var ctx;
var canvas = document.getElementById('canvas');
var gMeme = {
    src: '',
    elImg:null,
    selectedImgId: 0,
    txts: [{
        line: '',
        size: 0,
        align: '',
        color: 'black',
        ctxAligenLine: 'start',
        ctxFontLine: "30px 'Segoe UI",
        x:20,
        y: 20
    },
    {
        line: '',
        size: 0,
        align: '',
        color: 'red',
        ctxAligenLine: 'start',
        ctxFontLine: "30px 'Segoe UI",
        x: 0,
        y: 100
    }]
};

function updateText(idx) {
    gMeme.txts[idx].line = event.target.value;
    drawMeme();
}

function drawMeme() {
    console.log(ctx)
    ctx.drawImage(gMeme.elImg, 0, 0, gMeme.originalWidth, gMeme.originalHeight);
    ctx.font = gMeme.ctxFontLine;
    gMeme.txts.forEach(function(txt){
        ctx.fillStyle = txt.color;
        ctx.ctxFontLine = txt.ctxFontLine;
        ctx.font = txt.ctxFontLine;
        ctx.fillText(txt.line, txt.x, txt.y);
    });

}

function updateFontFamily(elFontFamily) {
    
    var idx = (elFontFamily.id === 'selecth1FontFamily')?0:1;
    gMeme.txts[idx].ctxFontLine = '50px '+elFontFamily.value;
    drawMeme();
}

function updateColor(elInput) {
    
    var idx = (elInput.id === 'clrPicker0')?0:1;
    gMeme.txts[idx].color = elInput.value;
    drawMeme();
}
















function BackToList() {

    var elMemeGenerator = document.querySelector("#memeGenerator");
    elMemeGenerator.style.display = 'none';

    var elBody = document.querySelector("#mainPage");
    elBody.style.display = 'block';
}

function makeMeme(elImg) {  
    showEditer()
    gMeme.src = 'img' + elImg.src.split('img')[1];
    gMeme.originalWidth = document.getElementById(elImg.id).naturalWidth;
    gMeme.originalHeight = document.getElementById(elImg.id).naturalHeight;
    var img = new Image();
    gMeme.elImg = img;
    img.src = gMeme.src;
    img.onload = function () {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        ctx.canvas.width = gMeme.originalWidth;
        ctx.canvas.height = gMeme.originalHeight;
        ctx.drawImage(img, 0, 0, gMeme.originalWidth, gMeme.originalHeight);
    };
}


function showEditer() {
    var elPage = document.querySelector('#mainPage');
    // elPage.style.display = "none";
    var elMemeGenerator = document.querySelector('#memeGenerator');
    elMemeGenerator.style.display = 'flex';
}