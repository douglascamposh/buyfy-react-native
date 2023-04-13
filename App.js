import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications'
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import AppNavigator from './src/routes/DrawerNavigator';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { FIREBASE_CONFIG } from './environment.json';
import { HeaderBar } from './src/components/common';
LogBox.ignoreLogs(['expo-constants']);

//temp fix, know issue only for android
import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);

class App extends Component {

  async componentDidMount() {
    // Initialize Firebase
    firebase.initializeApp(FIREBASE_CONFIG);
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Camera.requestCameraPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') { TODO: create a view or message "location is required to display the map"
    //   setErrorMsg('Permission to access location was denied');
    //   return;
    // }
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ToastProvider>
          <HeaderBar />
          <AppNavigator/>
        </ToastProvider>
      </Provider>
    );
  }
}

export default App;
