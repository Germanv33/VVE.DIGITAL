import React, { FunctionComponent, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "./../../stores/mainStore";

import "./chat.sass";
export interface MyMeassage {
  time: string;
  clientId: number;
  message: string;
}
export const Chat = () => {
  const userStore = store.userStore;
  var start_id: number = 1000;
  var id: number | null = 0;

  if (userStore.role == "customer") {
    start_id = 1000;
  }

  if (userStore.role == "worker") {
    start_id = 0;
  }

  if (!userStore.id == null) {
    id = userStore.id;
  }

  const [clientId, setClienId] = useState(String(start_id) + String(id));

  var url = "ws://localhost:8081/api/v1/ws/" + clientId;
  var ws = new WebSocket(url);

  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [textValue, setTextValue] = useState("");

  const [websckt, setWebsckt] = useState<WebSocket>(ws);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MyMeassage[]>([]);

  function isOpen(ws: WebSocket) {
    return ws.readyState === ws.OPEN;
  }

  useEffect(() => {
    var url = "ws://localhost:8081/api/v1/ws/" + clientId;
    var ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("Connect");
    };

    // recieve message every start page
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };

    setWebsckt(ws);
    //clean up function when we close page
    return () => ws.close();
  }, [messages]);

  const sendMessage = () => {
    console.log("message sended");
    if (isOpen(websckt)) {
      websckt.send(message);
    } else {
      console.log("WS IS CLOSED");
    }
    // recieve message every send message
    websckt.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(e.data);
      setMessages([...messages, message]);
    };
    setMessage("");
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <h2>Your client id: {clientId} </h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            if (value.clientId === Number(clientId)) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="client">client id : {clientId}</p>
                    <p className="message">{value}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">client id : {clientId}</p>
                    <p className="message">{value}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button className="submit-chat" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(Chat);
