/*
 * @Author: lixiaowei
 * @Date: 2020-11-19 22:39:14
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-11-19 22:40:50
 * @Description: file content
 * @FilePath: /signal/Users/lixiaowei/Documents/projects/Electron/geektime-electron/remote-control/app/main/trayAndMenu/index.js
 */

 if (process.platform === "darwin") {
   require("./darwin.js");
 } else if (process.platform === "win32") {
   require("./win32.js")
 }