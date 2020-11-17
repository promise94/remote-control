const WebSocket = require("ws");
const EventEmitter = require("events");

const signal = new EventEmitter();

const ws = new WebSocket("ws://localhost:8010");

ws.on("open", () => {
  console.log("websocket open");
});

ws.on("message", (message) => {
  let data;
  try {
    data = JSON.parse(message);
    console.log("message:", data);
    signal.emit(data.event, data.data);
  } catch (error) {
    console.log("parse error");
  }
});

function send(event, data) {
  ws.send(JSON.stringify({ event, data }));
}

function invoke(event, data, answerEvent) {
  return new Promise((resolve, reject) => {
    send(event, data);
    signal.once(answerEvent, resolve);

    setTimeout(() => {
      reject("timeout");
    }, 5000);
  });
}

signal.send = send;
signal.invoke = invoke;

module.exports = signal;
