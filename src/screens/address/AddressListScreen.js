import React, { Component } from 'react';
import AddressList from '../../components/address/AddressList';
import { HeaderButton } from '../../components/common';

class AddressListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Mis direcciones',
      headerRight: () => (
        <HeaderButton icon='ios-add-circle-outline' onPress={() => navigation.navigate('createAddress')} />
      )
    }
  }

  render() {
    return <AddressList navigation={this.props.navigation}/>;
  }
}

export default AddressListScreen;
