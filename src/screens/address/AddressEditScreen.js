import React, { Component } from 'react';
import AddressCreateUpdate from '../../components/address/AddressCreateUpdate';

class AddressEditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Dirección',
      title: 'Edit Dirección'
    }
  }

  render() {
    const address = this.props.navigation.getParam('address', {});
    return <AddressCreateUpdate navigation={this.props.navigation} title={'Editar Dirección'} address={address}/>;
  }
}

export default AddressEditScreen;
