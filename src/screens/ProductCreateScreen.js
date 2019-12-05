import React, { Component } from 'react';
import ProductCreate from '../components/product/ProductCreate';

class ProductCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Crear Producto',
      title: 'Nuevo Producto'
    }
  }

  navigateTo = (route) => {
    this.props.navigation.navigate(route);
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    return <ProductCreate navigateTo={this.navigateTo} storeId={storeId}/>;
  }
}

export default ProductCreateScreen;
