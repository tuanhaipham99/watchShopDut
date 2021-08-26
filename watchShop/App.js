/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {AppRegistry, Navigator, View,LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import store from './src/redux/store/store';
import {Provider} from "react-redux";
//import {Login, Main} from './Components/Index';

//import Login from './Components/Login.js';
import Login from './src/Components/login/Login.js';
import Main from './src/Components/Main/Main.js';
import Product from './src/Components/ProductList/Product.js';
import Men from './src/Components/Main/Men.js';
import Women from './src/Components/Main/Women.js';
import Home from './src/Components/Main/Home.js';
import Search from './src/Components/Search/Search.js';
import Cart from './src/Components/Cart/Cart.js';
import Checkout from './src/Components/Checkout/Checkout.js';
import ChangeInfor from './src/Components/ChangeInfor/ChangeInfor.js';
import OrderDetail from './src/Components/Order/OrderDetail.js';
import Register from './src/Components/Register/Register';
import ChangePass from './src/Components/ChangeInfor/ChangePass.js';
import Profile from './src/Components/Profile/Profile.js';
import Order from './src/Components/Order/Order';
import Result from './src/Components/Search/Result';
const Stack = createStackNavigator();

export default class WatchShop extends Component {
  render() {
    LogBox.ignoreAllLogs();
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"         
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: "horizontal",
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
            }}
            
            >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Search" component={Search}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Product" component={Product}/>
            <Stack.Screen name="Cart" component={Cart}/>
            <Stack.Screen name="Checkout" component={Checkout}/>
            <Stack.Screen name="ChangeInfor" component={ChangeInfor}/>
            <Stack.Screen name="OrderDetail" component={OrderDetail}/>
            <Stack.Screen name="ChangePass" component={ChangePass}/>
            <Stack.Screen name="Men" component={Men}/>
            <Stack.Screen name="Women" component={Women}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Order" component={Order}/>
            <Stack.Screen name="Result" component={Result}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    );
  }
}

AppRegistry.registerComponent('WatchShop', () => WatchShop);

