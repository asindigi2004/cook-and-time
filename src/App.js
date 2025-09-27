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
      
    </div>
  );
}

export default App;
