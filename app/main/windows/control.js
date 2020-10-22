const { BrowserWindow } = require("electron");
const path = require("path");

let win;
function create() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  const url = path.resolve(
    __dirname,
    "../../renderer/pages/control/index.html"
  );

  win.loadURL(`file://${url}`);
}

module.exports = { create };
