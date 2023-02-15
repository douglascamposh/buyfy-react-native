import React, { Component } from 'react';
import StoreList from '../components/store/StoreList';
import { HeaderButton } from '../components/common';

class StoreListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Restaurantes',
      headerTruncatedBackTitle: 'Atras'
    }
  }

  render() {
    return <StoreList navigation={this.props.navigation}/>;
  }
}

export default StoreListScreen;
