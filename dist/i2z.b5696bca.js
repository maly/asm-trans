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
var _transI2Z;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var transI2Z = (_transI2Z = {

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
  }
}, _defineProperty(_transI2Z, "sub", function sub(par1) {
  if (isRegM(par1)) return ["SUB", register(par1), ""];
  return ["SUI", par1, ""];
}), _defineProperty(_transI2Z, "sbc", function sbc(par1) {
  if (isRegM(par1)) return ["SBB", register(par1), ""];
  return ["SBI", par1, ""];
}), _defineProperty(_transI2Z, "adc", function adc(par1) {
  if (isRegM(par1)) return ["ADC", register(par1), ""];
  return ["ACI", par1, ""];
}), _defineProperty(_transI2Z, "jp", function jp(par1, par2) {
  if (!par2) return ["JMP", par1, ""];
  if (par1 == "(HL)") return ["PCHL", "", ""];
  return ["J" + par1.toUpperCase(), par2, ""];
}), _defineProperty(_transI2Z, "call", function call(par1, par2) {
  if (!par2) return ["CALL", par1, ""];
  return ["C" + par1.toUpperCase(), par2, ""];
}), _defineProperty(_transI2Z, "ret", function ret(par1, par2) {
  if (!par1) return ["RET", "", ""];
  return ["R" + par1.toUpperCase(), "", ""];
}), _defineProperty(_transI2Z, "push", function push(par1, par2) {
  return ["PUSH", regPairZ(par1), par2];
}), _defineProperty(_transI2Z, "pop", function pop(par1, par2) {
  return ["POP", regPairZ(par1), par2];
}), _defineProperty(_transI2Z, "inc", function inc(par1, par2) {
  if (isRegPair(par1)) return ["INX", regPair(par1), par2];
  if (isRegM(par1)) return ["INR", register(par1), ""];
  croak("inc");
}), _defineProperty(_transI2Z, "dec", function dec(par1, par2) {
  if (isRegPair(par1)) return ["DCX", regPair(par1), par2];
  if (isRegM(par1)) return ["DCR", register(par1), ""];
  croak("inc");
}), _defineProperty(_transI2Z, "in", function _in(par1, par2) {
  return ["IN", "A", doIndirect(par1)];
}), _defineProperty(_transI2Z, "out", function out(par1, par2) {
  return ["OUT", doIndirect(par1), "A"];
}), _defineProperty(_transI2Z, "sphl", function sphl() {
  return ["LD", "SP", "HL"];
}), _defineProperty(_transI2Z, "xchg", function xchg() {
  return ["EX", "DE", "HL"];
}), _defineProperty(_transI2Z, "xthl", function xthl() {
  return ["EX", "(SP)", "HL"];
}), _defineProperty(_transI2Z, "pchl", function pchl() {
  return ["JP", "(HL)", ""];
}), _defineProperty(_transI2Z, "cma", function cma() {
  return ["CPL", "", ""];
}), _defineProperty(_transI2Z, "stc", function stc() {
  return ["SCF", "", ""];
}), _defineProperty(_transI2Z, "cmc", function cmc() {
  return ["CCF", "", ""];
}), _defineProperty(_transI2Z, "rlc", function rlc() {
  return ["RLCA", "", ""];
}), _defineProperty(_transI2Z, "rrc", function rrc() {
  return ["RRCA", "", ""];
}), _defineProperty(_transI2Z, "ral", function ral() {
  return ["RLA", "", ""];
}), _defineProperty(_transI2Z, "rar", function rar() {
  return ["RLA", "", ""];
}), _transI2Z);
module.exports.transI2Z = transI2Z;
},{}],"C:\\Users\\martin\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\lib\\builtins\\hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52647' + '/');
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
},{}]},{},["C:\\Users\\martin\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\lib\\builtins\\hmr-runtime.js","i2z.js"], null)
//# sourceMappingURL=/i2z.b5696bca.map