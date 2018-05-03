import React from 'react'
import {
  Text,
  Platform
} from 'react-native'
import Colors from '../constants/Colors'

export default class TitleText extends React.Component {
  render () {
    return (
      <Text style={styles.title}>{this.props.titleText}</Text>
    )
  }
}

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    padding: Platform.OS === 'ios' ? 30 : 25,
    paddingTop: Platform.OS === 'ios' ? 45 : 25,
    backgroundColor: Colors.carolinaBlue,
    color: '#004763',
    // Android styles only
    elevation: 5
  }
}
