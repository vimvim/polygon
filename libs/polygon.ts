

///<reference path='../definitions/node.d.ts' />
///<reference path='../definitions/underscore.d.ts' />


import vm = module("vm");
import fs = module("fs");
import path = module("path");

import _ = module("underscore");

/**
 * Dependency injection framework
 */


    /**
    * Will allow to inject injector as are dependency.
    */

    export interface InstanceInjector {
        get():any;
    }


    export class InvalidConfigurationException {
        constructor(public reason:string) {
        }
    }

    export class Scope {

    }

    export class Binding {

        private _inClass:Function;
        private _to:any;
        private _scope:Scope;

        public to(value:any):Binding {
            return this;
        }

        public inClass(func:any):Binding {
            return this;
        }

        public inScope(scope:Scope):Binding {
            return this;
        }
    }

    export class DependencyBinding extends Binding {
        constructor(private dependencyName:string) {
            super();
        }
    }

    export class PropertyBinding extends Binding {
        constructor(private propertyName:string) {
            super();
        }
    }

    export class Injector {

        private bindings:Array;

        /**
         * Configure injector
         *
         */

        public configure():void {
            throw new InvalidConfigurationException("Injector configuration is not implemented");
        }

        /**
         * Create object of the specified class
         *
         * @param objectClass
         * @returns object
         */

        public get(objectClass:Function):any {

            var args = [];

            var argNames = this.getArgumentNames(objectClass);
            argNames.forEach(function (dependencyName:String) {
                args.push(this.resolveDependency(dependencyName, objectClass));
            });

            function F() {
                return objectClass.apply(this, args);
            }

            F.prototype = objectClass.prototype;
            return new F();
        }

        public importModule(module:any) {


            _.each(module, function(value, name){
                console.log("123");
            });


        }

        public resolveDependency(dependencyName:string, objectClass:Function) {

            // 1. Check if we have binding. If not then dependency name must be the same as class name

            // 2. Check if binding defined in the scope. In this case check if dependency already instantiated.

        }

        /**
         * Create dependency injection rule.
         * Dependencies injected into object constructor during object instantiation.
         *
         * @param dependency        Name of the dependency
         */

        public bind(dependency:string):Binding {

            var binding = new DependencyBinding(dependency);

            return binding;
        }

        /**
         * Create property injection rule.
         *
         * @param propertyName
         */

        public let(propertyName:string):Binding {
            return new PropertyBinding(propertyName);
        }

        public loadModule(moduleName:string, filesList:Array):any {

            filesList.forEach(function(filename){
                var data = fs.readFileSync(path.resolve(__dirname, filename));
                vm.runInThisContext(data);
            });

            var retVal = eval(moduleName);
            if (retVal===undefined) {
                throw new InvalidConfigurationException("Module is not defined:"+moduleName);
            }

            return retVal;
        }

        /**
         * Function will return array of the argument names for specified function.
         *
         * @param func
         * @returns {Array}
         */

        private getArgumentNames(func:Function):string[] {

            var tmp = func.toString().match(/\(.*?\)/g)[0];
            //["a", "b", "c", "d", "e", "f"]
            var argumentNames = tmp.replace(/[()\s]/g, '').split(',');

            return argumentNames;
        }
    }


