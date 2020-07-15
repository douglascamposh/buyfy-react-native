import React, { Component } from 'react';
import StoreAdminList from '../../components/store/StoreAdminList';
import { HeaderButton } from '../../components/common';

class StoreAdminScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Administración',
      headerRight: () => (
        <HeaderButton icon='ios-add-circle-outline' onPress={() => navigation.navigate('createStore')} />
      )
    }
  }

  render() {

    return <StoreAdminList navigation={this.props.navigation} />;
  }
}

export default StoreAdminScreen;
