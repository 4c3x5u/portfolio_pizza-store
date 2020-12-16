export const arrayEmpty = (arr) => arr === undefined || arr.length === 0;

export const basketIsEmpty = (pizzas, drinks, sides) => (
  (arrayEmpty(pizzas) && arrayEmpty(drinks) && arrayEmpty(sides))
);
