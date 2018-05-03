import React, { Component } from 'react'
import {
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import Layout from '../constants/Layout'

import { getUserPoints, createUser, updatePoints } from '../api/Firebase'
import { getName } from '../api/Convio'

export default class QRScanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    error: null,
    name: '',
    points: 0
  }

  componentWillMount () {
    var that = this
    getUserPoints(this.props.consID).then(function (response) {
      if (response === false) {
        getName(that.props.consID, that.props.token).then(function (nameResponse) {
          createUser(that.props.consID, nameResponse)
        })
      } else {
        that.setState({
          points: response
        })
      }
    })
  }

  componentDidMount () {
    this._requestCameraPermission()
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  isJSON (data) {
    data = typeof data !== 'string'
      ? JSON.stringify(data)
      : data

    try {
      data = JSON.parse(data)
    } catch (e) {
      return false
    }

    if (typeof data === 'object' && data !== null) {
      return true
    }

    return false
  }

  readQR = result => {
    let that = this

    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring()

      if (this.isJSON(result.data)) {
        let points = JSON.parse(result.data)
        let newPoints = points.points + this.state.points
        if (points.token === 'carolinaftk') {
          updatePoints(that.props.consID, newPoints, points.id).then(function (response) {
            if (response === true) {
              that.setState({
                lastScannedPoints: points.points,
                points: newPoints,
                lastScannedUrl: result.data
              })
            } else {
              that.setState({
                error: 'QR Code already scanned!'
              })
            }
          })
        } else {
          this.setState({
            error: 'Invalid QR Code!'
          })
        }
      } else {
        this.setState({
          error: 'Invalid QR Code!'
        })
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : !this.state.hasCameraPermission
            ? <Text>Camera permission is not granted</Text>
            : <BarCodeScanner
              onBarCodeRead={this.readQR}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                top: 0
              }}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
        }
        {this.renderPoints()}
        {this.renderScore()}
        {this.renderError()}
      </View>
    )
  }

  handlePressCancel = () => {
    this.setState({
      lastScannedUrl: null,
      error: null
    })
  }

  renderScore = () => {
    return (
      <View style={styles.topBar}>
        <Text numberOfLines={1} style={styles.urlText}>
          Points: {this.state.points}
        </Text>
      </View>
    )
  }

  renderPoints = () => {
    if (!this.state.lastScannedUrl) {
      return
    }

    return (
      <View style={styles.displayMessage}>
        <TouchableOpacity style={styles.url}>
          <Text style={[styles.urlText, { paddingBottom: 5 }]}>
            Congrats, you got {this.state.lastScannedPoints} points!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this.handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderError = () => {
    if (!this.state.error) {
      return
    }

    return (
      <View style={styles.displayMessage}>
        <Text style={[styles.urlText, {paddingBottom: 5}]}>
          {this.state.error}
        </Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this.handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row'
  },
  // displayMessage: {
  //   position: 'absolute',
  //   top: Dimensions.get('window').height,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   padding: 15,
  //   flexDirection: 'row'
  // },
  displayMessage: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'column',
    width: Layout.width - 50,
    borderRadius: 5
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18
  }
})
