import React, { useEffect, useRef, useContext, useReducer } from "react";
import classes from "./chat.module.css";
import { useQuery, useDocumentTitle } from "hooks/imports";
import { authContext } from "context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineSend } from "react-icons/ai";
import chatReducer, { initialState } from "./chatReducer";
import { toast } from "react-toastify";

export const Chat = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { users, currentUser, currentUserName, message } = state;
  const messageInput = useRef("");
  const messagesEndRef = useRef(null);
  const { socket } = useContext(authContext);
  useDocumentTitle("Chat");

  const { data, loading, error } = useQuery("messenger/", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    users.length > 0 &&
      messagesEndRef?.current.scroll({ top: messagesEndRef.current.scrollHeight });
  }, [message]);

  useEffect(() => {
    let componentMounted = true;

    if (componentMounted && data) {
      dispatch({ type: "FETCH_USERS", payload: data.data.friends });
      socket.emit("active", { id: localStorage.getItem("id") });
    }

    return () => (componentMounted = false);
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on("message", message => {
        if (message.author === currentUser) {
          dispatch({
            type: "RECEIVE_MESSAGE",
            payload: {
              text: message.message,
              author: message.author,
              created: message.created,
            },
          });
        } else {
          toast(` ${message.senderName} has send you a message`, {
            className: "a",
          });
        }
      });

      socket.on("findChat", data => {
        data
          ? dispatch({
              type: "FIND_CONVERSATIONS",
              payload: data.map(e => {
                return { text: e.text, author: e.author, created: e.created };
              }),
            })
          : dispatch({ type: "FIND_CONVERSATIONS", payload: [] });
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

          dispatch({ type: "FETCH_USERS", payload: updatedUsers });
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
      created: new Date(Date.now()),
    });

    dispatch({
      type: "SEND_MESSAGE",
      payload: {
        text: messageInput.current.value,
        author: localStorage.getItem("id"),
        created: new Date(Date.now()),
      },
    });
    messageInput.current.value = "";
  };

  const findChatMessages = async (secondUserId, name) => {
    dispatch({ type: "FIND_CURRENT_USER", payload: [secondUserId, name] });
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

  if (users.length === 0) {
    return (
      <div className={classes.flexContainer}>
        <p>Drogi uzytkowniku, aby korzystać z chatu musisz posiadać znajomych. </p>
      </div>
    );
  }

  if (users.length > 0) {
    return (
      <div className={classes.chatContainer}>
        <aside className={classes.sidebar}>
          {users.map(element => {
            return (
              <div
                onClick={() => findChatMessages(element._id, element.name)}
                key={element._id}
              >
                <img
                  src={
                    element.profileImage.includes(".jpg")
                      ? `${process.env.REACT_APP_BACKEND_URL}images/${element.profileImage}`
                      : element.profileImage
                  }
                  alt=""
                />
                {element.online && <span></span>}
                <h2>{element.name}</h2>
              </div>
            );
          })}
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
              placeholder={
                currentUserName
                  ? ` You are talking with ${currentUserName}`
                  : "Say something to your friend..."
              }
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
  }
};
