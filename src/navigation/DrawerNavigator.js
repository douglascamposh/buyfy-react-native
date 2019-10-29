import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductList from '../components/ProductList';
import ProductCreate from '../components/ProductCreate';


const DrawerNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductList,
      navigationOptions: {
        drawerLabel: 'Productos'
      }
    },
    ProductCreate: {
      screen: ProductCreate,
      navigationOptions: {
        drawerLabel: 'Crear Producto'
      }
    }
  }
);

export default DrawerNavigator;
