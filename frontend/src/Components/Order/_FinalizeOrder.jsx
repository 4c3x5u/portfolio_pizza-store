/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { arrayEmpty } from './utils';
import { OrderContext } from './Context/OrderStore';

const FinalizeOrder = () => {
  const [addressFirstLine, setAddressFirstLine] = useState('');
  const [addressSecondLine, setAddressSecondLine] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [errors] = useState([]);

  const [order, dispatch] = useContext(OrderContext);

  window.order = order;

  const fullWidthFormInput = (name, field, setField, type) => (
    <div className="form-group col-10 offset-1">
      <label htmlFor={name} className="control-label">{name}</label>
      <input
        id={name}
        value={field}
        onChange={(e) => setField(e.target.value)}
        type={type}
        className="form-control"
      />
      {!arrayEmpty(errors) && errors.filter((err) => err.field === name).map((err) => (
        <div className="text-danger">{err}</div>
      )) }
    </div>
  );

  const halfWidthFormInput = (name, field, setField, type, right) => (
    <div className={`form-group col-10 col-md-5 offset-1 ${right && 'offset-md-0'}`}>
      <label htmlFor={name} className="control-label">{name}</label>
      <input
        id={name}
        value={field}
        onChange={(e) => setField(e.target.value)}
        type={type}
        className="form-control"
      />
      {!arrayEmpty(errors) && errors.filter((err) => err.field === name).map((err) => (
        <div className="text-danger">{err}</div>
      )) }
    </div>
  );

  const finalize = () => {
    dispatch({
      type: 'FINALIZE_ORDER',
      payload: {
        paymentDetails: {
          cardNumber,
          expiryDate,
          securityCode,
        },
        address: {
          firstLine: addressFirstLine,
          secondLine: addressSecondLine,
          postcode,
        },
        phoneNumber,
      },
    });
  };

  return (
    <section id="FinalizeOrder">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <article className="PageHead col-10 offset-1">
            <Link to="/order/review" className="BackButton">Back</Link>
            <h2 className="Header">FINALIZE ORDER</h2>
          </article>

          <div className="Form col-10 offset-1">
            <div className="form-row">

              {fullWidthFormInput('First Line of Address', addressFirstLine, setAddressFirstLine, 'text')}
              {fullWidthFormInput('Second Line of Address', addressSecondLine, setAddressSecondLine, 'text')}
              {fullWidthFormInput('Postcode', postcode, setPostcode, 'text')}
              {fullWidthFormInput('Phone Number', phoneNumber, setPhoneNumber, 'text')}
              {fullWidthFormInput('Payment Card Number', cardNumber, setCardNumber, 'text')}
              {halfWidthFormInput('Expiry Date', expiryDate, setExpiryDate, 'text', false)}
              {halfWidthFormInput('Security Code', securityCode, setSecurityCode, 'text', true)}

            </div>
          </div>

          <div className="Done form-group col-10 offset-1">
            <input onClick={finalize} type="submit" value="Submit" className="Confirm btn btn-default" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalizeOrder;
