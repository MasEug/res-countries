import React from 'react';
import Moon from '../../moon.svg'
import MoonWhite from '../../moon-white.svg'
import './Header.scss';

function Header(props) {

  return (
    <header className="header" style={props.theme === "theme-dark" ? {backgroudColor: '#2b3743', boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.05)'} : {boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.5)'}}>
    <div className="header__box">
      <div className="row">
        <div className="title">Where in there world?</div>

        <div className="button" onClick={props.toggleTheme}>
          <img src={props.theme === "theme-dark" ? MoonWhite : Moon} className="icon" alt="moon" />
          <div className="title">{props.theme === "theme-dark" ? 'Light Mode' : 'Dark Mode'}</div>
        </div>
      </div>
      
    </div>
  </header>
  );
}

export default Header;