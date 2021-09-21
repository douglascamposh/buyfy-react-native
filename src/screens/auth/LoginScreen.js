import React, { Component } from 'react';
import LoginForm from '../../components/auth/LoginEmail';

class AuthenticationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Sign In'
    }
  }

  render() {
    return <LoginForm navigation={this.props.navigation} />;
  }
}

export default AuthenticationScreen;
