import { createStore} from 'redux';
import AsyncStorage from "@react-native-async-storage/async-storage"


const defaultValue = {cartCount: 0}
let data = []
export default async function getCartCount() {
    var TOKEN = await AsyncStorage.getItem("id_token");
    var id_user = await AsyncStorage.getItem("id_user");
    console.log(id_user)
    var Count =0;
    await fetch("https://shopwatchdut.herokuapp.com/api/cart/"+id_user, {
        method:"GET",
        headers: {
            'Authorization': 'Bearer ' + TOKEN
          },
    }
    ).then((response) => response.json())
    .then((responseData) => {
        const res = responseData.data
        data =  res.map(item=>item.itemCart.id)
        Count = responseData.data.length
        defaultValue.cartCount = Count
        console.log(data)
        console.log("num:"+defaultValue.cartCount)
    }).catch((error) => {
        console.log("https://shopwatchdut.herokuapp.com/api/cart/"+id_user);
        console.log(error);
        return error
    });
}
addItemByID = id => {
    if (data.includes(id)!==true) data.push(id)
}
deleteItemByID = id => {
    const filteredData = data.filter(item => item !== id)
    data = filteredData
    console.log(data)
}
getCartCount();

const reducer = (state = defaultValue, action) => {
    if (action.type === "INCREASE") {
        addItemByID(action.id)
        return {cartCount: data.length};
    }
    if (action.type === "DECREASE") {
        deleteItemByID(action.id)
        return {cartCount: data.length};
    }
    return state
};

export const store = createStore(reducer);