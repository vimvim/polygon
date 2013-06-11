
///<reference path='module1_1.ts' />
///<reference path='module2.ts' />

module Module1 {

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

        private channelName: string;

        /**
         *
         * @param dependency1     Will be resolved by default rule for looking up matched class ( Dependency1 )
         * @param iDependency2    Will be resolved using binding settings configured in the Injector
         * @param testClass2
         * @param iDependency4
         * @param dep3
         */

        constructor(
            private dependency1: Dependency1,
            private iDependency2: IDependency2,
            private dep3:Dep3,

            // Try to inject dependencies from another module
            private testClass2: Module2.TestClass2,
            private iDependency4: Module2.TestClass4
        ) {}

        public setChannelName(channelName: string) {
            this.channelName = channelName;
        }

        public what() {
            console.log(this.dependency1.getVar1());
            console.log(this.iDependency2.getVar1());
        }
    }

}
