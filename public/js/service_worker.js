/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service_worker/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/service_worker/index.js":
/*!*************************************!*\
  !*** ./src/service_worker/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals console self */
/*
  Vue Examples Service Worker
*/

var dataCacheName = 'vue-examples-app-v1-data-v1';
var appCacheName = 'vue-examples-app-v1-app-v1';
var appFilesToCache = ['/', 'http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons', 'http://fonts.gstatic.com/s/materialicons/v38/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(appCacheName).then(function (cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(appFilesToCache);
    }));
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== appCacheName && key !== dataCacheName) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
        }));
    }));
    /*
    * Fixes a corner case in which the app wasn't returning the latest data.
    * You can reproduce the corner case by commenting out the line below and
    * then doing the following steps: 1) load app for first time so that the
    * initial New York City data is shown 2) press the refresh button on the
    * app 3) go offline 4) reload the app. You expect to see the newer NYC
    * data, but you actually see the initial data. This happens because the
    * service worker is not yet activated. The code below essentially lets
    * you activate the service worker faster.
    */
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    // console.log('[Service Worker] Fetch', e.request.url);
    // var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    // if (e.request.url.indexOf(dataUrl) > -1) {
    /*
    * When the request URL contains dataUrl, the app is asking for fresh
    * weather data. In this case, the service worker always goes to the
    * network and then caches the response. This is called the "Cache then
    * network" strategy:
    * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
    */
    // e.respondWith(caches.open(dataCacheName)
    //     .then(cache => fetch(e.request)
    //             .then(response => {
    //                 cache.put(e.request.url, response.clone());
    //                 return response;
    //             })
    //     )
    // );
    // }
    // else {

    //     * The app is asking for app shell files. In this scenario the app uses the
    //     * "Cache, falling back to the network" offline strategy:
    //     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network

    //     e.respondWith(caches.match(e.request)
    //         .then(response => response || fetch(e.request))
    //     );
    // }
});

/***/ })

/******/ });
//# sourceMappingURL=service_worker.js.map