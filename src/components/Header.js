import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <header>
      <div className="logo">Logo</div>
      <div className="Search-bar">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
    </header>
  );
}
