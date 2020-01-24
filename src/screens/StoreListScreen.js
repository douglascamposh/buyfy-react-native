import React, { Component } from 'react';
import StoreList from '../components/store/StoreList';
import { HeaderButton } from '../components/common';

class StoreListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Restaurantes',
      headerRight: () => (
        <HeaderButton icon='ios-add-circle-outline' onPress={() => navigation.navigate('createStore')}/>
      )
    }
  }

  render() {
    return <StoreList navigation={this.props.navigation}/>;
  }
}

export default StoreListScreen;
