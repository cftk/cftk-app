/* global fetch */
var facebook = require('../facebookAPI.json')

/** IMPORTANT: People at Facebook are kinda dumb
 *
 * They didn't format their start_time and end_time right, it's missing a ':'
 * right before the end of the string (should go before the last 2 zeroes)
 *
 */

const eventsRequest = 'https://graph.facebook.com/v2.9/carolinaftk/events'

function getClientID () {
  return facebook.client_id
}

function getClientSecret () {
  return facebook.client_secret
}

function sendRequest (request, parameters, requestMethod) {
  request += parameters
  return fetch(request, {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then((res) => {
    // De-stringify JSON response
    var response = JSON.parse(res._bodyText)

    // DEV
    // console.log(response)

    return response
  })
}

function parseDate (date) {
  var position = date.length - 2
  var parsedDate = date.substr(0, position) + ':' + date.substr(position)

  return parsedDate
}

export function getEvents () {
  var eventsParameter = '?access_token=' +
    getClientID() + '|' + getClientSecret() + '&limit=10'
  return sendRequest(eventsRequest, eventsParameter, 'GET').then(function (response) {
    var events = []
    for (var i = 0; i < response.data.length; i++) {
      var event = {}
      if (response.data[i].hasOwnProperty('place')) {
        if ((new Date(parseDate(response.data[i].end_time))).getTime() > (new Date()).getTime()) {
          event.name = response.data[i].name
          event.url = response.data[i].id
          event.start_time = response.data[i].start_time
          event.end_time = response.data[i].end_time
          event.place = response.data[i].place.name

          events.push(event)
        }
      }
    }
    return events
  })
}
