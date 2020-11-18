const EventEmitters = require("events");
const { ipcRenderer } = require("electron");
const peer = new EventEmitters();

const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("robotchannel");

dc.onopen = function (e) {
  console.log("data channel 建立成功！");
  peer.on("robot", (type, data) => {
    console.log(type, data);
    if (type === "mouse") {
      data.screen = {
        width: window.screen.width,
        height: window.screen.height,
      };
    }
    // ipcRenderer.invoke("robot", type, data);
    dc.send(JSON.stringify({ type, data }));
  });
};

dc.onerror = function (e) {
  console.log("channel error: ", e);
};

async function createOffer() {
  const offer = await pc.createOffer({
    offerToReceiveAudio: false,
    offerToReceiveVideo: true,
  });
  await pc.setLocalDescription(offer);
  // console.log(JSON.stringify(offer));
  return pc.localDescription;
}

createOffer().then((offer) => {
  console.log("forward offer ", offer);
  ipcRenderer.send("forward", "offer", { type: offer.type, sdp: offer.sdp });
});

ipcRenderer.on("answer", (e, answer) => {
  setRemote(answer);
});

ipcRenderer.on("candidate", (e, candidate) => {
  addIceCandidate(candidate);
});

async function setRemote(answer) {
  await pc.setRemoteDescription(answer);
}

window.setRemote = setRemote;

pc.onicecandidate = (e) => {
  console.log("candidate: ", e.candidate);
  ipcRenderer.send("forward", "control-candidate", e.candidate);
};

const candidates = [];
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

pc.onaddstream = function (e) {
  console.log("add stream", e.stream);
  peer.emit("add-stream", e.stream);
};

module.exports = peer;
