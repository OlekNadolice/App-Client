import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Info = () => {
  const { id } = useParams();
  const [info, setInfo] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/auth/users?id=${id}&&type=description`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(data => setInfo(data.data.description))
      .catch(err => console.log(err));
  }, []);

  return <div>{info}</div>;
};

export default Info;
