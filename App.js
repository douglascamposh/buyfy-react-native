import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import AppNavigator from './src/navigation/DrawerNavigator';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import { firebaseConfig } from './TokenConfig';


//temp fix, know issue only for android
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class App extends Component {

  async componentDidMount() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.LOCATION);
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
