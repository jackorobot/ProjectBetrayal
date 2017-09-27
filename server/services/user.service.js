var Q = require('q');

var Team = require('../models/team.model');
 
var service = {};
 
service.authenticate = authenticate;
 
module.exports = service;
 
function authenticate(username, password) {
    var deferred = Q.defer();
 
    Team.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user && password === user.password) {
            // authentication successful
            deferred.resolve({
                _id: user._id
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}