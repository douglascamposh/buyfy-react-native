import React, { Component } from 'react';
import ProductList from '../components/product/ProductList';
import { HeaderButton } from '../components/common';
import { withNavigationFocus } from 'react-navigation';

class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.getParam('store', {});
    return {
      headerTitle: name,
      headerLeft: () => (
        <HeaderButton icon={'ios-arrow-back'} onPress={navigation.getParam('back', () => navigation.goBack())} />
      )
    }
  }

  render() {
    return <ProductList navigation={this.props.navigation} isFocused={this.props.isFocused ? true : false}/>;
  }
}

export default withNavigationFocus(ProductListScreen);
