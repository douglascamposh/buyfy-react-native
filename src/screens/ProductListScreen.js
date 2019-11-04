import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import ProductList from '../components/ProductList';

class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Productos',
      headerRight: () => (
        <Button title="Nuevo" onPress={() => navigation.navigate('createProduct')}/>
      )
    }
  }

  render() {
    return (
      <ProductList navigation={this.props.navigation}/>
    );
  }
}

export default ProductListScreen;
