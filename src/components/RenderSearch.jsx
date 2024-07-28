import FULL from '../../full.json';
import Search from './Search';

export default function RenderSearch({ search, status, setStartSearch, setMode, startSearch, startSearchFunction, setSearch, goBack }) {

    const filteredPlates = FULL.filter((item) => {
        return search === ''
          ? FULL
          : item.name.toLowerCase().includes(search);
      });
    
      let result = '';
    
        result = filteredPlates.map((item) => (
          <ul className="apps" key={item.id}>
            <li key={item.id}>
              <button className='select' onClick={() => setMode(item.name)}>
                <span className="button">{item.name}</span>
              </button>
            </li>
          </ul>
        ));
    
      /*     const filter = (array1, array2, array3) => {
            const arrays = array1.concat(array2, array3);
            console.log(arrays);
            const finalResult = [];
      
            arrays.forEach((record) => {
                const exist = finalResult.find((person) => {
                    return person.id === record.id;
                });
                if (!exist) {
                    finalResult.push(record);
                }
            });
            return finalResult;
        } */
    
    return (
        <>          <div className="search-header">
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
            { result }
        </>
    )
}