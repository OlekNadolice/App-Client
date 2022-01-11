import React, { useEffect, useRef, useContext } from "react";
import { authContext } from "../../context/AuthContext";

import classes from "./settings.module.css";
function Settings() {
  const year = new Date().getFullYear();
  const { token, setUserImage } = useContext(authContext);
  const cityInputRef = useRef("");
  const imageInputRef = useRef("");

  useEffect(() => {
    document.title = "Settings";

    return () => {
      document.title = "";
    };
  }, []);

  const saveSettingsHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.files;
    formData.append("profileImage", files[0]);

    console.log(...formData);
    e.preventDefault();
    fetch("http://127.0.0.1:8000/auth/update", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then(response => {
      localStorage.setItem(
        "profileImage",
        `http://localhost:8000/images/${files[0].name}`
      );
      setUserImage(localStorage.getItem("profileImage"));
    });
  };

  return (
    <div className={classes.container}>
      <h2>Account Settings</h2>
      <form>
        {/* <input type="text" placeholder="City..." ref={cityInputRef} />
        <input type="tel" placeholder="Phone..." />

        <input type="number" placeholder="Height..." min="100" />
        <input type="number" placeholder="Weight..." min="35" />

        <textarea placeholder="Description ..."></textarea> */}

        <label htmlFor="upload-file" className={classes.labelUpload}>
          Upload Photo
        </label>
        <input
          accept=".jpg"
          type="file"
          name="profilePicture"
          id="upload-file"
          ref={imageInputRef}
          onChange={saveSettingsHandler}
        />
        <button>Save</button>
        {/* <button type="submit">submit</button> */}
      </form>
    </div>
  );
}

export default Settings;
