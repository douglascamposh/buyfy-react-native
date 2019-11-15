import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import ProductList from '../components/ProductList';

class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { uid: storeId } = navigation.getParam('store', {});
    return {
      headerTitle: 'Productos',
      headerRight: () => (
        <Button title="Nuevo" onPress={() => navigation.navigate('createProduct', { storeId })}/>
      )
    }
  }

  render() {
    return <ProductList navigation={this.props.navigation}/>;
  }
}

export default ProductListScreen;
