import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import useQuery from "../../hooks/useQuery";
import classes from "./home.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import ReactPaginate from "react-paginate";

function Home() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 8;

  const {
    data: users,
    error,
    loading,
  } = useQuery(`http://127.0.0.1:8000/auth/users?page=${page}`);

  useEffect(() => {
    document.title = "Home";
    users && setCount(users.count);

    return () => {
      document.title = "";
    };
  }, [users]);

  return (
    <div className={classes.home}>
      <section className={classes.container}>
        {loading && (
          <div className={classes.style}>
            <ClipLoader loading={loading} size={100} color={"#803939"} />
          </div>
        )}

        {users &&
          users.data.length >= 1 &&
          users.data.map(element => {
            return (
              <UserCard
                key={element._id}
                id={element._id}
                name={element.name}
                city={element.city}
                profileImage={`http://localhost:8000/images/${element.profileImage}`}
                age={element.age}
              />
            );
          })}
      </section>

      {count > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={e => setPage(e.selected + 1)}
          pageRangeDisplayed={5}
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

export default Home;
