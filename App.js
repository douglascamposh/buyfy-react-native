import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import AppNavigator from './src/navigation/DrawerNavigator';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';

class App extends Component {
  
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyCF_B7_evu1i8GNqYLaoN2W3VdJkjR-n1I",
      authDomain: "buyfy-4c6ff.firebaseapp.com",
      databaseURL: "https://buyfy-4c6ff.firebaseio.com",
      projectId: "buyfy-4c6ff",
      storageBucket: "buyfy-4c6ff.appspot.com",
      messagingSenderId: "490218052808",
      appId: "1:490218052808:web:a8d021f6c084695de819fd",
      measurementId: "G-7BSLRN0X6M"
    };
    const googleAuthConfig = {
      webClientId: '490218052808-9l5t3quf72ce2c23seocq3elf10dm0g0.apps.googleusercontent.com',
      secretKey: 'mxbj77NMV1HxNKC2Lyy7Lnbd'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppNavigator/>
      </Provider>
    );
  }
}

export default App;
