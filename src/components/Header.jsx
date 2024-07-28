import carbone from '../../carbone.png';

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

export default function Header({
  startSearch,
  currentStatus,
  startSearchFunction,
  goBack,
  zoom,
  zoomMap,
  zoomLabel,
  enlarge,
  enlargeMap,
  enlargeLabel
}) {
  let returnClass = 'back';
  let returnClassSearch = 'done-search';

  if (currentStatus.page === 'MAIN') {
    returnClass = 'none';
  }

  let searchDiv = 'search';

  if (currentStatus.page !== 'DINNER') {
    searchDiv = 'search-div-small';
  }

  let logoCss = 'header';
  if (startSearch) {
    logoCss = 'header-non';
  }
  let headerCss = 'header-div';
  if (startSearch) {
    headerCss = 'header-search';
  }
  return (
    <header>
      {!startSearch && (
        <section className={headerCss}>
          <div className={logoCss}>
            <a onClick={() => window.location.reload()}>
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
