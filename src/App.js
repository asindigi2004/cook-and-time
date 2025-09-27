<<<<<<< Updated upstream
import logo from './logo.svg';
import './index.css'; // make sure this points to your Tailwind-imported CSS
import React, { useState } from "react";
import IngredientInput from "./components/IngredientInput";

function App() {
  const [ingredients, setIngredients] = useState([]);

  const handleSearch = (ingArray) => {
    setIngredients(ingArray);
    console.log("Searching for recipes using:", ingArray);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Cook & Time</h1>
      <IngredientInput onSearch = {handleSearch}/>

      <div className='mt-6'>
        {ingredients.length > 0 && (
          <p className='text-grey-700'>
            You searched for: <strong>{ingredients.join(",")}</strong>
          </p>
        )}
      </div>
      
=======
// src/App.js
import { useState } from "react";
import axios from "axios";
import IngredientInput from "./components/IngredientInput"; // Dev A component
import "./index.css"; // Tailwind CSS

// Recipe card component
function RecipeCard({ recipe, onSelect }) {
  return (
    <div
      className="bg-white shadow rounded p-4 w-64 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onSelect(recipe.id)}
    >
      <img src={recipe.image} alt={recipe.title} className="rounded mb-2" />
      <h3 className="font-bold text-lg">{recipe.title}</h3>
      <p className="text-sm text-gray-500 mt-1">
        Used: {recipe.usedIngredientCount} / Missing: {recipe.missedIngredientCount}
      </p>
    </div>
  );
}

// Spoonacular service functions
const SpoonacularService = {
  async findByIngredients(ingredients, number = 5) {
    try {
      const res = await axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
        params: {
          ingredients: ingredients.join(","),
          number,
          apiKey: process.env.REACT_APP_SPOONACULAR_KEY,
        },
      });
      return res.data;
    } catch (error) {
      return { error: error.message || "Failed to fetch recipes" };
    }
  },

  async getAnalyzedInstructions(recipeId) {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
        {
          params: { apiKey: process.env.REACT_APP_SPOONACULAR_KEY },
        }
      );
      return res.data;
    } catch (error) {
      return { error: error.message || "Failed to fetch instructions" };
    }
  },

  async getRecipeInformation(recipeId) {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: { apiKey: process.env.REACT_APP_SPOONACULAR_KEY },
        }
      );
      return res.data;
    } catch (error) {
      return { error: error.message || "Failed to fetch recipe info" };
    }
  },
};

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [error, setError] = useState(null);

  // fetch recipes dynamically
  const fetchRecipes = async (ingredients) => {
    const result = await SpoonacularService.findByIngredients(ingredients, 5);
    if (result.error) {
      setError(result.error);
      setRecipes([]);
    } else {
      setError(null);
      setRecipes(result);
    }
  };

  // fetch instructions and info for a selected recipe
  const handleSelectRecipe = async (recipeId) => {
    const instr = await SpoonacularService.getAnalyzedInstructions(recipeId);
    const info = await SpoonacularService.getRecipeInformation(recipeId);

    if (instr.error || info.error) {
      setError(instr.error || info.error);
      setInstructions([]);
      setSelectedRecipe(null);
    } else {
      setError(null);
      setInstructions(instr);
      setSelectedRecipe(info);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-8">
      <header className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-700">Cook & Time</h1>
        <p className="mt-2 text-gray-500 text-sm">
          Search recipes by ingredients you have at home
        </p>
      </header>

      {/* Ingredient input from Dev A */}
      <IngredientInput onSearch={fetchRecipes} />

      {/* Error display */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Recipe cards */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center w-full">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onSelect={handleSelectRecipe} />
        ))}
      </div>

      {/* Recipe instructions */}
      {selectedRecipe && instructions.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded shadow w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h2>
          <img src={selectedRecipe.image} alt={selectedRecipe.title} className="rounded mb-4" />
          <h3 className="font-semibold mb-1">Instructions:</h3>
          <ol className="list-decimal ml-5">
            {instructions[0]?.steps?.map((step) => (
              <li key={step.number} className="mb-1">{step.step}</li>
            ))}
          </ol>
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
