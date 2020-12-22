export const arrayEmpty = arr =>
  arr === undefined || arr.length === 0

export const orderEmpty = (pizzas, sides, drinks) =>
  arrayEmpty(pizzas) && arrayEmpty(drinks) && arrayEmpty(sides)

export const sidesOrDrinksTotal = sidesOrDrinks => (
  console.log(sidesOrDrinks) || !arrayEmpty(sidesOrDrinks)
    ? sidesOrDrinks.reduce((a, b) => a + (b.price * b.quantity), 0)
    : 0
).toFixed(2)

export const pizzasTotal = pizzas => (
  !arrayEmpty(pizzas)
    ? pizzas.reduce((a, b) => a + b.price, 0)
    : 0
).toFixed(2)

export const orderTotal = (pizzas, sides, drinks) => {
  const pizzasTotal = !arrayEmpty(pizzas) ? pizzas.reduce((a, b) => a + b.price, 0) : 0
  const sidesTotal = !arrayEmpty(sides) ? sides.reduce((a, b) => a + (b.price * b.quantity), 0) : 0
  const drinksTotal = !arrayEmpty(drinks) ? drinks.reduce((a, b) => a + (b.price * b.quantity), 0) : 0
  return (pizzasTotal + sidesTotal + drinksTotal).toFixed(2)
}

export const inchesLookup = size => ({
  small: '10"',
  medium: '14"',
  large: '18"'
}[size])

export const capitalizeFirstLetter = text =>
  text.charAt(0).toUpperCase() + text.slice(1)
