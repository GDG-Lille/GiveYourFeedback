"use strict";

/**
 * Controller of the conference page
 */
feedbackApp.controller("conferenceController", function ($scope, $routeParams, $location, ConferenceService, SessionService, CacheService) {

    $scope.project = 'Start Endpoints';

    if ($routeParams.idConference) {
        if (CacheService.getSessions($routeParams.idConference)) {
            var sessionsCache = CacheService.getSessions($routeParams.idConference);
            $scope.sessions = sessionsCache.sessions;
            $scope.locations = sessionsCache.locations;
            $scope.slots = sessionsCache.slots;
            $scope.days = sessionsCache.days;
        } else {
            $('.alert-info').removeClass("hide");
            SessionService.getSessions($routeParams.idConference)
                .success(function (resp) {
                    $('.alert-info').addClass("hide");
                    $scope.sessions = {};
                    $scope.locations = [];
                    $scope.slots = [];
                    $scope.days = [];
                    for (var i = 0; i < resp.items.length; i++) {
                        var currentSession = resp.items[i];
                        currentSession.sessionUrl = currentSession.idConference.toString() + '/' + currentSession.id.toString();

                        var currentStartTime = currentSession.startTime;
                        var currentLocation = currentSession.location;
                        var currentDay = currentSession.day;

                        if (!$scope.sessions[currentDay]){
                            $scope.sessions[currentDay] = {} ;
                        }
                        if (!$scope.sessions[currentDay][currentStartTime]){
                            $scope.sessions[currentDay][currentStartTime] = {} ;
                        }
                        if (!$scope.sessions[currentDay][currentStartTime][currentLocation]){
                            $scope.sessions[currentDay][currentStartTime][currentLocation] = {};
                        }
                        $scope.sessions[currentDay][currentStartTime][currentLocation] = currentSession;

                        if ($scope.locations.indexOf(currentLocation) == -1){
                            $scope.locations.push(currentLocation);
                        }
                        if ($scope.slots.indexOf(currentStartTime) == -1){
                            $scope.slots.push(currentStartTime);
                        }
                        if ($scope.days.indexOf(currentDay) == -1){
                            $scope.days.push(currentDay);
                        }
                    }
                    $scope.days.sort();
                    CacheService.setSessions($routeParams.idConference,{
                        sessions : $scope.sessions,
                        locations : $scope.locations,
                        slots : $scope.slots,
                        days : $scope.days
                    });
                })
        }
    } else {
        if (CacheService.getConferences()) {
            $scope.conferences = CacheService.getConferences();
        } else {
            $('.alert-info').removeClass("hide");
            ConferenceService.fetch().success(function (resp) {
                $('.alert-info').addClass("hide");
                $scope.conferences = resp.items;
                CacheService.setConferences(resp.items);
            });
        }
    }
});