import React, { Component } from 'react';
import { GoogleMap } from '../components/common';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Ver en el mapa',
    }
  }

  render() {
    return <GoogleMap navigation={this.props.navigation} />;
  }
}

export default MapScreen;
