
/**
 * Web application module ( controllers, ... )
 */

module "monogon" {

    export interface IControllerMapping {

    }


    /**
     * Web application module
     */

    export interface IMonogonModule extends IModule {
        getControllersMappings();
    }

}
