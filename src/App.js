import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Headpage from "./components/Headpage";
import { RecipeCategories } from "./components/RecipeCategories";
import "./index.css";
import Recipe from "./pages/recipe";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
                <Headpage /> <RecipeCategories />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
