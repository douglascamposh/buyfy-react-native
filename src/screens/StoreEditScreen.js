import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import StoreCreate from '../components/store/StoreCreate';

class StoreEditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Editar Tienda'
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
    const store = this.props.navigation.getParam('store', {});
    return <StoreCreate navigateTo={this.navigateTo} title={'Editar Tienda'} store={store} />;
  }
}

export default StoreEditScreen;
