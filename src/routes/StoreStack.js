import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationDrawerStructure from '../navigation/AppNavigator';
import StoreListScreen from '../screens/StoreListScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import OrderListScreen from '../screens/OrderListScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CurrentOrderScreen from '../screens/CurrentOrderScreen';
import MapScreen from '../screens/MapScreen';
import AddressCreateScreen from '../screens/address/AddressCreateScreen';

const screens = {
  storeList: {
    screen: StoreListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
  productList: {
    screen: ProductListScreen,
  },
  productDetail: {
    screen: ProductDetailScreen
  },
  orderList: {
    screen: OrderListScreen
  },
  checkout: {
    screen: CheckoutScreen
  },
  currentOrder: {
    screen: CurrentOrderScreen
  },
  map: {
    screen: MapScreen
  },
  addressCreateCheckout: {
    screen: AddressCreateScreen
  },
};

const StoreStack = createStackNavigator(screens);

export default StoreStack;