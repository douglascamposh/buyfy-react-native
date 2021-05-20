import React, {Component} from 'react';
import ProductAdminList from '../../components/product/ProductAdminList';
import { HeaderButton } from '../../components/common';

class ProductAdminScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const storeId = navigation.getParam('storeId', {});
    const name = navigation.getParam('name', {});
    return {
      headerTitle: name,
      headerRight: () => (
        <HeaderButton icon='ios-add-circle-outline' onPress={() => navigation.navigate('createProduct', { storeId })} />
      )
    }
  }

  render() {

    return <ProductAdminList navigation={this.props.navigation} />;
  }

}

export default ProductAdminScreen;