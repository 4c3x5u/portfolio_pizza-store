import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { OrderContext } from '../Context/OrderStore'
import { arrayEmpty } from '../utils'
import { finalizeOrder } from '../../../api'

import FullWidthInput from '../../FormControls/FullWidthInput'
import HalfWidthInput from '../../FormControls/HalfWidthInput'

const Finalize = () => {
  const [addressFirstLine, setAddressFirstLine] = useState('')
  const [addressSecondLine, setAddressSecondLine] = useState('')
  const [postcode, setPostcode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [securityCode, setSecurityCode] = useState('')
  const [finalized, setFinalized] = useState(false)
  const [errors] = useState({
    addressFirstLine: '',
    addressSecondLine: '',
    postcode: '',
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: ''
  })

  const [state, dispatch] = useContext(OrderContext)

  window.order = state

  const finalize = () => {
    dispatch({
      type: 'FINALIZE_ORDER',
      payload: {
        paymentDetails: {
          cardNumber,
          expiryDate,
          securityCode
        },
        address: {
          firstLine: addressFirstLine,
          secondLine: addressSecondLine,
          postcode
        },
        phoneNumber
      }
    })
    finalizeOrder(state).then(() => setFinalized(true))
  }

  if (finalized) {
    return <Redirect to="/order/thank-you" />
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

              <FullWidthInput
                name="First Line of Address"
                field={addressFirstLine}
                setField={setAddressFirstLine}
                type="text"
                error={!arrayEmpty(errors) && errors.addressFirstLine}
              />

              <FullWidthInput
                name="Second Line of Address"
                field={addressSecondLine}
                setField={setAddressSecondLine}
                type="text"
                error={!arrayEmpty(errors) && errors.addressSecondLine}
              />

              <FullWidthInput
                name="Postcode"
                field={postcode}
                setField={setPostcode}
                type="text"
                error={!arrayEmpty(errors) && errors.postcode}
              />

              <FullWidthInput
                name="Phone Number"
                field={phoneNumber}
                setField={setPhoneNumber}
                type="text"
                error={!arrayEmpty(errors) && errors.phoneNumber}
              />

              <FullWidthInput
                name="Card Number"
                field={cardNumber}
                setField={setCardNumber}
                type="text"
                error={!arrayEmpty(errors) && errors.cardNumber}
              />

              <HalfWidthInput
                name="Expiry Date"
                field={expiryDate}
                setField={setExpiryDate}
                type="text"
                error={!arrayEmpty(errors) && errors.expiryDate}
                right={false}
              />

              <HalfWidthInput
                name="Security Code"
                field={securityCode}
                setField={setSecurityCode}
                type="text"
                error={!arrayEmpty(errors) && errors.cardNumber}
                right={true}
              />

            </div>
          </div>

          <div className="Done form-group col-10 offset-1">
            <input onClick={finalize} type="submit" value="Submit" className="Confirm btn btn-default" />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Finalize
