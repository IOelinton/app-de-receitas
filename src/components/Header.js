import React from "react";
import "../styles/Header.css";
import search from "../icons/search.png";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/recipe");
  };

  const handleRedirect2 = () => {
    navigate("/");
  };
  return (
    <header>
      <div className="logo" onClick={handleRedirect2}>
        Logo.
      </div>
      <div className="Search-bar">
        <input type="text" placeholder="Search With An Igredient" />
        <button onClick={handleRedirect}>
          <img src={search} alt="search icon" />
        </button>
      </div>
    </header>
  );
}
