import React, { Component } from 'react';
import ProductList from '../components/product/ProductList';

class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.getParam('store', {});
    return {
      headerTitle: name
    }
  }

  render() {
    return <ProductList navigation={this.props.navigation} />;
  }
}

export default ProductListScreen;
