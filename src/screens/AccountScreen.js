import React, { Component } from 'react';
import { View } from 'react-native';
import AccountData from '../components/account/AccountData';

class AccountScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Mi cuenta',
      title: 'Data User'
    }
  }
  render(){
    return(
      <AccountData />
    )
  }
}

export default AccountScreen;