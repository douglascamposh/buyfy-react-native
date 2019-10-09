import React, { Component } from 'react';
import { Text, View } from 'react-native';

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
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

export default App;
