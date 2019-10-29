import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {View, TouchableOpacity, Image} from 'react-native';

import ProductList from '../components/ProductList';
import ProductCreate from '../components/ProductCreate';


class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../../assets/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const productList_StackNavigator = createStackNavigator({
  First: {
    screen: ProductList,
    navigationOptions: ({ navigation }) => ({
      title: 'Prods',
      drawerLabel: 'Productos',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    })
  },
});

const productCreate_StackNavigator = createStackNavigator({
  Second: {
    screen: ProductCreate,
    navigationOptions: ({ navigation }) => ({
      title: 'ProdCreate',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
    }),
  },
});

const DrawerNavigator = createDrawerNavigator(
  {
    Products: {
      screen: productList_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Productos'
      },
    },
    ProductCreate: {
      screen: productCreate_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Crear Producto',
      }
    }
  }
);


export default createAppContainer(DrawerNavigator);
