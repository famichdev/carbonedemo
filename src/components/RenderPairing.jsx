import WHITEBTG from '../../white-btg.json';
import { useState, useEffect } from 'react';

export default function RenderWine({ wine }) {
    const [theme, setTheme] = useState('summary');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  const whiteBevItem = WHITEBTG.findIndex((item) => {
    return item.name === wine;
  });
    
    console.log(wine);

    console.log(whiteBevItem);
    
  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth <= 700) {
              setIsMobile(true);
          }
          else {
              isMobile(false);
          }

    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
    
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 700) {
            setIsMobile(false);
        }
        else {
            isMobile(true);
        }
  };

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
  return (
      <>
          <section className='main-bev'>
      <div className="button-menu">
        {theme !== 'tasting' && (
          <button onClick={() => setTheme('tasting')} className="menu-btn">
            Tasting
          </button>
        )}
        {theme !== 'summary' && (
          <button onClick={() => setTheme('summary')} className="menu-btn">
            Summary
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
          <button onClick={() => setTheme('appellation')} className="menu-btn">
            Appellation
          </button>
        )}
      </div>
      {theme === 'summary' && (
        <section>
                      {!isMobile && <div className="bev-top">
                          <div className="bev-photo">
{/*                               <img src={WHITEBTG[whiteBevItem]['label']} alt="label"></img> */}
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
                              <img src={WHITEBTG[whiteBevItem]['map']} alt="label"></img>
                          </div>
                      </div>
                      }
                      {isMobile && <div className="bev-top">
                          <div className='mobile-wine'>
                          <div className="bev-photo">
                              <img src={WHITEBTG[whiteBevItem]['label']} alt="label"></img>
                          </div>
                          <div className="bev-photo">
                              <img src={WHITEBTG[whiteBevItem]['map']} alt="label"></img>
                              </div>
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
                      </div>
                      }
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
                  <img className="prod-pic" src={WHITEBTG[whiteBevItem]['appellation-pic']}></img>
                  <h1 className='prod-alt'>{WHITEBTG[whiteBevItem]['appellation-alt']}</h1>
          <h2 className='wine-title'>{WHITEBTG[whiteBevItem]['appellation-question']}</h2>
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
          <h2 className='wine-title'>{WHITEBTG[whiteBevItem]['qrape']}</h2>
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
                  <h1 className='prod-alt'>{WHITEBTG[whiteBevItem]['prod-alt']}</h1>
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
