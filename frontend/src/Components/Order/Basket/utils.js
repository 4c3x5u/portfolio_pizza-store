export const arrayEmpty = (arr) => arr === undefined || arr.length === 0;

export const pizzasEmpty = (pizzas) => !pizzas.some((p) => p.Done);

export const basketIsEmpty = (pizzas, drinks, sides) => (
  (pizzasEmpty(pizzas) && arrayEmpty(drinks) && arrayEmpty(sides))
);
