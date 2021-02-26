import React from 'react';

import './WelcomeModal.sass';

const WelcomeModal = () => (
  <article id="WelcomeModal" className="modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">About This App</h4>
        </div>
        <div className="modal-body">
          <p>
            This demo application is powered by the MERN stack.
          </p>
          <br />
          <p>
            This means that in constructing the
            app, MongoDB was the database of choice, routing has been handled by ExpressJS, the
            front-end is in React and the back-end is in NodeJS.
          </p>
          <br />
          <p>
            Bootstrap is also used as a means to reduce the time taken to create a responsive
            user interface.
          </p>
          <br />
          <p>
            For a full description of features and libraries, as well as explanations for the way
            that they are used, please visit
            {' '}
            <a
              href="https://github.com/alicandev/portfolio_pizza-store"
              target="_blank"
              rel="noreferrer"
            >
              the project page on GitHub
            </a>
            .
          </p>
          <br />
          <p className="text-danger">
            DISCLAIMER
          </p>
          <p>
            DO NOT enter any of your real details at any point while using this app. This is
            merely a DEMO application which DOES NOT represent any real world entity.
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" data-dismiss="modal">
            Got It!
          </button>
        </div>
      </div>
    </div>
  </article>
);

export default WelcomeModal;
