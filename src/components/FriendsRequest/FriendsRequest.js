import React, { useState, useEffect } from "react";
import classes from "./friendsRequest.module.css";
import { useQuery } from "hooks/imports";
import ClipLoader from "react-spinners/ClipLoader";
export const FriendsRequest = () => {
  const id = localStorage.getItem("id");
  const server = process.env.REACT_APP_BACKEND_URL;
  const [friendsRequests, setFriendsRequests] = useState([]);
  const { data, error, loading } = useQuery(`/users?id=${id}&&type=friendsRequests`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    data && setFriendsRequests(data.data.friendsRequests);
    data && console.log(friendsRequests);
  }, [data]);

  const acceptRequestHandler = async targetID => {
    setFriendsRequests(prevState => {
      return [...prevState.filter(e => e._id !== targetID)];
    });
    try {
      const response = await fetch(`${server}/users/acceptRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetID: targetID }),
      });
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const declineRequestHandler = async targetID => {
    setFriendsRequests(prevState => {
      return [...prevState.filter(e => e._id !== targetID)];
    });
    try {
      const response = await fetch(`${server}/users/declineRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetID: targetID }),
      });
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      {friendsRequests.length >= 1 &&
        friendsRequests.map((element, index) => {
          return (
            <div className={classes.requestFriendComponent} key={element._id}>
              <div className={classes.containerInfo}>
                <img
                  src={
                    element.profileImage.includes(".jpg")
                      ? `${server}/images/${element.profileImage}`
                      : element.profileImage
                  }
                  alt="person"
                />
                <h3>{element.name}</h3>
              </div>
              <div className={classes.btnContainer}>
                <button onClick={() => declineRequestHandler(element._id)}>Delete</button>
                <button
                  id={element._id}
                  onClick={() => acceptRequestHandler(element._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}

      {friendsRequests.length === 0 && !loading && (
        <div className={classes.noContentContainer}>
          <p>Currently no requests.</p>
        </div>
      )}

      {loading && (
        <div className={classes.spinnerContainer}>
          <ClipLoader color="#803939" size={"90px"} loading={loading} />
        </div>
      )}
    </div>
  );
};
