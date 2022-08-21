const cartReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };
    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [
          {
            ...action.payload
          },
          ...state.cart
        ]
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: [...state.cart.filter((it) => it.id !== action.payload.id)]
      };
    }
    case "CHANGE_QTY": {
      return {
        ...state,
        cart: state.cart.filter((it) =>
          it.id === action.payload.id ? (it.qty = action.payload.qty) : it.qty
        )
      };
    }
    default:
      break;
  }
};

export default cartReducer;
