/*
 * @Author: lixiaowei
 * @Date: 2020-11-19 22:41:01
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-11-22 17:35:52
 * @Description: file content
 * @FilePath: /signal/Users/lixiaowei/Documents/projects/Electron/geektime-electron/remote-control/app/main/trayAndMenu/darwin.js
 */

const { app, Tray, Menu, MenuItem } = require("electron");
const path = require("path");
const { create: createAboutWindow } = require("../windows/about");
const { show: showMainWindow } = require("../windows/main");

let tray;
function setTray() {
  tray = new Tray(path.resolve(__dirname, "./icon_darwin.png"));
  tray.on("click", () => {
    showMainWindow();
  });

  tray.on("right-click", () => {
    const contextMenu = Menu.buildFromTemplate([
      { label: "显示", click: showMainWindow },
      { label: "退出", click: app.quit },
    ]);

    tray.popUpContextMenu(contextMenu);
  });
}

function setMenu() {
  let appMenu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        { label: "About", click: createAboutWindow },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    { role: "fileMenu" },
    { role: "windowMenu" },
    { role: "editMenu" },
  ]);

  app.applicationMenu = appMenu;
}

app.whenReady().then(() => {
  setTray();
  setMenu();
});
