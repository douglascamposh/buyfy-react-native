import React, { Component } from 'react';
import StoreList from '../components/store/StoreList';
import { Icon } from 'react-native-elements'

class StoreListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Restaurantes',
      headerRight: () => (
        <Icon
          name='ios-add-circle-outline'
          type='ionicon'
          color='#517fa4'
          onPress={() => navigation.navigate('createStore')} />
      )
    }
  }

  render() {
    return <StoreList navigation={this.props.navigation}/>;
  }
}

export default StoreListScreen;
