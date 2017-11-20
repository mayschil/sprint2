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
        ctxFontSize : 50,
        ctxFontFamily : "Impact",
        ctxFontLine: "50px Impact",
        ctxShadowColor: '#000000',
        ctxShadowBlur : 0,
        x:20,
        y: 20
    },
    {
        line: '',
        size: 0,
        align: '',
        color: 'red',
        ctxAligenLine: 'start',
        ctxFontLine: "50px Impact",
        ctxFontFamily : "Impact",
        ctxFontSize : 50,
        ctxShadowBlur : 0,
        ctxShadowColor: '#000000',
        x: 0,
        y: 100
    }]
};

function updateText(idx) {
    gMeme.txts[idx].line = event.target.value;
    drawMeme();
}

function drawMeme() {
    var color1Selected = document.getElementById('clrPicker0').value;
    var color2Selected = document.getElementById('clrPicker1').value;

    gMeme.txts[0].color = (!color1Selected?'#000000':color1Selected);
    gMeme.txts[1].color = (!color2Selected?'#000000':color2Selected);

    ctx.drawImage(gMeme.elImg, 0, 0, gMeme.originalWidth, gMeme.originalHeight);
    ctx.font = gMeme.ctxFontLine;
    gMeme.txts.forEach(function(txt){
        ctx.fillStyle = txt.color;
        ctx.ctxFontLine = txt.ctxFontLine;
        ctx.font = txt.ctxFontLine;
        ctx.shadowColor = txt.color;
        ctx.shadowBlur = txt.ctxShadowBlur;
        ctx.txtAlign = txt.ctxAligenLine;
        ctx.fillText(txt.line, txt.x, txt.y);

    });

}

function updateFontFamily(elFontFamily) {
    
    var idx = (elFontFamily.id === 'selecth1FontFamily')?0:1;
    gMeme.txts[idx].ctxFontFamily = elFontFamily.value;
    gMeme.txts[idx].ctxFontLine = '50px '+elFontFamily.value;
    drawMeme();
}

function updateColor(elInput) {
    
    var idx = (elInput.id === 'clrPicker0')?0:1;
    gMeme.txts[idx].color = elInput.value;
    drawMeme();
}

//this function gets 2 parameter txtLine is the row (top or bottom) and size (plus or minus)
function changeFontSize(txtLine,size) {

    var idx = (txtLine === 'top')?0:1;
    if(size === 'plus') {
        gMeme.txts[idx].ctxFontSize +=2; //bigger in 2 px each click on the plus
        gMeme.txts[idx].ctxFontLine = gMeme.txts[idx].ctxFontSize + "px" +" "+gMeme.txts[idx].ctxFontFamily;
    }
    else {
        if(gMeme.txts[idx].ctxFontSize > 2)
            {
                gMeme.txts[idx].ctxFontSize -=2; //smaller in 2 px each click on the plus
                gMeme.txts[idx].ctxFontLine = gMeme.txts[idx].ctxFontSize + "px" +" "+gMeme.txts[idx].ctxFontFamily;
        }
    }
    drawMeme();
}

function toggleShadow(txtLine) {
    //console.log(txtLine);
    var idx = (txtLine === 0)?0:1;
    
    if(!gMeme.txts[idx].ctxShadowBlur) {
        gMeme.txts[idx].ctxShadowColor = gMeme.txts[idx].color;
        ctx.ctxShadowColor = gMeme.txts[idx].ctxShadowBlur = 9;
    }
    else  {
        ctx.ctxShadowColor = gMeme.txts[idx].ctxShadowBlur = 0;
    }
    drawMeme();
}


//this function gets a direction parameter and set the alignment of the line text, idx is the top or bottom
function align_txt(direction,idx) {
    var idx = idx;
    var elemntId = "textArea" + ((idx === 0)?1:2);

    var test = document.getElementById(elemntId);
    test.style.fontSize = gMeme.txts[idx].ctxFontSize;// gMeme.txts[idx].ctxFontSize;
    var textHeight = (test.clientHeight + 1);
    var textWidth = (test.clientWidth + 1);
    
    switch(direction) {
        case 'r': gMeme.txts[idx].x = gMeme.originalWidth - textWidth;
        break;
        case 'c': gMeme.txts[idx].x = Math.round(gMeme.originalWidth / 2);
        break;
        case 'l': gMeme.txts[idx].x = 0;
        break;
    }
    drawMeme()

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

    gMeme.txts[0].y = parseInt(gMeme.originalHeight * 0.2);
    gMeme.txts[0].x = parseInt(gMeme.originalWidth * 0.2);

    gMeme.txts[1].y = gMeme.originalHeight - parseInt(gMeme.originalHeight * 0.18);
    gMeme.txts[1].x = parseInt(gMeme.originalWidth * 0.2);

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