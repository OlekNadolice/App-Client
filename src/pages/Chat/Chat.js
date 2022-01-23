import React, { useEffect, useState, useRef, useContext } from "react";
import classes from "./chat.module.css";
import useQuery from "hooks/useQuery";
import { authContext } from "context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineSend } from "react-icons/ai";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const messageInput = useRef("");
  const messagesEndRef = useRef(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const [message, setMessage] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const { socket } = useContext(authContext);

  const { data, loading, error } = useQuery("http://localhost:8000/messenger/", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    let componentMounted = true;
    componentMounted && (document.title = "Chat");
    return () => (componentMounted = false);
  }, []);

  useEffect(() => {
    messagesEndRef?.current.scroll({ top: messagesEndRef.current.scrollHeight });
  }, [message]);

  useEffect(() => {
    let componentMounted = true;

    if (componentMounted && data) {
      setUsers(data.data.friends);
      socket.emit("active", { id: localStorage.getItem("id") });
    }

    return () => (componentMounted = false);
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on("message", message => {
        if (message.author === currentUser) {
          setMessage(prevState => [
            ...prevState,
            {
              text: message.message,
              author: message.author,
            },
          ]);
        }
      });

      socket.on("findChat", data => {
        data
          ? setMessage(
              data.map(e => {
                return { text: e.text, author: e.author, created: e.created };
              })
            )
          : setMessage([]);
      });

      socket.on("active", response => {
        if (response.length > 0) {
          const activeUsers = response.map(e => e.id);
          const updatedUsers = users.map(e => {
            if (activeUsers.includes(e._id)) {
              return (e = { ...e, online: true });
            } else {
              return (e = { ...e });
            }
          });
          setUsers([...updatedUsers]);
        }
      });
      return () => socket.removeAllListeners();
    }
  });

  const sentMessage = async () => {
    await socket.emit("message", {
      message: messageInput.current.value,
      id: localStorage.getItem("id"),
      target: currentUser,
    });
    setMessage(prevState => [
      ...prevState,
      {
        text: messageInput.current.value,
        author: localStorage.getItem("id"),
        created: new Date(Date.now()),
      },
    ]);
    messageInput.current.value = "";
  };

  const findChatMessages = async (secondUserId, name) => {
    setCurrentUser(secondUserId);
    setCurrentUserName(name);
    await socket.emit("findChat", {
      id: localStorage.getItem("id"),
      secondUserId: secondUserId,
    });
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <ClipLoader size={"100"} color={"#803939"} loading={loading}></ClipLoader>
      </div>
    );
  }

  return (
    <div className={classes.chatContainer}>
      <aside className={classes.sidebar}>
        {users.length > 0 &&
          users.map(element => {
            return (
              <div
                onClick={() => findChatMessages(element._id, element.name)}
                key={element._id}
              >
                <img
                  src={`http://localhost:8000/images/${element.profileImage}`}
                  alt=""
                />
                {element.online && <span></span>}
                <h2>{element.name}</h2>
              </div>
            );
          })}
        {users.length === 0 && <p>Currently no friends</p>}
      </aside>
      <div className={classes.chat}>
        <div className={classes.chatMessages} ref={messagesEndRef}>
          {message.length > 0 &&
            message.map(element => (
              <>
                <h1
                  key={Math.random()}
                  className={
                    element.author == localStorage.getItem("id") ? classes.me : null
                  }
                >
                  {element.text}
                </h1>

                <h2
                  className={
                    element.author == localStorage.getItem("id") ? classes.mine : null
                  }
                >
                  {new Date(Date.parse(element.created)).toLocaleString()}
                </h2>
              </>
            ))}
        </div>
        <div className={classes.chatForm}>
          <textarea
            placeholder="Say something ..."
            className={classes.formInput}
            ref={messageInput}
          ></textarea>
          <button onClick={currentUser ? sentMessage : null}>
            <AiOutlineSend className={classes.sendIcon}></AiOutlineSend>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
