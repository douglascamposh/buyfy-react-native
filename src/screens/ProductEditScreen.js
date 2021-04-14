import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import ProductCreate from '../components/product/ProductCreate';

class ProductEditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Editar Producto'
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
    const product = this.props.navigation.getParam('product', {});
    return <ProductCreate navigateTo={this.navigateTo} title={'Editar Product'} product={product} />;
  }
}

export default ProductEditScreen;
