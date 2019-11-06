import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { View, TouchableOpacity, Image } from 'react-native';

import NavigationDrawerStructure from './AppNavigator';

import ProductCreate from '../components/ProductCreate';
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';
import StoreListScreen from '../screens/StoreListScreen';

const product_StackNavigator = createStackNavigator({
  productList: {
    screen: ProductListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
  createProduct: {
    screen: ProductCreate,
    navigationOptions: ({ navigation }) => ({
      title: 'Crear Producto'
    })
  },
  productDetail: {
    screen: ProductDetailScreen
  }
});

const store_StackNavigator = createStackNavigator({
  storeList: {
    screen: StoreListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  }
});

const DrawerNavigator = createDrawerNavigator(
  {
    store: {
      screen: store_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Restaurantes'
      }
    },
    Products: {
      screen: product_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Productos'
      }
    }
  }
);


export default createAppContainer(DrawerNavigator);
