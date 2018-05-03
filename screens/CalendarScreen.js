import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { getEvents } from '../api/Facebook'
import CalendarEvent from '../components/CalendarEvent'
import TitleText from '../components/TitleText'

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Events'
  }

  constructor (props) {
    super(props)

    this.state = {
      events: []
    }
  }

  componentWillMount () {
    let that = this
    getEvents().then(function (response) {
      let events = []
      for (var i = 0; i < response.length; i++) {
        let event = response[i]
        events = [event].concat(events)
      }

      that.setState({
        events: events
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <TitleText style={styles.title} titleText='Upcoming Events' />
        <ScrollView style={styles.eventsContainer}>
          {this.state.events.map(event => <CalendarEvent key={event.name} event={event} />)}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10
  },
  eventsContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
