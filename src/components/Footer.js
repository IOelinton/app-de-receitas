import React from "react";

import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Copyright &copy; 2025</p>
      <div>
        <p>
          Apis used:{" "}
          <a href="https://www.thecocktaildb.com/api.php">CocktailDB</a>
        </p>
      </div>
    </footer>
  );
}
