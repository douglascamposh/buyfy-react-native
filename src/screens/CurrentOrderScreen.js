import React, { Component } from 'react';
import CurrentOrder from '../components/order/CurrentOrder';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { HeaderButton } from '../components/common';

class CurrentOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => { 
    return {
      headerTitle: 'Tu pedido',
      headerLeft: () => (
        <HeaderButton headerText={'Restaurantes'} onPress={() => navigation.navigate('storeList')} />
      )
    }
  }

  render() {
    return <CurrentOrder navigation={this.props.navigation} />;
  }
}

export default CurrentOrderScreen;
