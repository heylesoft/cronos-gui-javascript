define([
    'jquery',
    'underscore',
    'backbone',
    'settings'
], function($, _, Backbone, Settings){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '':'defaultLoad',
            'page/:location/:name': 'loadPage' 
        }
    });

    var router = new AppRouter();
    router.on("route:defaultLoad", function() {
        //TODO: Validate session user
        Settings.setDataSession({location:Settings.locationDefault});
        router.navigate("page/" + Settings.locationDefault + '/login', true);

    });

    router.on("route:loadPage", function(location, page) {
        // TODO: Validate correct location
        var sessionData = Settings.getDataSession();
        sessionData.location = location;
        Settings.setDataSession(sessionData);

        //TODO: Validate session user
        if(page == 'login'){
            require(["views/login"], function(LoginPage) {
                LoginPage.render();
            });
        }
    });

    Backbone.history.start();

    var initialize = function(){
        return router;
    };

    return { 
        initialize: initialize
    };
});