export const arrayEmpty = arr =>
  arr === undefined || arr.length === 0

export const basketIsEmpty = (pizzas, sides, drinks) =>
  arrayEmpty(pizzas) && arrayEmpty(drinks) && arrayEmpty(sides)

export const sidesOrDrinksTotal = (sidesOrDrinks) =>
  !arrayEmpty(sidesOrDrinks) ? sidesOrDrinks.reduce((a, b) => a + (b.price * b.quantity), 0) : 0

export const orderTotal = (pizzas, sides, drinks) => (
  (!arrayEmpty(pizzas) ? pizzas.reduce((a, b) => a + b.price, 0) : 0) +
    sidesOrDrinksTotal(sides) +
    sidesOrDrinksTotal(drinks)
).toFixed(2)

/* eslint-disable quote-props */
export const inchesLookup = (size) => ({
  'small': 10,
  'medium': 14,
  'large': 18
}[size])
