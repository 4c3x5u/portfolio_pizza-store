import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import postcodeIsValid from 'uk-postcode-validator';
import moment from 'moment';

import { OrderContext } from '../Context/OrderStore';
import { submitOrder } from '../../../api';

import FullWidthInput from '../../FormControls/FullWidthInput';
import HalfWidthInput from '../../FormControls/HalfWidthInput';
import { arrayEmpty, orderEmpty } from '../util';

import './FinalizeOrder.sass';

const FinalizeOrder = () => {
  const [address, setAddress] = useState({
    firstLine: '',
    secondLine: '',
    postcode: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [finalized, setFinalized] = useState(false);
  const [serversideValidationErrors, setServersideValidationErrors] = useState([]);
  const [state] = useContext(OrderContext);
  const { firstLine, secondLine, postcode } = address;
  const { cardNumber, expiryDate, securityCode } = paymentDetails;
  const { pizzas, sides, drinks } = state;

  const validator = new SimpleReactValidator({
    messages: {
      integer: 'Invalid number.',
    },
    validators: {
      postcode: {
        message: 'Postcode must be valid.',
        rule: (val) => postcodeIsValid(val),
      },
    },
  });

  const finalize = () => validator.allValid() && submitOrder({
    ...state,
    paymentDetails,
    address,
    phoneNumber,
    date: moment().format('h:mma dddd, Do MMMM YYYY'),
  }).then((response) => {
    if (response.status === 200) {
      setFinalized(true);
    } else if (!arrayEmpty(response.data.validationErrors)) {
      setServersideValidationErrors(response.data.validationErrors);
    }
  });

  if (orderEmpty(pizzas, sides, drinks)) { return <Redirect to="/order" />; }

  if (finalized) { return <Redirect to="/order/thank-you" />; }

  return (
    <section id="FinalizeOrder">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <article className="PageHead col-10 offset-1">
            <Link to="/order/review" className="BackButton">Back</Link>
            <h2 className="Header">FINALIZE ORDER</h2>
          </article>

          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className="Form col-10 offset-1"
            onKeyUp={(e) => e.key === 'Enter' && finalize}
          >
            <div className="form-row">

              {validator.showMessages()}

              <FullWidthInput
                name="First Line of Address"
                field={firstLine}
                setField={(fl) => setAddress({ ...address, firstLine: fl })}
                type="text"
                placeholder="3 Abbey Rd"
                validator={validator.message(
                  'firstLine',
                  firstLine,
                  'required|alpha_num_space|min:7|max:25',
                )}
              />

              <FullWidthInput
                name="Second Line of Address"
                field={secondLine}
                setField={(sl) => setAddress({ ...address, secondLine: sl })}
                type="text"
                placeholder="St John's Wood"
                validator={validator.message(
                  'secondLine',
                  secondLine,
                  'required|alpha_num_space|min:7|max:25',
                )}
              />

              <FullWidthInput
                name="Postcode"
                field={postcode}
                setField={(p) => setAddress({ ...address, postcode: p })}
                type="text"
                placeholder="NW8 9AY"
                validator={validator.message(
                  'postcode',
                  postcode,
                  'required|postcode',
                )}
              />

              <FullWidthInput
                name="Phone Number"
                field={phoneNumber}
                setField={setPhoneNumber}
                type="text"
                placeholder="020 7266 7000"
                validator={validator.message(
                  'phoneNumber',
                  phoneNumber,
                  'required|phone|min:10|max:11',
                )}
              />

              <FullWidthInput
                name="Card Number"
                field={cardNumber}
                setField={(cn) => setPaymentDetails({ ...paymentDetails, cardNumber: cn })}
                type="text"
                placeholder="1234 5678 9123 4567"
                validator={validator.message(
                  'cardNumber',
                  cardNumber,
                  'required|card_num|min:14|max:16',
                )}
              />

              <HalfWidthInput
                name="Expiry Date"
                field={expiryDate}
                setField={(ed) => setPaymentDetails({ ...paymentDetails, expiryDate: ed })}
                type="text"
                right={false}
                placeholder="01/23"
                validator={validator.message(
                  'expiryDate',
                  expiryDate,
                  'required|card_exp|min:5|max:7',
                )}
              />

              <HalfWidthInput
                name="Security Code"
                field={securityCode}
                setField={(sc) => setPaymentDetails({ ...paymentDetails, securityCode: sc })}
                type="text"
                right
                placeholder="123"
                validator={validator.message(
                  'securityCode',
                  securityCode,
                  'required|integer|min:3|max:4',
                )}
              />

              {!arrayEmpty(serversideValidationErrors) && (
                <div className="form-group col-12 px-0 py-0 mx-0 my-0">
                  {serversideValidationErrors.map((errorMessage) => (
                    <p className="text-danger">{`Server: ${errorMessage}`}</p>
                  ))}
                </div>
              )}

            </div>
          </div>

          <div className="Done form-group col-10 offset-1">
            <input
              onClick={finalize}
              type="submit"
              value="Submit"
              className="Confirm btn btn-default"
              disabled={!validator.allValid()}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalizeOrder;
