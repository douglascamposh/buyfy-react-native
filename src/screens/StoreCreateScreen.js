import React, { Component } from 'react';
import StoreCreate from '../components/store/StoreCreate';

class StoreCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Crear Tienda',
      title: 'Nuevo Tienda'
    }
  }

  navigateTo = () => {
    this.props.navigation.navigate('storeList');
  }

  render() {
    return <StoreCreate onButtonPress={this.navigateTo} />;
  }
}

export default StoreCreateScreen;
