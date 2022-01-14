import React from "react";
import ReactDOM from "react-dom";
import classes from "./modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, setIsOpen, children, title }) => {
  if (isOpen)
    return ReactDOM.createPortal(
      <div className={classes.overlay}>
        <div className={classes.modal}>
          <div className={classes.absolute}>
            <div className={classes.title}>
              {title}
              <AiOutlineClose
                onClick={() => setIsOpen(false)}
                className={classes.modalCloseIcon}
              />
            </div>
            {children}
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );

  if (!isOpen) return null;
};

export default Modal;
