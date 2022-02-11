import React, { useState } from "react";

export const useFetch = () => {
  const [error, setError] = useState("");

  return async (url, obj, auth) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
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
