import { useEffect, useRef } from 'react';


export default function Search({
  search,
  onSet,
  searchOn,
  goBack
}) {
  
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOn) {
      inputRef.current.focus();
    }
  }, [searchOn]);

  let returnClassSearch = 'done-search';

  return (
    <>
      {searchOn && <div className={returnClassSearch}>
          <button onClick={goBack}>Return</button>
        </div>}
      {searchOn && (
        <div className="search-on-div">
          <input
            type="text"
            className="search-active"
            ref={inputRef}
            value={search}
            onChange={(event) => onSet(event.target.value.toLowerCase())}
            placeholder="Search..."
          />
        </div>
      )}
    </>
  );
}
