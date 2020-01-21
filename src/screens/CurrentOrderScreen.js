import React, { Component } from 'react';
import CurrentOrder from '../components/order/CurrentOrder';
import { Text, TouchableWithoutFeedback } from 'react-native';

class CurrentOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => { 
    return {
      headerTitle: 'Tu pedido',
      headerLeft: () => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('storeList')}>
          <Text>Restaurantes</Text>
        </TouchableWithoutFeedback>
      )
    }
  }

  render() {
    return <CurrentOrder navigation={this.props.navigation} />;
  }
}

export default CurrentOrderScreen;
