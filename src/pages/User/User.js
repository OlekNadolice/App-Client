import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import classes from "./user.module.css";
import useQuery from "../../hooks/useQuery";
function User() {
  const { id } = useParams();
  const [user, setUser] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  const { data, loading, error } = useQuery(`http://localhost:8000/auth/users?id=${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    console.log(data, loading, error);
    data && setUser({ ...data.data });
  }, [id, data]);

  useEffect(() => {
    if (user) {
      document.title = user.name;
    }

    return () => {
      document.title = "Erodate";
    };
  }, [user]);

  // useEffect(() => {
  //   setIsLoading(true);

  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/auth/users?id=${id}`, {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       if (response.status === 200) {
  //         const data = await response.json();
  //         setUser({ ...data.data });
  //         setIsLoading(false);
  //       } else {
  //         setError("User not found");
  //         setIsLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchUser();
  // }, [id]);

  if (user) {
    return (
      <div className={classes.container}>
        <article>
          <section className={classes.userHeader}>
            <div className={classes.sectionLeft}>
              <img src={`http://localhost:8000/images/${user.profileImage}`} alt="" />
            </div>
            <div className={classes.sectionRight}>
              <h1>{user.name}</h1>
              <h4>{user.city}</h4>
              <button>Follow</button>
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
