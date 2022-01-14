import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import classes from "./user.module.css";
import useQuery from "../../hooks/useQuery";
function User() {
  const { id } = useParams();
  const [action, setAction] = useState(false);

  const {
    data: user,
    loading,
    error,
  } = useQuery(`http://localhost:8000/auth/users?id=${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const sendFriendRequestHandler = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/sendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetID: id }),
      });
      const data = await response.json();
      setAction(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFriendHandler = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/deleteFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetID: id }),
      });
      const data = await response.json();
      setAction(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      document.title = user.data.name;
      console.log(user.data);
    }

    return () => {
      document.title = "Erodate";
    };
  }, [user]);

  if (user) {
    const { profileImage, name, city } = user.data;
    return (
      <div className={classes.container}>
        <article>
          <section className={classes.userHeader}>
            <div className={classes.sectionLeft}>
              <img src={`http://localhost:8000/images/${profileImage}`} alt="" />
            </div>
            <div className={classes.sectionRight}>
              <h1>{name}</h1>
              <h4>{city}</h4>
              {user.data._id !== localStorage.getItem("id") &&
                !user.data.friends.includes(`${localStorage.getItem("id")}`) &&
                !action && <button onClick={sendFriendRequestHandler}>Add Friend</button>}

              {user.data._id !== localStorage.getItem("id") &&
                user.data.friends.includes(`${localStorage.getItem("id")}`) &&
                !action && <button onClick={deleteFriendHandler}>Delete </button>}

              <div className={classes.sectionRightNav}>
                <Link to={`/users/${id}/friends`}>Friends</Link>
                <Link to={`/users/${id}/posts`}>Posts</Link>
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

export default User;
