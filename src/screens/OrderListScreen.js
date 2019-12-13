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
    const orderId = this.props.navigation.getParam('orderId', {});
    return <OrderList navigation={this.props.navigation} orderId={orderId}/>;
  }
}

export default OrderListScreen;
