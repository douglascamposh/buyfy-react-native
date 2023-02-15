import React, {Component} from 'react';
import ProductAdminList from '../../components/product/ProductAdminList';
import { HeaderButton } from '../../components/common';

class ProductAdminScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const storeId = navigation.getParam('storeId', {});
    const categoryId = navigation.getParam('categoryId',{});
    const name = navigation.getParam('name', {});
    return {
      headerTitle: name,
      headerRight: () => (
        <HeaderButton icon='ios-add-circle-outline' onPress={() => navigation.navigate('createProduct', { storeId, categoryId })} />
      )
    }
  }

  render() {
    return <ProductAdminList navigation={this.props.navigation} />;
  }

}

export default ProductAdminScreen;