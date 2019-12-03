import React, { Component } from 'react';
import ProductDetail from '../components/product/ProductDetail';

class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Details',
      title: 'Product Detail'
    }
  }

  navigateTo = (route) => {
    this.props.navigation.navigate(route);
  }

  render() {
    const product = this.props.navigation.getParam('product', {});
    return <ProductDetail navigateTo={this.navigateTo} product={product}/>;
  }
}

export default ProductDetailScreen;
