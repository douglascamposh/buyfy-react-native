import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationDrawerStructure from '../navigation/AppNavigator';
import StoreAdminScreen from '../screens/admin/StoreAdminScreen';
import StoreCreateScreen from '../screens/StoreCreateScreen';
import StoreEditScreen from '../screens/StoreEditScreen';
import ProductAdminScreen from '../screens/admin/ProductAdminScreen';
import ProductCreateScreen from '../screens/ProductCreateScreen';
import ProductEditScreen from '../screens/ProductEditScreen';

const screens = {
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
};

const AdminStack = createStackNavigator(screens);

export default AdminStack;