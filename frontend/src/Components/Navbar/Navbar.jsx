import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { validateAuthTokens } from '../../api';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { authTokens } = useAuth();

  useEffect(() => (
    (authTokens && authTokens.user && authTokens.token) && (
      validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
    )
  ), []);

  const navLinkClicked = (e) => {
    Array.from(
      document.getElementsByClassName('nav-link active'),
    ).map((t) => t.classList.remove('active'));
    e.target.classList.add('active');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <Link
        to="/"
        className="navbar-brand"
        onClick={navLinkClicked}
      >
        <div id="Banner" className="justify-content-center">
          <h1 id="BannerText" className="d-block">BLAZIN</h1>
          <h1 id="BannerText" className="d-block">PIZZA CO.</h1>
        </div>
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#NavbarCollapse"
      >
        <i id="NavbarToggler" className="far fa-compass text-light" />
      </button>
      <div id="NavbarCollapse" className="collapse navbar-collapse text-center">
        <div id="NavbarNav" className="ml-auto navbar-nav">
          <Link
            to="/order"
            className="Order nav-item nav-link active"
            onClick={navLinkClicked}
          >
            ORDER
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/mypoints"
                className="MyPoints nav-item nav-link"
                onClick={navLinkClicked}
              >
                MY POINTS
              </Link>
              <Link
                to="/logout"
                className="LogOff nav-link nav-item"
                onClick={navLinkClicked}
              >
                SIGN OUT
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="Login nav-item nav-link"
                onClick={navLinkClicked}
              >
                SIGN IN
              </Link>
              <Link
                to="/register"
                className="Register nav-item nav-link"
                onClick={navLinkClicked}
              >
                REGISTER
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
