import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import AppNavigator from './src/navigation/DrawerNavigator';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import { firebaseConfig } from './TokenConfig';

class App extends Component {
  
  componentWillMount(){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
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
