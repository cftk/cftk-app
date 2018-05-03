import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import Colors from '../constants/Colors'
import Accordion from '@ercpereda/react-native-accordion'

export default class ModAccordion extends React.Component {
  constructor (props) {
    super(props)

    this.Header = ({ isOpen }) =>
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>

    this.Content = (
      <View style={styles.body}>
        <Text style={styles.bodyText}>{this.props.body}</Text>
      </View>
    )
  }

  render () {
    return (
      <Accordion
        header={this.Header}
        content={this.Content}
        duration={300}
      />
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'white'
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  body: {
    display: 'flex',
    backgroundColor: 'white'
  },
  bodyText: {
    fontSize: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    color: Colors.charcoal
  }
})
