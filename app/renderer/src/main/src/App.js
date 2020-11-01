/*
 * @Author: lixiaowei
 * @Date: 2020-10-16 12:31:34
 * @LastEditors: lixiaowei
 * @LastEditTime: 2020-11-01 21:48:36
 * @Description: file content
 * @FilePath: /geektime-electron/remote-control/app/renderer/src/main/src/App.js
 */
import React, { useState, useEffect } from "react";
import "./App.css";
import "./peer-puppet";

import { ipcRenderer } from "electron";

function App() {
  const [remoteCode, setRemoteCode] = useState("");
  const [localCode, setLocalCode] = useState("");
  const [controlText, setControlText] = useState("");

  const login = async () => {
    const result = await ipcRenderer.invoke("login");
    setLocalCode(result);
  };

  useEffect(() => {
    console.log("useEffect");
    login();
    ipcRenderer.on("control-state-change", handleStateChange);
    return () => {
      ipcRenderer.removeListener("control-state-change", handleStateChange);
    };
  }, []);

  const startControl = () => {
    ipcRenderer.invoke("control", remoteCode);
  };

  const handleStateChange = (e, name, type) => {
    let text = "";
    if (type === 1) {
      text = `正在被${name}远程控制`;
    } else if (type === 2) {
      text = `正在控制${name}`;
    }
    setControlText(text);
  };

  return (
    <div className="App">
      {controlText === "" ? (
        <>
          <div>你的控制码：{localCode}</div>
          <input
            value={remoteCode}
            onChange={(e) => setRemoteCode(e.target.value)}
          />
          <button onClick={startControl}>确认</button>{" "}
        </>
      ) : (
        <div>{controlText}</div>
      )}
    </div>
  );
}

export default App;
