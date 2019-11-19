import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import ProductList from '../components/ProductList';

class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { uid: storeId } = navigation.getParam('store', {});
    return {
      headerTitle: 'Productos',
      headerRight: () => (
        <Icon
          name='ios-add-circle-outline'
          type='ionicon'
          color='#517fa4'
          onPress={() => navigation.navigate('createProduct', { storeId })} />
      )
    }
  }

  render() {
    return <ProductList navigation={this.props.navigation}/>;
  }
}

export default ProductListScreen;
