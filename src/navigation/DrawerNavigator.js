import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import NavigationDrawerStructure from './AppNavigator';

import ProductCreateScreen from '../screens/ProductCreateScreen';
import ProductEditScreen from '../screens/ProductEditScreen'
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';
import StoreListScreen from '../screens/StoreListScreen';
import StoreCreateScreen from '../screens/StoreCreateScreen';
import StoreEditScreen from '../screens/StoreEditScreen';
import OrderListScreen from '../screens/OrderListScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CurrentOrderScreen from '../screens/CurrentOrderScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import LoadingScreen from '../screens/auth/LoadingScreen';
import MapScreen from '../screens/MapScreen';
import AddressCreateScreen from '../screens/address/AddressCreateScreen';
import AddressListScreen from '../screens/address/AddressListScreen';
import AddressEditScreen from '../screens/address/AddressEditScreen';

import LogOutScreen from '../screens/auth/LogOutScreen';

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

const address_StackNavigator = createStackNavigator({
  addressList: {
    screen: AddressListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
  createAddress: {
    screen: AddressCreateScreen
  },
  editAddress: {
    screen: AddressEditScreen
  }
});

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
  editProduct: {
    screen: ProductEditScreen
  },
  productDetail: {
    screen: ProductDetailScreen
  },
  createStore: {
    screen: StoreCreateScreen
  },
  editStore: {
    screen: StoreEditScreen
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
    },
    address: {
      screen: address_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Mis direcciones'
      }
    },
    signOut: {
      screen: LogOutScreen,
      navigationOptions: {
        drawerLabel: 'log out'
      }
    }
  }
);


export default createAppContainer(DrawerNavigator);
