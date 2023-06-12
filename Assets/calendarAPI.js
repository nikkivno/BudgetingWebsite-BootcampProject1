// gapi.load('client:auth2', init);

// function init() {
//     gapi.client.init({
//         apiKey: 'AIzaSyCSN21yV4W0obignfo7UKXQ8OcIIxGQ9Tc',
//         clientId: '122574670671-rd21i195k6oj4amdikk62de84pboshbj.apps.googleusercontent.com',
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//         scope: 'https://www.googleapis.com/auth/calendar.readonly'
//     }).then(function(){

//         gapi.auth2.getAuthInstance().signIn().then(function(){
//             listUpcomingEvents();
//         });
//     });
//   }



//Caledar API 
const CLIENT_ID = '122574670671-rd21i195k6oj4amdikk62de84pboshbj.apps.googleusercontent.com'
const API_KEY = 'AIzaSyCSN21yV4W0obignfo7UKXQ8OcIIxGQ9Tc'

//Discovery Doc URL for API 
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'



