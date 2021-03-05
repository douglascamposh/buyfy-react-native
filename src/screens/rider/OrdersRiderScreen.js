import React, { Component } from 'react';
import OrdersRider from '../../components/order/OrdersRider';

class OrdersRiderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Administración Pedidos'
    }
  }

  render() {
    return <OrdersRider navigation={this.props.navigation} />;
  }
}

export default OrdersRiderScreen;
