import React, { Component } from 'react';
import StoreList from '../components/store/StoreList';

class StoreListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Restaurantes'
    }
  }

  render() {
    return <StoreList navigation={this.props.navigation}/>;
  }
}

export default StoreListScreen;
