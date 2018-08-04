var transI2Z = require("./i2z.js")
var transZ2I = require("./z2i.js")
//import convert from "./convert"
var convert = require("./convert.js")

var compile = function(){
    var source

//console.log(convert)

    //= document.getElementById("source").value
//console.log(transI2Z)

    source = editor.getValue()


    //source +="\nEND\n"
    //var ENGINE = "OMENALPHA"
    //var ENGINE = "OMENCHARLIE"

    var trans;

    switch (document.getElementById("model").value) {
      case "z2i": trans = transZ2I; break
      case "i2z": trans = transI2Z; break
    }

    var out = convert(source,trans)


    //console.log(out)

    document.getElementById("output").value = (out)
}
compile()



function addListener(element, eventName, handler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, false);
  }
  else if (element.attachEvent) {
    element.attachEvent('on' + eventName, handler);
  }
  else {
    element['on' + eventName] = handler;
  }
}
addListener(document.getElementById('conv'), 'click', compile);
