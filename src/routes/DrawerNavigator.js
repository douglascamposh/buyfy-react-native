import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { HeaderBar } from '../components/common';
import { Colors } from '../constants/Styles'
import LoadingScreen from '../screens/auth/LoadingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import AccountDataStack from './AccountStack';
import AddressStack from './AddressStack';
import AdminStack from './AdminStack';
import StoreStack from './StoreStack';
import OrderAdminStack from './OrderAdminStack';
import OrderRiderStack from './OrderRiderStack';
import MenuSideBar from '../components/menu/MenuSideBar'; 

const CustomDrawerComponent = (props) => (    
  <SafeAreaView forceInset={{ vertical : 'always', horizontal: 'never' }}>
    <MenuSideBar/>
    <ScrollView>
      <DrawerItems { ...props } />
    </ScrollView>
  </SafeAreaView>  
);

const SwitchNavigator = createSwitchNavigator({
  loading: {
    screen: LoadingScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  auth: {
    screen: AuthScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  drawer: createDrawerNavigator({ 
    store: {
      screen: StoreStack,
      navigationOptions: {
        drawerLabel: 'Restaurantes',
        drawerIcon: ({focused, tintColor, size}) => (
          <View style={ focused ? styles.itemMenu : null }>
            <Icon name="fast-food-outline" type='ionicon' size={size} color={tintColor}/>
          </View>
        ),
      }
    },
    address: {
      screen: AddressStack,
      navigationOptions: {
        drawerLabel: 'Mis direcciones',
        drawerIcon: ({ focused, tintColor, size }) => (
          <View style={ focused ? styles.itemMenu : null }>
            <Icon name="location-outline" type='ionicon' size={size} color={tintColor}/>
          </View>
        ),
      }
    },
    admin: {
      screen: AdminStack,
      navigationOptions: {
        drawerLabel: 'Administración',
        drawerIcon: ({ focused, tintColor, size }) => (
          <View style={ focused ? styles.itemMenu : null }>
            <Icon name="file-tray-full-outline" type='ionicon' size={size} color={tintColor}/>
          </View>
        ),
      }
    },
    orderAdmin: {
      screen: OrderAdminStack,
      navigationOptions: {
        drawerLabel: 'Pedidos',
        drawerIcon: ({ focused, tintColor, size }) => (
          <View style={ focused ? styles.itemMenu : null }>
            <Icon name="receipt-outline" type='ionicon' size={size} color={tintColor} />
          </View>
        ),
      }
    },
    orderRider: {
      screen: OrderRiderStack,
      navigationOptions: {
        drawerLabel: 'Pedidos Recibidos',
        drawerIcon: ({ focused, tintColor, size }) => (
          <View style={ focused ? styles.itemMenu : null }>
            <Icon name="bicycle-outline" type='ionicon' size={size} color={tintColor} />
          </View>
        ),
      }
    },
    account: {
      screen: AccountDataStack,
      navigationOptions: {
        drawerLabel: 'Mi cuenta',
        drawerIcon: ({focused, tintColor, size}) => (
          <View style={ focused ? styles.itemMenu : null }>
            <Icon name="person-outline" type='ionicon' size={size} color={tintColor} />
          </View>   
        ),      
      }
    },
  }, {
    contentComponent: CustomDrawerComponent,
    drawerBackgroundColor: "#faf6f3",
    contentOptions: {
      activeTintColor: Colors.disable,
      activeBackgroundColor: 'transparent',
      iconContainerStyle: {
        opacity: 1,
      },  
    }
  })
});

const Navigator = createAppContainer(SwitchNavigator);

const styles = {
  itemMenu: {
    width: 30,
    borderLeftColor: Colors.headerBlue,
    borderLeftWidth: 4,
    paddingLeft: 3,
  }
}

export default Navigator;
