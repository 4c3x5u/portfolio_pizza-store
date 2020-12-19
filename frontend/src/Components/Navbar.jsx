import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { validateAuthTokens } from '../api'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { authTokens, setAuthTokens } = useAuth()

  useEffect(() => (
    authTokens && authTokens.user && authTokens.token &&
      validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
  ), [])

  const navLinkClicked = (e) => {
    e.target.classList.add('active')
    Array
      .from(document.getElementsByClassName('nav-link active'))
      .map(t => t.classList.remove('active'))
  }

  const changeBannerTextColor = color =>
    Array
      .from(document.getElementsByClassName('BannerText'))
      .forEach(e => { e.style.color = color })

  const bannerMouseOver = () => changeBannerTextColor('#e2e2e2')
  const bannerMouseOut = () => changeBannerTextColor('#afafaf')

  const handleLogOut = () => {
    setAuthTokens('')
    setIsLoggedIn(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <Link
        to="/"
        className="navbar-brand"
        onClick={navLinkClicked}
        onMouseOver={bannerMouseOver}
        onMouseOut={bannerMouseOut}
      >
        <div id="Banner" className="justify-content-center">
          <h1 className="BannerText d-block">BLAZIN</h1>
          <h1 className="BannerText d-block">PIZZA CO.</h1>
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
          {isLoggedIn
            ? <>
                <Link
                  to="/mypoints"
                  className="MyPoints nav-item nav-link"
                  onClick={navLinkClicked}
                >
                  MY POINTS
                </Link>
                <a
                  href="/"
                  className="LogOff nav-link nav-item"
                  onClick={handleLogOut}
                >
                  SIGN OUT
                </a>
              </>
            : <>
                <Link
                  to="/member/login"
                  className="Login nav-item nav-link"
                  onClick={navLinkClicked}
                >
                  SIGN IN
                </Link>
                <Link
                  to="/member/register"
                  className="Register nav-item nav-link"
                  onClick={navLinkClicked}
                >
                  REGISTER
                </Link>
              </>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
