
module Animals {

    export interface ISpeakingAnimal {
        sayHi():void;
    }

    export class Animal implements ISpeakingAnimal {

        sayHi():void {
            console.log("Hi, i'm Animal");
        }

    }
}

