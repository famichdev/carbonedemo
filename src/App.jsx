import Header from './components/Header';
import { useState, useEffect } from 'react';
import Dinner from './components/Menu';
import ChatGPTComponent from './components/ChatGPT';
import Weather from './components/Weather';



function App() {
  let status = {
    page: 'DINNER',
    selectedItem: null,
  };


  const [currentStatus, setCurrentStatus] = useState(status);
  const [prevPage, setPrevPage] = useState(status);
  const [zoom, setZoom] = useState(false);
  const [zoomMap, setZoomMap] = useState(false);
  const [zoomLabel, setZoomLabel] = useState(false);
  const [zoomFood, setZoomFood] = useState(null);
  const [zoomIngredients, setZoomIngredients] = useState(null);

  const [search, setSearch] = useState('');
  const [startSearch, setStartSearch] = useState(false);
  const [stillSearching, setStillSearching] = useState(false);
  const [prevSearch, setPrevSearch] = useState(false);

  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {

    const handlePopState = () => {
      window.alert('USE RETURN BUTTON ON TOP OF THE SCREEN');
      setShowWarning(true);
      window.history.pushState(null, null, window.location.pathname);
    };

    const handleBeforeUnload = (event) => {
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        return;
      }
      event.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    window.history.pushState(null, null, window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
    

  const enlargeMap = () => {
    if (zoomMap) {
      setZoomMap(false);
    }
    else {
      setZoomMap(true);
    }
  };

    const enlargeLabel = () => {
      if (zoomLabel) {
        setZoomLabel(false);
        console.log(zoomLabel)
      }
      else {
        setZoomLabel(true);
      }
     }


  
  const updateWindowPosition = () => {
    setWindowPosition({ x: window.scrollX, y: window.scrollY });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateWindowPosition);
    return () => {
      window.removeEventListener('scroll', updateWindowPosition);
    };
  }, [currentStatus.page]);

  function startSearchFunction() {
    setStartSearch(true);
    setPrevSearch(currentStatus);
    setPrevPage(status);
    status = {
      page: 'SEARCH',
      selectedItem: null,
    };
    setCurrentStatus(status);
  }

  function checkItems() {
    setZoomIngredients(true);
  }


  function setMode(setting) {
    setPrevPosition(windowPosition);
    window.scrollTo(0, 0);
    setPrevPage(currentStatus);
    if (startSearch) {
      setStillSearching(true);
    }
    if (
      setting !== 'WHITES BY THE GLASS' &&
      setting !== 'WINE LIST' &&
      setting !== 'BEVERAGE' &&
      setting !== 'ANTIPASTI' &&
      setting !== 'DOWNLOAD MATRIX' &&
      setting !== 'A PIACERE' &&
      setting !== 'CARNI' &&
      setting !== 'DINNER' &&
      setting !== 'ZUPPA E INSALATE' &&
      setting !== 'DESSERTS' &&
      setting !== 'MACARONI' &&
      setting !== 'GLUTEN FREE' &&
      setting !== 'NUT FREE' &&
      setting !== 'DAIRY FREE' &&
      setting !== 'VEGAN OPTIONS' &&
      setting !== 'VEGETARIAN OPTIONS' &&
      setting !== 'DESSERT' &&
      setting !== 'EGGS FREE' &&
      setting !== 'SHELLFISH ALLERGY' &&
      setting !== 'FIN FISH ALLERGY' &&
      setting !== 'NUTMEG FREE' &&
      setting !== 'NIGHTSHADES' &&
      setting !== 'ALCOHOL FREE' &&
      setting !== 'SEARCH'
    ) {
      status = {
        page: 'private',
        selectedItem: setting,
      };
      setStartSearch(false);
      setCurrentStatus(status);
    } else {
      status = {
        selectedItem: null,
        page: setting,
      };
    }
    setCurrentStatus(status);
  }

  function goBack() {
    if (startSearch) {
      setStartSearch(false);
      setCurrentStatus(prevSearch);
      scrollTo(prevPosition.x, prevPosition.y);
      return;
    } else if (stillSearching) {
      console.log('CATCH' + prevPage.page);
      setStillSearching(false);
      setStartSearch(true);
      setCurrentStatus(prevPage);
      scrollTo(prevPosition.x, prevPosition.y);
      return;
    } else if (
      !currentStatus.selectedItem
    ) {
      scrollTo(prevPosition.x, prevPosition.y);
      status = {
        page: 'DINNER',
        selectedItem: null,
      };
      setCurrentStatus(status);
      return;
    }
    scrollTo(prevPosition.x, prevPosition.y);
    setCurrentStatus(prevPage);
  }

  function enlarge() {
    if (zoom) {
      setZoom(false);
    } else {
      window.scrollTo(0, 0);
      setZoom(true);
    }
  }

  return (
    <>
      <Header
        search={search}
        goBack={goBack}
        setSearch={setSearch}
        setMode={setMode}
        startSearch={startSearch}
        setStartSearch={setStartSearch}
        startSearchFunction={startSearchFunction}
        currentStatus={currentStatus}
        zoom={zoom}
        enlarge={enlarge}
        zoomMap={zoomMap}
        zoomLabel={zoomLabel}
        enlargeLabel={enlargeLabel}
        enlargeMap={enlargeMap}
      />
      <Dinner
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        startSearchFunction={startSearchFunction}
        setStartSearch={setStartSearch}
        setMode={setMode}
        stillSearching={stillSearching}
        startSearch={startSearch}
        goBack={goBack}
        search={search}
        setStillSearching={setStillSearching}
        setPrevSearch={setPrevSearch}
        onSet={setSearch}
        zoom={zoom}
        enlarge={enlarge}
        enlargeMap={enlargeMap}
        enlargeLabel={enlargeLabel}
        zoomIngredients={zoomIngredients}
        checkItems={checkItems}
        zoomLabel={zoomLabel}
        zoomMap={zoomMap}
        setZoomMap={setZoomMap}
        setZoomLabel={setZoomLabel}
      />
    </>
  );
}

export default App;
