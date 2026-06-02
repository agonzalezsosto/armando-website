let goCrazy = true;
let hold = false;

let container;
let audioPlayer;
let currentImage;

function init() {
  container = document.getElementById("container");
  audioPlayer = document.getElementById("audioPlaya");
}

function onClick() {
  goCrazy = !goCrazy;

  container.style.backgroundImage = `url("../maze-assets/posts/img_${Math.floor(Math.random() * 400)}.jpg")`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.backgroundRepeat = "no-repeat";

  audioPlayer.src = "../audio/albums/fall-17/gandoca.mp3";
  audioPlayer.play();
}

function start() {
  setInterval(() => {
    if (goCrazy) {
      const newImage = document.createElement("img");
      const id = Math.floor(Math.random() * 400).toString();
      newImage.src = `../maze-assets/posts/img_${id}.jpg`;
      newImage.style.width = `${Math.random() * 20 + 5}vw`;
      newImage.style.position = "absolute";
      newImage.style.top = `${Math.floor(Math.random() * window.innerHeight) - newImage.height}px`;
      newImage.style.left = `${Math.floor(Math.random() * window.innerWidth) - newImage.width}px`;
      newImage.id = 1;

      container.appendChild(newImage);
      newImage.onmousedown = (event) => {
        onClick();
        currentImage = event.target;
        mousePressed = true;
      };

      if (container.children.length > 50) {
        const oldestChild = container.firstElementChild;
        container.removeChild(oldestChild);
      }
    }
  }, 10);
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  start();
});

document.addEventListener("keydown", () => {
  hold = !hold;
});
