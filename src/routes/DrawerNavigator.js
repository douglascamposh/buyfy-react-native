import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../screens/auth/LoadingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import AccountDataStack from './AccountStack';
import AddressStack from './AddressStack';
import AdminStack from './AdminStack';
import StoreStack from './StoreStack';
import OrderAdminStack from './OrderAdminStack';
import OrderRiderStack from './OrderRiderStack';

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
        drawerLabel: 'Restaurantes'
      }
    },
    address: {
      screen: AddressStack,
      navigationOptions: {
        drawerLabel: 'Mis direcciones'
      }
    },
    admin: {
      screen: AdminStack,
      navigationOptions: {
        drawerLabel: 'Administración'
      }
    },
    orderAdmin: {
      screen: OrderAdminStack,
      navigationOptions: {
        drawerLabel: 'Pedidos'
      }
    },
    orderRider: {
      screen: OrderRiderStack,
      navigationOptions: {
        drawerLabel: 'Pedidos Recibidos'
      }
    }, account: {
      screen: AccountDataStack,
      navigationOptions: {
        drawerLabel: 'Mi cuenta'
      }
    },
  })
})

export default createAppContainer(SwitchNavigator);
