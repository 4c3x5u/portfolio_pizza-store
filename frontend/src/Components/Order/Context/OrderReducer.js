import { arrayEmpty } from '../Basket/utils';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEMBER_ID':
      return {
        ...state,
        memberId: action.payload,
      };
    case 'SET_ORDER_ID':
      return {
        ...state,
        id: action.payload,
      };
    case 'ADD_PIZZA':
      return {
        ...state,
        pizzas:
          arrayEmpty(state.pizzas)
            ? [action.payload]
            : [...state.pizzas, action.payload],
      };
    case 'ADD_NEW_SIDE':
      console.log('ADD_NEW_SIDE');
      return {
        ...state,
        sides:
          arrayEmpty(state.sides)
            ? [action.payload]
            : [...state.sides, action.payload],
      };
    case 'INCREASE_SIDE_QUANTITY':
      console.log('INCREASE_SIDE_QUANTITY');
      return {
        ...state,
        sides:
          !arrayEmpty(state.sides) && (
            state.sides.map((s) => (
              s.name === action.payload && { ...s, quantity: s.quantity + 1 }
            ))
          ),
      };
    default:
      return state;
  }
};

export default OrderReducer;
