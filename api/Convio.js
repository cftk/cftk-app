/* global fetch */

// Declare global variables
const API_KEY = 'uncdm'
const EVENT_ID = '1090' // This should change from year to year, check Blackbaud

function sendRequest (request, parameters, requestMethod) {
  return fetch(request, {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: parameters
  }).then((res) => {
    // De-stringify JSON response
    var response = JSON.parse(res._bodyText)

    return response
  }).catch(function (error) {
    console.log(error)
  })
}

export function login (username, password) {
  var loginRequest = 'https://secure2.convio.net/' + API_KEY + '/site/CRConsAPI'
  var loginParameters = 'method=login&' +
    'api_key=' + API_KEY + '&' +
    'v=1.0&' +
    'response_format=json&' +
    'user_name=' + username + '&' +
    'password=' + password
  var loginRequestMethod = 'POST'

  return sendRequest(loginRequest, loginParameters, loginRequestMethod).then(function (loginResponse) {
    if (loginResponse.loginResponse) {
      var consID = loginResponse.loginResponse.cons_id
      var token = loginResponse.loginResponse.token
      return {
        status: true,
        id: consID,
        token: token
      }
    } else if (loginResponse.errorResponse) {
      return {
        status: false,
        code: 'Incorrect username or password...'
      }
    } else {
      return {
        status: false,
        code: 'There was a problem connecting to our database...'
      }
    }
  })
}

export function getDancerInfo (consID, token) {
  var dancerInfoRequestURL = 'https://secure2.convio.net/' + API_KEY + '/site/CRTeamraiserAPI'
  var requestParameters = 'method=getParticipantProgress&' +
    'api_key=' + API_KEY + '&' +
    'v=1.0&' +
    'response_format=json&' +
    'cons_id=' + consID + '&' +
    'fr_id=' + EVENT_ID

  return getName(consID, token).then(function (nameResponse) {
    return getTeamName(consID).then(function (teamNameResponse) {
      return sendRequest(dancerInfoRequestURL, requestParameters, 'POST').then(function (infoResponse) {
        return {
          name: nameResponse,
          teamName: teamNameResponse,
          info: infoResponse
        }
      })
    })
  })
}

export function getName (consID, token) {
  var nameRequestURL = 'https://secure2.convio.net/' + API_KEY + '/site/CRConsAPI'
  var requestParameters = 'method=getUser&' +
    'api_key=' + API_KEY + '&' +
    'v=1.0&' +
    'response_format=json&' +
    'cons_id=' + consID + '&' +
    'sso_auth_token=' + token
  var requestMethod = 'POST'

  return sendRequest(nameRequestURL, requestParameters, requestMethod).then(function (response) {
    var name = response.getConsResponse.name.first + ' ' + response.getConsResponse.name.last
    return name
  })
}

function getTeamName (consID) {
  var requestURL = 'https://secure2.convio.net/' + API_KEY + '/site/CRTeamraiserAPI'
  var requestParameters = 'method=getRegisteredTeamraisers&' +
    'api_key=' + API_KEY + '&' +
    'v=1.0&' +
    'response_format=json&' +
    'cons_id=' + consID
  var requestMethod = 'POST'

  return sendRequest(requestURL, requestParameters, requestMethod).then(function (response) {
    var teamraisers = response.getRegisteredTeamraisersResponse.teamraiser
    for (var i = 0; i < teamraisers.length; i++) {
      if (teamraisers[i].id === EVENT_ID) {
        return teamraisers[i].teamName
      }
    }

    return false
  })
}

// Functions for the settings page
export function updatePersonalGoal (token, newGoal) {
  var requestURL = 'https://secure2.convio.net/' + API_KEY + '/site/CRTeamraiserAPI'
  var requestParameters = 'method=updateRegistration&' +
    'api_key=' + API_KEY + '&' +
    'v=1.0&' +
    'response_format=json&' +
    'goal=' + newGoal + '&' +
    'fr_id=' + EVENT_ID + '&' +
    'sso_auth_token=' + token
  var requestMethod = 'POST'

  return sendRequest(requestURL, requestParameters, requestMethod).then(function (response) {
    return response
  })
}

function getTeamID (token) {
  var requestURL = 'https://secure2.convio.net/' + API_KEY + '/site/CRTeamraiserAPI'
  var requestParameters = 'method=getRegistration&' +
    'api_key=' + API_KEY + '&' +
    'v=1.0&' +
    'response_format=json&' +
    'fr_id=' + EVENT_ID + '&' +
    'sso_auth_token=' + token
  var requestMethod = 'POST'

  return sendRequest(requestURL, requestParameters, requestMethod).then(function (response) {
    return response.getRegistrationResponse.registration.teamId
  })
}

export function getTeamRoster (token) {
  return getTeamID(token).then(function (teamID) {
    var requestURL = 'https://secure2.convio.net/' + API_KEY + '/site/CRTeamraiserAPI'
    var requestParameters = 'method=getTeamRoster&' +
      'api_key=' + API_KEY + '&' +
      'v=1.0&' +
      'response_format=json&' +
      'fr_id=' + EVENT_ID + '&' +
      'team_id=' + teamID + '&' +
      'sso_auth_token=' + token
    var requestMethod = 'POST'

    return sendRequest(requestURL, requestParameters, requestMethod).then(function (roster) {
      roster = roster.getTeamRosterResponse.teamMember
      return roster
    })
  })
}

export function getPersonalPage (token) {
  var requestURL = 'https://secure2.convio.net/' + API_KEY + '/site/CRTeamraiserAPI'
  var requestParameters = 'method=getShortcut&' +
    'api_key=' + API_KEY + '&' +
    'v=1.0&' +
    'response_format=json&' +
    'fr_id=' + EVENT_ID + '&' +
    'sso_auth_token=' + token
  var requestMethod = 'POST'

  return sendRequest(requestURL, requestParameters, requestMethod).then(function (page) {
    return page.getShortcutResponse.shortcutItem.url
  })
}
