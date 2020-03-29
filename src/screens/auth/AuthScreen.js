import React, { Component } from 'react';
import Auth from '../../components/auth/Auth';

class AuthScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Iniciar sesion',
      title: null,
    }
  }

  navigateTo = () => {
    this.props.navigation.navigate('storeList');
  }

  render() {
    return <Auth navigateTo={this.navigateTo}/>
  }
}

export default AuthScreen;
