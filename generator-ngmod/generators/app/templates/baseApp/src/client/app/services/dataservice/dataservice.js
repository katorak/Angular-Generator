(function() {
    'use strict';

    angular
        .module('app.services.dataservice')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getAll: getAll,
            getCount: getCount,
            ready: ready
        };

        return service;

        function getAll() {
            //TEST COMMENT
            return undefined;
            /*return $http.get('/api/data')
                .then(getAllComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for get all')(message);
                    $location.url('/');
                });

            function getAllComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
            */
        }

        function getCount() {
            return 0;
            /*var count = 0;
            return getAll()
                .then(getAllComplete)
                .catch(exception.catcher('XHR Failed for getAvengerCount'));

            function getAllComplete (data) {
                if(data != undefined){
                    count = data.length;                
                }else{
                    count = 0;
                }
                return $q.when(count);
            }
            */
        }

        function prime() {
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
