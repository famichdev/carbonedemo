import FULL from '../../full.json';
import Search from './Search';

export default function RenderSearch({ search, status, setStartSearch, setMode, startSearch, startSearchFunction, setSearch, goBack }) {
  
  // Corrected filtering logic for name search
  const filteredPlates = search === ''
    ? FULL // Return FULL when search is empty
    : FULL.filter(item => item.name.toLowerCase().includes(search.toLowerCase())); // Ensure case-insensitive search

  // Search by ingredient function
  const searchByIngredient = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    const filteredDishes = FULL.filter(dish =>
      dish.breakdown && dish.breakdown.some(ingredient => // Assuming 'breakdown' contains ingredients
        ingredient.toLowerCase().includes(lowerCaseQuery)
      )
    );
    
    return filteredDishes;
  };

  // Perform ingredient search
  const ingredientSearchResults = searchByIngredient(search);

  // Combine name search and ingredient search results, and filter duplicates by id
  const combinedResults = [...filteredPlates, ...ingredientSearchResults];
  const uniqueResults = combinedResults.filter((item, index, self) =>
    index === self.findIndex((i) => i.id === item.id)
  );

  // Render the unique results
  const renderedResults = uniqueResults.map((item) => (
    <ul className="apps" key={item.id}>
      <li key={item.id}>
        <button className='select' onClick={() => setMode(item.name)}>
          <span className="button">{item.name}</span>
        </button>
      </li>
    </ul>
  ));

  return (
    <>
      <div className="search-header">
        <Search
          status={status}
          search={search}
          onSet={setSearch}
          setMode={setMode}
          searchOn={startSearch}
          setStartSearch={setStartSearch}
          startSearchFunction={startSearchFunction}
          goBack={goBack}
        />
      </div>

      {/* Render unique filtered results */}
      {renderedResults}
    </>
  );
}
  