import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    Array.from(document.getElementsByClassName('navbar'))
      .map((e) => e.classList.remove('fixed-top'));
  }, []);

  return (
    <section id="Home">
      <article className="Main">
        <div className="Banner">
          <h1 className="Top">BLAZIN</h1>
          <h1 className="Bottom">PIZZA CO.</h1>
        </div>
        <div className="Buttons">
          <div className="Top">
            <Link to="/member/login" className="SignIn btn">
              SIGN IN
            </Link>
            <Link to="/member/register" className="Register btn">
              REGISTER
            </Link>
          </div>
          <div className="Middle">
            <Link to="/guest/login" className="Guest btn">
              I&apos;M A GUEST
            </Link>
          </div>
          <div className="Bottom">
            <Link href="#WelcomeModal" className="Info btn" data-toggle="modal">
              ?
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Home;
