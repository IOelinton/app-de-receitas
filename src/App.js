import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Headpage from "./components/Headpage";
import { RecipeCategories } from "./components/RecipeCategories";

import "./index.css";
import "./styles/App.css";
import Recipe from "./pages/recipe";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeCard from "./components/RecipeCard";
import RecipesByIgredients from "./pages/recipesByIgredients";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Headpage />
                <RecipeCard />
                <RecipeCategories />
                <Footer />
              </>
            }
          />
          <Route
            path="/recipe"
            element={
              <>
                <Header />
                <Recipe />
                <Footer />
              </>
            }
          />
          <Route
            path="/RecipesByIgredients"
            element={
              <>
                <Header />
                <RecipesByIgredients />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
