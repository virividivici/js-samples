/* ===========================================================================    
* 
* QUnit Acceptance Test Framework with  Require JS, and jQuery Simulate
* ==========================================================================*/
(function () {

        require.config({
                paths: {
                        // path configuration assumes .js suffix

                        // Libraries
                        'jQuery': '../../js/libs/jquery-1.8.2.min',
                        'MyAccount': '../../js/libs/myaccount'
                },
                shim: {
                        'jQuery': {
                                exports: '$'
                        },
                        'MyAccount': {
                                exports: '_'
                        }
                }
        });

        require(['setup']);
}());

define([
        'jQuery',
        'MyAccount'
], function($$, Underscore) {
                var referencePath = window.location.protocol + "//" + window.location.host + window.location.pathname;
                
                module("Module of Tests", {
                        setup: function() {        
                                $$('#myFrame').attr('src', referencePath + '../../login');
                                stop();
                                stop();
                                setTimeout(function() {
                                        start();

                                        ok($("#loginForm").is(":visible"),"Given I can see the Login form");

                                        $("#username").val('user');
                                        $("#password").val('password');
                                        ok($("#loginForm").submit(), "When I log in as user");

                                        stop();
                                        stop();
                                        setTimeout(function() {
                                                ok($("#something").is(":visible"), "Then I am logged in");
                                                start();
                                        }, 1000);
                                }, 1000);
                        },
                        teardown: function() {
                                $$('#myFrame').attr('src', referencePath + '../../logout');
                                stop();
                                stop();
                                setTimeout(function() {
                                        start();
                                }, 1000);
                        }
                });

                test('Basic Test', function() {
                        ok(true, "Tested something");
                });
        };
});
