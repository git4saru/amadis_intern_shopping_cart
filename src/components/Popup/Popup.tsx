import React from "react";
import classes from "./Popup.module.scss";

export interface PopupProps {
  content: any;
}

const Popup: React.FC<PopupProps> = ({ content }) => {
  return (
    <div className={classes.popup}>
      <div className={classes.popup__content}>{content}</div>
    </div>
  );
};

export default Popup;
