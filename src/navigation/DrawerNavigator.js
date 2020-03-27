import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import NavigationDrawerStructure from './AppNavigator';

import ProductCreateScreen from '../screens/ProductCreateScreen';
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';
import StoreListScreen from '../screens/StoreListScreen';
import StoreCreateScreen from '../screens/StoreCreateScreen';
import OrderListScreen from '../screens/OrderListScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CurrentOrderScreen from '../screens/CurrentOrderScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import LoadingScreen from '../screens/auth/LoadingScreen';

// const product_StackNavigator = createStackNavigator({
//   productList: {
//     screen: ProductListScreen,
//   },
//   createProduct: {
//     screen: ProductCreate,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Crear Producto'
//     })
//   },
//   productDetail: {
//     screen: ProductDetailScreen
//   }
// });

// const auth_StackNavigator = createStackNavigator({
//   login: {
//     screen: ProductListScreen,
//   }
// });

const store_StackNavigator = createStackNavigator({
  storeList: {
    screen: StoreListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
  productList: {
    screen: ProductListScreen,
  },
  createProduct: {
    screen: ProductCreateScreen
  },
  productDetail: {
    screen: ProductDetailScreen
  },
  createStore: {
    screen: StoreCreateScreen
  },
  orderList: {
    screen: OrderListScreen
  },
  checkout: {
    screen: CheckoutScreen
  },
  currentOrder: {
    screen: CurrentOrderScreen
  }
});

const DrawerNavigator = createDrawerNavigator(
  {
    loading: {
      screen: LoadingScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    auth: {
      screen: AuthScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    store: {
      screen: store_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Restaurantes'
      }
    }
  }
);


export default createAppContainer(DrawerNavigator);
