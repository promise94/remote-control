/*
 * @Author: lixiaowei
 * @Date: 2020-10-16 12:33:25
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-12-14 10:58:09
 * @Description: file content
 * @FilePath: /signal/Users/lixiaowei/Documents/projects/Electron/geektime-electron/remote-control/app/main/index.js
 */
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const ipcHandle = require("./ipc");
const {
  create: createMainWindow,
  show: showMainWindow,
  close: closeMainWindow,
} = require("./windows/main");
const { create: createControlWindow } = require("./windows/control");
const robot = require("./robot");

const gotAppInstanceLock = app.requestSingleInstanceLock();
if (!gotAppInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", (e, commandLine, workingDirectory) => {
    showMainWindow();
  });
  app.on("will-finish-launching", () => {
    if (!isDev) {
      require("./updater.js");
    }
    require("./crash-reporter").init();
  });
  app.on("ready", () => {
    createMainWindow();
    ipcHandle();
    robot();
    require("./trayAndMenu");
  });

  app.on("activate", () => {
    showMainWindow();
  });

  app.on("before-quit", () => {
    closeMainWindow();
  });
}
