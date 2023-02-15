import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationDrawerStructure from '../navigation/AppNavigator';
import OrdersRiderScreen from '../screens/rider/OrdersRiderScreen';


const screens = {
  orderListRider: {
    screen: OrdersRiderScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  }
}

const OrderRiderStack = createStackNavigator(screens);

export default OrderRiderStack;