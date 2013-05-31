
/**
 * Module used strictly for experiments
 */

module TestModule {

    export class Dependency1 {

        private var1:string;

        public getVar1() { return this.var1; }

        public init() {
            this.var1 = "123";
        }

    }

    export interface IDependency2 {
        getVar1();
    }

    export class Dep2Impl implements IDependency2 {

        private var1:string;
        private channelName:string;

        public getVar1() { return this.var1; }

        public setChannelName(channelName: string) {
            this.channelName = channelName;
        }

        public init() {
            this.var1 = "456";
        }
    }

    export class TestClass {

        private dependency1: Dependency1;
        private dependency2: IDependency2;

        private channelName: string;

        /**
         *
         * @param dependency1     Will be resolved by default rule for looking up matched class ( Dependency1 )
         * @param iDependency2    Will be resolved using binding settings configured in the Injector
         */

        constructor(dependency1: Dependency1, iDependency2: IDependency2) {
            this.dependency1 = dependency1;
            this.dependency2 = iDependency2;
        }

        public setChannelName(channelName: string) {
            this.channelName = channelName;
        }

        public what() {
            console.log(this.dependency1.getVar1());
            console.log(this.dependency2.getVar1());
        }
    }

    class Binding {

        private dependency: string;
        private inClass:any;
        private toClass:any;

        constructor(dependency: string) {
            this.dependency = dependency;
        }

        public to(func:any):Binding {
            return this;
        }

        public in(func:any):Binding {
            return this;
        }
    }

    export class Injector {

        /**
         * Configure injector
         *
         */

        public configure():void {

            // Will be applied to the IDependency2 specified in the any class
            this.bind("IDependency2").to(Dep2Impl);

            // This will lead to registering Dep2Impl as IDependency2 in the app scope
            // Any class which will needs to have IDependency2 automatically receive Dep2Impl instance
            // this.bind("IDependency2").to(Dep2Impl).inScope(Hexagon.ApplicationScope);

            // this.bind("IDependency2").to(Dep2Impl).inScope(Octagon.SessionScope);
            // this.bind("IDependency2").to(Dep2Impl).inScope(Octagon.RequestScope);
            // this.bind("IDependency2").toProvider(function(){});

            // Will be applied only to the TestClass
            this.bind("IDependency2").in(TestClass).to(Dep2Impl);

            // Will be applied to the all setChannelName
            this.let("channelName").to("SuperChannel");

            // Will be applied to the  TestClass.setChannelName only
            this.let("channelName").in(TestClass).to("SuperChannel");
        }

        /**
         * Create object of the specified class
         *
         * @param objectClass
         * @returns {TestModule.Injector.F}
         */

        public get(objectClass:Function):any {

            var args = [];

            var argNames = this.getArgumentNames(objectClass);
            argNames.forEach(function(dependencyName: String){
                args.push(this.resolveDependency(dependencyName, objectClass));
            });

            function F() {
                return objectClass.apply(this, args);
            }
            F.prototype = objectClass.prototype;
            return new F();
        }

        public resolveDependency(dependencyName:string, objectClass:Function) {

            // 1. Check if we have binding. If not then dependency name must be the same as class name

            // 2. Check if binding defined in the scope. In this case check if dependency already instantiated.

        }

        /**
         * Create dependency binding
         *
         * @param dependency        Name of the dependency
         */

        private bind(dependency: string):Binding {

            var binding = new Binding(dependency);

            return new Binding(dependency);
        }

        private getArgumentNames(func:Function):string[] {

            var tmp = func.toString().match(/\(.*?\)/g)[0];
            //["a", "b", "c", "d", "e", "f"]
            var argumentNames = tmp.replace(/[()\s]/g,'').split(',');

            return argumentNames;
        }
    }

    /**
     * This function needs to automatically
     *
     */

    export function build() {



    }
}

var injector = new TestModule.Injector();
injector.configure();

var testClass:TestModule.TestClass = injector.get(TestModule.TestClass);
testClass.what();

