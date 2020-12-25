import React from 'react';

import './MaxToppingsModal.sass';

const MaxToppingsModal = () => (
  <article id="MaxToppingsModal" className="modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Too Many Toppings...</h4>
        </div>
        <div className="modal-body">
          <p>
            A pizza can only have up to 6 toppings.
            <br />
            Click on chosen toppings to discard them.
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" data-dismiss="modal">Okay</button>
        </div>
      </div>
    </div>
  </article>
);

export default MaxToppingsModal;
