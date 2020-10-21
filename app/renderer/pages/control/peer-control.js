const EventEmitters = require("events");
const peer = new EventEmitters();

const { desktopCapturer } = require("electron");

async function getScreenSteam() {
  const screens = await desktopCapturer.getSources({ types: ["screen"] });
  console.log(screens);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: screens[0].id,
          maxWidth: window.screen.width,
          maxHeight: window.screen.height,
        },
      },
    });

    peer.emit("add-stream", stream);
  } catch (error) {
    console.dir(e);
  }
}
getScreenSteam();
module.exports = peer;
