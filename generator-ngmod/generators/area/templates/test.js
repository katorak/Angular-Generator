(function() {
    'use strict';

    angular
        .module('app.areas.!!NAME!!')
        .controller('!!NAME!!', Module);

    Module.$inject = ['$q', 'dataservice', 'logger'];

    function Module($q, dataservice, logger) {

        var vm = this;

        vm.title = '!!NAME!!';
        vm.person = { fname: 'Clark', lname: 'Kent'}
        activate();

        function activate() {
            /*var promises = [getCount(), getAll()];
            return $q.all(promises).then(function() {
                logger.info('Activated !!NAME!! View CHANGE');
            });*/
        }

        function getCount() {
            return dataservice.getCount().then(function(data) {
                vm.Count = data;
                return vm.Count;
            });
        }

        function getAll() {
            return dataservice.getAll().then(function(data) {
                vm.list = data;
                return vm.list;
            });
        }
    }
})();
