import React, { Component } from 'react';
import CurrentOrder from '../components/order/CurrentOrder';

class CurrentOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Tu pedido'
    }
  }

  render() {
    return <CurrentOrder navigation={this.props.navigation} />;
  }
}

export default CurrentOrderScreen;
