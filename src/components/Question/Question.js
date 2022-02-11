import React, { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";

import { RiCloseFill } from "react-icons/ri";
import classes from "./question.module.css";
export const Question = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.questionContainer}>
      <div>
        <h5>{title}</h5>
        {!isOpen ? (
          <HiOutlinePlusSm className={classes.icon} onClick={openHandler} />
        ) : (
          <RiCloseFill className={classes.icon} onClick={openHandler} />
        )}
      </div>
      {isOpen && <p>{description}</p>}
    </div>
  );
};
