const EventEmitters = require("events");
const { ipcRenderer } = require("electron");
const peer = new EventEmitters();

/* peer.on("robot", (type, data) => {
  console.log(type, data);
  if (type === "mouse") {
    data.screen = {
      width: window.screen.width,
      height: window.screen.height,
    };
  }
  ipcRenderer.invoke("robot", type, data);
}); */

const pc = new RTCPeerConnection();

pc.onicecandidate = (e) => {
  console.log("candidate: ", JSON.stringify(e.candidate));
};

let candidates = [];
async function addIceCandidate(candidate) {
  if (candidate) {
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

async function createOffer() {
  const offer = await pc.createOffer({
    offerToReceiveAudio: false,
    offerToReceiveVideo: true,
  });
  await pc.setLocalDescription(offer);
  console.log(JSON.stringify(offer));
  return pc.localDescription;
}

createOffer();

async function setRemote(answer) {
  await pc.setRemoteDescription(answer);
}

window.setRemote = setRemote;

pc.onaddstream = function (e) {
  console.log("add stream", e.stream);
  peer.emit("add-stream", e.stream);
};

module.exports = peer;
