import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./friends.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "hooks/imports";

export const Friends = () => {
  const { id } = useParams();
  const [friends, setFriends] = useState([]);
  const server = process.env.REACT_APP_BACKEND_URL;

  const { data, loading, error } = useQuery(`users?id=${id}&&type=friends`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const { showFriends, noFriendsException } = {
    showFriends: friends.length > 0 && !loading,
    noFriendsException: friends.length === 0 && !loading,
  };

  useEffect(() => {
    data && setFriends(data.data.friends);
  }, [data]);

  return (
    <div className={classes.container}>
      <ClipLoader loading={loading} size={"120px"} color="#803939" />
      {noFriendsException && (
        <p className={classes.info}>This user doesn't have any friends.</p>
      )}
      {showFriends &&
        friends.map(e => {
          return (
            <div className={classes.friendBox} key={e.name + Math.random()}>
              <img
                src={
                  e.profileImage.includes(".jpg")
                    ? `${server}images/${e.profileImage}`
                    : e.profileImage
                }
                alt=""
              />
              <div>
                <h3>{e.name}</h3>
                <Link to={`/users/${e._id}`}>Wyswietl Profil </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// export default Friends;
