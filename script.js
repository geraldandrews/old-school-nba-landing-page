const video = document.querySelector('video');
const controls = document.querySelector(".controls");

const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");
const fullScreenBtn = document.querySelector(".full-screen");

const progressContainer = document.querySelector(".progress-container");
const progressFill = document.querySelector(".progress-fill");

const timerContainer = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");
let timerBarBound = {};

video.removeAttribute('controls');
controls.style.visibility = 'visible';

play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
video.addEventListener('ended', stopMedia);
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
video.addEventListener('timeupdate', setTime);



function playPauseMedia() {
    if (video.paused) {
        play.setAttribute('data-icon', 'u');
        video.play();
    } else {
        play.setAttribute('data-icon', 'P');
        video.pause();
    }
}

function stopMedia() {
    video.pause();
    video.currentTime = 0;
    play.setAttribute('data-icon', 'P');
}

let intervalFwd;
let intervalRwd;

function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if (rwd.classList.contains('active')) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        video.play();
    } else {
        rwd.classList.add('active');
        video.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if (fwd.classList.contains('active')) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        video.play();
    } else {
        fwd.classList.add('active');
        video.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if (video.currentTime <= 3) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        stopMedia();
    } else {
        video.currentTime -= 3;
    }
}

function windForward() {
    if (video.currentTime >= video.duration - 3) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        video.currentTime += 3;
    }
}

function setTime() {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(2, '0');
    const secondValue = seconds.toString().padStart(2, '0');

    const mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;

    const barLength = timerContainer.clientWidth * (video.currentTime / video.duration);
}

video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressFill.style.width = `${progress}%`;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
});

progressContainer.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const containerWidth = progressContainer.offsetWidth;
    const seekTime = (clickX / containerWidth) * video.duration;
    video.currentTime = seekTime;
});

fullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        video.requestFullscreen();
    }
});


