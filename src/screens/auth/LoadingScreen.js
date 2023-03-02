import React, { Component } from 'react';
import firebase from 'firebase';
import { Spinner } from '../../components/common';
import * as Fonts from 'expo-font';
import customFonts from '../../../src/constants/Fonts';
//refactor with the new package https://docs.expo.dev/versions/latest/sdk/font/
class LoadingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Espere por favor'
    }
  }

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
     await Fonts.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.props.navigation.navigate('storeList');
      } else {
        this.props.navigation.navigate('auth');
      }
    });
  }

  render() {
    if (this.state.fontsLoaded) {
      this.checkIfLoggedIn(); 
    }
    return <Spinner/>;
  }
}

export default LoadingScreen;
