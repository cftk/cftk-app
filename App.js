import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'

import DefaultStackNavigation from './navigation/DefaultStackNavigation'

import Colors from './constants/Colors'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoadingComplete: false
    }
  }

  render () {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar translucent backgroundColor={Colors.statusBar} barStyle='default' />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <DefaultStackNavigation />
        </View>
      )
    }
  }

  // Do all of the loading for the app here
  // Load firebase
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/carolinaftk_logo.png'),
        require('./assets/images/black_and_white_logo.png'),
        require('./assets/images/fetzer_lower.png'),
        require('./assets/images/fetzer_upper.png'),
        require('./assets/images/color_logo.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font
      })
    ])
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: Colors.statusBar
  }
})
