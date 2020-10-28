const peer = require("./peer-control");

peer.on("add-stream", playStream);

function playStream(stream) {
  let video = document.getElementById("screen-video");
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    video.play();
  };

  video.addEventListener("click", (e) => {
    console.log(e);
    const videoRect = video.getBoundingClientRect();
    const data = {
      clientX: e.clientX,
      clientY: e.clientY,
      video: {
        width: videoRect.width,
        height: videoRect.height,
      },
    };

    peer.emit("robot", "mouse", data);
  });

  window.onkeyup = (e) => {
    console.log(e);
    const {
      key,
      keyCode,
      metaKey: meta,
      altKey: alt,
      ctrlKey: ctrl,
      composed,
      shiftKey: shift,
    } = e;

    peer.emit("robot", "key", { key, keyCode, meta, alt, ctrl, shift, composed });
  };
}
