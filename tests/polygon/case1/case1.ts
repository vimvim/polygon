

import diModule = module("di_module");

var injector = diModule.DiModule.getInjector();
var testClass = injector.get(Module1.TestClass);
testClass.what();

