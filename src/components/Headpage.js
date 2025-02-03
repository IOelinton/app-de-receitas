import React from "react";
import "../styles/Headpage.css";
import { useNavigate } from "react-router-dom";

export default function Headpage() {
  const navigate = useNavigate();
  const handleRedirect = (e) => {
    const myRecipe = e.target.value;
    console.log(myRecipe);
    navigate("/recipe", {
      state: {
        myRecipe,
      },
    });
  };
  return (
    <div className="Headpage">
      <div className="content-area">
        <div className="headepage-left">
          <h1>
            Every day a new <span className="important-word">Recipe</span>
          </h1>
          <p>
            "Discover new possibilities in the kitchen! With Chef's Surprise,
            you get a random recipe every day to inspire your meals in a
            practical and fun way. Surprise yourself and transform your cooking
            routine!"
          </p>
          <div className="headpage-buttons-area">
            <button onClick={handleRedirect} value="randoom">
              Random Recipe
            </button>
          </div>
        </div>
        <div className="headepage-right">
          <img src="/sanduiche.png" alt="hamburger" />
        </div>
      </div>
    </div>
  );
}
