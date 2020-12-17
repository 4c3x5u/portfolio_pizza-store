import React from 'react';
import PropTypes from 'prop-types';

const ReviewSidesAndDrinks = ({
  sides, drinks, removeSide, removeDrink,
}) => (
  <>
    <div className="Sides offset-1 col-lg-5 col-10">
      <h3>
        Sides (£
        {sides.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2)}
        )
      </h3>
      {sides.map((s) => (
        <h5>
          {s.quantity}
          {' x '}
          {s.name}
          {' (£'}
          {s.price}
          )
          <button type="button" onClick={removeSide} className="RemoveSide">
            <i className="RemoveSide fas fa-minus-circle" />
          </button>
        </h5>
      ))}
    </div>
    <div className="Drinks offset-lg-0 col-lg-5 offset-1 col-10">
      <h3>
        Drinks (£
        {drinks.reduce((a, b) => a + (b.price * b.quantity), 0)}
        )
      </h3>
      {drinks.map((d) => (
        <h5>
          {d.quantity}
          {' x '}
          {d.name}
          {' (£'}
          {d.price}
          )
          <button type="button" onClick={removeDrink} className="RemoveDrink">
            <i className="RemoveDrink fas fa-minus-circle" />
          </button>
        </h5>
      ))}
    </div>
  </>
);

ReviewSidesAndDrinks.propTypes = {
  sides: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  drinks: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  removeSide: PropTypes.func.isRequired,
  removeDrink: PropTypes.func.isRequired,
};

export default ReviewSidesAndDrinks;
