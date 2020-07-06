import React, { Component } from 'react';
import StoreCreate from '../components/store/StoreCreate';

class StoreEditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Editar Tienda'
    }
  }

  navigateTo = () => {
    this.props.navigation.navigate('storeList');
  }

  render() {
    const store = this.props.navigation.getParam('store', {});
    return <StoreCreate navigateTo={this.navigateTo} title={'Editar Tienda'} store={store} />;
  }
}

export default StoreEditScreen;
