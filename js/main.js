'use strict'

//render pictures
var gPics = ['child.jpg', 'baby.jpg', 'girl.jpg', 'woman.jpg', 'man.jpg', 'wanka.jpg', 'american.jpg', 'red.jpg'];
var gKeyWords = ['baby,scary,not-happy', 'baby,strong,success', 'girl,disaster',
    'woman,crazy', 'man,excuse', 'willy-wonka,laugh', 'american,comedy', 'man,extravagant,dont-care'];
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

function addImg() {

    var pic = document.querySelector('.img-url').value;
    gImgs.push(getImg(pic, gPics.length));
    console.log('gPics', gPics);
    cleanBoard();
    renderImgs(gImgs);
}

function cleanBoard() {
    document.querySelector('.imgs').innerHTML = '';
}


function showImgByKey() {

    cleanBoard();
    var isImgs = [];

    var keyValue = document.querySelector('.display-keys').value;

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

    gKeySorted.forEach(function(key) {
        var strHtml =
            ' <p class="key-size'+key[1]+'"> ' + key[0] + ' </p>';
        strHtmls += strHtml
    });
    elClass.innerHTML = strHtmls;
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