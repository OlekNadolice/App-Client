import React, { useEffect, useState, useContext } from "react";
import { authContext } from "context/AuthContext";
import { useParams, Link, Outlet } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import classes from "./user.module.css";
import { useQuery, useFetch, useDocumentTitle } from "hooks/imports";

export function User() {
  const { socket } = useContext(authContext);
  const { id } = useParams();
  const request = useFetch();
  const [action, setAction] = useState(false);
  const authorization = `Bearer ${localStorage.getItem("token")}`;
  const { setDocumentTitle } = useDocumentTitle("Loading");
  const clientId = localStorage.getItem("id");

  const {
    data: user,
    loading,
    error,
  } = useQuery(`users/${id}`, {
    headers: {
      authorization,
    },
  });

  const state = {
    canSendFriendsRequest:
      user &&
      user.user._id !== clientId &&
      !user.user.friends.includes(clientId) &&
      !action &&
      !user.user.friendsRequests.includes(clientId),

    canDeleteFriend: user && user.user.friends.includes(clientId) && !action,
  };

  const { canSendFriendsRequest, canDeleteFriend } = state;

  const sendFriendRequestHandler = async () => {
    socket.emit("friendsRequest", { id: localStorage.getItem("id"), targetID: id });
    try {
      const data = await request(
        "users/sendRequest",
        {
          targetID: id,
        },
        authorization
      );
      setAction(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFriendHandler = async () => {
    try {
      const data = await request("users/deleteFriend", { targetID: id }, authorization);
      setAction(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user && setDocumentTitle(user.user.name);
  }, [user]);

  if (user) {
    const { profileImage, name, city } = user.user;
    return (
      <div className={classes.container}>
        <article>
          <section className={classes.userHeader}>
            <div className={classes.sectionLeft}>
              <img
                src={
                  profileImage.includes(".jpg")
                    ? `${process.env.REACT_APP_BACKEND_URL}images/${profileImage}`
                    : profileImage
                }
                alt=""
              />
            </div>
            <div className={classes.sectionRight}>
              <h1>{name}</h1>
              <h4>{city}</h4>
              {canSendFriendsRequest && (
                <button onClick={sendFriendRequestHandler}>Add Friend</button>
              )}

              {canDeleteFriend && <button onClick={deleteFriendHandler}>Delete </button>}

              <div className={classes.sectionRightNav}>
                <Link to={`/users/${id}/friends`}>Friends</Link>
                <Link to={`/users/${id}/info`}>Info</Link>
              </div>
            </div>
          </section>
          <Outlet />
        </article>
      </div>
    );
  } else {
    return (
      <div className={classes.containerLoading}>
        <ClipLoader color={"#803939"} loading={loading} size={"100px"} />
        {error && <h3>{error}</h3>}
      </div>
    );
  }
}
