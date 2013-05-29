
/**
 * Application server module
 */

///<reference path='polygon.ts' />

// import Polygon = module("Polygon");

module Hexagon {

    export class Bundle extends Polygon.Module {

        init() {

        }

        /**
         * Get list of the components exposed to the server environment and available for injecting into
         * another bundles.
         */

        getExposedComponents():List {

        }
    }

    export class BundlesRegistry {

        public enumBundles(callback:(bundle: Bundle) => void) {

        }

        public scanBundles() {

            var fs = require('fs');
            var path_module = require('path');
            var module_holder = {};

            function LoadModules(path) {
                fs.lstat(path, function(err, stat) {
                    if (stat.isDirectory()) {
                        // we have a directory: do a tree walk
                        fs.readdir(path, function(err, files) {
                            var f, l = files.length;
                            for (var i = 0; i < l; i++) {
                                f = path_module.join(path, files[i]);
                                LoadModules(f);
                            }
                        });
                    } else {
                        // we have a file: load it
                        require(path)(module_holder);
                    }
                });
            }
            var DIR = path_module.join(__dirname, 'lib', 'api');
            LoadModules(DIR);

            exports.module_holder = module_holder;
        }

    }

    /*
    export function BundlesRegistryType():Polygon.IComponentType {

    }
    */
    export class Hexagon {

        private bundlesRegistry:BundlesRegistry;
        private scope:Scope;

        public setBundlesRegistry(bundlesRegistry:BundlesRegistry) {
            this.bundlesRegistry = bundlesRegistry;
        }

        public setScope(scope: Scope) {
            this.scope = scope;
        }

        public run() {

            this.bundlesRegistry.scanBundles();
            this.bundlesRegistry.enumBundles((bundle: Bundle) => {

                var exposedComponents = bundle.getExposedComponents();
                this.scope.registerComponents(exposedComponents);
            });

            this.bundlesRegistry.enumBundles((bundle: Bundle) => {

                this.scope.enumComponents((component:?)=>{
                    bundle.registerExternalBinding(component);
                });
            });

            this.bundlesRegistry.enumBundles((bundle: Bundle) => {
                bundle.init();
            });
        }
    }

    /*
    export function HexagonType():Polygon.IComponentType {

    }

    export class HexagonModule extends Polygon.Module {

        public hexagon():Polygon.ComponentClass {
            return new Polygon.ComponentClass(HexagonType());
        }

    } */
}
