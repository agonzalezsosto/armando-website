const audioElement = document.querySelector(".audio");
const sliderElement = document.querySelector(".player-progress-bar");
const bigPlayButton = document.querySelector(".big-play");
let isPlaying = false;

const AUDIO_PATH = "../audio/albums/fall-17/";

// AUDIO

function setFile(file) {
  audioElement.src = file;
}

function playAudio() {
  audioElement.play();
  setPauseIcon(bigPlayButton);
  isPlaying = true;
}

function pauseAudio() {
  audioElement.pause();
  setPlayIcon(bigPlayButton);
  isPlaying = false;
}

function getSongPlayingCurrently() {
  return audioElement.src;
}

function trackNameToPath(name) {
  return AUDIO_PATH + name + ".mp3";
}

function handleAudioFinishedPlaying() {
  const currentButton = getButtonFromSrc(getSongPlayingCurrently());
  setPlayIcon(currentButton);

  const currentRow = currentButton.closest("li");
  const nextRow = currentRow.nextElementSibling;

  if (nextRow) {
    const fileName = trackNameToPath(nextRow.querySelector("span").innerText);
    setFile(fileName);
    setPauseIcon(getButtonFromSrc(fileName));
    playAudio();
  }
}

// UI

function setPauseIcon(button) {
  button.textContent = "⏸";
}

function setPlayIcon(button) {
  button.textContent = "▶";
}

function getButtonFromSrc(src) {
  const all = document.querySelectorAll(".play");
  for (const btn of all) {
    const name = btn.parentElement.querySelector("span").innerText;
    if (src.endsWith(name + ".mp3")) return btn;
  }
  return null;
}

function getSongNameFromButton(button) {
  return button.parentElement.querySelector("span").innerText;
}

// PROGRESS BAR

function handleSongProgress() {
  const percentage = (audioElement.currentTime / audioElement.duration) * 100;
  if (percentage) setProgressBar(percentage);
}

function setProgressBar(value) {
  sliderElement.value = value;
}

// HANDLING

function handleBigPlayButton(button) {
  if (isPlaying) {
    pauseAudio();
    const otherButton = getButtonFromSrc(audioElement.src);
    if (otherButton) setPlayIcon(otherButton);
  } else {
    if (getSongPlayingCurrently()) {
      playAudio();
      const otherButton = getButtonFromSrc(audioElement.src);
      if (otherButton) setPauseIcon(otherButton);
    }
  }
}

function handleTablePlayButton(button) {
  const selectedFile = trackNameToPath(getSongNameFromButton(button));
  const songPlayingCurrently = getSongPlayingCurrently();

  document.querySelector(".current-song").innerHTML =
    getSongNameFromButton(button);

  if (selectedFile === songPlayingCurrently) {
    if (isPlaying) {
      pauseAudio();
      setPlayIcon(button);
    } else {
      playAudio();
      setPauseIcon(button);
    }
  } else {
    if (songPlayingCurrently) {
      const oldButton = getButtonFromSrc(songPlayingCurrently);
      if (oldButton) setPlayIcon(oldButton);
    }
    setFile(selectedFile);
    playAudio();
    setPauseIcon(button);
    setProgressBar(0);
  }
}

function handleSlider(e) {
  audioElement.currentTime = (e.target.value / 100) * audioElement.duration;
}

// INIT

function initPlaylist() {
  const firstSpan = document.querySelector("ol li span");
  const fileName = trackNameToPath(firstSpan.innerText);
  setFile(fileName);
  document.querySelector(".current-song").innerHTML = firstSpan.innerText;
}

audioElement.addEventListener("ended", handleAudioFinishedPlaying);
audioElement.addEventListener("timeupdate", handleSongProgress);
sliderElement.addEventListener("input", handleSlider);
bigPlayButton.addEventListener("click", () =>
  handleBigPlayButton(bigPlayButton),
);

document.querySelectorAll(".play").forEach((button) => {
  button.addEventListener("click", () => handleTablePlayButton(button));
});

initPlaylist();
