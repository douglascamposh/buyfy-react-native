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
import StoreAdminScreen from '../screens/admin/StoreAdminScreen';
import ProductAdminScreen from '../screens/admin/ProductAdminScreen';
import StoreOrderAdminScreen from '../screens/admin/StoreOrderAdminScreen';
import ProductOrdersStoreScreen from '../screens/admin/ProductOrdersStoreScreen';
import OrdersRiderScreen from '../screens/rider/OrdersRiderScreen';
import AccountScreen from '../screens/AccountScreen';
import LogOutScreen from '../screens/auth/LogOutScreen';

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

const Admin_StackNavigator = createStackNavigator({
  storeAdminList: {
    screen: StoreAdminScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
  createStore: {
    screen: StoreCreateScreen
  },
  editStore: {
    screen: StoreEditScreen
  },
  productAdminList: {
    screen: ProductAdminScreen
  },
  createProduct: {
    screen: ProductCreateScreen
  },
  editProduct: {
    screen: ProductEditScreen
  },
});

const Order_Admin_StackNavigator = createStackNavigator({
  storeListOrder: {
    screen: StoreOrderAdminScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
  ordersStore: {
    screen: ProductOrdersStoreScreen
  }
});

const Order_Rider_StackNavigator = createStackNavigator({
  orderListRider: {
    screen: OrdersRiderScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
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
  }
});

const account_StackNavigator = createStackNavigator({
  accountData: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
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
    admin: {
      screen: Admin_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Administración'
      }
    },
    orderAdmin: {
      screen: Order_Admin_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Pedidos'
      }
    },
    orderRider: {
      screen: Order_Rider_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Pedidos Recibidos'
      }
    },
    account: {
      screen: account_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Mi cuenta'
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
