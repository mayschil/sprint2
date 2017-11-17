'using strict'

//scroll functions
function scrollProtfolio() {
    window.scrollTo(0, 950);
}

function scrollAbout() {
    window.scrollTo(0, 600);
}

function scrollGetTouch() {
    window.scrollTo(0, 1257);
}



//render pictures
var gPics = ['child.jpg', 'baby.jpg', 'girl.jpg', 'woman.jpg', 'man.jpg', 'wanka.jpg', 'american.jpg', 'red.jpg'];
var gKeyWords = ['child,scary,not-happy', 'baby,strong,success', 'girl,disaster',
    'woman,crazy', 'man,excuse', 'willy wonka,laugh', 'american,comedy', 'man,extravagant,dont-care'];
var gImgs = [];
getImgs();
var gKeyAppear = {};


function getImgs() {
    
    var keys = [];

    gPics.forEach(function (pic, idx) {
        keys = gKeyWords[idx].split(',');
        
        keys.forEach(function (key) {
            console.log(key)
            getKeyAppear(key);     
        });
        gImgs.push(getImg(pic, idx, keys));
    });


    renderImgs(gImgs);
}

function getKeyAppear(key){

    gKeyAppear[key]=0;
    
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
        <div class="hexa-shape"><img  src="img/${img.url}"  id="i-${idx}" onclick="makeMeme(this)" ></div>
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

    var fontSizeBasic = 12;
    var elClass = document.querySelector('.imgs');

    // for (var i = 0; i < gImgs.length; i++) {
    //    if(gImgs[i].keywords)

    // }


}









function makeMeme(elImg) {
    console.log(elImg);
}