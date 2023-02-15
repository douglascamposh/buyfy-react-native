import React, { Component } from 'react';
import OrdersReceivedStore from '../../components/order/OrdersReceivedStore';

class ProductOrdersStoreScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { uid: storeId, name } = navigation.getParam('store', {});
    return {
      headerTitle: name
    }
  }

  render() {
    return <OrdersReceivedStore navigation={this.props.navigation} />;
  }

}

export default ProductOrdersStoreScreen;