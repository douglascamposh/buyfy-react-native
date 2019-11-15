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
    return <ProductDetail navigation={this.props.navigation}/>;
  }
}

export default ProductDetailScreen;
