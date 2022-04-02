import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import classes from "./Loading.module.css";

export const Loading = () => {
  const { loading, setLoading } = useState(true);

  return (
    <div className={classes.loadingContainer}>
      <ClipLoader size="60px" loading={loading} />
    </div>
  );
};
