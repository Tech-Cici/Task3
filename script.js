const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');

// List of songs
const songs = [
  { title: "Song 1", artist: "Artist 1", src: "Above All - All in All - Michael W. Smith - MASS ANTHEM Cover.mp4" },
  { title: "Song 2", artist: "Artist 2", src: "DEPENDABLE GOD   VICTOR THOMPSON [OFFICIAL LYRIC]--7b331b558dd8cf5399d02f3f339a1eaa.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "In Control   Hillsong Worship--8e2488807129fe841bc0e5107065eb94.mp3" },
  { title: "Song 4", artist: "Artist 4", src: "YESHUA (Drill Remix)--90eed6a5b0dc401e6c713d059e42553f.mp3" },
  { title: "Song 5", artist: "Artist 5", src: "You Are YahWeh (drill remix) song by Steve Crown prd by @Odyssybeatz--1dff49855dbba2d60a91482d2c4ead83.mp3" },
];

let currentIndex = 0;

function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseButton.textContent = "▶️";
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playPauseButton.textContent = "⏸️";
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playPauseButton.textContent = "⏸️";
}

// Event listeners
playPauseButton.addEventListener('click', playPause);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

// Automatically play the next song when the current one ends
audio.addEventListener('ended', () => {
  nextSong();
});

// Initial load
loadSong(currentIndex);

const progressBar = document.getElementById('progress-bar');

// Update progress bar as song plays
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
});

// Allow clicking on the progress bar to change song position
document.querySelector('.progress-container').addEventListener('click', (e) => {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});
