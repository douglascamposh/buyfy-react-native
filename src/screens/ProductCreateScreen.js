import React, { Component } from 'react';
import ProductCreate from '../components/product/ProductCreate';

class ProductCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    
    return {
      headerTitle: 'Crear Producto',
      title: 'Nuevo Producto'
    }
  }

  navigateTo = () => {
    this.props.navigation.goBack();
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    const categoryId = this.props.navigation.getParam('categoryId',{})
    return <ProductCreate navigateTo={this.navigateTo} storeId={storeId} categoryId={categoryId}/>;
  }
}

export default ProductCreateScreen;
