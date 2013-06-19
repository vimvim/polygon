
import Polygon = module("../../../../libs/polygon");

//export module StarbaseInjector {

export class CommonInjector extends Polygon.Injector {

    /**
     * Configure injector
     *
     */

    public configure():void {

        // var Module1:Module1 = this.loadModule('Module1', ['module1_1.js', 'module1_2.js']);

        // this.importModule(TestModule2);

        // Will be applied to the IDependency2 specified in the any class
        // this.bind("IDependency2").to(Module1.Dep2Impl);

        // this.bind("dep3").to(Module1.Dep3);

        // This will lead to registering Dep2Impl as IDependency2 in the app scope
        // Any class which will needs to have IDependency2 automatically receive Dep2Impl instance
        // this.bind("IDependency2").to(Dep2Impl).inScope(Hexagon.ApplicationScope);

        // this.bind("IDependency2").to(Dep2Impl).inScope(Octagon.SessionScope);
        // this.bind("IDependency2").to(Dep2Impl).inScope(Octagon.RequestScope);
        // this.bind("IDependency2").toProvider(function(){});

        // Will be applied only to the TestClass
        // this.bind("IDependency2").inClass(Module1.TestClass).to(Module1.Dep2Impl);

        // Will be applied to the all setChannelName
        // this.let("channelName").to("SuperChannel");

        // Will be applied to the  TestClass.setChannelName only
        // this.let("channelName").inClass(Module1.TestClass).to("SuperChannel");
    }

}

export function getInjector():Polygon.Injector {

    var injector = new CommonInjector();
    injector.configure();

    return injector;
}

//}

