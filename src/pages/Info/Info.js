import { useQuery } from "hooks/imports";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Info = () => {
  const { id } = useParams();
  const [info, setInfo] = useState("");
  const { data, error, loading } = useQuery(`/users?id=${id}&&type=description`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    data && setInfo(data.data.description);
  }, [data]);

  return <div>{info}</div>;
};

export default Info;
