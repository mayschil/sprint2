'use strict'

//render pictures
// CR: gImgs = [{url:}]
var gPics = ['child.jpg', 'baby.jpg', 'girl.jpg', 'woman.jpg', 'man.jpg', 'wanka.jpg', 'american.jpg',
    'red.jpg', 'white-man.jpg', 'dude.jpg', 'de-evil.jpg', 'trump.jpg'];
var gKeyWords = ['Baby,Man,Not-happy', 'Baby,Strong,Success', 'Girl,Disaster',
    'Woman,Crazy', 'Baby,Excuse', 'Willy-Wonka,Baby,American', 'American,Baby', 'Man,Extravagant,Dont-care,Woman',
    'Weird,Ugly', 'Crzay,Scary,Man', 'Movie,American,Man', 'American,Stupid,Man,Child,Success'];

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
            // if (!gKeyApper[key] ) gKeyAppear[key] = 1;
            // else... 
            if (gKeyAppear[key] === undefined){
                gKeyAppear[key] = 1;
            } else {
                gKeyAppear[key] += 1;
            }
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
        <div class="img-size"><img  src="img/${img.url}" onclick="makeMeme(this)" ></div>
        `
        strHtmls += strHtml
    });
    elImgs.innerHTML = strHtmls;

}

function cleanBoard() {

    document.querySelector('.display-keys').style.height = 'initial';
    document.querySelector('.display-keys').style.margin = '0';
    document.querySelector('.display-keys').innerHTML = '';
    // var img = document.querySelector('.added-pic');
    // img.style.display = 'none';
    // renderImgs(gImgs);
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



// function showImgByKey() {

//     cleanBoard();
//     var isImgs = [];

//     var keyValue = document.querySelector('.img-key').value;

//     gImgs.forEach(function (img) {
//         img.keywords.forEach(function (key) {
//             if (keyValue === key)
//                 isImgs.push(img);
//         });
//     });

//     renderImgs(isImgs);
//     document.querySelector('.img-key').value = '';
// }

showList();
function showList() {
    // cleanBoard();
    sortKeys();

    var elClass = document.querySelector('.display-keys');
    var strHtmls = '';

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

    gImgs.forEach(function (img) {
        img.keywords.forEach(function (key) {
            if (key === elKey.innerText)
                arr.push(img);
        });
    });
    cleanBoard();
    renderImgs(arr);
    console.log('arr', arr)
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

var gCount = 0;
var arrOfIdxs = [];
var arrOfKeyWords = [];
function myFunction() {

    
    var letters = [];
    var imgs = [];
    var str = document.querySelector('.img-key').value;
    if(!str) location.reload();
    gLetters = str.split('');
   

    if (!gCount) {
        gImgs.forEach(function (img, idx) {
            img.keywords.forEach(function (key) {
                var letters = key.split('');
                if (str === letters[0] && !arrOfIdxs.includes(idx) ) {

                    arrOfIdxs.push(idx);
                    arrOfKeyWords.push(key);
                }
            })
        })
        gCount++;
        console.log(arrOfIdxs);
        arrOfIdxs.forEach(function (index) {
            var x = index;
            imgs.push(gImgs[x])
            renderImgs(imgs);
        })
    }
    else {

        arrOfKeyWords.forEach(function (word, idx) {
            var letters = word.split('');
            if (gLetters[gCount] !== letters[gCount]) {
                arrOfIdxs[idx] = '';
                arrOfKeyWords[idx] = '';
            }
        })
        arrOfIdxs.forEach(function (index) {
            if (index !== '') {
                // var x = arrOfIdxs[index];
                imgs.push(gImgs[index])
                console.log('imgs',imgs)
                renderImgs(imgs);
            }
        })
        gCount++;

        // for (var j = 0; j < gImgs.length; j++) {
        //     for (var i = 0; i < gImgs[j].keywords.length; i++) {
        //         var letters = gImgs[j].keywords[i].split('');
        //         if (str === letters[0]) {
        //             arr.push(j);
        //             arr1.push(gImgs[j].keywords[i]);
        //         }
        //     }
        // }
       // for (var k = 0; k < arr.length; k++) {
        //     var x = arr[k];
        //     imgs.push(gImgs[x])
        //     renderImgs(imgs);
        // }
        // for (var i = 0; i < arr.length; i++) {
        //     var letters = arr1[i].split('');
        //     if (gLetters[gCount] !== letters[gCount]) {
        //         arr[i] = '';
        //         arr1[i] = '';
        //     }
        // }
        // for (var k = 0; k < arr.length; k++) {
        //     if (arr[k] !== '') {
        //         var x = arr[k];
        //         imgs.push(gImgs[x])
        //         renderImgs(imgs);
        //     }
        // }
       
    }

}




