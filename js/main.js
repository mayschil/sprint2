'using strict'

//scroll functions
function scrollProtfolio() {
    window.scrollTo(0, 950)
}

function scrollAbout() {
    window.scrollTo(0, 600)
}

function scrollGetTouch() {
    window.scrollTo(0, 1257)
}



//render pictures
var gPics = ['child.jpg', 'baby.jpg', 'girl.jpg', 'woman.jpg', 'man.jpg', 'wanka.jpg', 'american.jpg', 'red.jpg'];
var gImgs = [];
getImgs();

function getImgs() {

    gPics.forEach(function (pic, idx) {
        console.log('pic', pic);
        gImgs.push(getImg(pic, idx));
    })
    renderImgs();
}


function getImg(pic, idx) {

    return {
        id: idx,
        url: pic,
        keywords: []
    }
}

function renderImgs() {

    var elImgs = document.querySelector('.imgs');
    var strHtmls = '';

    gImgs.forEach(function (img, idx) {
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
    renderImgs();
}

function cleanBoard() {
    document.querySelector('.imgs').innerHTML = '';
}


function makeMeme(elImg) {
    console.log(elImg);
}