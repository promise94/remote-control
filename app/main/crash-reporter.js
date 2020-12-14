/*
 * @Author: lixiaowei
 * @Date: 2020-12-12 22:20:23
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-12-12 22:25:11
 * @Description: file content
 * @FilePath: /signal/Users/lixiaowei/Documents/projects/Electron/geektime-electron/remote-control/app/main/crash-reporter.js
 */
const { crashReporter } = require("electron");

function init() {
  crashReporter.start({
    productName: "Mercurius",
    companyName: "geektime",
    submitURL: "http://127.0.0.1:33855/crash",
  });
}
module.exports = { init };
