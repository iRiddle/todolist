import React from "react";
import cx from "classnames";
import format from "date-fns/format";

import "./style.css";

import editPath from "../../static/icons/edit.svg";

import { getColorPriority } from "../../utils";

const Case = ({
  title,
  description,
  date,
  priority,
  onRemove,
  onComplete,
  onEdit,
  isEdit,
  id,
  isCompleted
}) => {
  return (
    <div className={cx("case", getColorPriority(priority))}>
      <div className="case__header">
        <div className="header-left">
          <h3>{title}</h3>
          <span className="case__date">
            {format(new Date(date), "dd.MM.yyyy")}
          </span>
        </div>
        <div className="header-right">
          <span onClick={() => onComplete(id)} className="case_complete">
            &#10003;
          </span>
          <img
            src={editPath}
            onClick={() => onEdit(id)}
            alt="Редактировать"
          ></img>
          <span
            onClick={isEdit ? false : () => onRemove(id)}
            className="case_remove"
          >
            X
          </span>
        </div>
      </div>
      {!!description && <p>{description}</p>}
      {isCompleted && <p className="case_completed">COMPLETED</p>}
    </div>
  );
};

export default Case;
