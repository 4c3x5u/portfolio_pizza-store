import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import postcodeIsValid from 'uk-postcode-validator'

import { OrderContext } from '../Context/OrderStore'
import { arrayEmpty } from '../utils'
import { submitOrder } from '../../../api'

import FullWidthInput from '../../FormControls/FullWidthInput'
import HalfWidthInput from '../../FormControls/HalfWidthInput'

const Finalize = () => {
  const [address, setAddress] = useState({
    firstLine: '',
    secondLine: '',
    postcode: ''
  })
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    securityCode: ''
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const [finalized, setFinalized] = useState(false)
  const [state, dispatch] = useContext(OrderContext)
  const [errors] = useState({
    addressFirstLine: '',
    addressSecondLine: '',
    postcode: '',
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: ''
  })
  const { firstLine, secondLine, postcode } = address
  const { cardNumber, expiryDate, securityCode } = paymentDetails

  const validator = new SimpleReactValidator({
    messages: {
      firstLine: 'Please enter a valid first line of address.'
    },
    validators: {
      postcode: {
        message: 'Postcode must be valid.',
        rule: val => postcodeIsValid(val)
      }
    }
  })

  const finalize = () => {
    if (validator.allValid()) {
      dispatch({
        type: 'FINALIZE_ORDER',
        payload: {
          paymentDetails,
          address,
          phoneNumber
        }
      })
      submitOrder({
        ...state,
        paymentDetails,
        address,
        phoneNumber
      }).then(() => setFinalized(true))
    }
  }

  if (finalized) {
    return <Redirect to="/order/thank-you"/>
  }

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

              {validator.showMessages()}

              <FullWidthInput
                name="First Line of Address"
                field={firstLine}
                setField={firstLine => setAddress({ ...address, firstLine })}
                type="text"
                placeholder="3 Abbey Rd"
                validator={
                  validator.message(
                    'firstLine',
                    firstLine,
                    'required|alpha_num_space|min:7|max:25',
                    { className: 'text-danger' }
                  )
                }
              />

              <FullWidthInput
                name="Second Line of Address"
                field={secondLine}
                setField={secondLine => setAddress({ ...address, secondLine })}
                type="text"
                placeholder="St John's Wood"
                validator={
                  validator.message(
                    'secondLine',
                    secondLine,
                    'required|alpha_num_space|min:7|max:25',
                    { className: 'text-danger' }
                  )
                }
              />

              <FullWidthInput
                name="Postcode"
                field={postcode}
                setField={postcode => setAddress({ ...address, postcode })}
                type="text"
                placeholder="NW8 9AY"
                validator={
                  validator.message(
                    'postcode',
                    postcode,
                    'required|postcode',
                    { className: 'text-danger' }
                  )
                }
              />

              <FullWidthInput
                name="Phone Number"
                field={phoneNumber}
                setField={setPhoneNumber}
                type="text"
                validator={!arrayEmpty(errors) && errors.phoneNumber}
              />

              <FullWidthInput
                name="Card Number"
                field={cardNumber}
                setField={cardNumber => setPaymentDetails({ ...paymentDetails, cardNumber })}
                type="text"
                validator={!arrayEmpty(errors) && errors.cardNumber}
              />

              <HalfWidthInput
                name="Expiry Date"
                field={expiryDate}
                setField={expiryDate => setPaymentDetails({ ...paymentDetails, expiryDate })}
                type="text"
                error={!arrayEmpty(errors) && errors.expiryDate}
                right={false}
              />

              <HalfWidthInput
                name="Security Code"
                field={securityCode}
                setField={securityCode => setPaymentDetails({ ...paymentDetails, securityCode })}
                type="text"
                error={!arrayEmpty(errors) && errors.cardNumber}
                right={true}
              />

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
  )
}

export default Finalize
