/*
 * @Author: lixiaowei
 * @Date: 2020-11-19 22:12:45
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-11-19 22:46:55
 * @Description: file content
 * @FilePath: /signal/Users/lixiaowei/Documents/projects/Electron/geektime-electron/remote-control/app/main/windows/about.js
 */

const openAboutWindow = require("about-window").default;
const path = require("path");

const create = () =>
  openAboutWindow({
    icon_path: path.resolve(__dirname, "icon.png"),
    package_json_dir: path.resolve(__dirname, "../../../package.json"),
    copyright: "Copyright (c) 2020",
    description: "WatchYou",
    product_name: "WatchYou",
  });

module.exports = { create };
