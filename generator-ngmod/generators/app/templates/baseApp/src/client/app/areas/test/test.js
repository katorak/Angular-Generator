(function() {
    'use strict';

    angular
        .module('app.areas.test')
        .controller('Test', Module);

    Module.$inject = ['$q', 'wonka', 'logger'];

    function Module($q, wonka, logger) {

        var vm = this;

        vm.title = 'Test';
        vm.person = { fname: 'Clark', lname: 'Kent'}
        activate();

        function activate() {
            /*var promises = [getCount(), getAll()];
            return $q.all(promises).then(function() {
                logger.info('Activated Test View CHANGE');
            });*/
        }

        function getCount() {
            return wonka.getCount().then(function(data) {
                vm.Count = data;
                return vm.Count;
            });
        }

        function getAll() {
            return wonka.getAll().then(function(data) {
                vm.list = data;
                return vm.list;
            });
        }
    }
})();
