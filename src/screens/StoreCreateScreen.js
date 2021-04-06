import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import StoreCreate from '../components/store/StoreCreate';

class StoreCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Crear Tienda',
      title: 'Nuevo Tienda'
    }
  }

  navigateTo = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'storeAdminList' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return <StoreCreate navigateTo={this.navigateTo} />;
  }
}

export default StoreCreateScreen;
