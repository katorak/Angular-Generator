(function() {
    'use strict';

    angular
        .module('app.areas.!!NAME!!')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '!!ROUTE!!',
                config: {
                    templateUrl: 'app/areas/!!NAME!!/index.html',
                    controller: '!!NAME!!',
                    controllerAs: 'vm',
                    title: '!!NAME!!',
                    settings: {
                        !!NAV!!
                        content: '<i class="fa fa-module"></i> !!NAME!!'
                    }
                }
            }
        ];
    }
})();
