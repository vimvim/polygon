
///<reference path='../../../../libs/polygon.d.ts' />

///<reference path='../common/interfaces.ts' />
///<reference path='interfaces.ts' />
///<reference path='hyperdrive.ts' />

// import Polygon = module("../../../../libs/polygon");

module Starbase {


export class IStarbase  {
    getHyperdrive():Hyperdrive { throw "Not implemented" }
}

export class Starbase extends IStarbase {

    constructor(

        private shell:Common.IShell,
        private powerSupply:Common.IPowerSupply,
        private hyperDrive: Hyperdrive,
        private commEngine: Common.ICommEngine,

        private robotInjector: PolygonInterfaces.IInstanceInjector

    ) { super() }

    getHyperdrive():Hyperdrive {
        return this.hyperDrive;
    }
}

}