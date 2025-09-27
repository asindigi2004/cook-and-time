// src/components/RecipeCard.jsx
export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow rounded p-4 w-64">
      {/* Recipe image */}
      <img src={recipe.image} alt={recipe.title} className="rounded mb-2" />

      {/* Recipe title */}
      <h3 className="font-bold text-lg">{recipe.title}</h3>

      {/* Optional: show used/missed ingredients */}
      <p className="text-sm text-gray-500 mt-1">
        Used: {recipe.usedIngredientCount} / Missing: {recipe.missedIngredientCount}
      </p>

      {/* Button to view recipe instructions (later) */}
      <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
        View Recipe
      </button>
    </div>
  );
}
