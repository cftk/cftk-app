import React from 'react'
import { Platform, Image } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'

// Importing style related components
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

// Import all screens
import HomeScreen from '../screens/HomeScreen'
import CalendarScreen from '../screens/CalendarScreen'
import SettingsNavigator from '../navigation/SettingsNavigator'
import ActivitiesScreen from '../screens/ActivitiesScreen'
import FAQScreen from '../screens/FAQScreen'

export default TabNavigator(
  {
    FAQ: {
      screen: FAQScreen
    },
    Events: {
      screen: CalendarScreen
    },
    Home: {
      screen: HomeScreen
    },
    Activities: {
      screen: ActivitiesScreen
    },
    Settings: {
      screen: SettingsNavigator
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
          case 'Home':
            iconName = '../assets/images/color_logo.png'
            break
          case 'Events':
            iconName = Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar'
            break
          case 'Settings':
            iconName = Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'
            break
          case 'Activities':
            iconName =
              Platform.OS === 'ios' ? `ios-game-controller-a${focused ? '' : '-outline'}` : `md-game-controller-a`
            break
          case 'FAQ':
            iconName =
              Platform.OS === 'ios' ? `ios-help${focused ? '' : '-outline'}` : `md-help`
            break
        }

        if (iconName.includes('assets')) {
          if (focused) {
            return (
              <Image
                source={require('../assets/images/color_logo.png')}
                style={{height: 28, width: 28, marginBottom: -3}}
              />
            )
          } else {
            return (
              <Image
                source={require('../assets/images/black_and_white_logo.png')}
                style={{height: 28, width: 28, marginBottom: -3}}
              />
            )
          }
        } else {
          return (
            <Ionicons
              name={iconName}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        }
      }
    }),
    tabBarOptions: {
      inactiveBackgroundColor: '#FFFFFF',
      activeBackgroundColor: 'whitesmoke',
      labelStyle: {
        fontWeight: 'bold'
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'Home'
  }
)
