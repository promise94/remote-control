const { ipcMain } = require("electron");
const {
  create: createControlWindow,
  send: sendControlWindow,
} = require("./windows/control");
const { send: sendMainWindow } = require("./windows/main");
const signal = require("./signal");

module.exports = function () {
  /**
   * 接收到登陆请求
   */
  ipcMain.handle("login", async () => {
    // 从服务端获取code
    let { code } = await signal.invoke("login", null, "logined");

    return code;
  });

  /**
   * 接收子进程控制请求
   */
  ipcMain.handle("control", async (event, remote) => {
    signal.send("control", { remote });
  });

  signal.on("controlled", (data) => {
    sendMainWindow("control-state-change", data.remote, 2);
    createControlWindow();
  });

  signal.on("be-controlled", (data) => {
    sendMainWindow("control-state-change", data.remote, 1);
  });

  /**
   * 傀儡的、控制端共享的消息转发通道
   */
  ipcMain.on("forward", (e, event, data) => {
    signal.send("forward", { event, data });
  });

  /**
   * 接收控制端的offer，发送给傀儡端
   */
  signal.on("offer", (data) => {
    sendMainWindow("offer", data);
  });

  /**
   * 接收傀儡端 answer,发送给控制端
   */
  signal.on("answer", (data) => {
    sendControlWindow("answer", data);
  });

  /**
   * puppet candidate，发送给控制端
   */
  signal.on("puppet-candidate", (data) => {
    sendControlWindow("candidate", data);
  });

  /**
   * 控制端candidate，发送给傀儡端
   */
  signal.on("control-candidate", (data) => {
    sendMainWindow("candidate", data);
  });
};
