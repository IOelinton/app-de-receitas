import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/recipesByIgredients.css";

export default function RecipesByIgredients() {
  const location = useLocation();
  const Igredient = location.state?.data;

  const [recipes, setRecipes] = useState([]); // Inicialize como array vazio
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRecipes = async () => {
    const BASE_URL_RECIPE = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Igredient}`;
    try {
      const response = await fetch(BASE_URL_RECIPE);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.meals || []); // Use um array vazio se data.meals for null
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Igredient) {
      getRecipes();
    }
  }, [Igredient]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }
  return (
    <div className="container-recipesbyigredients">
      <h1>Recipes By Ingredients:</h1>
      {recipes && recipes.length > 0 ? (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipes_area__card">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipes_area__card__img"
                id={recipe.strMeal}
              />
              <h3 className="recipes_area__card__title" id={recipe.strMeal}>
                {recipe.strMeal}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="container-recipesbyigredients-error">
          <h2>No recipes found for this ingredient.</h2>
        </div>
      )}
    </div>
  );
}
