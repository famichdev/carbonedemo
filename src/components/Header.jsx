import carbone from '../../carbone.png';

const searchIcon = (
  <svg
    className="search-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </svg>
);

export default function Header({
  startSearch,
  currentStatus,
  setMode,
  startSearchFunction,
  goBack,
  zoom,
  zoomMap,
  zoomLabel,
  enlarge,
  enlargeMap,
  enlargeLabel
}) {

  const returnClass = currentStatus.page === 'MAIN' ? 'none' : 'back';
  const searchDiv = currentStatus.page === 'DINNER' ? 'search' : 'search-div-small';
  const logoCss = startSearch ? 'header-non' : 'header';
  const headerCss = startSearch ? 'header-search' : 'header-div';
  
  return (
    <header>
      {!startSearch && (
        <section className={headerCss}>
          <div className={logoCss}>
            <a onClick={() =>setMode('DINNER')}>
              <img src={carbone} className="carbone" alt="carbone"></img>
            </a>
          </div>
          {!currentStatus.selectedItem && currentStatus.page === 'DINNER' && (
            <div>
              <button onClick={startSearchFunction} className={searchDiv}>
                <span className="search-bar">{searchIcon} search</span>
              </button>
            </div>
          )}
          {startSearch && (
            <div className={returnClassSearch}>
              <button onClick={goBack}>Return</button>
            </div>
          )}
          {!zoom && !zoomMap && !zoomLabel && currentStatus.page !== 'DINNER' && !startSearch && (
            <div className={returnClass}>
              <button onClick={() => goBack()}>Return</button>
            </div>
          )}
          {zoom && (
            <div className={returnClass}>
              <button onClick={() => enlarge()}>Close</button>
            </div>
          )}
          {zoomMap && (
            <div className={returnClass}>
              <button onClick={() => enlargeMap()}>Close</button>
            </div>
          )}
          {zoomLabel && (
            <div className={returnClass}>
              <button onClick={() => enlargeLabel()}>Close</button>
            </div>
          )}
        </section>
      )}
    </header>
  );
}
