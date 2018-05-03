// This is a bit of a long page, bear with it...

import React from 'react'
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

import TitleText from '../components/TitleText'
import Accordion from '@ercpereda/react-native-accordion'
import ModAccordion from '../components/ModAccordion'
import Layout from '../constants/Layout'

const questions = [
  {
    'title': '​Marathon Schedule',
    'body': '6:00PM - Blue, Green, Orange Team Check-In\n' +
      '6:15PM - Purple, Pink, White Team Check-In\n' +
      '6:30PM - Red, Yellow Team Check-In\n' +
      '7:00 PM - Stand Up\n' +
      '7:45 PM - Performances Begin\n' +
      '8:30 PM - Dinner\n' +
      '9:45 PM - Indoor Sports\n' +
      '1:00 AM - Glow in the Dark Capture the Flag\n' +
      '2:15 AM - Fetzer Field Day\n' +
      '3:30 AM - Snack\n' +
      '4:00 AM - Zumba\n' +
      '4:45 AM - Senior Hour/Dodgeball\n' +
      '6:30 AM - Kenan Sunrise Walk\n' +
      '8:00 AM - Rave\n' +
      '9:00 AM - Breakfast\n' +
      '9:45 AM - Performances\n' +
      '10:30 AM - Hedgehogs\n' +
      '11:45 AM - Yoga\n' +
      '12:30 PM - Lunch\n' +
      '2:00 PM - Tar Heel Town\n' +
      '4:10 PM - Final Jam\n' +
      '5:00 PM - KCC Talent Show\n' +
      '6:00 PM - Family Hour\n' +
      '6:50 PM - Sway Time\n' +
      '7:00 PM - Sit Down\n'
  },
  {
    'title': '​​Do I really have to dance for 24 hours?',
    'body': "\tYou don't actually have to dance for 24 hours! There are two gyms at the event. One is for performances and dancing, and the other is for alternative activities, such as basketball, video games, and other fun activities! There is also a quiet homework space if you need to study during the Marathon.  Click here for more information about what you can expect at the 24 hour UNC Dance Marathon event."
  },
  {
    'title': 'What all is there to do at the marathon?',
    'body': '\tThere are so many things to do! You can watch performances from some of UNC and Chapel Hill’s best groups in the Performer Gym, play games in the Activity Gym, check out a book from the Library, study or chill out in the Study Room, and so much more! You will never be at a loss for things to do at the marathon.'
  },
  {
    'title': '​What do I need to bring to the marathon?',
    'body': '\tWe recommend all dancers bring the following to the 24-hour marathon:\n\n' +
      ' - A change of clothes, and warm clothes!\n' +
      ' - Multiple pairs of socks and shoes\n' +
      ' - Toiletries\n' +
      ' - Deodorant\n' +
      ' - Chapstick\n' +
      ' - Water\n' +
      ' - Any chargers that you may need\n' +
      ' - Snacks\n' +
      ' - Money to buy merchandise\n' +
      ' - Spare change\n' +
      ' - Any medication you need\n' +
      ' - Homework or study materials if you want'
  },
  {
    'title': '​Can my friends visit me during the marathon?',
    'body': '\tYes! We encourage you to invite all of your friends to the marathon. Anyone can visit you at anytime. Additionally, you will have the opportunity to hang out friends in a cause-centered area of the marathon. “Hospital Hallway” is the front hallway of the marathon next to the Performer Gym where you can create crafts for our Kid Co-Captains in a quieter space with your visitors.'
  },
  {
    'title': '​Can I win prizes at the marathon?',
    'body': '\tYes! We are still working on determining exactly what these will be, but stay tuned for some awesome incentives!'
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    flexGrow: 1
  },
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
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  map: {
    height: 200,
    margin: 20
  },
  sponsor: {
    marginTop: 20,
    marginBottom: 20
  },
  sponsorTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  sponsorLogo: {
    margin: 20,
    maxHeight: 200,
    maxWidth: Layout.width
  }
})

const MapHeader = ({ isOpen }) =>
  <View style={styles.header}>
    <Text style={styles.headerText}>Map</Text>
  </View>

const MapContent = (
  <View style={styles.body}>
    <Image
      style={styles.map}
      resizeMode='contain'
      source={require('../assets/images/fetzer_upper.png')}
    />
    <Image
      style={styles.map}
      resizeMode='contain'
      source={require('../assets/images/fetzer_lower.png')}
    />
  </View>
)

const SponsorsHeader = ({ isOpen }) =>
  <View style={styles.header}>
    <Text style={styles.headerText}>Sponsors</Text>
  </View>

const SponsorsBody = (
  <View style={styles.body}>
    <View style={styles.sponsor}>
      <Text style={styles.sponsorTitle}>Coastal Federal Credit Union</Text>
      <Image
        style={styles.sponsorLogo}
        resizeMode='contain'
        source={require('../assets/images/coastal.jpg')}
      />
    </View>
    <View style={styles.sponsor}>
      <Text style={styles.sponsorTitle}>Carolina Dining Services</Text>
      <Image
        style={styles.sponsorLogo}
        resizeMode='contain'
        source={require('../assets/images/cds.png')}
      />
    </View>
    <View style={styles.sponsor}>
      <Text style={styles.sponsorTitle}>Chapel View and Chapel Ridge Apartments</Text>
      <Image
        style={styles.sponsorLogo}
        resizeMode='contain'
        source={require('../assets/images/viewridge.png')}
      />
    </View>
    <View style={styles.sponsor}>
      <Text style={styles.sponsorTitle}>KIND</Text>
      <Image
        style={styles.sponsorLogo}
        resizeMode='contain'
        source={require('../assets/images/kind.jpg')}
      />
    </View>
    <View style={styles.sponsor}>
      <Text style={styles.sponsorTitle}>Northwestern Mutual</Text>
      <Image
        style={styles.sponsorLogo}
        resizeMode='contain'
        source={require('../assets/images/northwestern.jpg')}
      />
    </View>
  </View>
)

export default class FAQScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <TitleText titleText='FAQ' />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Accordion
            header={MapHeader}
            content={MapContent}
            duration={300}
          />
          <Accordion
            header={SponsorsHeader}
            content={SponsorsBody}
            duration={300}
          />
          <ModAccordion
            title={questions[0].title}
            body={questions[0].body}
          />
          <ModAccordion
            title={questions[1].title}
            body={questions[1].body}
          />
          <ModAccordion
            title={questions[2].title}
            body={questions[2].body}
          />
          <ModAccordion
            title={questions[3].title}
            body={questions[3].body}
          />
          <ModAccordion
            title={questions[4].title}
            body={questions[4].body}
          />
          <ModAccordion
            title={questions[5].title}
            body={questions[5].body}
          />
        </ScrollView>
      </View>
    )
  }
}
