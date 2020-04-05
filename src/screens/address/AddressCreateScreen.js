import React, { Component } from 'react';
import AddressCreate from '../../components/address/AddressCreate';

class AddressCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Dirección',
      title: 'Agregar Dirección'
    }
  }

  render() {
    return <AddressCreate navigation={this.props.navigation} title={'Agregar Dirección'}/>;
  }
}

export default AddressCreateScreen;
