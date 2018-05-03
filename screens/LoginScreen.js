import React from 'react'
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Linking
} from 'react-native'
import { login } from '../api/Convio'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

const IMAGE_HEIGHT = Layout.width / 3
const IMAGE_HEIGHT_SMALL = Layout.width / 5

export default class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: false,
      username: '',
      password: '',
      errorMessage: '',
      // Intial width of logo
      widthAnim: new Animated.Value(Layout.width)
    }

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT)

    this.login = this.login.bind(this)
  }

  componentWillMount () {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    } else {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }
  }

  componentWillUnmount () {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL
    }).start()
  }

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT
    }).start()
  }

  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL
    }).start()
  }

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT
    }).start()
  }

  login () {
    // Disable login button
    Keyboard.dismiss()
    this.setState({
      login: true
    })

    if (this.state.username !== '') {
      if (this.state.password !== '') {
        Animated.timing(
          this.state.widthAnim,
          {
            toValue: 100,
            duration: 500
          }
        ).start()

        login(this.state.username, this.state.password).then(response => {
          if (response.status) {
            this.props.navigation.navigate('Main', {
              id: response.id,
              token: response.token
            })
          } else {
            this.setState({
              errorMessage: response.code,
              login: false
            })
          }
        })
      }
    }
  }

  render () {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View style={{flexGrow: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            keyboardVerticalOffset={Platform.OS === 'android' ? 45 : 0}
          >
            <View style={{flex: 2, justifyContent: 'center'}}>
              <Animated.Image
                source={require('../assets/images/carolinaftk_logo.png')}
                style={[styles.logo, {height: this.imageHeight}]}
              />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={styles.error}>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
              </View>
              <TouchableOpacity style={styles.forgot}
                onPress={() => Linking.openURL('http://uncdm.convio.net/site/UserLogin?CMD=ForgotPassword')}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TextInput
                value={this.state.username}
                placeholder='Username'
                onChangeText={(username) => this.setState({username})}
                style={styles.formInput}
                autoCorrect={false}
                returnKeyType='next'
                autoCapitalize='none'
                maxLength={30}
                underlineColorAndroid='#fff'
                onSubmitEditing={(event => {
                  this.refs.Password.focus()
                })}
              />
              <TextInput
                ref='Password'
                value={this.state.password}
                placeholder='Password'
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                style={styles.formInput}
                autoCorrect={false}
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={30}
                underlineColorAndroid='#fff'
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.login}
                disabled={this.state.login}
              >
                <Text style={{color: 'white'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formInput: {
    height: 50,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    width: Layout.width - 50
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    width: Layout.width,
    marginBottom: 20,
    padding: 10,
    marginTop: 20
  },
  loginButton: {
    marginBottom: 20,
    width: Layout.width - 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: Colors.carolinaBlue,
    borderRadius: 5
  },
  error: {
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold'
  },
  forgot: {
    width: Layout.width - 50,
    marginHorizontal: 10
  },
  forgotText: {
    fontSize: 12,
    color: Colors.charcoal
  }
})
