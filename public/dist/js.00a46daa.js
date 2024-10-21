// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.js":[function(require,module,exports) {
$(window).on("load", function () {
  window.scrollTo(0, 0);
  $("html, body").scrollTop(0);
  var nextStepVideo;
  var $video = $('video');

  // Define o tempo inicial do vídeo para 22 segundos
  /*$video[0].currentTime = 22;
    $video.on('timeupdate', function() {
      // Quando o vídeo atinge 24 segundos, volta para 22 segundos
      if (this.currentTime >= 24 && !nextStepVideo) {
          this.currentTime = 23;
      }
      if(this.currentTime >24 && this.currentTime<28){
          $("#root center").fadeOut();
      }
      if(nextStepVideo ==1 && this.currentTime>=29){
          $("#root center").fadeIn();
          this.currentTime = 28;
          $("#root center h1:nth-child(1)").text("Transform Your Digital")
          $("#root center h1:nth-child(2)").text("Experience with AxioAi")
          $("#root center p").text("Reimagine what’s possible with AxioAi’s suite of AI tools. Whether it’s through generating dynamic visual content or offering personalized user engagements, our technology is designed to enhance your digital presence and captivate your audience.")
          $("#root center p").css("text-align","right")
          $('#root center a[href="http://docs.axioai.io/"]').text("AxioGPT")
          $('#root center a[href="http://docs.axioai.io/"]').attr("href","./app.html#gpt")
          $("#root center a").css("display","flex")
          $("#root center").css({
              'flex': '1',
              'display': 'flex',
              'flex-direction': 'column',
              'flex-wrap': 'nowrap',
              'align-content': 'flex-end',
              'justify-content': 'center',
              'align-items': 'flex-end',
              'color': 'white'
          });
      }
      if(this.currentTime >29 && this.currentTime<32){
          $("#root center").fadeOut();
          
      }
      if(nextStepVideo ==2 && this.currentTime>=36){
          $("#root center").fadeIn();
          this.currentTime = 33;
          $("#root center h1:nth-child(1)").text("Transform Your Digital")
          $("#root center h1:nth-child(2)").text("Experience with AxioAi")
          $("#root center p").text("Reimagine what’s possible with AxioAi’s suite of AI tools. Whether it’s through generating dynamic visual content or offering personalized user engagements, our technology is designed to enhance your digital presence and captivate your audience.")
          $("#root center p").css("text-align","right")
          $('#root center a[href="./app.html#gpt"]').text("Telegram Bot Ai")
          $('#root center a[href="./app.html#gpt"]').attr("href","https://t.me/AxioAI_bot")
          $('#root center a[href="./app.html#draw"]').css("display","none")
          $("#root center h1").css({
              'width':'100%',
              'text-align': 'left'
          })
          $("#root center").css({
              'flex': '1',
              'display': 'flex',
              'flex-direction': 'column',
              'flex-wrap': 'nowrap',
              'align-content': 'flex-end',
              'justify-content': 'center',
              'align-items': 'flex-end',
              'color': 'white'
          });
      }
      if(this.currentTime >36 && this.currentTime<39){
          $("#root center").fadeOut();
          
      }
      if(nextStepVideo==3 && this.currentTime>=41.5){
          $("#root center").fadeIn();
          this.currentTime=40;
            $("#root center h1:nth-child(1)").text("Transform Your Digital")
          $("#root center h1:nth-child(2)").text("Experience with AxioAi")
          $("#root center p").text("Reimagine what’s possible with AxioAi’s suite of AI tools. Whether it’s through generating dynamic visual content or offering personalized user engagements, our technology is designed to enhance your digital presence and captivate your audience.")
          $("#root center p").css("text-align","right")
          $('#root center a[href="./app.html#gpt"]').text("Telegram Bot Ai")
          $('#root center a[href="./app.html#gpt"]').attr("href","https://t.me/AxioAI_bot")
          $('#root center a[href="./app.html#draw"]').css("display","none")
          $("#root center h1").css({
              'width':'100%',
              'text-align': 'left'
          })
          $("#root center").css({
              'flex': '1',
              'display': 'flex',
              'flex-direction': 'column',
              'flex-wrap': 'nowrap',
              'align-content': 'flex-end',
              'justify-content': 'center',
              'align-items': 'flex-end',
              'color': 'white'
          });
      }
      if(this.currentTime >41.5 && this.currentTime<43){
          $("#root center").fadeOut(); 
      }
      if(nextStepVideo==4 && this.currentTime>=46){
          $("#root center").fadeIn();
          this.currentTime=44;
            $("#root center h1:nth-child(1)").text("Transform Your Digital")
          $("#root center h1:nth-child(2)").text("Experience with AxioAi")
          $("#root center p").text("Reimagine what’s possible with AxioAi’s suite of AI tools. Whether it’s through generating dynamic visual content or offering personalized user engagements, our technology is designed to enhance your digital presence and captivate your audience.")
          $("#root center p").css("text-align","right")
          $('#root center a[href="./app.html#gpt"]').text("Telegram Bot Ai")
          $('#root center a[href="./app.html#gpt"]').attr("href","https://t.me/AxioAI_bot")
          $('#root center a[href="./app.html#draw"]').css("display","none")
          $("#root center h1").css({
              'width':'100%',
              'text-align': 'left'
          })
          $("#root center").css({
              'flex': '1',
              'display': 'flex',
              'flex-direction': 'column',
              'flex-wrap': 'nowrap',
              'align-content': 'flex-end',
              'justify-content': 'center',
              'align-items': 'flex-end',
              'color': 'white'
          });
      }
      if(this.currentTime >46&& this.currentTime<47){
          $("#root center").fadeOut(); 
      }
      if(nextStepVideo==5 && this.currentTime>=51){
          $("#root center").fadeIn();
          this.currentTime=48
            $("#root center h1:nth-child(1)").text("Transform Your Digital")
          $("#root center h1:nth-child(2)").text("Experience with AxioAi")
          $("#root center p").text("Reimagine what’s possible with AxioAi’s suite of AI tools. Whether it’s through generating dynamic visual content or offering personalized user engagements, our technology is designed to enhance your digital presence and captivate your audience.")
          $("#root center p").css("text-align","right")
          $('#root center a[href="./app.html#gpt"]').text("Telegram Bot Ai")
          $('#root center a[href="./app.html#gpt"]').attr("href","https://t.me/AxioAI_bot")
          $('#root center a[href="./app.html#draw"]').css("display","none")
          $("#root center h1").css({
              'width':'100%',
              'text-align': 'left'
          })
          $("#root center").css({
              'flex': '1',
              'display': 'flex',
              'flex-direction': 'column',
              'flex-wrap': 'nowrap',
              'align-content': 'flex-end',
              'justify-content': 'center',
              'align-items': 'flex-end',
              'color': 'white'
          });
      }
      if(this.currentTime >51&& this.currentTime<57){
          $("#root center").fadeOut(); 
      }
      if(nextStepVideo==6 && this.currentTime>=59){
          $("#root center").fadeIn();
          this.currentTime=58
            $("#root center h1:nth-child(1)").text("Transform Your Digital")
          $("#root center h1:nth-child(2)").text("Experience with AxioAi")
          $("#root center p").text("Reimagine what’s possible with AxioAi’s suite of AI tools. Whether it’s through generating dynamic visual content or offering personalized user engagements, our technology is designed to enhance your digital presence and captivate your audience.")
          $("#root center p").css("text-align","right")
          $('#root center a[href="./app.html#gpt"]').text("Telegram Bot Ai")
          $('#root center a[href="./app.html#gpt"]').attr("href","https://t.me/AxioAI_bot")
          $('#root center a[href="./app.html#draw"]').css("display","none")
          $("#root center h1").css({
              'width':'100%',
              'text-align': 'left'
          })
          $("#root center").css({
              'flex': '1',
              'display': 'flex',
              'flex-direction': 'column',
              'flex-wrap': 'nowrap',
              'align-content': 'flex-end',
              'justify-content': 'center',
              'align-items': 'flex-end',
              'color': 'white'
          });
      }
  });*/

  var totalStrokeDashOffSet = 360;
  var startRotate = 0;
  var d = setInterval(function () {
    if (totalStrokeDashOffSet <= 90) {
      clearInterval(d);
    }
    $("#svgenter").css("stroke-dashoffset", totalStrokeDashOffSet + "px");
    totalStrokeDashOffSet -= 30;
  }, 200);
  setInterval(function () {
    $(".svg-container").css("transform", "rotate(" + startRotate + "deg)");
    startRotate += 10;
  }, 100);
  setInterval(function () {
    var scrollY = window.scrollY;
    // obter o scrollbar

    if (scrollY > 0 && scrollY < 399) {
      nextStepVideo = 1;
    }
    if (scrollY > 400 && scrollY < 799) {
      nextStepVideo = 2;
    }
    if (scrollY > 800 && scrollY < 1099) {
      nextStepVideo = 3;
    }
    if (scrollY > 1200 && scrollY < 1599) {
      nextStepVideo = 4;
    }
    if (scrollY > 1600 && scrollY < 1999) {
      nextStepVideo = 5;
    }
    if (scrollY > 2000) {
      nextStepVideo = 6;
    }
  }, 200);
});
function nextStart() {
  console.log("nextClicked");
  var h = 1;
  var d = setInterval(function () {
    if (h <= 0) {
      $(".preloader,.preloader[data-v-464974f8]").css("z-index", "-999");
      clearInterval(d);
    }
    $(".preloader").css("opacity", h);
    h -= 0.3;
  }, 200);
  $(".scrollToUnder").css("display", "flex");
}
function scrollToNextSection() {
  // Obtém a posição de rolagem atual
  var currentScrollY = window.scrollY;

  // Calcula a próxima seção
  var nextSectionY = Math.floor((currentScrollY + 400) / 400) * 400;

  // Rola suavemente para a próxima seção
  window.scrollTo({
    top: nextSectionY,
    behavior: "smooth"
  });
}
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49785" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map