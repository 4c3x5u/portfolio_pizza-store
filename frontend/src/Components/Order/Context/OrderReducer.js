import { arrayEmpty } from '../utils';

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
          arrayEmpty(state.pizzas) ? ([
            action.payload,
          ]) : ([
            ...state.pizzas,
            action.payload,
          ]),
      };
    case 'REMOVE_PIZZA':
      return {
        ...state,
        pizzas: state.pizzas.filter((p) => (
          JSON.stringify(p) !== JSON.stringify(action.payload)
        )),
      };
    case 'ADD_NEW_SIDE':
      return {
        ...state,
        sides:
          arrayEmpty(state.sides) ? ([
            action.payload,
          ]) : ([
            ...state.sides, action.payload,
          ]),
      };
    case 'INCREASE_SIDE_QUANTITY':
      return {
        ...state,
        sides:
          !arrayEmpty(state.sides) && (
            state.sides.map((side) => (
              (side.name === action.payload) ? ({
                ...side,
                quantity: side.quantity + 1,
              }) : (
                side
              )
            ))
          ),
      };
    case 'REMOVE_SIDE':
      return {
        ...state,
        sides: state.sides.filter((s) => s.name !== action.payload),
      };
    case 'DECREASE_SIDE_QUANTITY':
      return {
        ...state,
        sides: state.sides.map((s) => (
          s.name === action.payload ? ({
            ...s,
            quantity: s.quantity - 1,
          }) : s
        )),
      };
    case 'ADD_NEW_DRINK':
      return {
        ...state,
        drinks:
          arrayEmpty(state.drinks) ? ([
            action.payload,
          ]) : ([
            ...state.drinks, action.payload,
          ]),
      };
    case 'INCREASE_DRINK_QUANTITY':
      return {
        ...state,
        drinks:
          !arrayEmpty(state.drinks) && (
            state.drinks.map((drink) => (
              (drink.name === action.payload) ? ({
                ...drink,
                quantity: drink.quantity + 1,
              }) : (
                drink
              )
            ))
          ),
      };
    case 'REMOVE_DRINK':
      return {
        ...state,
        drinks: state.drinks.filter((d) => d.name !== action.payload),
      };
    case 'DECREASE_DRINK_QUANTITY':
      return {
        ...state,
        drinks: state.drinks.map((d) => (
          d.name === action.payload ? ({
            ...d,
            quantity: d.quantity - 1,
          }) : d
        )),
      };
    case 'FINALIZE_ORDER':
      return {
        ...state,
        paymentDetails: action.payload.paymentDetails,
        address: action.payload.address,
        phoneNumber: action.payload.phoneNumber,
      };
    default:
      return state;
  }
};

export default OrderReducer;
