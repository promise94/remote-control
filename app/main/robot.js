const vkey = require("vkey");
const robot = require("robotjs");
const { ipcMain } = require("electron");

function handleMouse(data) {
  const { clientX, clientY, screen, video } = data;
  const x = clientX * (screen.width / video.width);
  const y = clientY * (screen.height / video.height);
  robot.moveMouse(x, y);
  robot.mouseClick();
}

function handleKey(data) {
  const { keyCode, meta, alt, ctrl, shift, key } = data;
  // const key = vkey(keyCode);
  const modified = [];
  meta && modified.pop("meta");
  alt && modified.pop("alt");
  ctrl && modified.pop("ctrl");
  shift && modified.pop("shift");
  let lowerKey = key.toLocaleLowerCase();

  robot.keyTap(key, modified);
}

module.exports = () => {
  ipcMain.handle("robot", (event, type, data) => {
    console.log("robot handle", type, data);
    if (type === "mouse") {
      handleMouse(data);
    } else if (type === "key") {
      handleKey(data);
    }
  });
};
