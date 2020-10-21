const { ipcMain } = require("electron");
const { create: createControlWindow } = require("./windows/control");
const { send: sendMainWindow } = require("./windows/main");

module.exports = function () {
  ipcMain.handle("login", async () => {
    let localCode = Math.floor(Math.random() * (999999 - 10000)) + 10000;

    return localCode;
  });

  ipcMain.handle("control", async (event, remoteCode) => {
    createControlWindow();
    sendMainWindow("control-state-change", remoteCode, 1);
  });
};
