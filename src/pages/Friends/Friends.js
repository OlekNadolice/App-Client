import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./friends.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import useQuery from "../../hooks/useQuery";

const Friends = () => {
  const { id } = useParams();
  const [friends, setFriends] = useState([]);

  const { data, loading, error } = useQuery(
    `http://localhost:8000/auth/users?id=${id}&&type=friends`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  useEffect(() => {
    data && setFriends(data.data.friends);
  }, [data]);

  return (
    <div className={classes.container}>
      <ClipLoader loading={loading} size={"120px"} color="#803939" />
      {!loading && friends.length === 0 && <p>This user doesn't have any friends.</p>}
      {friends.length > 0 &&
        !loading &&
        friends.map(e => {
          return (
            <div className={classes.friendBox} key={e.name + Math.random()}>
              <img src={`http://localhost:8000/images/${e.profileImage}`} alt="" />
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
