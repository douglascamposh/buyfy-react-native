import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationDrawerStructure from '../navigation/AppNavigator';
import StoreOrderAdminScreen from '../screens/admin/StoreOrderAdminScreen';
import ProductOrdersStoreScreen from '../screens/admin/ProductOrdersStoreScreen';

const screens = {
  storeListOrder: {
    screen: StoreOrderAdminScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
  ordersStore: {
    screen: ProductOrdersStoreScreen
  }
}

const OrderAdminStack = createStackNavigator(screens);

export default OrderAdminStack;