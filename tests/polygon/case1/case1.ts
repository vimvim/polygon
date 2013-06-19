
///<reference path='../../../libs/tsunit.ts' />

///<reference path='./common/interfaces.ts' />
///<reference path='./starbase/interfaces.ts' />
///<reference path='./starbase/starbase.ts' />
///<reference path='./starbase/injector.ts' />

import TSUnit = module("../../../libs/tsunit");

import common = module("./common/injector");
import starbaseInjector = module("./starbase/injector");

export class Case1 extends TSUnit.TSTestCase {

    private starbase: Starbase.Starbase;

    public setup():void {

    }

    public test1():void {

        var injector = starbaseInjector.getInjector();
        this.starbase = injector.get(Starbase.Starbase);

        // We needs to check that all dependencies injected

        // Dependencies have correct types

        // Runtime injectors worked and provide correct instances

        // Singltones correctly created and exist in the defined scopes

    }
}

var testCase = new Case1();
testCase.run();


/*
import diModule = module("injector");

var injector = diModule.DiModule.getInjector();
var testClass = injector.get(Module1.TestClass);
testClass.what();
*/
