import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import ProductDetail from '../components/ProductDetail';

class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Details',
      title: 'Product Detail'
    }
  }



  render() {
    const product = this.props.navigation.getParam('product', {});
    return <ProductDetail product={product}/>;
  }
}

export default ProductDetailScreen;
