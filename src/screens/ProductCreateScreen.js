import React, { Component } from 'react';
import ProductCreate from '../components/ProductCreate';

class ProductCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Crear Producto',
      title: 'Nuevo Producto'
    }
  }

  onButtonPress = () => {
    this.props.navigation.navigate('productList');
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    return <ProductCreate onButtonPress={this.onButtonPress} storeId={storeId}/>;
  }
}

export default ProductCreateScreen;
