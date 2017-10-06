'use strict';

var player = document.querySelector('.player'),
    playerBody = document.querySelector('.player__body'),
    prevSong = document.querySelector('.player__prev'),
    nextSong = document.querySelector('.player__next'),
    currentSong = document.querySelector('.player__source'),
    playlist = document.querySelector('.player__playlist'),
    songs = document.querySelectorAll('.player__song');

prevSong.onclick = function (e) {
    var numberOfSong = getNumberOfSong(currentSong);
    songs[numberOfSong - 1].classList.remove('active');

    --numberOfSong;
    if (numberOfSong < 1) numberOfSong = songs.length;

    songs[numberOfSong - 1].classList.add('active');

    updatePlayer(numberOfSong);
};

nextSong.onclick = function (e) {
    var numberOfSong = getNumberOfSong(currentSong);
    songs[numberOfSong - 1].classList.remove('active');
    ++numberOfSong;

    if (numberOfSong > songs.length) numberOfSong = 1;

    songs[numberOfSong - 1].classList.add('active');

    updatePlayer(numberOfSong);
};

playlist.onclick = function (e) {
    var target = e.target;

    if (target.tagName != "LI") return;

    var activeSong = document.querySelector('.active');
    activeSong.classList.remove('active');
    target.classList.add('active');
    var numberOfSong = target.dataset.number;

    updatePlayer(numberOfSong);
};

function onEnded() {
    var activeSong = document.querySelector('.active');
    activeSong.classList.remove('active');

    var numberOfSong = activeSong.dataset.number;
    ++numberOfSong;

    if (numberOfSong > songs.length) numberOfSong = 1;

    playlist.children[numberOfSong - 1].classList.add('active');

    updatePlayer(numberOfSong);
}

function updatePlayer(src) {
    src = 'data/' + src + '.mp3';

    var newPlayerBody = document.createElement('audio');
    newPlayerBody.classList.add('player__body');
    newPlayerBody.setAttribute("controls", "");
    newPlayerBody.setAttribute("autoplay", "");
    newPlayerBody.setAttribute("onended", "onEnded();");

    var newSong = document.createElement('source');
    newSong.classList.add('player__source');
    newSong.setAttribute('src', src);
    newSong.setAttribute('type', 'audio/mpeg');

    newPlayerBody.appendChild(newSong);

    player.removeChild(playerBody);
    player.insertBefore(newPlayerBody, playlist);

    playerBody = newPlayerBody;
    currentSong = newSong;
}

function getNumberOfSong(song) {
    return +song.getAttribute('src').split("/")[1].split(".")[0];
}