import React from "react";
import cx from "classnames";

import "./style.css";

const Input = ({
  type,
  placeholder,
  onChange,
  value,
  priorities,
  priorityCase
}) => {
  console.log(priorities);
  switch (type) {
    case "text": {
      return (
        <input
          type={type}
          placeholder={placeholder}
          className="input"
          onChange={onChange}
          value={value}
        ></input>
      );
    }
    case "date": {
      return (
        <input
          type={type}
          placeholder={placeholder}
          className="input"
          onChange={onChange}
          value={value}
        ></input>
      );
    }
    case "textarea": {
      return (
        <textarea
          placeholder={placeholder}
          className={cx("input", "textarea")}
          rows="10"
          onChange={onChange}
          value={value}
        ></textarea>
      );
    }
    case "select": {
      return (
        <select className="input" onChange={onChange}>
          {priorities.map(priority => (
            <option
              value={priority.value}
              key={priority.value}
              selected={priority.value === parseInt(priorityCase)}
            >
              {priority.title}
            </option>
          ))}
        </select>
      );
    }

    default: {
      return null;
    }
  }
};

export default Input;
