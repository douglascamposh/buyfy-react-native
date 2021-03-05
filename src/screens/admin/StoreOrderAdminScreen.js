import React, { Component } from 'react';
import StoreOrderList from '../../components/store/StoreOrderList';

class StoreOrderAdminScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Administración Pedidos'
    }
  }

  render() {
    return <StoreOrderList navigation={this.props.navigation} />;
  }
}

export default StoreOrderAdminScreen;
