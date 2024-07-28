import RenderItem from './RenderItem';
import RenderMainMenu from './RenderMainMenu';
import RenderSearch from './RenderSearch';
import { useEffect } from 'react';

const searchIcon = (
  <svg
    className="search-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-search"
    viewBox="0 0 16 16"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </svg>
);
export default function Dinner({
  currentStatus,
  setCurrentStatus,
  startSearch,
  setMode,
  goBack,
  search,
  setStartSearch,
  onSet,
  startSearchFunction,
  zoom, 
  enlarge,
  enlargeMap,
  enlargeLabel,
  zoomIngredients,
  checkItems,
  zoomLabel, 
  zoomMap,
  setZoomMap,
  setZoomLabel
}) {

  useEffect(() => {
    if (startSearch) {
      setCurrentStatus((prevStatus) => {
        return {
          ...prevStatus,
          page: "SEARCH"
        }
      })
      console.log(currentStatus.page);
    };
  }, [currentStatus.page]);





  let title = 'title';

  if (currentStatus.selectedItem || currentStatus.page === 'NIGHTSHADES') {
    title = 'title-non';
  }

  return (
    <>
      {startSearch && (
        <RenderSearch
          search={search}
          status={currentStatus}
          startSearch={startSearch}
          setStartSearch={setStartSearch}
          setMode={setMode}
          startSearchFunction={startSearchFunction}
          setSearch={onSet}
          goBack={goBack}
        />
      )}
      {!startSearch && (
        <section className="entire">
          {currentStatus.page !== "DINNER" && !currentStatus.selectedItem && <button onClick={startSearchFunction} className='search2'>
              <span className="search-bar">{searchIcon} search</span>
            </button>}
          <p className={title}>
            {!currentStatus.selectedItem &&
              currentStatus.page !== 'SHELLFISH ALLERGY' &&
              currentStatus.page !== 'FIN FISH ALLERGY' &&
              currentStatus.page !== 'NIGHTSHADES' &&
              currentStatus.page}
            {currentStatus.page === 'SHELLFISH ALLERGY' &&
              'WARNING: CONTAIN SHELLFISH'}
            {currentStatus.page === 'FIN FISH ALLERGY' &&
              'WARNING: CONTAIN FISH FISH'}
            </p>
          {!startSearch && 
              <RenderMainMenu status={currentStatus} setMode={setMode} startSearch={startSearch}/>
            }
          {currentStatus.page === 'NIGHTSHADES' && (
            <p className="nightshades">
              NIGHSHADE ALLERGY INCLUDES: Tomatoes, Potatoes (excluding sweet
              potatoes and yams), Bell peppers (green, red, yellow, and orange
              varieties), Eggplant, Tomatillos, Chili peppers (jalapeños,
              serranos, habaneros), Paprika, Cayenne pepper
            </p>
          )}
          {currentStatus.page === 'NIGHTSHADES' && (
            <p className="nightshades2">THIS DISHES ARE NIGHTSHADE FREE</p>
          )}
          <ul>
            {currentStatus.selectedItem && 
              <RenderItem status={currentStatus} zoom={zoom} enlarge={enlarge} zoomIngredients={zoomIngredients} checkItems={checkItems} zoomLabel={zoomLabel} zoomMap={zoomMap} setZoomMap={setZoomMap} setZoomLabel={setZoomLabel} enlargeMap={enlargeMap} enlargeLabel={enlargeLabel} />
            }
          </ul>
        </section>
      )}
    </>
  );
}
