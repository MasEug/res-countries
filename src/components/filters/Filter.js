import React from 'react';
import Search from '../../search.svg'
import './Filter.scss';

function Filter(props) {
  return (
    <div className="filters">
        <div className="filters__box">
        <div className="search">
            <img src={Search} alt="search" className="search__icon" />
            <input
            className="search__input" 
            onChange={props.changeSearch}
            type="text"
            placeholder="Search for a country..."
            name="country"
            autoComplete="off"
            />
        </div>
        
        <select className="filter" onChange={props.changeFilter} value={props.filter}>
            {props.regions.map((region, index)=> (
                <option value={region} key={index}>{region}</option>
            ))}
        </select>
        
        </div>
    </div>
  );
}

export default Filter;