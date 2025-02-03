import React, { useState, useEffect } from "react";
import "../styles/recipe.css";

const RecipeCard = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRecipe = async () => {
    setLoading(true);
    try {
      const BASE_URL_RECIPE =
        "https://www.themealdb.com/api/json/v1/1/random.php";
      const response = await fetch(BASE_URL_RECIPE);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      setRecipe(data.meals[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []); // Agora o useEffect não depende de nenhuma prop

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar a receita: {error}</div>;
  }

  if (!recipe) {
    return <div>Nenhuma receita encontrada</div>;
  }

  return (
    <div className="recipe-container">
      <div className="title-area">
        <h2>{recipe.strMeal}</h2>
        <h3>Origin: {recipe.strArea}</h3>
      </div>
      <img
        className="recipe-img"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <div className="recipe-container__ingredients">
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(recipe)
              .filter((key) => key.startsWith("strIngredient") && recipe[key])
              .map((key) => (
                <li key={key}>
                  <label>
                    <input type="checkbox" />
                    {recipe[key]} -{" "}
                    {recipe[key.replace("strIngredient", "strMeasure")]}
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <div className="divisor"></div>

        <div className="directions">
          <h3>Instructions</h3>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
      <div className="references">
        <h3>References:</h3>
        <ul>
          {recipe.strYoutube && (
            <li>
              <a href={recipe.strYoutube} target="_blank" rel="noreferrer">
                {recipe.strYoutube}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
