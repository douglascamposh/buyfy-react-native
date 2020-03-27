import React, { Component } from 'react';
import firebase from 'firebase';
import { Spinner } from '../../components/common';

class LoadingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Iniciar sesion'
    }
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if(user) {
          this.props.navigation.navigate('storeList');
        } else {
          this.props.navigation.navigate('auth');
        }
      }.bind(this)
    );
  }

  render() {
    return <Spinner/>;
  }
}

export default LoadingScreen;
