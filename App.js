import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import ProductList from './src/components/ProductList';
import ProductCreate from './src/components/ProductCreate';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

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
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ProductList/>
        <ProductCreate/>
      </Provider>
    );
  }
}

export default App;
