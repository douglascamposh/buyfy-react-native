import React, { Component } from 'react';
import SignUpEmail from '../../components/auth/SignUpEmail';

class SignUpScreen extends Component {
  navigateTo = () => {
    this.props.navigation.navigate('storeList');
  }

  render() {
    return <SignUpEmail navigateTo={this.navigateTo}/>
  }
}

export default SignUpScreen;
