import React, { useState } from "react";
import "../styles/Header.css";
import search from "../icons/search.png";
import { useNavigate } from "react-router-dom";

import chefhat from "../icons/cook-hat.png";

export default function Header() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(""); // Novo estado para o input
  const handleRedirect = () => {
    navigate("/");
  };

  const handleRedirect2 = () => {
    navigate("/RecipesByIgredients", {
      state: {
        data: searchValue, // Usando o valor do estado
      },
    });
  };

  // Nova função para atualizar o estado quando o input mudar
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRedirect2();
    }
  };
  return (
    <header>
      <div className="logo" onClick={handleRedirect}>
        <img src={chefhat} alt="chef hat" />
      </div>
      <div className="Search-bar">
        <input
          type="text"
          placeholder="Search With An Igredient"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleRedirect2}>
          <img src={search} alt="search icon" />
        </button>
      </div>
    </header>
  );
}
