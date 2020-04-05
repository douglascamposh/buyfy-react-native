import React, { Component } from 'react';
import AddressCreate from '../../components/address/AddressCreate';

class AddressEditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Dirección',
      title: 'Edit Dirección'
    }
  }

  render() {
    const address = this.props.navigation.getParam('address', {});
    return <AddressCreate navigation={this.props.navigation} title={'Editar Dirección'} address={address}/>;
  }
}

export default AddressEditScreen;
