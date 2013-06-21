
/// <reference path="animals.ts"/>
/// <reference path="dog.ts"/>

import Zoo = require("zoo")

console.log("Zoo content:");
console.log(Zoo);

var dog = new Zoo.Dog();
dog.sayHi();

var animal: Animals.ISpeakingAnimal;
animal = dog;
animal.sayHi();





