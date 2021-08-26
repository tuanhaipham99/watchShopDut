import * as types from "../constants";

const initialState = {
  data: [],
  cartCount: 0,
  error: {},
  loading: false,
  success:false,
};

export default function CartCount(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_CART_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_CART_API_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        cartCount: actions.size,
        loading: false,
        success:true,
      };
    case types.GET_CART_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
