import React, { useContext, useReducer, useState } from "react";
import { useFetch, useDocumentTitle } from "hooks/imports";

import { authContext } from "context/AuthContext";
import { Link } from "react-router-dom";
import { MdOutlinePhotoCamera, MdDone, MdPerson } from "react-icons/md";
import classes from "./settings.module.css";
import reducer, { formState } from "./settingsReducer";
import { Modal } from "components";

function Settings() {
  const { setUserImage, setIsLoggedIn } = useContext(authContext);
  const [state, dispatch] = useReducer(reducer, formState);
  const { name, city, bio, submited, currentFormContent } = state;
  const [isOpen, setIsOpen] = useState(false);
  const fetchData = useFetch();
  const fetchAuthorization = `Bearer ${localStorage.getItem("token")}`;
  const server = process.env.REACT_APP_BACKEND_URL;
  useDocumentTitle("Settings");

  const saveSettingsHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.files;
    formData.append("profileImage", files[0]);

    fetch(`${server}/auth/update`, {
      method: "POST",
      headers: {
        authorization: fetchAuthorization,
      },
      body: formData,
    }).then(response => {
      localStorage.setItem("profileImage", `${server}images/${files[0].name}`);
      setUserImage(localStorage.getItem("profileImage"));
    });
  };

  const updateUserInfo = async e => {
    e.preventDefault();
    try {
      const response = await fetchData(
        "/auth/updateUserInfo",
        {
          name,
          bio,
          city,
        },
        fetchAuthorization
      );

      if (response.status === 204) dispatch({ type: "SUBMIT" });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAccountHandler = async () => {
    const response = await fetchData("/auth/deleteAccount", {}, fetchAuthorization);
    if (response.status === 204) {
      setIsLoggedIn(false);
      localStorage.clear();
    }
  };

  if (submited) {
    return (
      <div className={classes.containerFlex}>
        <MdDone className={classes.successIcon} />
        <p className={classes.container_info}>Updated successfully</p>
        <button>
          <Link to="/home">Close</Link>
        </button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <aside className={classes.sidebar}>
          <div onClick={() => dispatch({ type: "CHANGE_FORM_CONTENT", payload: 1 })}>
            <MdPerson />
            <p>Personal Info</p>
          </div>

          <div onClick={() => dispatch({ type: "CHANGE_FORM_CONTENT", payload: 3 })}>
            <MdPerson />
            <p>Delete Acccount</p>
          </div>
          <div onClick={() => dispatch({ type: "CHANGE_FORM_CONTENT", payload: 4 })}>
            <MdOutlinePhotoCamera />
            <p>Upload Photo</p>
          </div>
        </aside>

        {currentFormContent === 1 && (
          <div className={classes.contentSection}>
            <h3>Change your Personal Info</h3>

            <div className={classes.formControl}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name=""
                id=""
                onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value })}
              />
            </div>

            <div className={classes.formControl}>
              <label htmlFor="">City</label>
              <input
                type="text"
                name=""
                id=""
                onChange={e => dispatch({ type: "SET_CITY", payload: e.target.value })}
              />
            </div>

            <div className={classes.formControl}>
              <label htmlFor="">Bio</label>
              <textarea
                onChange={e => dispatch({ type: "SET_BIO", payload: e.target.value })}
              ></textarea>
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
            <button onClick={() => setIsOpen(true)}>Delete</button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Delete Account">
              <div className={classes.deleteContainer}>
                <p>Are you sure that you want to delete your acccount ?</p>

                <div>
                  <button onClick={() => setIsOpen(false)}>Cancel</button>
                  <button onClick={deleteAccountHandler}>Delete</button>
                </div>
              </div>
            </Modal>
          </div>
        )}
        {currentFormContent === 4 && (
          <div className={classes.uploadPhotoContainer}>
            <p className={classes.info}>
              Here you can upload your photo, remember that only format JPEG is allowed.
            </p>
            <label htmlFor="upload-file" className={classes.labelUpload}>
              Upload Photo
            </label>
            <input
              accept=".jpg"
              type="file"
              name="profilePicture"
              id="upload-file"
              onChange={saveSettingsHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
