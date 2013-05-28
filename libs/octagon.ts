
/**
 * Web application module ( controllers, ... )
 */

module Octagon {

    export interface IControllerMapping {

    }


    /**
     * Web application module
     */

    export interface IMonogonModule extends IModule {
        getControllersMappings();
    }

}
