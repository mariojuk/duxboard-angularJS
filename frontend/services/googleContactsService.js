sportApp.service('googleContactsService', ['$http', function($http) {
    var clientId = '589829549749-luh78b6toh1devpikm0ra5ejm6apdsig.apps.googleusercontent.com';
    var scope = 'https://www.googleapis.com/auth/contacts.readonly';
	var token;
    function getContacts(callback) {
        gapi.auth.authorize({ client_id: clientId, scope: scope, immediate: false }, handleAuthorization);

        function handleAuthorization(authorizationResult) {
            if (authorizationResult && !authorizationResult.error) {
                token = authorizationResult.access_token;
                $.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + token + "&max-results=1000&v=3.0",
                 function(response) {
                        var contacts = filterContactsData(response.feed.entry);
                        callback(contacts);
                    });
            }
        }
    }
function filterContactsData(contacts) {
        return _(contacts).filter(function(contact) {
            return contact.gd$email;
        }).map(function(contact) {
            return {
                name: contact.title.$t,
                email: contact.gd$email[0].address,
                img: contact.link[0].gd$etag
                        ? contact.link[0].href + "&access_token=" + token
                        : 'img/default_user.jpg'
            }   
        }).value();
    }
	
    return {
        getContacts: getContacts
    };
}]);
