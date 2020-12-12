/*
 * @Author: lixiaowei
 * @Date: 2020-12-11 23:02:39
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-12-12 21:29:14
 * @Description: file content
 * @FilePath: /signal/Users/lixiaowei/Documents/projects/Electron/geektime-electron/remote-control/app/main/update.js
 */
const { autoUpdater, app, dialog } = require("electron");
const util = require("util");

if (process.platform == "darwin") {
  autoUpdater.setFeedURL(
    "http://127.0.0.1:33855/darwin?version=" + app.getVersion()
  );
} else {
  autoUpdater.setFeedURL(
    "http://127.0.0.1:33855/win32?version=" + app.getVersion()
  );
}

autoUpdater.checkForUpdates(); // 定时轮询更新信息
autoUpdater.on("update-available", () => {
  console.log("update-available");
});

autoUpdater.on("update-downloaded", (e, notes, releaseName, date, url) => {
  // 提醒用户更新
  app.whenReady().then(() => {
    const clickId = dialog.showMessageBoxSync({
      type: "info",
      title: "升级提示",
      message: "已为你升级到最新版，是否立即体验",
      buttons: ["马上升级", "手动重启"],
      clickId: 1,
    });
    if (clickId === 0) {
      autoUpdater.quitAndInstall();
      app.quit();
    }
  });
});

autoUpdater.on("error", (e) => {
  dialog.showMessageBox({
    type: "info",
    title: "升级出错",
    message: util.inspect(e, true, 3, true)
  })
  console.log("auto update error", e);
});
