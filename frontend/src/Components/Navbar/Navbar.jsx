import React, { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn] = useState(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <a
        className="navbar-brand"
        href={console.log('/Home')}
      >
        <div id="Banner" className="justify-content-center">
          <h1 id="BannerText" className="d-block">BLAZIN</h1>
          <h1 id="BannerText" className="d-block">PIZZA CO.</h1>
        </div>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#NavbarCollapse">
        <i id="NavbarToggler" className="far fa-compass text-light" />
      </button>
      <div id="NavbarCollapse" className="collapse navbar-collapse text-center">
        <div id="NavbarNav" className="ml-auto navbar-nav">
          <a className="Order nav-item nav-link active" href={console.log('/order')}>ORDER</a>
          {isLoggedIn ? (
            <>
              <a
                className="MyPoints nav-item nav-link"
                href={console.log('/mypoints')}
              >
                MY POINTS
              </a>
              <a className="LogOff nav-link nav-item" href="/logout">SIGN OUT</a>
            </>
          ) : (
            <>
              <a className="Login nav-item nav-link" href={console.log('/login')}>SIGN IN</a>
              <a className="Register nav-item nav-link" href={console.log('/register')}>REGISTER</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
