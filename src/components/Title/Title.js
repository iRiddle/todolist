import React from "react";
import "./style.css";

export const TitleH1 = ({ title, onClick }) => {
  return <h1 onClick={onClick}>{title}</h1>;
};

export const TitleH2 = ({ title }) => {
  return <h2>{title}</h2>;
};
