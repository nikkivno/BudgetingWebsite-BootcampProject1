//Caledar API 
const CLIENT_ID = '122574670671-rd21i195k6oj4amdikk62de84pboshbj.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCSN21yV4W0obignfo7UKXQ8OcIIxGQ9Tc';

//Discovery Doc URL for API 
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

//Authorization scope
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

//Callback after api.js is loaded.
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

//Callback after the API client is loaded. Loads the discovery doc to initialize the API. 
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

//Callback after Google Identity Services are loaded.
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', 
  });
  gisInited = true;
  maybeEnableButtons();
}

//Enables user interaction after all libraries are loaded.
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

//Sign in the user opon button click.

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await listUpcomingEvents();
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({promt: 'consent'});
  } else {
      tokenClient.requestAccessToken({prompt:''});
    }
  }

//Sign out the user upon button click.
 function handleSignoutClick() {
   const token = gapi.client.getToken();
   if (token !== null) {
     google.accounts.oauth2.revoke(token.access_token);
     gapi.client.setToken('');
     document.getElementById('content').innerText = '';
     document.getElementById('authorize_button').innerText = 'Authorize';
     document.getElementById('signout_button').style.visibility = 'hidden';
   }
 }


//Dynamically Displays Calender
async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById('content').innerText = 'No events found.';
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      'Events:\n');
  document.getElementById('content').innerText = output;
}


