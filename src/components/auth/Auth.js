import React, { Component } from 'react';
import GoogleAuth from '../../components/auth/GoogleAuth';
import LoginEmail from '../../components/auth/LoginEmail';
import SkipLogin from '../../components/auth/SkipLogin';
import { View } from 'react-native';

class Auth extends Component {
  render() {
    return (  
      <View style={styles.container}>
        <LoginEmail navigateTo={this.props.navigateTo} navigateSignUp={this.props.navigateSignUp}/>
        <GoogleAuth navigateTo={this.props.navigateTo}/>
        <SkipLogin navigateTo={this.props.navigateTo}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
  }
};
  
export default Auth;
