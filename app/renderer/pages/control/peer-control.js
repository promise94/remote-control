const EventEmitters = require("events");
const peer = new EventEmitters();

const { desktopCapturer } = require("electron");

async function getScreenSteam() {
  const screens = await desktopCapturer.getSources({ types: ["screen", "window"] });
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
}
getScreenSteam();
module.exports = peer;
