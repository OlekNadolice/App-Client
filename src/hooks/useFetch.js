import React, { useState } from "react";

const useFetch = () => {
  const [error, setError] = useState("");
  return async (url, obj, auth) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: auth,
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();

      return data;
    } catch (err) {
      return err;
    }
  };
};

export default useFetch;
