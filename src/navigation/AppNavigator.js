import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { HeaderButton } from '../components/common';

class NavigationDrawerStructure extends Component {
  componentDidMount(){
    this.focusListener = this.props.navigationProps.addListener('didFocus', () => {
			BackHandler.addEventListener("hardwareBackPress", this.hardwareButtonBack);
		});
		this.focusListener = this.props.navigationProps.addListener('didBlur', () => {	
       BackHandler.removeEventListener("hardwareBackPress", this.hardwareButtonBack);
		 });
  }

  componentWillUnmount() {
		this.focusListener.remove();
	}

  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  hardwareButtonBack = () => {
    const stackKey = this.props.navigationProps.state.key;
    const historyKey = stackKey[stackKey.length -1];
    historyKey == 0 ? BackHandler.exitApp() : this.props.navigationProps.navigate('storeList');
    return true;
  };

  render() {
    return (
      <HeaderButton icon='ios-menu' onPress={this.toggleDrawer.bind(this)} />
    );
  }
}

export default NavigationDrawerStructure;
