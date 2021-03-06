"use strict";

/**
 * Conference service to interact with the Conference API
 */
feedbackApp.service("UserService", function () {

    var currentUser = undefined;

    var currentToken = undefined;

    return {
        setUser : function(user) {
            currentUser = user;
        },
        getUser : function() {
            return currentUser;
        },
        setToken : function(token) {
            currentToken = token;
        },
        getToken : function() {
            return currentToken;
        },
        isLogged: function() {
            return currentUser;
        }
    };
});