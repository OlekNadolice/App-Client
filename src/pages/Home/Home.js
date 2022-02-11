import React, { useEffect, useState, useContext } from "react";
import { UserCard } from "components/index";
import { useQuery, useDocumentTitle } from "hooks/imports";
import classes from "./home.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import ReactPaginate from "react-paginate";
import { authContext } from "context/AuthContext";

export function Home() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 8;
  const { setIsLoggedIn, socket } = useContext(authContext);
  const server = process.env.REACT_APP_BACKEND_URL;
  useDocumentTitle("Home");

  const {
    data: users,
    error,
    loading,
  } = useQuery(`/users?page=${page}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const renderUsers = users && !loading && users.data.length >= 1;

  useEffect(() => {
    users && setCount(users.count);
    if (error && error.message === "403") {
      setIsLoggedIn(false);
      socket.disconnect();
    }
  }, [users, error]);

  return (
    <div className={classes.home}>
      <section className={classes.container}>
        {loading && (
          <div className={classes.style}>
            <ClipLoader loading={loading} size={100} color={"#803939"} />
          </div>
        )}

        {renderUsers &&
          users.data.map(element => {
            const { _id: id, name, city, profileImage, age } = element;
            return (
              <UserCard
                key={id}
                id={id}
                name={name}
                city={city}
                profileImage={
                  profileImage.includes(".jpg")
                    ? `${server}/images/${profileImage}`
                    : profileImage
                }
                age={age}
              />
            );
          })}
      </section>

      {count > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={e => setPage(e.selected + 1)}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(count / limit)}
          previousLabel="< previous"
          containerClassName={classes.paginationButtons}
          previousClassName={classes.btn}
          nextClassName={classes.btn}
          activeClassName={classes.active}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
}
