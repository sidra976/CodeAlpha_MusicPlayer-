const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const volumeIcon = document.getElementById("volumeIcon");
const progressBar = document.querySelector(".progress");
const progressWrapper = document.querySelector(".progress-bar");
const songListDiv = document.getElementById("songList");
const listBtn = document.getElementById("list");

// ========== SONG DATA ==========
const songs = [
  { title: "Moth To A Flame", artist: "Weekend", src: "Assets/Moth-To-A-Flame.mp3" },
  { title: "Blessing", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Heat Waves", artist: "Glass Animals", src: "Assets/heat-waves.mp3" },
  { title: "Woman", artist: "Doja Cat", src: "Assets/Woman.mp3" },
];

let currentSong = 0;

// ========== SONG CONTROL FUNCTIONS ==========

// Load song details
function loadSong(index) {
  audio.src = songs[index].src;
  document.querySelector(".song-title").innerText = songs[index].title;
  document.querySelector(".song-content h6").innerText = "Ft. " + songs[index].artist;
  audio.load();
}

// Play the current song
function playSong() {
  audio.play();
  playBtn.classList.replace("bx-play", "bx-pause");
}

// Pause the current song
function pauseSong() {
  audio.pause();
  playBtn.classList.replace("bx-pause", "bx-play");
}

// Go to next song
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

// Go to previous song
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

// ========== PROGRESS BAR CONTROL ==========

// Update progress bar as song plays
function updateProgressBar() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  progressBar.style.width = `${progress}%`;
}

// Set current time of song on click
function setProgress(e) {
  const width = progressWrapper.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// ========== VOLUME TOGGLE ==========
volumeIcon.addEventListener("click", () => {
  audio.muted = !audio.muted;

  // Update icon
  if (audio.muted) {
    volumeIcon.classList.remove("ri-volume-up-line");
    volumeIcon.classList.add("ri-volume-mute-line");
  } else {
    volumeIcon.classList.remove("ri-volume-mute-line");
    volumeIcon.classList.add("ri-volume-up-line");
  }
});

// ========== EVENT LISTENERS ==========

// Play/Pause button
playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

// Next and Previous buttons
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Click to seek in progress bar
progressWrapper.addEventListener("click", setProgress);

// Update progress bar
audio.addEventListener("timeupdate", updateProgressBar);

// ========== SONG LIST UI ==========

// Toggle song list visibility
listBtn.addEventListener("click", () => {
  songListDiv.style.display = (songListDiv.style.display === "block") ? "none" : "block";
});

// Handle click on song from list
songListDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const index = parseInt(e.target.getAttribute("data-index"));
    currentSong = index;
    loadSong(currentSong);
    playSong();
    songListDiv.style.display = "none";
  }
});

// ========== INITIALIZATION ==========
loadSong(currentSong);
