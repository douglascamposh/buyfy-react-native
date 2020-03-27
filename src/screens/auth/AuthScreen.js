import React, { Component } from 'react';
import Login from '../../components/auth/Login';

class AuthScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Iniciar sesion',
      title: 'Iniciar sesion',
    }
  }

  navigateTo = () => {
    this.props.navigation.navigate('storeList');
  }

  render() {
    return <Login navigateTo={this.navigateTo}/>;
  }
}

export default AuthScreen;
