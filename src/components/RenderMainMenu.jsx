import DINNER from '../../dinner.json';
import MAIN from '../../main.json';
import APPS from '../../apps.json';
import SALAD from '../../soupsalad.json';
import PASTAS from '../../pasta.json';
import DESSERTS from '../../desserts.json';
import ALLERGIES from '../../allergies.json';
import BEVERAGE from '../../beverage.json';
import FULL from '../../full.json';
import ALLWINE from '../../winelist.json';
import WHITEBTG from '../../white-btg.json';
import FISH from '../../fish.json';
import CARNI from '../../carni.json';
import SIDES from '../../sides.json';



export default function RenderMenu({ status, startSearch, setMode }) {
/*   const [garlicFree, setGarlicFree] = useState(''); This is ready for garlic! */ 
  const filter = (setting) => {
    return FULL.filter((item) => {
      return item[setting] !== true;
    });
  };
  const Vefilter = (setting) => {
    return FULL.filter((item) => {
      return item[setting] === true;
    });
  };

  const filterMod = (setting) => {
    return FULL.filter((item) => {
      return item[setting] === true;
    });
  };

  function renderMod(mod) {
    return mod.map((item) => {
      return (
        <li key={item.id}>
          <button className="select" onClick={() => setMode(item.name)}>
            <span className="button">{item.name}</span>
          </button>
        </li>
      );
    });
  }

  let renderMenu;
  let render;
  let options;

/*   useEffect(() => {
    function calculateGarlic() {
      const itemsWithoutGarlicInBreakdown = [];
  
      for (let i = 0; i < FULL.length; i++) {
        const item = FULL[i];
        let hasGarlic = false;
      
        if (item.breakdown) {
          for (let j = 0; j < item.breakdown.length; j++) {
            if (item.breakdown[j].toLowerCase().includes('garlic')) {
              hasGarlic = true;
              break;
            }
          }
        }
      
        if (!hasGarlic && !item.beverage) {
          itemsWithoutGarlicInBreakdown.push(item);
        }
      }
      console.log(itemsWithoutGarlicInBreakdown);
      return itemsWithoutGarlicInBreakdown;
    };

    setGarlicFree(calculateGarlic());
  }, []);                                    It's a template for garlic;
 */




  if (status.page === 'MAIN') {
    render = MAIN;
  }
  if (status.page === 'BEVERAGE') {
    render = BEVERAGE;
  }
  if (status.page === 'WINE LIST') {
    render = ALLWINE;
  }
  if (status.page === 'WHITES BY THE GLASS') {
    render = WHITEBTG;
  }
  if (status.page === 'DINNER') {
    render = DINNER;
  }
  if (status.page === 'ANTIPASTI') {
    render = APPS;
  } else if (status.page === 'ZUPPA E INSALATE') {
    render = SALAD;
  } else if (status.page === 'MACARONI') {
    render = PASTAS;
  } else if (status.page === 'PESCI') {
    render = FISH;
  } else if (status.page === 'CARNI') {
    render = CARNI;
  } else if (status.page === 'CONTORNI') {
    render = SIDES;
  } else if (status.page === 'DOLCI') {
    render = DESSERTS;
  } else if (status.page === 'GLUTEN FREE') {
    render = filter('gluten');
    const glutenMod = filterMod('gluten-mod');
    options = renderMod(glutenMod);
  } else if (status.page === 'NUT FREE') {
    render = filter('nuts');
    const nutsMod = filterMod('nuts-mod');
    options = renderMod(nutsMod);
    console.log(options);
  } else if (status.page === 'NUTMEG FREE') {
    render = filter('nutmeg');
    const nutmegMod = filterMod('nutmeg-mod');
    options = renderMod(nutmegMod);
  } else if (status.page === 'ALCOHOL FREE') {
    render = filter('alcohol');
    const alcoMod = filterMod('alcohol-mod');
    options = renderMod(alcoMod);
  } else if (status.page === 'NIGHTSHADES') {
    render = filter('nightshades');
    const nightMode = filterMod('nightshades-mod');
    options = renderMod(nightMode);
  } else if (status.page === 'DAIRY FREE') {
    render = filter('dairy');
    const dairyChange = filterMod('dairy-mod');
    options = renderMod(dairyChange);
  } else if (status.page === 'EGGS FREE') {
    render = filter('egg');
    const eggChange = filterMod('egg-mod');
    options = renderMod(eggChange);
    console.log(eggChange);
  } else if (status.page === 'SHELLFISH ALLERGY') {
    render = Vefilter('shellfish');
    const shellfishChange = filter('shellfish-mod');
    options = renderMod(shellfishChange);
  } else if (status.page === 'FIN FISH ALLERGY') {
    render = Vefilter('fin-fish');
    const finFishChange = filterMod('fin-fish-mod');
    options = renderMod(finFishChange);
  } else if (status.page === 'VEGAN OPTIONS') {
    render = Vefilter('vegan');
    const veganChange = filterMod('vegan-mod');
    options = renderMod(veganChange);
  } else if (status.page === 'VEGETARIAN OPTIONS') {
    render = Vefilter('vegetarian');
    const vegChange = filterMod('vegetarian-mod');
    options = renderMod(vegChange);
  }


  if (!status.selectedItem && status.page !== 'SEARCH') {
    renderMenu = render.map((item) => {
      return (
        <li key={item.id}>
          <button className="select" onClick={() => setMode(item.name)}>
            <span className="button">{item.name}</span>
          </button>
        </li>
      );
    });
  }

  const allergies = ALLERGIES.map((item) => {
    return (
      <li key={item.id}>
        <button className="select" onClick={() => setMode(item.name)}>
          <span className="button">{item.name}</span>
        </button>
      </li>
    );
  });

  return (
    <>
      <ul>{renderMenu}</ul>
{/*       {!startSearch && status.page === 'DINNER' && (

          <p className="title">ALLERGIES & RESTRICTIONS</p>
      )} */}
      {!startSearch && status.page === 'DINNER' && <p>Last Update - September 2024</p>}
      {status.page === 'GLUTEN FREE' && (
        <p className="change">HAS GLUTEN, BUT CAN BE MODIFIED</p>
      )}
      <ul>
        {status.page === 'GLUTEN FREE' && options}
        {status.page === 'NUT FREE' && (
          <p className="change">HAS NUTS, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'NUT FREE' && options}
        {status.page === 'DAIRY FREE' && (
          <p className="change">HAS DAIRY, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'DAIRY FREE' && options}
        {status.page === 'EGGS FREE' && (
          <p className="change">CONTAIN EGGS, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'EGGS FREE' && options}
        {status.page === 'FIN FISH ALLERGY' && (
          <p className="change">CONTAIN FIN FISH, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'FIN FISH ALLERGY' && options}
        {status.page === 'VEGAN OPTIONS' && (
          <p className="change">NOT VEGAN, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'VEGAN OPTIONS' && options}
        {status.page === 'VEGETARIAN OPTIONS' && (
          <p className="change">NOT VEGETARIAN, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'VEGETARIAN OPTIONS' && options}
        {status.page === 'ALCOHOL FREE' && (
          <p className="change">CONTAIN ALCOHOL, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'ALCOHOL FREE' && options}
        {status.page === 'NUTMEG FREE' && (
          <p className="change">CONTAIN NUTMEG, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'NUTMEG FREE' && options}
        {status.page === 'NIGHTSHADES' && (
          <p className="change">CONTAIN NIGHTSHADES, BUT CAN BE MODIFIED</p>
        )}
        {status.page === 'NIGHTSHADES' && options}
      </ul>
{/*         <ul>{status.page === 'DINNER' && allergies}</ul> */}
    </>
  );
}
