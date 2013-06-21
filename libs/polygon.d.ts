
declare module PolygonInterfaces {

    export interface IScope {

    }

    export interface IInstanceInjector {
        get():any;
    }

    export interface IScopeResolver {
        (scopename: string): IScope;
    }
}


