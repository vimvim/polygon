
///<reference path='../../definitions/node.d.ts' />
///<reference path='../../definitions/underscore.d.ts' />

///<reference path="animals.ts"/>
///<reference path="dog.ts"/>

import vm = module("vm");
import fs = module("fs");
import path = module("path");

import _ = module("underscore");

/*
function loadModule(holder:any, moduleName:string, filesList:Array):any {

    eval("var "+moduleName+"=holder;")  ;
    console.log(Animals);

    // vm.runInThisContext("var "+moduleName+"=holder;", null);
    vm.runInThisContext("console.log('test');");

    filesList.forEach(function (filename) {
        var data = fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
        vm.runInThisContext(data);

        vm.runInThisContext("console.log(Animals);");
    });

    vm.runInThisContext("console.log(Animals);");

    var retVal = eval("this."+moduleName);
    console.log(retVal);

    if (retVal === undefined) {
        throw "Module is not defined:" + moduleName;
    }

    console.log(retVal);

    return retVal;
}
*/

function loadModule(exports, moduleName:string, filesList:Array):any {

    // eval("var "+moduleName+"=holder;")  ;
    // console.log(Animals);

    // vm.runInThisContext("var "+moduleName+"=holder;", null);
    vm.runInThisContext("console.log('test');");

    filesList.forEach(function (filename) {
        var data = fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
        vm.runInThisContext(data);

        vm.runInThisContext("console.log(Animals);");
    });

    vm.runInThisContext("console.log(Animals);");

    var retVal = eval("this."+moduleName);
    console.log(retVal);

    if (retVal === undefined) {
        throw "Module is not defined:" + moduleName;
    }

    console.log(retVal);

    var self = this;

    _.each(retVal, function(value, name){

        console.log("Found:"+name);

        exports[name] = value;
    });

    return retVal;
}


// export module Zoo {

    // import Animals = Animals;

    // export var Dog = Animals.Dog;
    export var Dog: new() => Animals.Dog;

    loadModule(exports, "Animals", ["animals.js", "dog.js"]);
    // export var Animals = loadModule(Animals, "Animals", ["animals.js", "dog.js"]);
    //export var Animals:Animals = loadModule(Animals, "Animals", ["animals.js", "dog.js"]);



    // loadModule(Animals, "Animals", ["animals.js", "dog.js"]);

    // console.log(Animals);
    // console.log(this);


// }
