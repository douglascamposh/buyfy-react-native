import React, { Component } from 'react';
import { HeaderButton } from '../components/common';
import ProductList from '../components/product/ProductList';

class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { uid: storeId, name } = navigation.getParam('store', {});
    return {
      headerTitle: name,
      headerRight: () => (
        <HeaderButton icon='ios-add-circle-outline' onPress={() => navigation.navigate('createProduct', { storeId })} />
      )
    }
  }

  render() {
    return <ProductList navigation={this.props.navigation} />;
  }
}

export default ProductListScreen;
