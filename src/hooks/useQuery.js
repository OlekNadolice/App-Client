import React, { useState, useEffect } from "react";

const useQuery = (url, obj = null) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    let componentMounted = true;

    fetch(`http://localhost:8000/${url}`, obj)
      .then(response => {
        if (response.status === 403) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => componentMounted && setData(data))
      .catch(err => componentMounted && setError(err))
      .finally(() => componentMounted && setLoading(false));

    return () => {
      componentMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useQuery;
