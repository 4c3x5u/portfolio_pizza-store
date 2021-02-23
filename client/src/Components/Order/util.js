export const setNavLinkActive = (componentName) => Array
  .from(document.getElementsByClassName('nav-link'))
  .map((t) => {
    t.classList.remove('active');
    return t;
  }).filter((t) => t.classList.contains(componentName))
  .map((t) => t.classList.add('active'));

export const arrayEmpty = (arr) => arr === undefined || arr.length === 0;

export const orderEmpty = (pizzas, sides, drinks) => (
  arrayEmpty(pizzas) && arrayEmpty(drinks) && arrayEmpty(sides)
);

export const sidesOrDrinksTotal = (sidesOrDrinks) => (
  !arrayEmpty(sidesOrDrinks)
    ? sidesOrDrinks.reduce((a, b) => a + (b.price * b.quantity), 0)
    : 0
).toFixed(2);

export const pizzasTotal = (pizzas) => (!arrayEmpty(pizzas)
  ? pizzas.reduce((a, b) => a + b.price, 0)
  : 0
).toFixed(2);

export const orderTotal = (pizzas, sides, drinks) => {
  const pTotal = !arrayEmpty(pizzas) ? pizzas.reduce((a, b) => a + b.price, 0) : 0;
  const sTotal = !arrayEmpty(sides) ? sides.reduce((a, b) => a + (b.price * b.quantity), 0) : 0;
  const tTotal = !arrayEmpty(drinks) ? drinks.reduce((a, b) => a + (b.price * b.quantity), 0) : 0;
  return (pTotal + sTotal + tTotal).toFixed(2);
};

export const inchesLookup = (size) => ({
  small: '10"',
  medium: '14"',
  large: '18"',
}[size]);

export const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export const handleFormKeyUp = (e, handleSubmit, setErrorMessage) => (
  (e.key === 'Enter')
    ? handleSubmit()
    : setErrorMessage([])
);
