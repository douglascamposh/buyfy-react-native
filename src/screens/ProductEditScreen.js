import React, { Component } from 'react';
import ProductCreate from '../components/product/ProductCreate';

class ProductEditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Editar Producto'
    }
  }

  navigateTo = () => {
    this.props.navigation.goBack();
  }

  render() {
    const product = this.props.navigation.getParam('product', {});
    return <ProductCreate navigateTo={this.navigateTo} title={'Editar Product'} product={product} />;
  }
}

export default ProductEditScreen;
