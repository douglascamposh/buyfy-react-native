import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import ProductList from './src/components/ProductList';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

class App extends Component {
  
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyAWstYk9m6xgFDPT2s0r-KEVU80iYXFtvk",
      authDomain: "manager-f5b83.firebaseapp.com",
      databaseURL: "https://manager-f5b83.firebaseio.com",
      projectId: "manager-f5b83",
      storageBucket: "manager-f5b83.appspot.com",
      messagingSenderId: "221017087583",
      appId: "1:221017087583:web:b37b7c3657699b4d8185ea"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ProductList/>
      </Provider>
    );
  }
}

export default App;
