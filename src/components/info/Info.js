import React from 'react';
import './Info.scss';

function Info(props) {

  return (
    <div className="info" >
        <div className="info__box">
            
            <img className="image" src={props.data.flag} alt="flag" />

            <div className="left-column">
                <div className="title">{props.data.name}</div>

                <div className="row">
                    <div className="col">
                        <div className=""><span className="name">Native name: </span>{props.data.nativeName}</div>
                        <div className=""><span className="name">Population: </span>{props.data.population}</div>
                        <div className=""><span className="name">Region: </span>{props.data.region}</div>
                        <div className=""><span className="name">Sub Region: </span>{props.data.subregion}</div>
                        <div className=""><span className="name">Capital: </span>{props.data.capital}</div>
                    </div>
                    <div className="col">
                        <div className=""><span className="name">Top Level Domain: </span>{props.data.topLevelDomain}</div>
                        <div className=""><span className="name">Curriencies: </span>{props.data.currencies[0].name}</div>
                        <div className=""><span className="name">Languages: </span>
                        {props.data.languages.map((lang, index) => (
                            <span key={index}>{lang.name}{ props.data.languages.length - 1 === index ? '' : ', '}</span>))}
                        </div>
                    </div>
                </div>

                <div className="border-countries">
                    <span className="name">Border Countries: </span>
                    {props.data.borders.map((bord, index) => (
                        <span className="tag" key={index}>{bord} </span>
                    ))}
                </div>
            </div>
            
        </div>
    </div>
  );
}

export default Info;