import { useEffect, useState, useRef } from 'react';
import FULL from '../../full.json';
import RenderPairing from '../components/RenderPairing';
import RenderWine from './RenderWine';

export default function RenderItem({ status, zoom, enlarge, zoomIngredients, checkItems, zoomLabel, zoomMap, setZoomLabel, setZoomMap, enlargeMap, enlargeLabel}) {
  const [theme, setTheme] = useState('spiel');
  const [setting, setSetting] = useState('ingredients');

  const currentItem = FULL.findIndex((item) => {
    return item.name === status.selectedItem;
  });


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [status.page]);

  const menu_btn = useRef(null);
  const menu_btn2 = useRef(null);

  let submenu =
    setting === 'ingredients'
      ? 'menu-btn2-disabled'
      : 'menu-btn2';
  let submenu1 = setting === 'serving' ? 'menu-btn2-disabled' : 'menu-btn2';


  useEffect(() => {
    if (menu_btn.current) {
      menu_btn.current.disabled = setting === 'ingredients' ? true : false;
    }
    if (menu_btn2.current) {
      menu_btn2.current.disabled = setting === 'serving' ? true : false;
    }
    if (setting === 'serving') {
      if (menu_btn.current) {
        menu_btn.current.disabled = false;
      }
    }
    if (setting !== 'serving') {
      if (menu_btn2.current) {
        menu_btn2.current.disabled = false;
      }
    }
  }, [setting]);


  const renderCss = zoom ? 'zoom' : null;

/*   const modifiable =
    FULL[currentItem]['allergies-mod']?.map((allergie, index) => (
      <h3 key={index} className="allergies">
        {allergie}
      </h3>
    )) || '';

  const serving =
    FULL[currentItem]['set']?.map((set, index) => (
      <h3 key={index} className="allergies">
        {set}
      </h3>
    )) || '';

  const breakdown =
    FULL[currentItem]['breakdown']?.map((set, index) => (
      <h3 key={index} className="allergies">
        {set}
      </h3>
    )) || '';

  const nonModifiable =
    FULL[currentItem]['allergies-not']?.map((allergie, index) => (
      <h3 key={index} className="allergies">
        {allergie}
      </h3>
    )) || ''; */
  
  console.log(status.selectedItem);
 
  return (
    <>
      {zoom && (
        <div className="backdrop" onClick={() => enlarge()}>
          <h2 className='title'>{FULL[currentItem].name}</h2>
          {FULL[currentItem].pics.map((pic, index) => {
            return (
              <ul key={index}>
                <li>
                  <img className="enlarge-pic" src={pic} alt="pics"></img>
                </li>
              </ul>
            );
          })}
        </div>
      )}
      {zoomIngredients === 'active' && (
        <div className="backdrop" onClick={() => enlarge()}>
          <h2 className='title'>{FULL[currentItem].name}</h2>
          </div>
      )}
      {status.selectedItem === 'DOWNLOAD MATRIX' &&
        <div className='matrix'>
          <a href='/public/food.pdf' className="menu-btn2" alt="food-matrix">FOOD MATRIX</a>
       <a href='/public/bev.pdf'className="menu-btn2" alt="food-matrix">BEV MATRIX</a>
      </div> }
      <section className={renderCss}>
        {FULL[currentItem]['beverage'] && <RenderWine status={status} zoomLabel={zoomLabel} zoomMap={zoomMap} enlarge={enlarge} setZoomMap={setZoomMap} setZoomLabel={setZoomLabel} enlargeMap={enlargeMap} enlargeLabel={enlargeLabel}/>}
        {!FULL[currentItem]['beverage'] && status.selectedItem !== 'DOWNLOAD MATRIX' && (
          <div className="food-item">
            <div className="player"></div>
            <div className="dish">
         <p className='title'>{FULL[currentItem].name}</p>
              {/*             <p1>{FULL[currentItem].ingredients}</p1> */}
            </div>
            <div className="button-menu">
              {theme !== 'allergies' && (
                <button
                  onClick={() => setTheme('allergies')}
                  className="menu-btn"
                >
                  Allergies
                </button>
              )}
              {theme !== 'pairing' && status.selectedItem !== 'THE MOVE' && (
                <button
                  onClick={() => setTheme('pairing')}
                  className="menu-btn"
                >
                  Pairing
                </button>
              )}
              {theme !== 'story' && (
                <button onClick={() => setTheme('story')} className="menu-btn">
                  Story
                </button>
              )}
              {theme !== 'ingredients' && (
                <button
                  onClick={() => setTheme('ingredients')}
                  className="menu-btn"
                >
                  Ingredients
                </button>
              )}
              {theme !== 'spiel' && (
                <button onClick={() => setTheme('spiel')} className="menu-btn">
                  Spiel
                </button>
              )}
            </div>
            {theme === 'allergies' && (
              <section>
                <h2>Allergies</h2>
                <div className="modifications">
                  {modifiable && modifiable.length > 0 && <div className="mod">
                    <h4 className="modifiable">Modifiable</h4>
                    {modifiable}
                  </div>}
                  {modifiable && nonModifiable.length > 0 && <div className="mod">
                    <h4 className="not-modifiable">NOT Modifiable</h4>
                    {nonModifiable}
                    </div>}
                  {!modifiable && nonModifiable &&
                    <div>
                      <h4 className="not-modifiable">
                        This dish is NOT Modifiable
                      </h4>
                      {nonModifiable}
                    </div>}
                  </div>
                </section>
            )}
            {theme === 'story' && (
              <div>
                <h2>{FULL[currentItem].Question}</h2>
                <div className="answer">
                  <p1>{FULL[currentItem].Answer}</p1>
                </div>
              </div>
            )}
            {theme === 'story' && FULL[currentItem].Question2 && (
              <div>
                <h2>{FULL[currentItem].Question2}</h2>
                <div className="answer">
                  <p1>{FULL[currentItem].Answer2}</p1>
                </div>
              </div>
            )}
            {theme === 'spiel' && (
              <>
                <div className="modifications2">
                  <div>
                    {!FULL[currentItem].pics2 &&
                      !zoom &&
                      !FULL[currentItem].pics3 && (
                        <img
                          className="pics"
                          onClick={() => enlarge()}
                          src={FULL[currentItem].pics[0]}
                          alt="pics"
                        ></img>
                      )}
                    {!FULL[currentItem].pics2 &&
                      !zoom &&
                      !FULL[currentItem].pics3 &&
                      FULL[currentItem].pics.length > 1 && (
                        <img
                          className="pics"
                          onClick={() => enlarge()}
                          src={FULL[currentItem].pics[1]}
                          alt="pics"
                        ></img>
                      )}
                    {FULL[currentItem].pics2 && !zoom && (
                      <img
                        className="pics2"
                        onClick={() => enlarge()}
                        src={FULL[currentItem].pics[0]}
                        alt="pics"
                      ></img>
                    )}
                    {FULL[currentItem].pics2 &&
                      !zoom &&
                      FULL[currentItem].pics.length > 1 && (
                        <img
                          className="pics2"
                          onClick={() => enlarge()}
                          src={FULL[currentItem].pics[1]}
                          alt="pics"
                        ></img>
                      )}
                    {FULL[currentItem].pics3 &&
                      !FULL[currentItem].pics2 &&
                      !zoom && (
                        <img
                          className="pics3"
                          onClick={() => enlarge()}
                          src={FULL[currentItem].pics[0]}
                          alt="pics"
                        ></img>
                      )}
                    {FULL[currentItem].pics3 &&
                      !zoom &&
                      !FULL[currentItem].pics2 &&
                      FULL[currentItem].pics.length > 1 && (
                        <img
                          className="pics3"
                          onClick={() => enlarge()}
                          src={FULL[currentItem].pics[1]}
                          alt="pics"
                        ></img>
                      )}
                  </div>
                  {!FULL[currentItem].pics2 &&
                    !FULL[currentItem].pics3 &&
                    !zoom && (
                      <div className="answer2">
                        <h2>SPIEL</h2>
                        <p1>{FULL[currentItem].spiel}</p1>
                      </div>
                    )}
                  {FULL[currentItem].pics2 && !zoom && (
                    <div className="answer3">
                      <p1>{FULL[currentItem].spiel}</p1>
                    </div>
                  )}
                  {FULL[currentItem].pics3 && !zoom && (
                    <div className="answer3">
                      <p1>{FULL[currentItem].spiel}</p1>
                    </div>
                  )}
                </div>
              </>
            )}
            {theme === 'pairing' && (
              <div className="modifications">
                <RenderPairing wine={FULL[currentItem].pairing} />
              </div>
            )}
            {theme === 'ingredients' && (
              <div className="modifications">
                <div className="ingred-btn">
                  <button
                    className={submenu}
                    ref={menu_btn}
                    onClick={() => setSetting('ingredients')}
                  >
                    Ingredients
                  </button>
                  <button
                    className={submenu1}
                    ref={menu_btn2}
                    onClick={() => setSetting('serving')}
                  >
                    Set Up
                  </button>
                </div>
                <div className="mod">
                  {setting === 'ingredients' && <div>
                    <h2 className='title3'>Ingredients</h2>
                    {breakdown}
                    </div>}
                </div>
                <div className="mod">
                  {setting === 'serving' && <div>
                <h2 className='title3'>Set Up</h2>
                    {serving}
                </div>}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
