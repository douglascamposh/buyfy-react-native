import React, { Component } from 'react';
import CheckoutDetail from '../components/checkout/CheckoutDetail';

class CheckoutScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Confirmar Pedido',
    }
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    return <CheckoutDetail navigation={this.props.navigation} storeId={storeId} />;
  }
}

export default CheckoutScreen;
