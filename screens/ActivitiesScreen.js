import React from 'react'
import {
  View
} from 'react-native'
import QRScanner from '../components/QRScanner'
import Timer from '../components/Timer'

export default class ActivitiesScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timer: true
    }

    this.endTimer = this.endTimer.bind(this)
  }

  endTimer () {
    this.setState({
      timer: false
    })
  }

  render () {
    return (
      <View>
        { this.state.timer
          ? <Timer
            endTimer={this.endTimer}
          />
          : <QRScanner
            consID={this.props.navigation.state.params.id}
            token={this.props.navigation.state.params.token}
          />
        }
      </View>
    )
  }
}
