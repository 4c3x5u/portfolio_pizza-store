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
    default:
      return state;
  }
};

export default OrderReducer;
