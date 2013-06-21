

///<reference path='../definitions/node.d.ts' />
///<reference path='../definitions/underscore.d.ts' />

///<reference path='./polygon.d.ts' />

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

    /// export interface IInstanceInjector {
    ///     get():any;
    // }

    export class InstanceInjector implements PolygonInterfaces.IInstanceInjector {

        get():any {

        }
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

    /**
    * Used for binding interfaces to the concrete classes.
    */

    export class TypeBinding extends Binding {
        constructor(private objectClass:Function) {
            super();
        }
    }

    /**
    * Used for binding dependencies ( referenced by name ) to the
    * specific classes.
    */

    export class DependencyBinding extends Binding {
        constructor(private dependencyName:string) {
            super();
        }
    }

    /**
    * Used for binding object property to the concrete value.
    */

    export class PropertyBinding extends Binding {
        constructor(private propertyName:string) {
            super();
        }
    }

    export class Injector {

        private typeBindings:Array;

        private typeBindingsMap: { [id: string] : TypeBinding; } = {};


        /**
         * Configure injector
         *
         */

        public configure():void {

            this.configureBinding();

            this.buildMap();
        }

        public configureBinding():void {
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

            function F():void {
                objectClass.apply(this, args);
            }

            F.prototype = objectClass.prototype;
            return new F();
        }

        public setScopeResolver(scopeName: string, resolver:PolygonInterfaces.IScopeResolver) {

        }

        private getDependency(dependencyName:string):any {

        }

        private getProperty(dependencyName:string):any {

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
         * Create type binding
         *
         * @param objectClass        Constructor
         */

        public bindType(objectClass:Function):Binding {

            var binding = new TypeBinding(objectClass);

            return binding;
        }


        /**
         * Create dependency injection rule.
         * Dependencies injected into object constructor during object instantiation.
         *
         * @param dependency        Name of the dependency
         */

        public bindDependency(dependency:string):Binding {

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
                var data = fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
                vm.runInThisContext(data, null);
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

export function loadModule(exports, moduleName:string, filesList:Array, basedir:string):any {

    eval("var "+moduleName+"=null;");

    // var Starbase = null;

    for(var idx=0;idx<filesList.length;idx++) {

        console.log("Loading: "+filesList[idx]);

        var data = fs.readFileSync(path.resolve(basedir, filesList[idx]), 'utf8');
        eval(data);
    }

    // var data = fs.readFileSync(path.resolve(basedir, filesList[0]), 'utf8');
    // eval(data);

    // var data = fs.readFileSync(path.resolve(basedir, filesList[1]), 'utf8');
    // eval(data);

    // filesList.forEach(function (filename) {

        // console.log("Loading: "+filename);

        // var data = fs.readFileSync(path.resolve(basedir, filename), 'utf8');
        // eval(data);

        // console.log(Starbase);
        // vm.runInThisContext(data);

        // console.log("Loaded:");
        // vm.runInThisContext("console.log("+moduleName+");");
    // });

    // console.log("Loaded module content:");
    // vm.runInThisContext("console.log("+moduleName+");");

    // console.log(Starbase);
    // console.log(this.Starbase);


    // var retVal = eval("this."+moduleName);
    var retVal = eval(moduleName);
    // console.log(retVal);

    if (retVal === undefined) {
        throw "Module is not defined:" + moduleName;
    }

    _.each(retVal, function(value, name){

        console.log("Export:"+name);

        exports[name] = value;
    });

    return retVal;
}


