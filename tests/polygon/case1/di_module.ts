
/**
 * This test case demonstrate how to build object hierarchy using objects
 * located in the multifile internal modules as well as objects from external imported modules.
 *
 */

///<reference path='../../../libs/polygon.ts' />

///<reference path='module1_1.ts' />
///<reference path='module1_2.ts' />
///<reference path='module2.ts' />
///<reference path='exp_module.ts' />

import Polygon = module("../../../libs/polygon");
import TestModule2 = module("exp_module");

import vm = module("vm");
import fs = module("fs");

export module DiModule {

    // import module1 = TestModule
    // import module2 = TestModule3

    // declare var require: any;
    // require("../../libs/polygon");
    // var t1 = require("./test_module1");
    // var t2 = require("./test_module2");

    export class Injector extends Polygon.Injector {

        /**
         * Configure injector
         *
         */

        public configure():void {

            var data = fs.readFileSync("module1_1.js");
            vm.runInThisContext(data);


            this.importModule(TestModule2);

            // Will be applied to the IDependency2 specified in the any class
            this.bind("IDependency2").to(Module1.Dep2Impl);

            this.bind("dep3").to(Module1.Dep3);

            // This will lead to registering Dep2Impl as IDependency2 in the app scope
            // Any class which will needs to have IDependency2 automatically receive Dep2Impl instance
            // this.bind("IDependency2").to(Dep2Impl).inScope(Hexagon.ApplicationScope);

            // this.bind("IDependency2").to(Dep2Impl).inScope(Octagon.SessionScope);
            // this.bind("IDependency2").to(Dep2Impl).inScope(Octagon.RequestScope);
            // this.bind("IDependency2").toProvider(function(){});

            // Will be applied only to the TestClass
            this.bind("IDependency2").inClass(Module1.TestClass).to(Module1.Dep2Impl);

            // Will be applied to the all setChannelName
            this.let("channelName").to("SuperChannel");

            // Will be applied to the  TestClass.setChannelName only
            this.let("channelName").inClass(Module1.TestClass).to("SuperChannel");
        }
    }

    export function getInjector():Injector {

        var injector = new Injector();
        injector.configure();

        return injector;
    }

    // var injector = new Injector();
    // injector.configure();

    // var testClass = injector.get(Module1.TestClass);
    // testClass.what();
}
