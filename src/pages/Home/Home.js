import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import useFetch from "../../hooks/useFetch";
import classes from "./home.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import ReactPaginate from "react-paginate";

function Home() {
  const post = useFetch();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 8;

  useEffect(() => {
    document.title = "Home";

    return () => {
      document.title = "";
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://127.0.0.1:8000/auth/users?page=${page}`).then(response =>
      response.json().then(data => {
        setUsers(data.data);
        setIsLoading(false);
        setCount(data.count);
        console.log(data);
      })
    );
  }, [page]);

  return (
    <div className={classes.home}>
      <section className={classes.container}>
        {isLoading && (
          <div className={classes.style}>
            <ClipLoader loading={isLoading} size={100} color={"#803939"} />
          </div>
        )}

        {users.length >= 1 &&
          users.map(element => {
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
