/*
 * @Author: lixiaowei
 * @Date: 2020-10-16 12:33:25
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-10-20 22:40:02
 * @Description: file content
 * @FilePath: /geektime-electron/remote-control/app/main/index.js
 */
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const ipcHandle = require("./ipc");
const { create: createMainWindow } = require("./windows/main");
const { create: createControlWindow } = require("./windows/control");

app.on("ready", () => {
  createControlWindow();
  ipcHandle();
});
