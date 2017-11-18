'use strict'

//render pictures
var gPics = ['child.jpg', 'baby.jpg', 'girl.jpg', 'woman.jpg', 'man.jpg', 'wanka.jpg', 'american.jpg',
    'red.jpg', 'white-man.jpg', 'dude.jpg', 'de-evil.jpg', 'trump.jpg'];
var gKeyWords = ['baby,man,not-happy', 'babi,strong,success', 'girl,disaster',
    'woman,crazy', 'baby,excuse', 'willy-wonka,baby', 'american,baby', 'man,extravagant,dont-care',
    'scary', 'crzay', 'movie', 'president'];
var gImgs = [];
getImgs();
var gKeyAppear = {};
var gKeySorted = [];
keyCount();
var keys = [];
var gLetters = [];


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

function cleanBoard() {

    document.querySelector('.display-keys').style.height = 'initial';
    document.querySelector('.display-keys').style.margin = '0';
    document.querySelector('.display-keys').innerHTML = '';
    var img = document.querySelector('.added-pic');
    img.style.display = 'none';
    renderImgs(gImgs);
}

function addImg() {

    var arr = [];
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

    preview.style.display = 'block';
    preview.style.height = '300px';
    preview.style.width = '300px';
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
    document.querySelector('.img-key').value = '';
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

    gImgs.forEach(function () {
        gImgs.gKeyWords.forEach(function () {
            if (gImgs.gKeyWords === elKey.innerText)
                arr.push(gImgs[i]);
        });
    });

    cleanBoard();
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

function myFunction() {

    var arr=[];
    var letters = [];
    var str = document.querySelector('.img-key').value;
    console.log('str', str)
    gLetters = str.split('');
    console.log('gLetters', gLetters)
    var imgs = [];

    for (var j = 0; j < gImgs.length; j++) {
        for (var i = 0; i < gImgs[j].keywords.length; i++) {
            var word = gImgs[j].keywords[i].split('');
            console.log('word', word)
            for (var k = 0; k < gLetters.length; k++) {
                if (gLetters[k] === word[k]) {
                    // if (!letters[k]) {
                    letters.push(gLetters[k]);
                    // }
                    imgs.push(word);
                //   arr = checkImgs(imgs);
                //   console.log('arr',arr)
                }
                else {
                    break;
                }
            }
        }
    }
    console.log('letters', letters);
    console.log('imgs', imgs);
}


function checkImgs(imgs) {

    var keys = [];
    var str;
    for (var i = 0; i < imgs.length; i++) {
        str = '';
        for (var j = 0; j < imgs[i].length; j++) {
            str += imgs[j];
        }
        keys.push(str);
    }
    return keys;
}



function makeMeme(elImg) {
    console.log(elImg);
}



