import { useEffect, useState } from "react";
import "../styles/RecipeCategories.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const RecipeCategories = () => {
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    fetchCatergories();
  }, []);

  // Configurações do carrossel
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recipe-catergories">
      <div className="recipe-search__container">
        <h1>Categorias</h1>
        <div className="recipe_search__categories">
          <Slider {...settings}>
            {categories.map((category) => (
              <div
                key={category.strCategory}
                className="categories-card"
                id={category.strCategory}
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                />
                <h3>{category.strCategory}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
