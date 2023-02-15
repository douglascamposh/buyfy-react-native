import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from '../screens/auth/AuthScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const screens = {
  auth: {
    screen: AuthScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    })
  },
  signUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Crear cuenta',
    }
  },
}

const AuthStack = createStackNavigator(screens);

export default AuthStack;