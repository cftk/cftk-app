import React from 'react'
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking
} from 'react-native'
import { getTeamRoster } from '../api/Convio'
import Colors from '../constants/Colors'

export default class TeamRoster extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      roster: []
    }
  }

  componentWillMount () {
    // this.props.screenProps.id
    var that = this
    getTeamRoster(this.props.screenProps.token).then(function (roster) {
      that.setState({
        roster: roster
      })
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.state.roster.map(person => (
          <TouchableOpacity
            key={person.consId}
            style={styles.panel}
            onPress={() => Linking.openURL('mailto:' + person.email)}
          >
            {person.aTeamCaptain === 'true'
              ? <View style={styles.participant}>
                <Text style={styles.name}>{person.firstName} {person.lastName}</Text>
                <Text style={styles.captain}>Team Captain</Text>
              </View>
              : <View style={styles.participant}>
                <Text style={styles.name}>{person.firstName} {person.lastName}</Text>
              </View>
            }
            <Text style={styles.email}>{person.email}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  panel: {
    flex: 1,
    margin: 20,
    borderRadius: 5,
    backgroundColor: 'whitesmoke',
    // Android style only
    elevation: 5
  },
  participant: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.steelBlue,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  captain: {
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.sunshine
  },
  name: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  email: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
