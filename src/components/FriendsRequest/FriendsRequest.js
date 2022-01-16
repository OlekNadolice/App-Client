import React, { useState, useEffect } from "react";
import classes from "./friendsRequest.module.css";
import useQuery from "../../hooks/useQuery";
import ClipLoader from "react-spinners/ClipLoader";
const FriendsRequest = () => {
  const id = localStorage.getItem("id");
  const [friendsRequests, setFriendsRequests] = useState([]);
  const { data, error, loading } = useQuery(
    `http://localhost:8000/auth/users?id=${id}&&type=friendsRequests`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  useEffect(() => {
    data && setFriendsRequests(data.data.friendsRequests);
  }, [data]);

  const acceptRequestHandler = async (index, targetID) => {
    try {
      const response = await fetch("http://localhost:8000/auth/acceptRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetID: targetID }),
      });
      const data = await response.json();
      setFriendsRequests(prevState => {
        return [...prevState.splice(index, 1)];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const declineRequestHandler = async (index, targetID) => {
    try {
      const response = await fetch("http://localhost:8000/auth/declineRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetID: targetID }),
      });
      const data = await response.json();
      setFriendsRequests(prevState => {
        return [...prevState.splice(index, 1)];
      });
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
                  src={`http://localhost:8000/images/${element.profileImage}`}
                  alt="person"
                />
                <h3>{element.name}</h3>
              </div>
              <div className={classes.btnContainer}>
                <button onClick={() => declineRequestHandler(index, element._id)}>
                  Delete
                </button>
                <button
                  id={element._id}
                  onClick={() => acceptRequestHandler(index, element._id)}
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

export default FriendsRequest;
