
///<reference path='../../../../libs/polygon' />

///<reference path='../common/interfaces.ts' />
///<reference path='interfaces.ts' />
///<reference path='hyperdrive.ts' />

// import Polygon = module("../../../../libs/polygon");

module Starbase {

    export class Starbase implements IStarbase {

        constructor(

            private shell:Common.IShell,
            private powerSupply:Common.IPowerSupply,
            private hyperDrive: Hyperdrive,
            private commEngine: Common.ICommEngine,

            private robotInjector: InstanceInjector

        ) {};
    }
}

