
/**
 * Base module
 */

module "polygon" {

    /**
     * Describes module parameters. Module parameters can be used for injecting
     * external dependencies into module ( ex: external service ) or inject
     * configuration parameters.
     *
     * Parameters can have simple types or be objects implemented IComponent interface.
     */

    export interface IParamDescriptor {

    }

    export interface IModule {

        /**
         * Get descriptors of the module parameters.
         */

        getParameterDescriptors();

        bindParameter();
    }

    export interface IComponent {

    }

    export interface IComponentProperty {

    }

    export interface IComponentType {

        /**
         * Return component type name.
         */

        getName():string;

        /**
         * Return list of the configurable properties.
         */

        getProperties();

        /**
         * Create component instance.
         */

        create():IComponent;
    }

    export interface IPropertyValue {

    }

    export interface IComponentClass {

        /**
         * Return list of the configured component properties.
         */

        getPropertyValues():IComponentProperty;

        /**
         * Get component instance. Depending on the implementation component class can create and return
         * new instances of the component on the each call or singleton instance.
         */

        get():IComponent;
    }

}
