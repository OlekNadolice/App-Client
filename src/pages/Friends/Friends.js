import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./friends.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import friends from "./testData";
const Friends = () => {
  const { id } = useParams();
  // const [friends, setFriends] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`http://localhost:8000/auth/users?id=${id}&&type=friends`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then(response => {
  //       if (response.status === 200) {
  //         return response.json();
  //       } else {
  //         throw new Error("Ups something went wrong");
  //       }
  //     })
  //     .then(data => {
  //       console.log(data.data.friends);
  //       setIsLoading(false);
  //       setFriends(data.data.friends);
  //       data.data.friends.length === 0 &&
  //         setMessage("This user doesnt have any friends right now");
  //     });
  // }, []);

  return (
    <div className={classes.container}>
      {/* <ClipLoader loading={isLoading} size={"120px"} color="#803939" /> */}
      {/* {message && message} */}
      {friends.length > 0 &&
        friends.map(e => {
          return (
            // <div className={classes.friendBox} key={e._id}>
            <div className={classes.friendBox} key={e.name + Math.random()}>
              {/* <img src={`http://localhost:8000/images/${e.profileImage}`} alt="" /> */}
              <img src={`${e.profileImage}`} alt="" />
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

export default Friends;
