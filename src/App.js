import React, {useState, useContext, useEffect} from 'react';
import Card from './components/cards/Card';
import Header from './components/header/Header';
import Filter from './components/filters/Filter';
import Info from './components/info/Info';
import Back from './back.svg';
import { ThemeContext } from './ThemeProvider';

import './App.scss';

const App = () => {
  const regions = ['Filter by region', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; // regions
  const [array, setArray] = useState([]);
  const [infoShow, setInfoShow] = useState([]);
  const {theme, toggleTheme} = useContext(ThemeContext); // select theme
  const [filter, setFilter] = useState();
  const [openInfoShow, setopenInfoShow] = useState(false);
  const [hasError, setError] = useState({error: 'not error', show: false});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://restcountries.eu/rest/v2/all`);
      res
      .json()
      .then(res => {
          setArray(res)
          setError({error: 'not error', show: false})
      })
    }
    fetchData();
  }, []);

  const changeSearch = async(country) => {
    let filterSelect = country.target.value;

    if(filterSelect) {
      const res = await fetch(`https://restcountries.eu/rest/v2/name/${filterSelect}`);

      if (res.status === 200) {
        res.json().then(
          res => setArray(res),
          setError({error: 'not error', show: false})
        )
      }

      if (res.status === 404) {
        res.json().then(res => setError({error: res.message, show: true}))
      }
    }
  }


  const changeFilter = async (filter) => {
    let filterForRegion = filter.target.value;
    setFilter(filterForRegion)

    if(filterForRegion) {

      if (filterForRegion !== 'Filter by region') {
        const res = await fetch(`https://restcountries.eu/rest/v2/region/${filterForRegion}`);

        if (res.status === 200) {
          res.json().then(
            res => setArray(res),
            setError({error: 'not error', show: false})
          )
        }
  
        if (res.status === 404) {
          res.json().then(res => setError({error: res.message, show: true}))
        }
      } else {
        const res = await fetch(`https://restcountries.eu/rest/v2/all`);
        res
        .json()
        .then(res => {
            setArray(res)
            setError({error: 'not error', show: false})
        })
      } 
    }
  }

  const openCard = async(name) => {
    if(name) {
      setopenInfoShow(true);
      const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
      res.json().then(res => setInfoShow(res));
      
    }
  }

  const openInfo = () => {
    if(openInfoShow === true) {
      setopenInfoShow(false)
    }
  }

  return (
    <div className="wrapper" theme={theme}>

      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <div className="wrapper__box">

        {
          openInfoShow === true ?
           <div> 
            <div className="btn">
              <button className="back" onClick={openInfo}><img className="arrow" src={Back} alt="" />Back</button>
            </div>
            <main className="content-info">
                {
                infoShow ? infoShow.map((name, index) => 
                <Info key={index} data={name} />) : ''
              }
            </main>
          </div>
          :

          <div>
            <Filter changeSearch={changeSearch} filter={filter} changeFilter={changeFilter} regions={regions} />

            <main className="content">
              {
                hasError.show  === true ? <div>{hasError.error}</div> :
                array.map((country, index) => (
                  <Card key={index} country={country} openCard={openCard} />
                ))
              }
            </main>

          </div>
        }
       
      </div>
    </div>
  );
}

export default App;
