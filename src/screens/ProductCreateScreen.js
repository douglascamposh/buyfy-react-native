import React, { Component } from 'react';
import ProductCreate from '../components/ProductCreate';

class ProductCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Crear Producto',
      title: 'Nuevo Producto'
    }
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    return <ProductCreate navigation={this.props.navigation} storeId={storeId}/>;
  }
}

export default ProductCreateScreen;
