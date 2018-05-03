import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Pie from 'react-native-pie'

import Colors from '../constants/Colors'
import TitleText from '../components/TitleText'

import { getDancerInfo } from '../api/Convio'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)

    this.state = {
      consID: this.props.navigation.state.params.id,
      token: this.props.navigation.state.params.token,
      name: '',
      teamName: '',
      personalRaised: 0,
      personalGoal: 0,
      personalPercentage: 0,
      teamRaised: 0,
      teamGoal: 0,
      teamPercentage: 0,
      daysLeft: 0
    }
  }

  componentWillMount () {
    let that = this
    getDancerInfo(this.state.consID, this.state.token).then(function (response) {
      var personal = response.info.getParticipantProgressResponse.personalProgress
      var team = response.info.getParticipantProgressResponse.teamProgress
      var personalPercentage = Math.trunc((personal.raised / personal.goal) * 100)
      var teamPercentage = Math.trunc((team.raised / team.goal) * 100)

      that.setState({
        name: response.name,
        teamName: response.teamName,
        personalRaised: that.parseMoney(personal.raised),
        personalGoal: that.parseMoney(personal.goal),
        personalPercentage: personalPercentage,
        teamRaised: that.parseMoney(team.raised),
        teamGoal: that.parseMoney(team.goal),
        teamPercentage: teamPercentage,
        daysLeft: response.info.getParticipantProgressResponse.daysLeft
      })
    }).catch(function (error) {
      console.log(error)
    })
  }

  parseMoney (money) {
    // Adds decimal point
    var decimal = money.length - 2
    var parsedMoney = money.substr(0, decimal) + '.' + money.substr(decimal)

    // Adds commas
    return parsedMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  }

  render () {
    return (
      <View style={styles.container}>
        <TitleText style={styles.title} titleText={this.state.name} />
        <View>
          <Text style={styles.days}>Days Left: {this.state.daysLeft}</Text>
          <View style={{borderTopWidth: 1.25, borderColor: Colors.charcoal}}>
            <Text style={styles.subtitle}>Personal Fundraising</Text>
            <View style={styles.panel}>
              <View style={styles.information}>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoTitle}>Raised:</Text>
                  <Text>${this.state.personalRaised}</Text>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoTitle}>Goal:</Text>
                  <Text style={styles.infoAmount}>${this.state.personalGoal}</Text>
                </View>
              </View>
              <View style={styles.pieView}>
                <Pie
                  radius={50}
                  innerRadius={40}
                  series={[this.state.personalPercentage]}
                  colors={[Colors.carolinaBlue]}
                  backgroundColor='#ccc' />
                <View style={styles.gauge}>
                  <Text style={styles.gaugeText}>{this.state.personalPercentage}%</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{borderTopWidth: 2, borderColor: Colors.charcoal}}>
            <Text style={styles.subtitle}>{this.state.teamName}</Text>
          </View>
          {/* <Text style={styles.subtitle}>{this.state.teamName}</Text> */}
          <View style={styles.panel}>
            <View style={styles.information}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoTitle}>Raised:</Text>
                <Text>${this.state.teamRaised}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoTitle}>Goal:</Text>
                <Text style={styles.infoAmount}>${this.state.teamGoal}</Text>
              </View>
            </View>
            <View style={styles.pieView}>
              <Pie
                radius={50}
                innerRadius={40}
                series={[this.state.teamPercentage]}
                colors={[Colors.carolinaBlue]}
                backgroundColor='#ccc' />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>{this.state.teamPercentage}%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  days: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.charcoal,
    color: 'white'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  information: {
    paddingRight: 100
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  infoBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24
  }
})
