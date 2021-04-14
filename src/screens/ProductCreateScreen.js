import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import ProductCreate from '../components/product/ProductCreate';

class ProductCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Crear Producto',
      title: 'Nuevo Producto'
    }
  }

  navigateTo = (route, storeId) => {
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'storeAdminList'}),
        NavigationActions.navigate({ routeName: route, params: {storeId}})
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    return <ProductCreate navigateTo={this.navigateTo} storeId={storeId} />;
  }
}

export default ProductCreateScreen;
