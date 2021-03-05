import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationDrawerStructure from '../navigation/AppNavigator';
import AccountScreen from '../screens/AccountScreen';

const screens = {
  accountData: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
}

const AccountDataStack = createStackNavigator(screens);

export default AccountDataStack;