gapi.load('client:auth2', init);

function init() {
    gapi.client.init({
        apiKey: 'AIzaSyCSN21yV4W0obignfo7UKXQ8OcIIxGQ9Tc',
        clientId: '',
        discovery: [],
        scope: ''
    }).then(function(){

        gapi.auth2.getAuthInstance().signIn().then(function(){
            listUpcomingEvents();
        });
    });
  }

