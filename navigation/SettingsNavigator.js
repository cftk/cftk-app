import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import SettingsScreen from '../screens/SettingsScreen'
import TeamRoster from '../screens/TeamRosterScreen'

import Colors from '../constants/Colors'

const styles = {
  header: {
    padding: 30,
    paddingTop: Platform.OS === 'ios' ? 45 : 30,
    backgroundColor: Colors.carolinaBlue,
    // Android styles only
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#004763'
  }
}

const SettingsNav = StackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null
      }
    },
    Roster: {
      screen: TeamRoster,
      navigationOptions: {
        title: 'Team Roster',
        headerStyle: styles.header,
        headerTitleStyle: styles.title
      }
    }
  },
  {
    initialRouteName: 'Settings'
  }
)

export default class SettingsNavigator extends React.Component {
  render () {
    return (
      <SettingsNav
        screenProps={this.props.navigation.state.params}
      />
    )
  }
}
