/*
 * @Author: lixiaowei
 * @Date: 2020-10-16 12:33:25
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-11-01 22:20:05
 * @Description: file content
 * @FilePath: /geektime-electron/remote-control/app/main/index.js
 */
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const ipcHandle = require("./ipc");
const { create: createMainWindow } = require("./windows/main");
const { create: createControlWindow } = require("./windows/control");
const robot = require("./robot");

app.on("ready", () => {
  createMainWindow();
  ipcHandle();
  robot();
});
