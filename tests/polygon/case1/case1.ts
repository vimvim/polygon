

import diModule = module("injector");

var injector = diModule.DiModule.getInjector();
var testClass = injector.get(Module1.TestClass);
testClass.what();

