'use strict'

//render pictures
var gPics = ['child.jpg', 'baby.jpg', 'girl.jpg', 'woman.jpg', 'man.jpg', 'wanka.jpg', 'american.jpg',
    'red.jpg', 'white-man.jpg', 'dude.jpg', 'de-evil.jpg', 'trump.jpg'];
var gKeyWords = ['baby,scary,not-happy', 'baby,strong,success', 'girl,disaster',
    'woman,crazy', 'baby,excuse', 'willy-wonka,baby', 'american,baby', 'man,extravagant,dont-care',
    'scary', 'man', 'movie', 'president'];
var gImgs = [];
getImgs();
var gKeyAppear = {};
var gKeySorted = [];
keyCount();

function getImgs() {

    var keys = [];

    gPics.forEach(function (pic, idx) {
        keys = gKeyWords[idx].split(',');
        gImgs.push(getImg(pic, idx, keys));
    });
    renderImgs(gImgs);
}

function keyCount() {

    var keys = [];
    gPics.forEach(function (pic, idx) {
        keys = gKeyWords[idx].split(',');
        keys.forEach(function (key) {
            if (gKeyAppear[key] === undefined)
                gKeyAppear[key] = 1;

            else
                gKeyAppear[key] += 1;
        });
    });
}

function getImg(pic, idx, keys) {

    return {
        id: idx,
        url: pic,
        keywords: keys
    }
}

function renderImgs(imgs) {

    var elImgs = document.querySelector('.imgs');
    var strHtmls = '';

    imgs.forEach(function (img, idx) {
        var strHtml = `
        <div><img  src="img/${img.url}"  id="i-${idx}" onclick="makeMeme(this)" ></div>
        `
        strHtmls += strHtml
    });
    elImgs.innerHTML = strHtmls;

}

function reload() {

    document.querySelector('.display-keys').style.height='initial';
    document.querySelector('.display-keys').style.margin='0';
    document.querySelector('.display-keys').innerHTML = '';
    document.querySelector('.img-url').innerHTML = '';
    document.querySelector('.img-key').value = '';
    var img = document.querySelector('.added-pic');
    img.src = '';
    img.style.display = 'none';

    // gImgs.pop();
    renderImgs(gImgs);
}

function addImg() {

    var arr=[];
    var preview = document.querySelector('.added-pic');
    console.log('preview.src', preview)
    var file = document.querySelector('.img-url').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
    
    preview.style.height = '300px';
    preview.style.width = '300px';
    document.querySelector('.imgs').innerHTML='';
    
}

function cleanBoard() {
    document.querySelector('.imgs').innerHTML = '';
}


function showImgByKey() {

    cleanBoard();
    var isImgs = [];

    var keyValue = document.querySelector('.img-key').value;

    gImgs.forEach(function (img) {
        img.keywords.forEach(function (key) {
            if (keyValue === key)
                isImgs.push(img);
        });
    });

    renderImgs(isImgs);
}

function showList() {
    cleanBoard();
    sortKeys();

    var elClass = document.querySelector('.display-keys');
    var strHtmls = '';

    elClass.style.height = '1000px';
    elClass.style.margin = '60px';

    gKeySorted.forEach(function (key) {
        var strHtml =
            ' <p onclick="goToPics(this)" class="key-size' + key[1] + '"> ' + key[0] + ' </p>';
        strHtmls += strHtml
    });
    elClass.innerHTML = strHtmls;
}

function goToPics(elKey) {
    console.log(elKey.innerHTML)
    var arr = [];
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            if (gImgs[i].keywords[j] === elKey.innerText) {
                arr.push(gImgs[i]);
            }
        }

    }
    reload();
    renderImgs(arr);
}

function sortKeys() {

    var keys = [];
    for (var key in gKeyAppear) {
        keys.push([key, gKeyAppear[key]]);
    }
    gKeySorted = keys.sort(function (a, b) {
        return b[1] - a[1];
    });

    gKeySorted.forEach(function (key) {
    });
}






function makeMeme(elImg) {
    console.log(elImg);
}