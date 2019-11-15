import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { View, TouchableOpacity, Image } from 'react-native';

import NavigationDrawerStructure from './AppNavigator';

import ProductCreateScreen from '../screens/ProductCreateScreen';
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';
import StoreListScreen from '../screens/StoreListScreen';

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
  }
});

const DrawerNavigator = createDrawerNavigator(
  {
    store: {
      screen: store_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Restaurantes'
      }
    }
  }
);


export default createAppContainer(DrawerNavigator);
