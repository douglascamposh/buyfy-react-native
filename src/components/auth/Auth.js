import React, { Component } from 'react';
import LoginGoogle from '../../components/auth/LoginGoogle';
import LoginForm from '../../components/auth/LoginForm';
import { View } from 'react-native';

class Auth extends Component {
  render() {
    return (  
      <View style={styles.container}>
        <LoginForm navigateTo={this.navigateTo}/>
        <LoginGoogle navigateTo={this.navigateTo}/>
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
