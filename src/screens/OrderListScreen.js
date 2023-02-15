import React, { Component } from 'react';
import OrderList from '../components/order/OrderList';

class OrderListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    //const { uid: storeId } = navigation.getParam('store', {});
    return {
      headerTitle: 'Mi Pedido',
    }
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    return <OrderList navigation={this.props.navigation} storeId={storeId}/>;
  }
}

export default OrderListScreen;
