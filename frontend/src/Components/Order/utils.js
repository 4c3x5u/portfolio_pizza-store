export const arrayEmpty = (arr) => arr === undefined || arr.length === 0;

export const basketIsEmpty = (pizzas, sides, drinks) => (
  (arrayEmpty(pizzas) && arrayEmpty(drinks) && arrayEmpty(sides))
);

export const orderTotal = (pizzas, sides, drinks) => {
  const pizzasTotal = !arrayEmpty(pizzas) ? pizzas.reduce((a, b) => a + b.price, 0) : 0;
  const sidesTotal = !arrayEmpty(sides) ? sides.reduce((a, b) => a + b.price, 0) : 0;
  const drinksTotal = !arrayEmpty(drinks) ? drinks.reduce((a, b) => a + b.price, 0) : 0;
  return (pizzasTotal + drinksTotal + sidesTotal).toFixed(2);
};

/* eslint-disable quote-props */
export const inchesLookup = (size) => ({
  'small': 10,
  'medium': 14,
  'large': 18,
}[size]);
