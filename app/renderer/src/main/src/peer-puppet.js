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

pc.ondatachannel = (e) => {
  console.log("ondatachannel", e);
  e.channel.onmessage = (e) => {
    console.log("message", e);
    try {
      const { type, data } = JSON.parse(e.data);
      ipcRenderer.invoke("robot", type, data);
    } catch (error) {
      console.error(error);
    }
  };
};

pc.onicecandidate = (e) => {
  console.log("candidate: ", e.candidate);
  ipcRenderer.send("forward", "puppet-candidate", e.candidate);
};

let candidates = [];
async function addIceCandidate(candidate) {
  if (candidate && candidate.type) {
    candidates.push(candidate);
    if (pc.remoteDescription && pc.remoteDescription.type) {
      for (let i = 0; i < candidates.length; i++) {
        await pc.addIceCandidate(candidates[i]);
      }
      candidates = [];
    }
  }
}

window.addIceCandidate = addIceCandidate;

async function createAnswer(offer) {
  const screenStream = await getScreenSteam();
  pc.addStream(screenStream);

  await pc.setRemoteDescription(offer);
  await pc.setLocalDescription(await pc.createAnswer());
  console.log("answer: ", JSON.stringify(pc.localDescription));
  return pc.localDescription;
}

ipcRenderer.on("offer", (e, offer) => {
  createAnswer(offer).then((answer) => {
    ipcRenderer.send("forward", "answer", {
      type: answer.type,
      sdp: answer.sdp,
    });
  });
});

window.createAnswer = createAnswer;
