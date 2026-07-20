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

//FashionForward Lightbox
let currentFashion = 0;
const imagesFashion = document.querySelectorAll('.image-container img[src*="fashion-forward-screenshots"]');
const lightboxFashion = document.getElementById('lightbox-fashion');
const lightboxImgFashion = document.getElementById('lightbox-img-fashion');

function openLightboxFashion(index) {
currentFashion = index;
lightboxImgFashion.src = imagesFashion[currentFashion].src;
lightboxFashion.classList.remove('hidden');
}

function closeLightboxFashion() {
lightboxFashion.classList.add('hidden');
}

function nextImageFashion() {
currentFashion = (currentFashion + 1) % imagesFashion.length;
lightboxImgFashion.src = imagesFashion[currentFashion].src;
}

function prevImageFashion() {
currentFashion = (currentFashion - 1 + imagesFashion.length) % imagesFashion.length;
lightboxImgFashion.src = imagesFashion[currentFashion].src;
}

//Clock In 2 Lightbox
let currentClock2 = 0;
const imagesClock2 = document.querySelectorAll('.image-container img[src*="clock-in-2-screenshots"]');
const lightboxClock2 = document.getElementById('lightbox-clock-2');
const lightboxImgClock2 = document.getElementById('lightbox-img-clock-2');

function openLightboxClock2(index) {
currentClock2 = index;
lightboxImgClock2.src = imagesClock2[currentClock2].src;
lightboxClock2.classList.remove('hidden');
}

function closeLightboxClock2() {
lightboxClock2.classList.add('hidden');
}

function nextImageClock2() {
currentClock2 = (currentClock2 + 1) % imagesClock2.length;
lightboxImgClock2.src = imagesClock2[currentClock2].src;
}

function prevImageClock2() {
currentClock2 = (currentClock2 - 1 + imagesClock2.length) % imagesClock2.length;
lightboxImgClock2.src = imagesClock2[currentClock2].src;
}
