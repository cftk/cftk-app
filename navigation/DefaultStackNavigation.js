import { StackNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import MainTabNavigator from './MainTabNavigator'

export default StackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'screen'
  }
)
