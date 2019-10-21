import React from "react";
import cx from "classnames";

import "./style.css";

const Button = ({ title, placeholder, onClick, className }) => {
  return (
    <button
      placeholder={placeholder}
      onClick={onClick}
      className={cx("button", className)}
    >
      {title}
    </button>
  );
};

export default Button;
