import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipesByIgredients() {
  const location = useLocation();
  const Igredient = location.state?.data;

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const BASE_URL_RECIPE = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Igredient}`;
    // const BASE_URL_RECIPE = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`;
    try {
      const response = await fetch(BASE_URL_RECIPE);
      const data = await response.json();
      setRecipes(data.meals);
      console.log(data.meals);
    } catch (err) {
      console.log("deu ruim");
      console.log(err);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [Igredient]);

  console.log(recipes);

  return (
    <div>
      <h1>Recipes By Igredients</h1>
      {recipes.map((recipe) => (
        <>
          <div key={recipe.strMeal} className="recipes_area__card">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="recipes_area__card__img"
              id={recipe.strMeal}
              // onClick={handleRedirect}
            />
            <h3
              className="recipes_area__card__title"
              id={recipe.strMeal}
              // onClick={handleRedirect}
            >
              {recipe.strMeal}
            </h3>
          </div>
        </>
      ))}
    </div>
  );
}
