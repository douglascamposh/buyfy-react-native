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
    return <OrderList navigation={this.props.navigation} />;
  }
}

export default OrderListScreen;
