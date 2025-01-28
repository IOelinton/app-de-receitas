import { useEffect, useState } from "react";
import "../styles/RecipeCategories.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export const RecipeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const [showRecipe, setShowRecipe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatergories = async () => {
    const BASE_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRecipes = async (e) => {
    const BASE_URL_RECIPES = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.id}`;
    try {
      const response = await fetch(BASE_URL_RECIPES);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data.meals);
      // console.log(data.meals);
    } catch (err) {
      setError(err.message);
    }
  };

  const getRecipe = async (e) => {
    const BASE_URL_RECIPE = `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.id}`;
    try {
      const response = await fetch(BASE_URL_RECIPE);
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const data = await response.json();
      console.log(e.target.id);
      setRecipe(data.meals);
      console.log(data.meals);
      setShowRecipe(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const UnshowRecipe = () => {
    setShowRecipe(false);
  };

  useEffect(() => {
    fetchCatergories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recipe-categories">
      <div className="recipe-search__container">
        <div className="recipe_search__categories">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {categories.map((category) => (
              <div
                key={category.strCategory}
                className="categories-card"
                id={category.strCategory}
                onClick={getRecipes}
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  id={category.strCategory}
                  onClick={getRecipes}
                />
                <h3 id={category.strCategory} onClick={getRecipes}>
                  {category.strCategory}
                </h3>
                <div className="recipe"></div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="recipes_area">
          <div className="recipes_area__container">
            {recipes.map((recipe) => (
              <>
                <div key={recipe.strMeal} className="recipes_area__card">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="recipes_area__card__img"
                    id={recipe.strMeal}
                    onClick={getRecipe}
                  />
                  <h3
                    className="recipes_area__card__title"
                    id={recipe.strMeal}
                    onClick={getRecipe}
                  >
                    {recipe.strMeal}
                  </h3>
                </div>

                {showRecipe && recipe && (
                  <div className="modal">
                    <button className="close" onClick={UnshowRecipe}>
                      X
                    </button>
                    <h2>Aqui tem um modal</h2>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
