import React, { Component } from 'react';
import AddressCreateUpdate from '../../components/address/AddressCreateUpdate';

class AddressCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Dirección',
      title: 'Agregar Dirección'
    }
  }

  render() {
    return <AddressCreateUpdate navigation={this.props.navigation} title={'Agregar Dirección'}/>;
  }
}

export default AddressCreateScreen;
