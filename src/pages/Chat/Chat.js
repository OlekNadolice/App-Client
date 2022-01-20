import React, { useEffect, useState, useRef, useMemo } from "react";
import classes from "./chat.module.css";
import useQuery from "../../hooks/useQuery";
import { io } from "socket.io-client";

// const socket = io("http://127.0.0.1:8000", {
//   query: {
//     user: localStorage.getItem("id"),
//   },
//   autoConnect: false,

// });

const Chat = () => {
  const [users, setUsers] = useState([]);
  const messageInput = useRef("");
  const [message, setMessage] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const socket = useMemo(
    () =>
      io("http://127.0.0.1:8000", {
        query: {
          user: localStorage.getItem("id"),
        },
        autoConnect: false,
      }),
    []
  );

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const { data, loading, error } = useQuery("http://localhost:8000/messenger/", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    data && setUsers(data.data.friends);
    data && socket.emit("active", { id: localStorage.getItem("id") });
    console.log("renderuje sie typie znowu..");
  }, [data]);

  useEffect(() => {
    socket.on("message", message => {
      if (message.author === currentUser) {
        setMessage(prevState => [
          ...prevState,
          { text: message.message, author: message.author },
        ]);
      }
    });

    socket.on("findChat", data => {
      console.log("mamy chat");
      if (!data) {
        setMessage([]);
        console.log("nie ma czatu ale dziala");
      }
      data &&
        setMessage(
          data.map(e => {
            return { text: e.text, author: e.author };
          })
        );
    });

    socket.on("active", data => {
      if (data.length > 0) {
        const activeUsers = data.map(e => e.id);
        const updatedUsers = users.map(e => {
          if (activeUsers.includes(e._id)) {
            return (e = { ...e, online: true });
          } else {
            return (e = { ...e });
          }
        });
        console.log("renderuje ciagle");
        setUsers([...updatedUsers]);
      }
    });

    // return () => socket.removeAllListeners();
  });

  const sentMessage = async () => {
    console.log(currentUser);
    await socket.emit("message", {
      message: messageInput.current.value,
      id: localStorage.getItem("id"),
      target: currentUser,
    });
    setMessage(prevState => [
      ...prevState,
      { text: messageInput.current.value, author: localStorage.getItem("id") },
    ]);
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
                {element.online && <span></span>}
                <h2>{element.name}</h2>
              </div>
            );
          })}
      </aside>
      <div className={classes.chat}>
        <div className={classes.chatMessages}>
          {message.length > 0 &&
            message.map(element => (
              <h1
                key={Math.random()}
                className={
                  element.author == localStorage.getItem("id") ? classes.me : null
                }
              >
                {element.text}
              </h1>
            ))}
        </div>
        <div className={classes.chatForm}>
          <textarea className={classes.formInput} ref={messageInput}></textarea>
          <button onClick={sentMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
