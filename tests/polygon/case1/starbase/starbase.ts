
module Starbase {

    export class Starbase {

        constructor(
            private shell:IShell,
            private powerSupply:IPowerSupply,
            hyperdrive: Hyperdrive,
            commEngine:CommEngine
        ) {};


    }

}
