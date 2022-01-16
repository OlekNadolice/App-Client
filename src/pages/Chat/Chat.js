import React, { useEffect, useState, useRef } from "react";
import classes from "./chat.module.css";
import useQuery from "../../hooks/useQuery";
import socketIOClient from "socket.io-client";
const Chat = () => {
  const [users, setUsers] = useState([]);
  const messageInput = useRef("");
  const [message, setMessage] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const socket = socketIOClient("http://127.0.0.1:8000");
  const { data, loading, error } = useQuery("http://localhost:8000/messenger/", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    data && setUsers(data.data.friends);
  }, [data]);

  useEffect(() => {
    socket.on("connect", () => console.log("Podlaczony"));
    socket.on("message", message => setMessage(prevState => [...prevState, message]));
    socket.emit("newUser", { id: localStorage.getItem("id") });

    socket.on("findChat", data =>
      setMessage(
        data.map(e => {
          return [e.text];
        })
      )
    );

    // return () => socket.emmit("disconnect", { id: localStorage.getItem("id") });
  }, []);

  const sentMessage = async () => {
    console.log(currentUser);
    await socket.emit("message", {
      message: messageInput.current.value,
      id: localStorage.getItem("id"),
      target: currentUser,
    });
    messageInput.current.value = "";
  };

  const findChatMessages = async secondUserId => {
    setCurrentUser(secondUserId);
    await socket.emit("findChat", {
      id: localStorage.getItem("id"),
      secondUserId: secondUserId,
    });

    console.log("zmienione user");
  };

  return (
    <div className={classes.chatContainer}>
      <aside className={classes.sidebar}>
        {users.length > 0 &&
          users.map(element => {
            return (
              <div onClick={() => findChatMessages(element._id)} key={element._id}>
                <img
                  src={`http://localhost:8000/images/${element.profileImage}`}
                  alt=""
                />
                <h2>{element.name}</h2>
              </div>
            );
          })}
      </aside>
      <div className={classes.chat}>
        {message.length > 0 &&
          message.map(element => <h1 key={Math.random()}>{element}</h1>)}
        <input type="text " ref={messageInput} />

        <button onClick={sentMessage}>Join a room</button>
      </div>
    </div>
  );
};

export default Chat;
