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
})({"convert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  console.log("L", label, "O", op, "1", par1, "2", par2, "R", remainder);
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

console.log(convert);
exports.default = { convert: convert };
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
},{}]},{},["C:\\Users\\martin\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\lib\\builtins\\hmr-runtime.js","convert.js"], null)
//# sourceMappingURL=/convert.0ce62c42.map