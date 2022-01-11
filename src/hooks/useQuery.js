import React, { useState, useEffect } from "react";

const useQuery = (url, obj) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let componentMounted = true;
    fetch(url, (obj = null))
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => componentMounted && setError(err))
      .finally(() => componentMounted && setLoading(false));

    return () => {
      componentMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useQuery;
