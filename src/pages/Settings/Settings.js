import React, { useEffect, useRef, useContext, useState } from "react";
import useFetch from "hooks/useFetch";
import { authContext } from "context/AuthContext";
import { GoPerson } from "react-icons/go";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { MdOutlinePhotoCamera } from "react-icons/md";
import classes from "./settings.module.css";

function Settings() {
  const { token, setUserImage, setIsLoggedIn } = useContext(authContext);
  const [currentFormContent, setCurrentFormContent] = useState(1);
  const [message, setMessage] = useState("");
  const nameInputRef = useRef("");
  const cityInputRef = useRef("");
  const bioInputRef = useRef("");
  const fetchData = useFetch();
  const fetchAuthorization = `Bearer ${localStorage.getItem("token")}`;

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

    fetch("http://127.0.0.1:8000/auth/update", {
      method: "POST",
      headers: {
        authorization: fetchAuthorization,
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

  const updateUserInfo = async e => {
    e.preventDefault();
    try {
      const response = await fetchData(
        "http://127.0.0.1:8000/auth/updateUserInfo",
        {
          name: nameInputRef.current.value,
          bio: bioInputRef.current.value,
          city: cityInputRef.current.value,
        },
        fetchAuthorization
      );

      response.status === 204 && setMessage("Saved sucesfully");
      nameInputRef.current.value = "";
      cityInputRef.current.value = "";
      bioInputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAccountHandler = async () => {
    const response = await fetchData(
      "http://127.0.0.1:8000/auth/deleteAccount",
      {},
      fetchAuthorization
    );
    if (response.status === 204) {
      setIsLoggedIn(false);
      localStorage.clear();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <aside className={classes.sidebar}>
          <div onClick={() => setCurrentFormContent(1)}>
            <GoPerson />
            <p>Personal Info</p>
          </div>
          <div onClick={() => setCurrentFormContent(2)}>
            <AiOutlineSecurityScan />
            <p>Security</p>
          </div>
          <div onClick={() => setCurrentFormContent(3)}>
            <GoPerson />
            <p>Delete Acccount</p>
          </div>
          <div onClick={() => setCurrentFormContent(4)}>
            <MdOutlinePhotoCamera />
            <p>Upload Photo</p>
          </div>
        </aside>

        {currentFormContent === 1 && (
          <div className={classes.contentSection}>
            {message ? <p className={classes.succes}>{message}</p> : null}
            <div className={classes.formControl}>
              <label htmlFor="">Name</label>
              <input type="text" name="" id="" ref={nameInputRef} />
            </div>

            <div className={classes.formControl}>
              <label htmlFor="">City</label>
              <input type="text" name="" id="" ref={cityInputRef} />
            </div>

            <div className={classes.formControl}>
              <label htmlFor="">Bio</label>
              <textarea ref={bioInputRef}></textarea>
              <button onClick={updateUserInfo}>Save</button>
            </div>
          </div>
        )}

        {currentFormContent === 3 && (
          <div className={classes.contentSection}>
            <h3>Whoa, there !</h3>
            <p>
              Once you delete your account, there's no getting it back. <br />
              All of your data will be lost. <br />
              Make sure you really wanna do this.
            </p>
            <button onClick={deleteAccountHandler}>Delete</button>
          </div>
        )}
      </div>
      {/* <div>
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
        </div> */}
    </div>
  );
}

export default Settings;
