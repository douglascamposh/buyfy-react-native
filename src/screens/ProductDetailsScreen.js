import React, { Component } from 'react';
import ProductDetail from '../components/product/ProductDetail';

class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Detalles',
      title: 'Product Detail'
    }
  }

  navigateTo = (route) => {
    this.props.navigation.navigate(route);
  }

  render() {
    const product = this.props.navigation.getParam('product', {});
    const order = this.props.navigation.getParam('order', {});
    return <ProductDetail navigateTo={this.navigateTo} product={product} order={order}/>;
  }
}

export default ProductDetailScreen;
