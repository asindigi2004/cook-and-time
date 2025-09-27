import { useState } from "react";

export default function IngredientInput({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredients = input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-8">
      <input
        type="text"
        aria-label="Ingredient list"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. tomato, cheese, pasta"
        className="border border-gray-300 rounded px-4 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
