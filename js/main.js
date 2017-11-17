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
var gPics = [1, 2, 3, 4];
// var gImgs = getImgs();
// renderImgs(gImgs);
var gImgs;


function getImgs() {

    gPics.forEach(function (pic) {
        console.log('pic',pic);
        gImgs.push(getImg(pic));
    })
}

getImgs();

function getImg(idx) {

    return {
        id: idx,
        url: idx + '.jpg',
        keywords: []
    }
}