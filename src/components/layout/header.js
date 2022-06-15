import React from 'react';
import { Link } from "@reach/router";
import NetflixLogo from '../icons/NetflixLogo';
import Nav from './nav';

const Header = () => {
  return (
    <header className="header">
      <div id="logo" className="logo">
        <Link to="/">
          <NetflixLogo/>
        </Link>
      </div>
      <Nav/>
      <div className="user-profile" >
        <div className="user">
          <div className="name">Jidonu Segun</div>
          <div className="image">
            <img src="../../images/netflix-logo.png" alt="netflix"/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
