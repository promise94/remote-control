const peer = require("./peer-control");

peer.on("add-stream", playStream);

function playStream(stream) {
  let video = document.getElementById("screen-video");
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    video.play();
  };
}
