import React from 'react'

import './WelcomeModal.sass'

const WelcomeModal = () =>
  <article id="WelcomeModal" className="modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">About This App</h4>
        </div>
        <div className="modal-body">
          <p>
            The backbone of this demo application is MERN stack. The app uses a MongoDB database, the
            routing is handled by ExpressJS, the front-end is written in React and the back-end is in NodeJS.
          </p>
          <br/>
          <p>
            Bootstrap is also used as a means to create a responsive user interface.
          </p>
          <br/>
          <p>
            I used stateless functional components all throughout the code-base that make use of React hooks such as
            useState, useContext, and useReducer to handle application states, as well as preferring array prototype
            functions such as &apos;.map&apos; and &apos;.forEach&apos; over loops, immutable constants over mutable
            variables, short-circuit evaluation for simple app logic over &apos;if&apos; statements, map look-ups over
            switch statements, and overall, expressions over statements.
          </p>
          <br/>
          <p>
            I come from a functional programming background! :)
          </p>
          <br/>
          <p>
            Though I am capable of adaptation and change, since this is a programming paradigm that modern JavaScript
            nurtures, I have made an effort to turn my experience therein into a strength.
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

export default WelcomeModal
