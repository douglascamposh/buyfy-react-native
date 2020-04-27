import React, { Component } from 'react';
import firebase from 'firebase';
import { Button } from '../../components/common';

class LogOutScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Cerrar sesion'
    }
  }


  onButtonPress() {
    firebase.auth().signOut();
  }

  render() {
    return <Button onPress={this.onButtonPress.bind(this)}>Log out</Button>
  }
}

export default LogOutScreen;
