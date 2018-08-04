// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"i2z.js":[function(require,module,exports) {
var regZ = function regZ(par) {
  par = par.toUpperCase();
  if (par == "M") return "(HL)";
  return par;
};

var regPairZ = function regPairZ(par) {
  par = par.toUpperCase();
  if (par == "PSW") return "AF";
  if (par == "B") return "BC";
  if (par == "D") return "DE";
  if (par == "H") return "HL";
  return par;
};

var doIndirect = function doIndirect(par) {
  return "(" + par + ")";
};

var transI2Z = {

  "mov": function mov(par1, par2) {
    return ["LD", regZ(par1), regZ(par2)];
  },
  "mvi": function mvi(par1, par2) {
    return ["LD", regZ(par1), par2];
  },
  "ldax": function ldax(par1, par2) {
    return ["LD", "A", doIndirect(regPairZ(par1))];
  },
  "lda": function lda(par1, par2) {
    return ["LD", "A", doIndirect(par1)];
  },
  "lhld": function lhld(par1, par2) {
    return ["LD", "HL", doIndirect(par1)];
  },
  "stax": function stax(par1, par2) {
    return ["LD", doIndirect(regPairZ(par1)), "A"];
  },
  "sta": function sta(par1, par2) {
    return ["LD", doIndirect(par1), "A"];
  },
  "shld": function shld(par1, par2) {
    return ["LD", doIndirect(par1), "HL"];
  },

  "lxi": function lxi(par1, par2) {
    return ["LD", regPairZ(par1), par2];
  },

  "dad": function dad(par1, par2) {
    return ["ADD", "HL", regPairZ(par1)];
  },

  "add": function add(par1, par2) {
    return ["ADD", "A", regZ(par1)];
  },
  "adi": function adi(par1, par2) {
    return ["ADD", "A", regZ(par1)];
  },
  "sub": function sub(par1, par2) {
    return ["SUB", regZ(par1), ""];
  },
  "sui": function sui(par1, par2) {
    return ["SUB", regZ(par1), ""];
  },
  "sbb": function sbb(par1, par2) {
    return ["SBC", regZ(par1), ""];
  },
  "sbi": function sbi(par1, par2) {
    return ["SBC", regZ(par1), ""];
  },

  "inr": function inr(par1, par2) {
    return ["INC", regZ(par1), ""];
  },
  "dcr": function dcr(par1, par2) {
    return ["DEC", regZ(par1), ""];
  },

  "push": function push(par1, par2) {
    return ["PUSH", regPairZ(par1), par2];
  },
  "pop": function pop(par1, par2) {
    return ["POP", regPairZ(par1), par2];
  },
  "in": function _in(par1, par2) {
    return ["IN", "A", doIndirect(par1)];
  },
  "out": function out(par1, par2) {
    return ["OUT", doIndirect(par1), "A"];
  },

  "sphl": function sphl() {
    return ["LD", "SP", "HL"];
  },
  "xchg": function xchg() {
    return ["EX", "DE", "HL"];
  },
  "xthl": function xthl() {
    return ["EX", "(SP)", "HL"];
  },
  "pchl": function pchl() {
    return ["JP", "(HL)", ""];
  },
  "cma": function cma() {
    return ["CPL", "", ""];
  },
  "stc": function stc() {
    return ["SCF", "", ""];
  },
  "cmc": function cmc() {
    return ["CCF", "", ""];
  },
  "rlc": function rlc() {
    return ["RLCA", "", ""];
  },
  "rrc": function rrc() {
    return ["RRCA", "", ""];
  },
  "ral": function ral() {
    return ["RLA", "", ""];
  },
  "rar": function rar() {
    return ["RLA", "", ""];
  }
};
module.exports = transI2Z;
},{}],"z2i.js":[function(require,module,exports) {
var croak = function croak(m) {
  throw new Error("Cannot convert " + m);
};

var isReg = function isReg(par) {
  return "ABCDEHL".indexOf(par.toUpperCase()) < 0 ? false : true;
};
var isRegM = function isRegM(par) {
  if (par.toUpperCase() == "(HL)") return true;
  return "ABCDEHL".indexOf(par.toUpperCase()) < 0 ? false : true;
};
var isRegPair = function isRegPair(par) {
  return ["BC", "DE", "HL", "SP", "AF"].indexOf(par.toUpperCase()) < 0 ? false : true;
};
var isIndirect = function isIndirect(par) {
  par = par.trim();
  if (par[0] != "(") return false;
  if (par[par.length - 1] == ")") return true;
  return false;
};

var register = function register(par) {
  par = par.toUpperCase();
  if (!isRegM(par)) croak("cannot determine register " + par);
  if (par == "(HL)") return "M";
  return par;
};

var noIndirect = function noIndirect(par) {
  return par.substr(1, par.length - 2);
};

var regPair = function regPair(par) {
  par = par.toUpperCase();
  if (!isRegPair(par)) croak("cannot determine register pair " + par);
  if (par == "AF") return "PSW";
  if (par == "SP") return "SP";
  return par[0];
};

var transZ2I = {
  "ex": function ex(par1, par2) {
    if (par1.toUpperCase() == "DE" && par2.toUpperCase() == "HL") return ["XCHG", "", ""];
    if (par1.toUpperCase() == "(SP)" && par2.toUpperCase() == "HL") return ["XTHL", "", ""];
    croak("EX " + par1 + "," + par2);
  },
  "or": function or(par1) {
    if (isRegM(par1)) return ["ORA", register(par1), ""];
    return ["ORI", par1, ""];
  },
  "and": function and(par1) {
    if (isRegM(par1)) return ["ANA", register(par1), ""];
    return ["ANI", par1, ""];
  },
  "xor": function xor(par1) {
    if (isRegM(par1)) return ["XRA", register(par1), ""];
    return ["XRI", par1, ""];
  },
  "cp": function cp(par1) {
    if (isRegM(par1)) return ["CMP", register(par1), ""];
    return ["CPI", par1, ""];
  },
  "sub": function sub(par1) {
    if (isRegM(par1)) return ["SUB", register(par1), ""];
    return ["SUI", par1, ""];
  },
  "sbc": function sbc(par1) {
    if (isRegM(par1)) return ["SBB", register(par1), ""];
    return ["SBI", par1, ""];
  },
  "adc": function adc(par1) {
    if (isRegM(par1)) return ["ADC", register(par1), ""];
    return ["ACI", par1, ""];
  },
  "jp": function jp(par1, par2) {
    if (!par2) return ["JMP", par1, ""];
    if (par1 == "(HL)") return ["PCHL", "", ""];
    return ["J" + par1.toUpperCase(), par2, ""];
  },
  "call": function call(par1, par2) {
    if (!par2) return ["CALL", par1, ""];
    return ["C" + par1.toUpperCase(), par2, ""];
  },
  "ret": function ret(par1, par2) {
    if (!par1) return ["RET", "", ""];
    return ["R" + par1.toUpperCase(), "", ""];
  },
  "push": function push(par1, par2) {
    return ["PUSH", regPair(par1), par2];
  },
  "pop": function pop(par1, par2) {
    return ["POP", regPair(par1), par2];
  },
  "inc": function inc(par1, par2) {
    if (isRegPair(par1)) return ["INX", regPair(par1), par2];
    if (isRegM(par1)) return ["INR", register(par1), ""];
    croak("inc");
  },
  "dec": function dec(par1, par2) {
    if (isRegPair(par1)) return ["DCX", regPair(par1), par2];
    if (isRegM(par1)) return ["DCR", register(par1), ""];
    croak("inc");
  },
  "in": function _in(par1, par2) {
    return ["IN", noIndirect(par2), ""];
  },
  "out": function out(par1, par2) {
    return ["OUT", noIndirect(par1), ""];
  },
  "add": function add(par1, par2) {
    var reg1 = isRegM(par1);
    var reg2 = isRegM(par2);
    var regpair1 = isRegPair(par1);
    var ind1 = isIndirect(par1);
    var ind2 = isIndirect(par2);
    if (regpair1) return ["DAD", regPair(par2), ""];
    if (reg1 && reg2) return ["ADD", register(par1), register(par2)];
    if (reg1 && !reg2) return ["ADI", register(par1), par2];
    croak("add " + par1 + "," + par2);
  },
  "ld": function ld(par1, par2) {
    var reg1 = isRegM(par1);
    var reg2 = isRegM(par2);
    var regpair1 = isRegPair(par1);
    var ind1 = isIndirect(par1);
    var ind2 = isIndirect(par2);
    if (par1 == "SP" && par2 == "HL") return ["SPHL", "", ""];
    if (reg1 && reg2) return ["MOV", register(par1), register(par2)];
    if (reg1 && !reg2 && ind2 && par2 == "(BC)") return ["LDAX", "B", ""];
    if (reg1 && !reg2 && ind2 && par2 == "(DE)") return ["LDAX", "D", ""];
    if (reg1 && !reg2 && ind2) return ["LDA", noIndirect(par2), ""];
    if (!reg1 && reg2 && ind1 && par1 == "(BC)") return ["STAX", "B", ""];
    if (!reg1 && reg2 && ind1 && par1 == "(DE)") return ["STAX", "D", ""];
    if (!reg1 && ind1 && reg2) return ["STA", noIndirect(par1), ""];
    if (reg1 && !reg2 && !regpair1) return ["MVI", register(par1), par2];
    if (regpair1) return ["LXI", regPair(par1), par2];
    croak("ld " + par1 + "," + par2);
  },
  "cpl": function cpl() {
    return ["CMA", "", ""];
  },
  "scf": function scf() {
    return ["STC", "", ""];
  },
  "ccf": function ccf() {
    return ["CMC", "", ""];
  },
  "rlca": function rlca() {
    return ["RLC", "", ""];
  },
  "rrca": function rrca() {
    return ["RRC", "", ""];
  },
  "rla": function rla() {
    return ["RAL", "", ""];
  },
  "rra": function rra() {
    return ["RAR", "", ""];
  }
};
module.exports = transZ2I;
},{}],"convert.js":[function(require,module,exports) {

var findFirstPos = function findFirstPos(line, xs) {
  var pos = -1;
  for (var i = 0; i < xs.length; i++) {
    var test = xs[i];
    var apos = line.indexOf(test);
    if (apos < 0) continue;
    if (pos == -1) pos = apos;
    if (apos < pos) pos = apos;
  }
  return pos;
};
var trans;
var croak = function croak(m) {
  throw new Error("Cannot convert " + m);
};

var conv = function conv(op, par1, par2) {

  var lop = op.toLowerCase();
  if (trans[lop]) {
    return trans[lop](par1.trim(), par2.trim());
  }

  return [op, par1, par2];
};

var convline = function convline(line) {
  //parse line
  var label = "",
      op = "",
      par1 = "",
      par2 = "",
      remainder = "";
  var s;
  if (line[0] != " ") {
    if (line[0] == ";") return line; //whole line is a remark
    //label?
    s = findFirstPos(line, [" ", ":", "\t"]);
    label = line.substr(0, s).trim();
    line = line.substr(s + 1);
  }
  line = line.trim();
  s = findFirstPos(line, [" ", ":", "\t"]);
  op = line.substr(0, s);
  line = line.substr(s + 1).trim();

  s = findFirstPos(line, [",", ";"]);
  if (line[s] == ",") {
    //2 params
    par1 = line.substr(0, s);
    line = line.substr(s + 1).trim();
    s = findFirstPos(line, [";"]);
    if (s < 0) {
      par2 = line;
      line = "";
    } else {
      par2 = line.substr(0, s);
      line = line.substr(s + 1).trim();
    }
  } else if (line[s] == ";") {
    //1 param
    par1 = line.substr(0, s);
    line = line.substr(s + 1).trim();
    par2 = "";
  } else if (s < 0) {
    //1 param, no remark
    if (!op) {
      op = line;
      par1 = "";
    } else {
      par1 = line;
    }
    par2 = "";
    line = "";
  }

  remainder = line;
  // console.log("L",label,"O",op,"1",par1,"2",par2,"R",remainder)
  var cx = conv(op, par1, par2);
  op = cx[0];
  par1 = cx[1].trim();
  par2 = cx[2].trim();

  //hex fix
  if (par1[0] == "#") par1 = "$" + par1.substr(1);
  if (par2[0] == "#") par2 = "$" + par2.substr(1);
  if (par2) par2 = "," + par2;

  //console.log("L",label,"O",op,"1",par1,"2",par2,"R",remainder)

  if (label && label[label.length - 1] != ":") label += ":";

  return label + "\t" + op + "\t" + par1 + par2 + "\t" + remainder;
};

var convert = function convert(txt, transTab) {
  var lines = txt.split("\n");
  trans = transTab;
  return lines.map(convline).join("\n");
};

module.exports = convert;
//console.log(convert)
//export default {convert};
},{}],"main.js":[function(require,module,exports) {
var transI2Z = require("./i2z.js");
var transZ2I = require("./z2i.js");
//import convert from "./convert"
var convert = require("./convert.js");

var compile = function compile() {
  var source;

  //console.log(convert)

  //= document.getElementById("source").value
  //console.log(transI2Z)

  source = editor.getValue();

  //source +="\nEND\n"
  //var ENGINE = "OMENALPHA"
  //var ENGINE = "OMENCHARLIE"

  var trans;

  switch (document.getElementById("model").value) {
    case "z2i":
      trans = transZ2I;break;
    case "i2z":
      trans = transI2Z;break;
  }

  var out = convert(source, trans);

  //console.log(out)

  document.getElementById("output").value = out;
};
compile();

function addListener(element, eventName, handler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, handler);
  } else {
    element['on' + eventName] = handler;
  }
}
addListener(document.getElementById('conv'), 'click', compile);
},{"./i2z.js":"i2z.js","./z2i.js":"z2i.js","./convert.js":"convert.js"}],"C:\\Users\\martin\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\lib\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50838' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\martin\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\lib\\builtins\\hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.f43da992.map