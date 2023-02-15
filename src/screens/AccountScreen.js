import React, { Component } from 'react';
import AccountData from '../components/account/AccountData';

class AccountScreen extends Component{
  static navigationOptions = () => {
    return {
      headerTitle: 'Mi cuenta',
      title: 'Datos de usuario'
    }
  }
  render(){
    return(
      <AccountData navigation={this.props.navigation}/>
    )
  }
}

export default AccountScreen;