import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import getCartCount from "../../redux/store/store.js/"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"

import Home from './Home';
import Cart from '../Cart/Cart';
import Order from '../Order/Order';
import Profile from '../Profile/Profile';
const Tab = createBottomTabNavigator();


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      TEMP_TOKEN: "",
    };
  };

  render(){
    
    return (
            <Tab.Navigator>
          <Tab.Screen Icon name="Home" component={Home} 
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={"#57173D"} size={30} />
            ) }}
          />
          <Tab.Screen name="Cart" component={Cart}
            options={{
              unmountOnBlur: true,
              tabBarLabel: 'Cart',
              tabBarIcon: ({ color, size }) => (
                  <View>
                      <MaterialCommunityIcons name="cart"  color={"#57173D"} size={30} />
                      {this.props.cartCount > 0 ? (
                        <View
                        style={{     
                        position: 'absolute',
                        backgroundColor: 'red',
                        width: 18,
                        height: 18,
                        borderRadius: 17 / 2,
                        right: -1,
                        top: -7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}>
                        <Text
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: "#FFFFFF",
                            fontSize: 9,
                        }}>
                        {this.props.cartCount}
                        </Text>
                    </View>
                      ) :null}
                      
                  </View>      
              ) }}
            />
          <Tab.Screen name="Order" component={Order} 
            options={{
              tabBarLabel: 'Order',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="truck"  color={"#57173D"} size={30} />
              ) }}
          />
          <Tab.Screen name="Profile" component={Profile} 
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-box"  color={"#57173D"} size={30} />
              ) }}
          />
        </Tab.Navigator>
    );
  }  
  
}
function mapStateToProp(state) {
  return {cartCount: state.cartCount}
}

function mapDispatchToProps() {
  return {
    actions: getCartCount()
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(Main)