import React, { Component } from 'react';
import CurrentOrder from '../components/order/CurrentOrder';
import { HeaderButton } from '../components/common';

class CurrentOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => { 
    return {
      headerTitle: 'Tu pedido',
      headerLeft: () => (
        <HeaderButton icon={'ios-arrow-back'} onPress={() => navigation.navigate('storeList')} />
      )
    }
  }

  render() {
    return <CurrentOrder navigation={this.props.navigation} />;
  }
}

export default CurrentOrderScreen;
