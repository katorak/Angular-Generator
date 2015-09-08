(function() {
    'use strict';

    angular
        .module('app.areas.test')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/areas/test/index.html',
                    controller: 'Test',
                    controllerAs: 'vm',
                    title: 'test',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-module"></i> Test'
                    }
                }
            }
        ];
    }
})();
