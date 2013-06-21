///<reference path='../definitions/underscore_typed.d.ts' />

import _ = require("underscore");

export class TSTestCase {

    public setup():void {

    }

    public tearDown():void {

    }

    public run():void {

        var self = this;

        this.setup();

        for(var name in this) {

            // if (self.hasOwnProperty(name)) {

                var value = self[name];

                if ((name.indexOf("test")==0) && (_.isFunction(value))) {
                    console.log("Execute: "+name);
                    value();
                }

            // }
        }

        /*
        _.each(this, function(func, name:string){

            console.log(name);

            if ((name.indexOf("test")==0) && (_.isFunction(func))) {
                console.log("Execute:"+name);
                func();
            }

        });
        */

        this.tearDown();
    }

}
