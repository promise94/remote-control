/*
 * @Author: lixiaowei
 * @Date: 2020-11-22 18:14:49
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-11-22 18:17:45
 * @Description: file content
 * @FilePath: /signal/Users/lixiaowei/Documents/projects/Electron/geektime-electron/remote-control/app/renderer/src/main/build.js
 */

 const fs = require("fs-extra");

 const dest = "../../pages/main";

 fs.removeSync(dest);
 fs.moveSync("./build", dest);
