import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
const Tab = createBottomTabNavigator();

export default class Main extends Component {
  render(){
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    );
  }  
  
}