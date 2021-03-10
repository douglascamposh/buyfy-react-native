import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationDrawerStructure from '../navigation/AppNavigator';
import AddressCreateScreen from '../screens/address/AddressCreateScreen';
import AddressListScreen from '../screens/address/AddressListScreen';
import AddressEditScreen from '../screens/address/AddressEditScreen';

const screens= {
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
};

const AddressStack = createStackNavigator(screens);

export default AddressStack;