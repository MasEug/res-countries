import React, {useState, useContext, useEffect} from 'react';
import Card from './components/cards/Card'
import Header from './components/header/Header'
import { ThemeContext } from './ThemeProvider';
import Search from './search.svg'

import './App.scss';

const App = () => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; // regions
  const [array, setArray] = useState([]);
  const {theme, toggleTheme} = useContext(ThemeContext); // select theme
  const [filter, setFilter] = useState();
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


  const ChangeFilter = async (filter) => {
    let filterForRegion = filter.target.value;
    setFilter(filterForRegion)

    if(filterForRegion) {
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
    }
  }

  return (
    <div className="wrapper" theme={theme}>
      
      <div className="wrapper__box">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <div className="filters">
          <div className="filters__box">
            <div className="search">
              <img src={Search} alt="search" className="search__icon" />
              <input
              className="search__input" 
               onChange={changeSearch}
               type="text"
               placeholder="Search for a country..."
               name="country"
               autoComplete="off"
                />
            </div>
            
            <select className="filter" onChange={ChangeFilter} value={filter}>
              {/* <option value="">Filter by region</option> */}
                {regions.map((region, index)=> (
                  <option value={region} key={index}>{region}</option>
                ))}
            </select>
           
          </div>
        </div>
      
        <main className="content">
          {
            hasError.show  === true ? <div>{hasError.error}</div> :
            array.map((country, index) => (
              <Card key={index} country={country} />
            ))
          }
        </main>
      </div>
    </div>
  );
}

export default App;
