import * as types from "../constants";
import store from "../store/store";
export async function CartCount(token, id_user, resolve = () =>{} ) {
  store.dispatch({
    type: types.GET_CART_API,
  });
  try {
    await fetch(
      "https://shopwatchdut.herokuapp.com/api/cart/"+id_user,
      {
        method: "GET",
        headers: {
          "Authorization": 'Bearer '+token ,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    ).then((response) => response.json())
    .then((responseData)=>{
        const data = responseData.data.map(item=>item.itemCart.id);
        console.log("api", data.length)
        resolve(data.length)
        store.dispatch({
            payload: data,
            type: types.GET_CART_API_SUCCEED,
            size: data.length,
          });
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_CART_API_FAIL,
    });
    throw error
  }
}
