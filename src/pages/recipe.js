import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Recipe() {
  const location = useLocation();
  const recipeName = location.state?.myRecipe; // Corrigido para acessar myRecipe

  // Descomentando e ajustando a função getRecipe para usar o recipeName
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(null);

  const getRecipe = async () => {
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
  };

  // Usando useEffect para carregar a receita quando o componente montar
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
      <h1>Recipe</h1>
      <p>Nome da receita: {recipeName}</p>
      {recipe && recipe.length > 0 && (
        <div>
          <h2>{recipe[0].strMeal}</h2>
          <img src={recipe[0].strMealThumb} alt={recipe[0].strMeal} />
          <h3>Instruções:</h3>
          <p>{recipe[0].strInstructions}</p>
        </div>
      )}
    </div>
  );
}
