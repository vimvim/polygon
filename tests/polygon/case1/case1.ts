
///<reference path='../../../libs/tsunit.ts' />
///<reference path='../../../libs/polygon.d.ts' />

///<reference path='./common/interfaces.ts' />
///<reference path='./starbase/interfaces.ts' />
///<reference path='./starbase/starbase.ts' />
///<reference path='./starbase/module.ts' />

import TSUnit = module("../../../libs/tsunit");
import Polygon = module("../../../libs/polygon");

// import common = module("./common/injector");
import StarbaseModule = require("./starbase/module");

export class Case1 extends TSUnit.TSTestCase {

    private starbase: Starbase.IStarbase;

    public setup():void {

    }

    public test1():void {

        var globalScope = new Polygon.Scope();

        var injector = StarbaseModule.getInjector();
        injector.setScopeResolver("global", function(scopeName: string):PolygonInterfaces.IScope {
            return globalScope;
        });

        // this.starbase = injector.get(Starbase.Starbase);
        this.starbase = injector.get(StarbaseModule.IStarbase);

        // We needs to check that all dependencies injected

        // Dependencies have correct types

        // Runtime injectors worked and provide correct instances

        // Singltones correctly created and exist in the defined scopes

    }
}

var testCase = new Case1();
testCase.run();


