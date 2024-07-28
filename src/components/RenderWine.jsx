import WHITEBTG from '../../white-btg.json';
import { useState, useEffect } from 'react';

export default function RenderWine({ status, zoomLabel, zoomMap, setZoomLabel, setZoomMap, enlarge, enlargeLabel, enlargeMap }) {
  const [theme, setTheme] = useState('summary');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);


  const whiteBevItem = WHITEBTG.findIndex((item) => {
    return item.name === status.selectedItem;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    console.log(zoomMap);
    handleResize(); 
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let maxBodyPercentage;
  let maxAcidPercentage;
  let maxDryPercentage;

  if (WHITEBTG[whiteBevItem]) {
    maxBodyPercentage = `${WHITEBTG[whiteBevItem]['tast.bold'] * 10}%`;
    maxAcidPercentage = `${WHITEBTG[whiteBevItem]['tast.acid'] * 10}%`;
    maxDryPercentage = `${WHITEBTG[whiteBevItem]['tast.dry'] * 10}%`;
  }

  const renderCss =
    zoomLabel  || zoomMap ? 'zoom' : 'main-bev';



  return (
    <>
      {zoomLabel  && (
        <div className="backdrop" onClick={() => enlargeLabel()}>
          <p className='title'>{WHITEBTG[whiteBevItem].name}</p>
          {WHITEBTG[whiteBevItem].label.map((pic, index) => {
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
      {zoomMap  && (
        <div className="backdrop" onClick={() => enlargeMap()}>
          <p className='title'>{WHITEBTG[whiteBevItem].name}</p>
          {WHITEBTG[whiteBevItem].map.map((pic, index) => {
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
      <section className={renderCss}>
        <div className="button-menu">
        {theme !== 'summary' && (
            <button onClick={() => setTheme('summary')} className="menu-btn">
              Summary
            </button>
          )}
          {theme !== 'tasting' && (
            <button onClick={() => setTheme('tasting')} className="menu-btn">
              Tasting
            </button>
          )}
          {theme !== 'producer' && (
            <button onClick={() => setTheme('producer')} className="menu-btn">
              Producer
            </button>
          )}
          {theme !== 'grape' && (
            <button onClick={() => setTheme('grape')} className="menu-btn">
              Grape
            </button>
          )}
          {theme !== 'appellation' && (
            <button
              onClick={() => setTheme('appellation')}
              className="menu-btn"
            >
              Appellation
            </button>
          )}
        </div>
        {theme === 'summary' && (
          <section>
            {!isMobile && (
              <div className="bev-top">
                <div className="bev-photo">
                  <img
                    onClick={enlargeLabel}
                    src={WHITEBTG[whiteBevItem]['label']}
                    alt="label"
                  ></img>
                </div>
                <div className="bev-info">
                  <table>
                    <tread>
                      <th>Name</th>
                      <th>Region</th>
                      <th>Varietal</th>
                      <th>Vintner</th>
                      <th>Vintage</th>
                    </tread>
                    <tbody>
                      <td>{WHITEBTG[whiteBevItem]['name']}</td>
                      <td>{WHITEBTG[whiteBevItem]['region']}</td>
                      <td>{WHITEBTG[whiteBevItem]['varietal']}</td>
                      <td>{WHITEBTG[whiteBevItem]['vintner']}</td>
                      <td>{WHITEBTG[whiteBevItem]['vintage']}</td>
                    </tbody>
                  </table>
                </div>
                <div className="bev-photo">
                  <img
                    onClick={enlargeMap}
                    src={WHITEBTG[whiteBevItem]['map']}
                    alt="label"
                  ></img>
                </div>
              </div>
            )}
            {isMobile && (
              <section>
                <div>
                  <div className="mobile-wine">
                    <img
                      onClick={enlargeLabel}
                      className="bev-photo"
                      src={WHITEBTG[whiteBevItem]['label']}
                      alt="label"
                    ></img>
                    <img
                      className="bev-photo"
                      onClick={enlargeMap}
                      src={WHITEBTG[whiteBevItem]['map']}
                      alt="label"
                    ></img>
                  </div>
                  <p>Tap to see full-size images</p>
                </div>
                <div className="bev-info">
                  <table>
                    <tread className="thread-pad">
                      <th>Name</th>
                      <th>Region</th>
                      <th>Varietal</th>
                      <th>Vintner</th>
                      <th>Vintage</th>
                    </tread>
                    <tbody>
                      <td>{WHITEBTG[whiteBevItem]['name']}</td>
                      <td>{WHITEBTG[whiteBevItem]['region']}</td>
                      <td>{WHITEBTG[whiteBevItem]['varietal']}</td>
                      <td>{WHITEBTG[whiteBevItem]['vintner']}</td>
                      <td>{WHITEBTG[whiteBevItem]['vintage']}</td>
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            <div className="progress-bar">
              <div className="bar">
                <div className="bar-name">Light</div>
                <div className="progress">
                  <div
                    className="bar-per"
                    per={WHITEBTG[whiteBevItem]['tast.bold']}
                    style={{ maxWidth: maxBodyPercentage }}
                  ></div>
                </div>
                <div className="bar-name">Bold</div>
              </div>
              <div className="bar">
                <div className="bar-name">Dry</div>
                <div className="progress">
                  <div
                    className="bar-per"
                    per={WHITEBTG[whiteBevItem]['tast.dry']}
                    style={{ maxWidth: maxDryPercentage }}
                  ></div>
                </div>
                <div className="bar-name">Sweet</div>
              </div>
              <div className="bar">
                <div className="bar-name">Soft</div>
                <div className="progress">
                  <div
                    className="bar-per"
                    per={WHITEBTG[whiteBevItem]['tast.acid']}
                    style={{ maxWidth: maxAcidPercentage }}
                  ></div>
                </div>
                <div className="bar-name">Acidic</div>
              </div>
            </div>
          </section>
        )}
        {theme === 'tasting' && (
          <section>
            <div className="bev-extra">
              <h2 className="wine-title">Tasting Notes</h2>
              <h2 className="tasting">
                {WHITEBTG[whiteBevItem]['tasting-notes']}
              </h2>
              <div></div>
            </div>
          </section>
        )}
        {theme === 'appellation' && (
          <section>
            <img
              className="prod-pic"
              src={WHITEBTG[whiteBevItem]['appellation-pic']}
            ></img>
            <h1 className="prod-alt">
              {WHITEBTG[whiteBevItem]['appellation-alt']}
            </h1>
            <h2 className="wine-title">
              {WHITEBTG[whiteBevItem]['appellation-question']}
            </h2>
            <div>
              <h1 className="tasting">
                {WHITEBTG[whiteBevItem]['appellation-answer']}
              </h1>
            </div>
          </section>
        )}
        {theme === 'grape' && (
          <section>
            <img
              className="grape-pic"
              src={WHITEBTG[whiteBevItem]['grape-pic']}
              alt="grape"
            ></img>
            <h2 className="wine-title">{WHITEBTG[whiteBevItem]['qrape']}</h2>
            <div>
              <h1 className="tasting">
                {WHITEBTG[whiteBevItem]['grape-answer']}
              </h1>
            </div>
          </section>
        )}
        {theme === 'producer' && (
          <section>
            <div>
              <img
                className="prod-pic"
                src={WHITEBTG[whiteBevItem]['prod-pic']}
                alt="producer"
              ></img>
            </div>
            <h1 className="prod-alt">{WHITEBTG[whiteBevItem]['prod-alt']}</h1>
            <h2 className="wine-title">
              {WHITEBTG[whiteBevItem]['producer-question']}
            </h2>
            <div>
              <h1 className="tasting">
                {WHITEBTG[whiteBevItem]['producer-answer']}
              </h1>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
