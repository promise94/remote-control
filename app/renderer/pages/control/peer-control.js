const EventEmitters = require("events");
const peer = new EventEmitters();

const { desktopCapturer, ipcRenderer } = require("electron");

async function getScreenSteam() {
  const screens = await desktopCapturer.getSources({
    types: ["screen", "window"],
  });
  console.log(screens);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: screens[screens.length - 1].id,
          maxWidth: window.screen.width,
          maxHeight: window.screen.height,
        },
      },
    });
    console.log(stream);
    peer.emit("add-stream", stream);
  } catch (e) {
    console.dir(e);
  }

  /*   const sources = await desktopCapturer.getSources({ types: ["screen"] });

  navigator.webkitGetUserMedia(
    {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: sources[0].id,
          maxWidth: window.screen.width,
          maxHeight: window.screen.height,
        },
      },
    },
    (stream) => {
      peer.emit("add-stream", stream);
    },
    (err) => {
      //handle err
      console.error(err);
    }
  ); */
}
getScreenSteam();

peer.on("robot", (type, data) => {
  console.log(type, data);
  if (type === "mouse") {
    data.screen = {
      width: window.screen.width,
      height: window.screen.height,
    };
  }
  ipcRenderer.invoke("robot", type, data);
});

module.exports = peer;
