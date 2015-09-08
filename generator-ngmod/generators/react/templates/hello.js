(function() {
    'use strict';

    angular
        .module('app.react.!!NAME!!')
        .factory('!!NAME!!', !!NAME!!)
        .directive( '!!NAME!!', function( reactDirective ) {
            return reactDirective( '!!NAME!!' );
        });

    function !!NAME!!() {
        return React.createClass( {
            propTypes: {
                person: React.PropTypes.object.isRequired,
            },
            render: function() {
                return React.DOM.span( null,'!!NAME!! ' + this.props.person.fname + " " + this.props.person.lname);
            }
        });
    }
    
}());
