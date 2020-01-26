import React, { Component } from 'react';
import { HeaderButton } from '../components/common';

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <HeaderButton icon='ios-menu' onPress={this.toggleDrawer.bind(this)} />
    );
  }
}

export default NavigationDrawerStructure;
