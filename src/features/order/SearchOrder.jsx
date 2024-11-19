import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-32 px-4 py-2 text-sm transition-all duration-300 bg-yellow-100 rounded-full focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-yellow-500 md:focus:w-72 lg:w-64 placeholder:text-stone-300"
        placeholder="Type order No."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
