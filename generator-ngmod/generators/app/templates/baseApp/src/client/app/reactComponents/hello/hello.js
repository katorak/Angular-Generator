(function() {
    'use strict';

    angular
        .module('app.react.hello')
        .factory('Hello', hello)
        .directive( 'hello', function( reactDirective ) {
            return reactDirective( 'Hello' );
        });

    function hello() {
        return React.createClass( {
            propTypes: {
                person: React.PropTypes.object.isRequired,
            },
            render: function() {
                return React.DOM.span( null,'Hello ' + this.props.person.fname + " " + this.props.person.lname);
            }
        });
    }
    
}());
