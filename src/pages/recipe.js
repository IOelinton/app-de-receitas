import React from "react";
import "../styles/recipe.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Recipe() {
  const location = useLocation();
  const recipeName = location.state?.myRecipe;

  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(null);

  const getRecipe = async () => {
    if (recipeName === "randoom") {
      const BASE_URL_RECIPE =
        "https://www.themealdb.com/api/json/v1/1/random.php";
      try {
        const response = await fetch(BASE_URL_RECIPE);
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data.meals);
        console.log(data.meals);
      } catch (err) {
        setError(err.message);
      }
    } else {
      const BASE_URL_RECIPE = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`;
      try {
        const response = await fetch(BASE_URL_RECIPE);
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data.meals);
        console.log(data.meals);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  React.useEffect(() => {
    if (recipeName) {
      getRecipe();
    }
  }, [recipeName]);

  if (!recipeName) {
    return <div>Nenhuma receita selecionada</div>;
  }

  if (error) {
    return <div>Erro ao carregar a receita: {error}</div>;
  }
  return (
    <div>
      {recipe && recipe.length > 0 && (
        <div className="recipe-container">
          <div className="title-area">
            <h2>{recipe[0].strMeal}</h2>
            <h3>Origin: {recipe[0].strArea}</h3>
          </div>
          <img
            className="recipe-img"
            src={recipe[0].strMealThumb}
            alt={recipe[0].strMeal}
          />
          <div className="recipe-container__ingredients">
            <div className="ingredients">
              <h3>Ingredients</h3>
              <ul>
                {Object.keys(recipe[0])
                  .filter(
                    (key) => key.startsWith("strIngredient") && recipe[0][key]
                  )
                  .map((key) => (
                    <li key={key}>
                      <label>
                        <input type="checkbox" />
                        {recipe[0][key]} -{" "}
                        {recipe[0][key.replace("strIngredient", "strMeasure")]}"
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="divisor"></div>

            <div className="directions">
              <h3>Instructions</h3>
              <p>{recipe[0].strInstructions}</p>
            </div>
          </div>
          <div className="references">
            <h3>References:</h3>
            <ul>
              {recipe[0].strYoutube && (
                <li>
                  <a
                    href={recipe[0].strYoutube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {recipe[0].strYoutube}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
