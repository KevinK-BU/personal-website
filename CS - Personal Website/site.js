// Re App Lightbox
let currentRe = 0;
const imagesRe = document.querySelectorAll('.image-container img[src*="re-screenshots"]');
const lightboxRe = document.getElementById('lightbox-re');
const lightboxImgRe = document.getElementById('lightbox-img-re');

function openLightboxRe(index) {
currentRe = index;
lightboxImgRe.src = imagesRe[currentRe].src;
lightboxRe.classList.remove('hidden');
}

function closeLightboxRe() {
lightboxRe.classList.add('hidden');
}

function nextImageRe() {
currentRe = (currentRe + 1) % imagesRe.length;
lightboxImgRe.src = imagesRe[currentRe].src;
}

function prevImageRe() {
currentRe = (currentRe - 1 + imagesRe.length) % imagesRe.length;
lightboxImgRe.src = imagesRe[currentRe].src;
}


// Clock In Lightbox
let currentClock = 0;
const imagesClock = document.querySelectorAll('.image-container img[src*="clock-in-screenshots"]');
const lightboxClock = document.getElementById('lightbox-clock');
const lightboxImgClock = document.getElementById('lightbox-img-clock');

function openLightboxClock(index) {
currentClock = index;
lightboxImgClock.src = imagesClock[currentClock].src;
lightboxClock.classList.remove('hidden');
}

function closeLightboxClock() {
lightboxClock.classList.add('hidden');
}

function nextImageClock() {
currentClock = (currentClock + 1) % imagesClock.length;
lightboxImgClock.src = imagesClock[currentClock].src;
}

function prevImageClock() {
currentClock = (currentClock - 1 + imagesClock.length) % imagesClock.length;
lightboxImgClock.src = imagesClock[currentClock].src;
}

// Connect Four Lightbox
let currentConnect = 0;
const imagesConnect = document.querySelectorAll('.image-container img[src*="connect-four-screenshots"]');
const lightboxConnect = document.getElementById('lightbox-connect');
const lightboxImgConnect = document.getElementById('lightbox-img-connect');

function openLightboxConnect(index) {
currentConnect = index;
lightboxImgConnect.src = imagesConnect[currentConnect].src;
lightboxConnect.classList.remove('hidden');
}

function closeLightboxConnect() {
lightboxConnect.classList.add('hidden');
}

function nextImageConnect() {
currentConnect = (currentConnect + 1) % imagesConnect.length;
lightboxImgConnect.src = imagesConnect[currentConnect].src;
}

function prevImageConnect() {
currentConnect = (currentConnect - 1 + imagesConnect.length) % imagesConnect.length;
lightboxImgConnect.src = imagesConnect[currentConnect].src;
}
