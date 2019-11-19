import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name='ios-menu'
          type='ionicon'
          onPress={this.toggleDrawer.bind(this)}
        />
      </View>
    );
  }
}

export default NavigationDrawerStructure;
