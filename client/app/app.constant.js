(function(angular, undefined) {
'use strict';

angular.module('myblogApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})

;
})(angular);