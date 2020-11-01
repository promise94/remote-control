const EventEmitters = require("events");
const { desktopCapturer, ipcRenderer } = require("electron");

const peer = new EventEmitters();

// create answer
// addstream

async function getScreenSteam() {
  const screens = await desktopCapturer.getSources({
    types: ["screen", "window"],
  });
  return new Promise(async (resolve, reject) => {
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
      resolve(stream);
    } catch (e) {
      console.dir(e);
      reject(e);
    }
  });
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
const pc = new RTCPeerConnection({});

async function createAnswer(offer) {
  const screenStream = await getScreenSteam();
  pc.addStream(screenStream);

  pc.setRemoteDescription(offer);
  pc.setLocalDescription(await pc.createAnswer());
  console.log("answer: ", JSON.stringify(pc.localDescription));
  return pc.localDescription;
}

window.createAnswer = createAnswer;
