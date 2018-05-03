import * as firebase from 'firebase'

var init = {
  apiKey: 'AIzaSyBzXsSM1JfNtfQO8Le7ZqNzAaQKEGp6jFM',
  authDomain: 'cftk-app.firebaseapp.com',
  databaseURL: 'https://cftk-app.firebaseio.com',
  projectId: 'cftk-app',
  storageBucket: 'cftk-app.appspot.com',
  messagingSenderId: '823039755315'
}
const fire = firebase.initializeApp(init)

export function getUserPoints (consID) {
  return fire.database().ref('/users/' + consID).once('value').then(function (snapshot) {
    if (snapshot.val() === null) {
      return false
    } else {
      var info = snapshot.val()
      var points = info.points
      return points
    }
  })
}

export function createUser (consID, name) {
  fire.database().ref('users/' + consID).set({
    points: 0,
    name: name
  })
}

export function updatePoints (consID, points, id) {
  return fire.database().ref('/users/' + consID).once('value').then(function (snapshot) {
    if (!snapshot.child(id).exists()) {
      fire.database().ref('users/' + consID).update({
        points: points
      })

      fire.database().ref('/users/' + consID).child(id).set('true')

      return true
    } else {
      return false
    }
  })
}
