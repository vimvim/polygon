
/**
 * Application server module
 */

///<reference path='polygon.ts' />

// import Polygon = module("Polygon");

module Hexagon {

    export class HexagonBundle extends Polygon.Module {

        /**
         * Get list of the classes exposed to the server environment and available for injecting into
         * another bundles.
         */

        getExposedClasses():List {

        }

    }

    export class BundlesRegistry {

        public enumBundles() {

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

    export function BundlesRegistryType():Polygon.IComponentType {

    }

    export class Hexagon {

        private bundlesRegistry:BundlesRegistry;

        get bundlesRegistry():BundlesRegistry {
            return this.bundlesRegistry;
        }
        set bundlesRegistry(bundlesRegistry:BundlesRegistry) {
            this.bundlesRegistry = bundlesRegistry;
        }

        public run() {

            this.bundlesRegistry.scanBundles();



        }
    }

    export function HexagonType():Polygon.IComponentType {

    }

    export class HexagonModule extends Polygon.Module {

        public hexagon():Polygon.ComponentClass {
            return new Polygon.ComponentClass(HexagonType());
        }

    }
}
