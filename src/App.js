import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Headpage from "./components/Headpage";
import { RecipeCategories } from "./components/RecipeCategories";
import "./index.css";
import Recipe from "./pages/recipe";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Headpage /> <RecipeCategories />
              </>
            }
          />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
