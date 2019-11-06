import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import StoreList from '../components/store/StoreList';

class StoreListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Restaurantes',
      headerRight: () => (
        <Button title="Nuevo" onPress={() => navigation.navigate('createProduct')}/>
      )
    }
  }

  render() {
    return (<StoreList navigation={this.props.navigation}/>);
  }
}

export default StoreListScreen;
