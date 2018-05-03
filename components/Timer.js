import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

/**
 * Hard code value of date of marathon
 * TODO: MUST BE CHANGED EVERY YEAR
 * Format is YYYY-MM-DD(T)HH:MM:SS-Timezone
 * Don't change the T
 */
const marathonDate = new Date('2018-03-23T19:30:00-04:00')
const currentTime = (new Date()).getTime()

export default class Timer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timer: currentTime,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      enter: false
    }

    this.formatTime = this.formatTime.bind(this)
    this.endTimer = this.endTimer.bind(this)
    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    this.interval = setInterval(this.tick, 1000)
  }

  tick () {
    let time = this.state.timer
    // Add one second (in milliseconds)
    time += 1000

    this.formatTime(time)
  }

  formatTime (time) {
    this.setState({
      timer: time
    })

    // Find the distance between now an the count down date
    var distance = Date.parse(marathonDate) - Date.parse(new Date(time))
    var seconds = Math.floor((distance / 1000) % 60)
    if (seconds < 10) {
      seconds = '0' + seconds
    }

    var minutes = Math.floor((distance / 1000 / 60) % 60)
    if (minutes < 10) {
      minutes = '0' + minutes
    }

    var hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
    if (hours < 10) {
      hours = '0' + hours
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    if (days < 10) {
      days = '0' + days
    }

    if (distance <= 0) {
      seconds = '00'
      minutes = '00'
      hours = '00'
      days = '00'

      this.setState({
        enter: true
      })
    }

    this.setState({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days
    })
  }

  endTimer () {
    clearInterval(this.interval)
    this.props.endTimer()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          paddingLeft: 20,
          paddingRight: 20
        }}>The activities section will become available at the start of the marathon!</Text>
        <View style={styles.dateContainer}>
          <View style={styles.date}>
            <Text style={styles.dateHeader}>Days</Text>
            <Text style={styles.dateBody}>{this.state.days}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateHeader}>Hours</Text>
            <Text style={styles.dateBody}>{this.state.hours}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateHeader}>Minutes</Text>
            <Text style={styles.dateBody}>{this.state.minutes}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateHeader}>Seconds</Text>
            <Text style={styles.dateBody}>{this.state.seconds}</Text>
          </View>
        </View>
        {this.state.enter
          ? <TouchableOpacity style={styles.button} onPress={this.endTimer}>
            <Text style={{color: 'white'}}>Enter</Text>
          </TouchableOpacity>
          : <Text />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Layout.height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  dateContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.steelBlue,
    padding: 10,
    borderRadius: 5,
    margin: 20,
    // Android styles only
    elevation: 5
  },
  date: {
    paddingLeft: 10,
    paddingRight: 10
  },
  dateHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  },
  dateBody: {
    textAlign: 'center',
    color: '#fff'
  },
  button: {
    marginBottom: 20,
    width: Layout.width - 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: Colors.carolinaBlue,
    borderRadius: 5,
    // Android style only
    elevation: 5
  }
})
