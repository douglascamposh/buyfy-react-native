import { createStackNavigator } from 'react-navigation-stack';
import SignUpScreen from '../screens/auth/SignUpScreen';

const screens = {
  signUpScreen: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    })
  },
}

const SignUpEmailStack = createStackNavigator(screens);

export default SignUpEmailStack;