(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/goose/g-category.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/goose/g-category.js ***!
  \*********************************************/
/*! exports provided: default, setCatCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCatCount", function() { return setCatCount; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _goose_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../goose/utils */ "./assets/js/theme/goose/utils/index.js");



var handleOverlay = _goose_utils__WEBPACK_IMPORTED_MODULE_2__["default"].common.handleOverlay;
var tabletBreakpoint = 1025;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var filterDrawer = document.querySelector(".fb-drawer");
  if (!filterDrawer) return;
  function handleFilterToggle(e) {
    filterDrawer.classList.toggle("is-open");
  }
  function handlFilterClose(e) {
    filterDrawer.classList.remove("is-open");
    handleOverlay("fb-drawer", "remove");
  }
  function resetUrl() {
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].goToUrl(window.location.href.split("?")[0]);
  }
  function enableSubCatExpand() {
    if (window.innerWidth < tabletBreakpoint) return;
    var length = 0;
    var subCatNavItems = document.querySelectorAll(".sub-cat-nav .sub-cat-nav__list .sub-cat-nav__item");
    var subCatNavList = document.querySelector(".sub-cat-nav .sub-cat-nav__list");
    var toggleLink = document.querySelector(".sub-cat-nav .toggleLink");
    subCatNavItems.forEach(function (el) {
      length += el.getBoundingClientRect().width;
    });
    if (length > 1520) {
      toggleLink.style.display = 'block';
      subCatNavList.style.justifyContent = 'flex-start';
    }
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest(".js-filter-toggle")) {
      handleFilterToggle(e);
      handleOverlay("fb-drawer", "add");
    }
    if (e.target.closest(".fb-drawer-wrap .close")) {
      handlFilterClose(e);
    }
    if (e.target.closest(".js-clear-url")) {
      resetUrl();
    }
    if (!e.target.closest(".js-filter-toggle") && !e.target.closest(".fb-drawer-wrap")) {
      handlFilterClose(e);
    }
  });
  enableSubCatExpand();
});
function setCatCount(count) {
  var producCount = document.querySelector(".category-view__product-count");
  var fbCount = document.querySelectorAll(".fb-items-count");
  if (!producCount) return;
  producCount.innerHTML = count != 1 ? count + " items" : count + " item";
  if (!fbCount) return;
  fbCount.forEach(function (el) {
    return el.innerHTML = count;
  });
}

/***/ }),

/***/ "./assets/js/theme/goose/g-infiniteScroll.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/goose/g-infiniteScroll.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime__WEBPACK_IMPORTED_MODULE_0__);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 *  Infinite Scroll Loader by Goose.
 *
 * Instructions:
 * Set itemsContainerEl display value to none within HTML
 * Set pagination-list display value to none within HTML
 * Wrap count of product number in a span with class 'product-count'
 *
 */


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  /**
   * Define globals
   */
  var pagination = document.querySelector(".pagination"); // Pagination el selector
  var itemsContainerEl = ".product-grid"; // Parent element selector
  var itemsContainerEl2 = ".productGrid"; // Fallback Parent element selector
  var itemsContainerEl3 = ".brandGrid";
  var items = ".product-grid .product"; // Items selector
  var item = ".product"; // Single item selector
  var itemsContainer;
  var itemsPerPage = context.themeSettings.categorypage_products_per_page; // Decides how many elements to use for updating query parameters
  var pageType = document.querySelector("main");
  var productCountEl = document.querySelector(".product__count"); // element containing product count

  // Switch based on
  if (pageType.classList.contains("brands")) {
    // Brands Page
    itemsContainer = document.querySelector('#main-content ' + itemsContainerEl3);
    items = ".brandGrid .brand";
    item = ".brand";
    // itemsPerPage = 48;
  } else if (document.querySelector('#main-content ' + itemsContainerEl) !== null) {
    // New Grid Page
    itemsContainer = document.querySelector('#main-content ' + itemsContainerEl);
  } else {
    // Fallback
    itemsContainer = document.querySelector('#main-content ' + itemsContainerEl2);
    items = "#main-content .productGrid .product";
  }
  var itemsCountContainer = document.querySelector(".items-count"); // Product total count selector
  // const itemsProgressBar = document.querySelector('.pagination__bar__progress');
  var itemsTotal = parseInt(document.querySelector(".pagination__total").innerHTML);
  var pageUrl = new URL(window.location.href);
  var params = pageUrl.searchParams;
  var loadedPages = 1;
  var loadmore = true;
  var lastPage = false;
  var unloading = false;
  var previousEl = "";

  /**
   * Hide Pagination on page load
   */
  if (pagination === null) {
    return;
  }
  pagination.querySelector(".pagination-list").style.display = "none";

  // Check if page has no params, show the block
  var pageNo = params.get("page");
  if (pageNo === 1 || pageNo === null) {
    // itemsContainer.style.display = 'block';
    // loaderBtn('disable');
  }

  /**
   * Set items count
   */
  if (productCountEl) {
    var productCount = productCountEl.dataset.productCount;
    var bottomCountContainer = document.querySelector(".pagination__total");
    var topCountContainer = document.querySelector(".category-bar__count");
    topCountContainer ? topCountContainer.innerHTML = productCount + " products" : "";
    bottomCountContainer ? bottomCountContainer.innerHTML = "" + productCount : "";
  }

  /**
   * Loader
   * @param {*} visibility
   */
  function loaderBtn(visibility) {
    var preloaderTop = document.querySelector(".infinite-loader.preloader-top");
    var preLoaderBottom = document.querySelector(".pagination__loader .g-button");
    if (visibility === "enable") {
      pagination.style.display = "block";
      preLoaderBottom.classList.add("button--disabled");
      preLoaderBottom.textContent = "Loading...";
    } else if (visibility === "disable") {
      preLoaderBottom.classList.remove("button--disabled");
      preLoaderBottom.textContent = "Load more";
      pagination.style.display = "none";
    } else if (visibility === "hide") {
      preLoaderBottom.style.display = "none";
      preLoaderBottom.textContent = "Load more";
      pagination.style.display = "none";
    } else {
      console.log("function not defined");
    }
  }

  /**
   * Check if elemnt is fully in vieport or completed entering viewport.
   * @param {*} element
   * @param {*} type
   * @returns
   */
  function isInViewport(element, type) {
    if (element === undefined) {
      lastPage = true;
      loaderBtn("disable");
      return;
    }
    var rect = element.getBoundingClientRect();
    if (type === "bottom") {
      return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    } else {
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
  }

  /**
   * Update count of items in DOM
   * @param {*} count
   */
  function setItemsCount(count) {
    if (itemsCountContainer !== null) {
      itemsCountContainer.innerHTML = "" + count;
      //  Set progress bar
      // const progressPercentage = (count * 100) / itemsTotal;
      // itemsProgressBar.style.width = progressPercentage + "%";
    }
  }

  /**
   * Restore scroll position based on refresh or back button press.
   */
  function restoreScrollPos() {
    // If history has product reference i.e. back button was used
    if (window.history.state.lastItem !== undefined) {
      // Scroll element into view
      document.querySelector("[data-index=\"" + window.history.state.lastItem + "\"]").scrollIntoView({
        behavior: "smooth"
      });
    } // If history has last page no reference
    else if (window.history.state && window.history.state.lastParams !== undefined) {
      var elements = document.querySelectorAll(items);

      // get last params set before refresh
      var _params = window.history.state.lastParams;
      // Get Ref to 1st el of the block
      var elRef = parseInt(_params) * itemsPerPage - itemsPerPage + 1;

      // Scroll to last position
      if (elRef > 1 && elements[elRef] !== undefined) {
        elements[elRef].scrollIntoView({
          behavior: "smooth"
        });
      }

      // Update query params
      setTimeout(setQueryParams("page", _params), 1000);
    } else {
      // if page was refreshed.
      // Re iterate over all the elements in DOM
      var _elements = document.querySelectorAll(items);

      // get url params of current URL
      var url = new URL(window.location.href);
      var search_params = url.searchParams;

      // Get Ref to 1st el of the block
      var _elRef = parseInt(search_params.get("page")) * itemsPerPage - itemsPerPage + 1;

      // Scroll to last position
      if (_elRef > 1 && _elements[_elRef] !== undefined) {
        _elements[_elRef].scrollIntoView({
          behavior: "smooth"
        });
      }

      // Update query params
      setTimeout(setQueryParams("page", parseInt(search_params.get("page"))), 1000);
    }
  }

  /**
   * Load Items from Previous Pages
   * @param {*} count
   */
  function getPrevItems(_x) {
    return _getPrevItems.apply(this, arguments);
  }
  function _getPrevItems() {
    _getPrevItems = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(count) {
      var i, itemArr;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            i = 1;
            itemArr = [];
            loaderBtn("enable");
            do {
              // Get previous items and insert before current items
              itemArr.push(fetchItemsByPageNo(i));
              i++;
            } while (i < count);
            Promise.all(itemArr).then(function (res) {
              loaderBtn("disable");
              res.reverse();
              res.forEach(function (page) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(page.products, "text/html");
                var productArr = [];
                var products = doc.querySelectorAll(items);
                products.forEach(function (product) {
                  productArr.push(product);
                });
                productArr.reverse();
                for (var _i = 0; _i < productArr.length; _i++) {
                  itemsContainer.insertAdjacentElement("afterbegin", productArr[_i]);
                }
              });

              // itemsContainer.style.display = 'block';
              // Restore scroll position
              setTimeout(restoreScrollPos(), 1000);
              // Update count
              setItemsCount(document.querySelectorAll(items).length);
            })["catch"](function (e) {
              return console.log(e);
            });
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _getPrevItems.apply(this, arguments);
  }
  for (var _iterator = _createForOfIteratorHelperLoose(params), _step; !(_step = _iterator()).done;) {
    var param = _step.value;
    if (param[0] === "page") {
      if (parseInt(param[1]) > 1) {
        getPrevItems(param[1]);
      } else {
        // itemsContainer.style.display = 'block';
      }
    }
  }

  /**
   * Load Next Page Elements
   */
  function getNextItems() {
    return _getNextItems.apply(this, arguments);
  }
  /**
   * Fetch Items
   * @param {*} pageNo
   * @returns
   */
  function _getNextItems() {
    _getNextItems = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var url, search_params, _pageNo2;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            // Wait till it the end of items reaches & load next items

            // Show bottom loader
            loaderBtn("enable");

            // Check if not a lastpage
            if (!(lastPage === false)) {
              _context2.next = 9;
              break;
            }
            url = new URL(window.location.href); // get url params of current URL
            search_params = url.searchParams;
            _pageNo2 = search_params.get("page") !== null ? parseInt(search_params.get("page")) : 1;
            _context2.next = 7;
            return fetchItemsByPageNo(_pageNo2 + 1).then(function (res) {
              setTimeout(function () {
                var evt = new Event("stampedReload");
                document.dispatchEvent(evt);
              }, 500);
              if (typeof res === "object" && res.products !== null) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(res.products, "text/html");
                var products = doc.querySelectorAll(items);
                var nextPage = doc.querySelector(".pagination .pagination-item--next");
                if (products !== null && products.length !== 0) {
                  products.forEach(function (product) {
                    itemsContainer.insertAdjacentElement("beforeend", product);
                  });
                  if (products !== null && !nextPage) {
                    loadmore = false;
                    loaderBtn("hide");
                  } else {
                    loadmore = true;
                    loaderBtn("disable");
                  }
                  loadedPages++;
                  // Update count
                  setItemsCount(document.querySelectorAll(items).length);
                } else {
                  loaderBtn("hide");
                  console.log("End of items");
                  // itemsProgressBar.style.width = "100%";
                  lastPage = true;
                }
              } else {
                loaderBtn("hide");
                console.log("End of items");
                lastPage = true;
              }
            })["catch"](function (e) {
              console.log(e);
              lastPage = true;
            });
          case 7:
            _context2.next = 10;
            break;
          case 9:
            console.log("reached end of items");
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _getNextItems.apply(this, arguments);
  }
  function fetchItemsByPageNo(_x2) {
    return _fetchItemsByPageNo.apply(this, arguments);
  }
  /**
   * Update Browser query params
   */
  function _fetchItemsByPageNo() {
    _fetchItemsByPageNo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(pageNo) {
      var url, search_params, res;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            // Get current page url
            url = new URL(window.location.href); // get url params of current URL
            search_params = url.searchParams; // update params
            search_params.set("page", pageNo);
            url.search = search_params.toString();
            // finally we make a request to modified page
            res = new Promise(function (resolve, reject) {
              fetch(url).then(function (response) {
                return response.text();
              }).then(function (data) {
                return resolve({
                  products: data,
                  index: pageNo
                });
              }) // Returning each object with page no, in order to inject back to DOM in same order
              ["catch"](function (err) {
                return reject(err);
              });
            });
            return _context3.abrupt("return", res);
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _fetchItemsByPageNo.apply(this, arguments);
  }
  function syncQueryParams() {
    var products = document.querySelectorAll(items);
    var length = products.length;
    // Get ref to every nth element
    for (var i = 1; i <= length; i = i + itemsPerPage) {
      // check if el in visibility update param
      if (isInViewport(products[i]) && products[i] !== previousEl) {
        previousEl = products[i];
        var _pageNo = (i - 1) / itemsPerPage + 1;
        var url = new URL(window.location);
        url.searchParams.set("page", _pageNo);
        window.history.pushState({}, "", url);
      }
    }
  }

  /**
   * Init
   */
  (function () {
    // Count products on page
    var productCount = document.querySelectorAll(items).length;
    var nextPage = document.querySelector(".pagination .pagination-item--next");
    setItemsCount(productCount);
    if (productCount < itemsPerPage && !nextPage) {
      // Check if not enough items for loader
      loaderBtn("hide");
    }
  })();

  /**
   * Set Query Params
   */
  function setQueryParams(name, value) {
    var url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, "", url);
  }

  /**
   * On Window Unload
   */
  window.addEventListener("beforeunload", function (e) {
    if (unloading === false) {
      var url = new URL(window.location);
      window.history.pushState({
        lastParams: url.searchParams.get("page")
      }, "", "");
      window.history.scrollRestoration = "manual";
    }
  });

  /**
   * Click Event Listener
   */
  document.addEventListener("click", function (e) {
    var url = new URL(window.location);
    // Check if its a product thats clicked;
    if (e.target.closest(item)) {
      unloading = true;
      var itemEl = e.target.closest(item);
      var itemRef = itemEl.dataset.index;
      window.history.pushState({
        lastItem: itemRef,
        lastParams: url.searchParams.get("page")
      }, "", ""); // Push reference to product ID on navigating away.
    }

    // Check if load more button clicked
    if (e.target.dataset.loadMore === "") {
      e.preventDefault();
      getNextItems();
    }
  });

  /**
   * Scroll Event Listener
   */
  document.addEventListener("scroll", function () {
    syncQueryParams();
    // load more items...
    if (isInViewport(itemsContainer, "bottom") & loadmore === true) {
      // getNextItems(); - Disabled auto scroll
      loadmore = false;
    }
  });
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZ29vc2UvZy1jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZ29vc2UvZy1pbmZpbml0ZVNjcm9sbC5qcyJdLCJuYW1lcyI6WyJoYW5kbGVPdmVybGF5IiwiZ1V0aWxzIiwiY29tbW9uIiwidGFibGV0QnJlYWtwb2ludCIsImZpbHRlckRyYXdlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhhbmRsZUZpbHRlclRvZ2dsZSIsImUiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJoYW5kbEZpbHRlckNsb3NlIiwicmVtb3ZlIiwicmVzZXRVcmwiLCJ1cmxVdGlscyIsImdvVG9VcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCIsImVuYWJsZVN1YkNhdEV4cGFuZCIsImlubmVyV2lkdGgiLCJsZW5ndGgiLCJzdWJDYXROYXZJdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzdWJDYXROYXZMaXN0IiwidG9nZ2xlTGluayIsImZvckVhY2giLCJlbCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwic3R5bGUiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwidGFyZ2V0IiwiY2xvc2VzdCIsInNldENhdENvdW50IiwiY291bnQiLCJwcm9kdWNDb3VudCIsImZiQ291bnQiLCJpbm5lckhUTUwiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZXhwb3J0cyIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsImRlc2MiLCJ2YWx1ZSIsIiRTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZXJyIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwiYXJnIiwidHlwZSIsImNhbGwiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJtZXRob2QiLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsIlByb21pc2VJbXBsIiwiaW52b2tlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlY29yZCIsInJlc3VsdCIsIl9fYXdhaXQiLCJ0aGVuIiwidW53cmFwcGVkIiwiZXJyb3IiLCJwcmV2aW91c1Byb21pc2UiLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsInN0YXRlIiwiRXJyb3IiLCJkb25lUmVzdWx0IiwiZGVsZWdhdGUiLCJkZWxlZ2F0ZVJlc3VsdCIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsImRvbmUiLCJtZXRob2ROYW1lIiwidW5kZWZpbmVkIiwiVHlwZUVycm9yIiwiaW5mbyIsInJlc3VsdE5hbWUiLCJuZXh0IiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0IiwiaXRlcmFibGUiLCJpdGVyYXRvck1ldGhvZCIsImlzTmFOIiwiaSIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImdlbkZ1biIsImN0b3IiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwiUHJvbWlzZSIsIml0ZXIiLCJrZXlzIiwidmFsIiwib2JqZWN0IiwicmV2ZXJzZSIsInBvcCIsInNraXBUZW1wUmVzZXQiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicm9vdFJlY29yZCIsInJ2YWwiLCJleGNlcHRpb24iLCJoYW5kbGUiLCJsb2MiLCJjYXVnaHQiLCJoYXNDYXRjaCIsImhhc0ZpbmFsbHkiLCJmaW5hbGx5RW50cnkiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlIiwibyIsImFsbG93QXJyYXlMaWtlIiwiaXQiLCJiaW5kIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibWluTGVuIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJuIiwidG9TdHJpbmciLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwicGFnaW5hdGlvbiIsIml0ZW1zQ29udGFpbmVyRWwiLCJpdGVtc0NvbnRhaW5lckVsMiIsIml0ZW1zQ29udGFpbmVyRWwzIiwiaXRlbXMiLCJpdGVtIiwiaXRlbXNDb250YWluZXIiLCJpdGVtc1BlclBhZ2UiLCJ0aGVtZVNldHRpbmdzIiwiY2F0ZWdvcnlwYWdlX3Byb2R1Y3RzX3Blcl9wYWdlIiwicGFnZVR5cGUiLCJwcm9kdWN0Q291bnRFbCIsImNvbnRhaW5zIiwiaXRlbXNDb3VudENvbnRhaW5lciIsIml0ZW1zVG90YWwiLCJwYXJzZUludCIsInBhZ2VVcmwiLCJVUkwiLCJwYXJhbXMiLCJzZWFyY2hQYXJhbXMiLCJsb2FkZWRQYWdlcyIsImxvYWRtb3JlIiwibGFzdFBhZ2UiLCJ1bmxvYWRpbmciLCJwcmV2aW91c0VsIiwicGFnZU5vIiwiZ2V0IiwicHJvZHVjdENvdW50IiwiZGF0YXNldCIsImJvdHRvbUNvdW50Q29udGFpbmVyIiwidG9wQ291bnRDb250YWluZXIiLCJsb2FkZXJCdG4iLCJ2aXNpYmlsaXR5IiwicHJlbG9hZGVyVG9wIiwicHJlTG9hZGVyQm90dG9tIiwiYWRkIiwidGV4dENvbnRlbnQiLCJjb25zb2xlIiwibG9nIiwiaXNJblZpZXdwb3J0IiwiZWxlbWVudCIsInJlY3QiLCJib3R0b20iLCJpbm5lckhlaWdodCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsInRvcCIsImxlZnQiLCJyaWdodCIsImNsaWVudFdpZHRoIiwic2V0SXRlbXNDb3VudCIsInJlc3RvcmVTY3JvbGxQb3MiLCJoaXN0b3J5IiwibGFzdEl0ZW0iLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwibGFzdFBhcmFtcyIsImVsZW1lbnRzIiwiZWxSZWYiLCJzZXRUaW1lb3V0Iiwic2V0UXVlcnlQYXJhbXMiLCJ1cmwiLCJzZWFyY2hfcGFyYW1zIiwiZ2V0UHJldkl0ZW1zIiwiX3giLCJfZ2V0UHJldkl0ZW1zIiwiX2NhbGxlZSIsIml0ZW1BcnIiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiZmV0Y2hJdGVtc0J5UGFnZU5vIiwiYWxsIiwicmVzIiwicGFnZSIsInBhcnNlciIsIkRPTVBhcnNlciIsImRvYyIsInBhcnNlRnJvbVN0cmluZyIsInByb2R1Y3RzIiwicHJvZHVjdEFyciIsInByb2R1Y3QiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJfaXRlcmF0b3IiLCJfc3RlcCIsInBhcmFtIiwiZ2V0TmV4dEl0ZW1zIiwiX2dldE5leHRJdGVtcyIsIl9jYWxsZWUyIiwiX3BhZ2VObzIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJldnQiLCJFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJuZXh0UGFnZSIsIl94MiIsIl9mZXRjaEl0ZW1zQnlQYWdlTm8iLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInNldCIsInNlYXJjaCIsImZldGNoIiwicmVzcG9uc2UiLCJ0ZXh0IiwiZGF0YSIsImluZGV4Iiwic3luY1F1ZXJ5UGFyYW1zIiwicHVzaFN0YXRlIiwic2Nyb2xsUmVzdG9yYXRpb24iLCJpdGVtRWwiLCJpdGVtUmVmIiwibG9hZE1vcmUiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0Q7QUFDTDtBQUNiO0FBRXBDLElBQ2NBLGFBQWEsR0FDdkJDLG9EQUFNLENBRE5DLE1BQU0sQ0FBSUYsYUFBYTtBQUczQixJQUFNRyxnQkFBZ0IsR0FBRyxJQUFJO0FBRWQsMkVBQVk7RUFDdkIsSUFBTUMsWUFBWSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUM7RUFFekQsSUFBSSxDQUFDRixZQUFZLEVBQUU7RUFFbkIsU0FBU0csa0JBQWtCQSxDQUFDQyxDQUFDLEVBQUU7SUFDM0JKLFlBQVksQ0FBQ0ssU0FBUyxDQUFDQyxNQUFNLENBQUMsU0FBUyxDQUFDO0VBQzVDO0VBRUEsU0FBU0MsZ0JBQWdCQSxDQUFDSCxDQUFDLEVBQUU7SUFDekJKLFlBQVksQ0FBQ0ssU0FBUyxDQUFDRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3hDWixhQUFhLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztFQUN4QztFQUVBLFNBQVNhLFFBQVFBLENBQUEsRUFBRztJQUNoQkMsK0RBQVEsQ0FBQ0MsT0FBTyxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFD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Q0EsSUFBSS9OLENBQUMsQ0FBQzJCLE1BQU0sQ0FBQ3NNLE9BQU8sQ0FBQ29GLFFBQVEsS0FBSyxFQUFFLEVBQUU7TUFDbENyVCxDQUFDLENBQUNzVCxjQUFjLENBQUMsQ0FBQztNQUNsQjVCLFlBQVksQ0FBQyxDQUFDO0lBQ2xCO0VBQ0osQ0FBQyxDQUFDOztFQUVGO0FBQ0o7QUFDQTtFQUNJN1IsUUFBUSxDQUFDNkIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQU07SUFDdENzUixlQUFlLENBQUMsQ0FBQztJQUNqQjtJQUNBLElBQUlwRSxZQUFZLENBQUNqQyxjQUFjLEVBQUUsUUFBUSxDQUFDLEdBQUllLFFBQVEsS0FBSyxJQUFLLEVBQUU7TUFDOUQ7TUFDQUEsUUFBUSxHQUFHLEtBQUs7SUFDcEI7RUFDSixDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay41LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0ZW5jaWxVdGlscyBmcm9tIFwiQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHNcIjtcbmltcG9ydCB1cmxVdGlscyBmcm9tIFwiLi4vY29tbW9uL3V0aWxzL3VybC11dGlsc1wiO1xuaW1wb3J0IGdVdGlscyBmcm9tIFwiLi4vZ29vc2UvdXRpbHNcIjtcblxuY29uc3Qge1xuICAgIGNvbW1vbjogeyBoYW5kbGVPdmVybGF5IH0sXG59ID0gZ1V0aWxzO1xuXG5jb25zdCB0YWJsZXRCcmVha3BvaW50ID0gMTAyNTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZpbHRlckRyYXdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmItZHJhd2VyXCIpO1xuXG4gICAgaWYgKCFmaWx0ZXJEcmF3ZXIpIHJldHVybjtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZpbHRlclRvZ2dsZShlKSB7XG4gICAgICAgIGZpbHRlckRyYXdlci5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtb3BlblwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbEZpbHRlckNsb3NlKGUpIHtcbiAgICAgICAgZmlsdGVyRHJhd2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xuICAgICAgICBoYW5kbGVPdmVybGF5KFwiZmItZHJhd2VyXCIsIFwicmVtb3ZlXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0VXJsKCkge1xuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlU3ViQ2F0RXhwYW5kKCkge1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCB0YWJsZXRCcmVha3BvaW50KSByZXR1cm47XG5cbiAgICAgICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgICAgIGNvbnN0IHN1YkNhdE5hdkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zdWItY2F0LW5hdiAuc3ViLWNhdC1uYXZfX2xpc3QgLnN1Yi1jYXQtbmF2X19pdGVtXCIpO1xuICAgICAgICBjb25zdCBzdWJDYXROYXZMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItY2F0LW5hdiAuc3ViLWNhdC1uYXZfX2xpc3RcIik7XG4gICAgICAgIGNvbnN0IHRvZ2dsZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1jYXQtbmF2IC50b2dnbGVMaW5rXCIpO1xuXG4gICAgICAgIHN1YkNhdE5hdkl0ZW1zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgbGVuZ3RoICs9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobGVuZ3RoID4gMTUyMCkge1xuICAgICAgICAgICAgdG9nZ2xlTGluay5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHN1YkNhdE5hdkxpc3Quc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnZmxleC1zdGFydCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoXCIuanMtZmlsdGVyLXRvZ2dsZVwiKSkge1xuICAgICAgICAgICAgaGFuZGxlRmlsdGVyVG9nZ2xlKGUpO1xuICAgICAgICAgICAgaGFuZGxlT3ZlcmxheShcImZiLWRyYXdlclwiLCBcImFkZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KFwiLmZiLWRyYXdlci13cmFwIC5jbG9zZVwiKSkge1xuICAgICAgICAgICAgaGFuZGxGaWx0ZXJDbG9zZShlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KFwiLmpzLWNsZWFyLXVybFwiKSkge1xuICAgICAgICAgICAgcmVzZXRVcmwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZS50YXJnZXQuY2xvc2VzdChcIi5qcy1maWx0ZXItdG9nZ2xlXCIpICYmICFlLnRhcmdldC5jbG9zZXN0KFwiLmZiLWRyYXdlci13cmFwXCIpKSB7XG4gICAgICAgICAgICBoYW5kbEZpbHRlckNsb3NlKGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBlbmFibGVTdWJDYXRFeHBhbmQoKTtcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDYXRDb3VudChjb3VudCkge1xuICAgIGNvbnN0IHByb2R1Y0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRlZ29yeS12aWV3X19wcm9kdWN0LWNvdW50XCIpO1xuICAgIGNvbnN0IGZiQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZiLWl0ZW1zLWNvdW50XCIpO1xuXG4gICAgaWYgKCFwcm9kdWNDb3VudCkgcmV0dXJuO1xuXG4gICAgcHJvZHVjQ291bnQuaW5uZXJIVE1MID0gY291bnQgIT0gMSA/IGAke2NvdW50fSBpdGVtc2AgOiBgJHtjb3VudH0gaXRlbWA7XG5cbiAgICBpZiAoIWZiQ291bnQpIHJldHVybjtcblxuICAgIGZiQ291bnQuZm9yRWFjaCgoZWwpID0+IChlbC5pbm5lckhUTUwgPSBjb3VudCkpO1xufVxuIiwiLyoqXG4gKiAgSW5maW5pdGUgU2Nyb2xsIExvYWRlciBieSBHb29zZS5cbiAqXG4gKiBJbnN0cnVjdGlvbnM6XG4gKiBTZXQgaXRlbXNDb250YWluZXJFbCBkaXNwbGF5IHZhbHVlIHRvIG5vbmUgd2l0aGluIEhUTUxcbiAqIFNldCBwYWdpbmF0aW9uLWxpc3QgZGlzcGxheSB2YWx1ZSB0byBub25lIHdpdGhpbiBIVE1MXG4gKiBXcmFwIGNvdW50IG9mIHByb2R1Y3QgbnVtYmVyIGluIGEgc3BhbiB3aXRoIGNsYXNzICdwcm9kdWN0LWNvdW50J1xuICpcbiAqL1xuXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgLyoqXG4gICAgICogRGVmaW5lIGdsb2JhbHNcbiAgICAgKi9cbiAgICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdpbmF0aW9uXCIpOyAvLyBQYWdpbmF0aW9uIGVsIHNlbGVjdG9yXG4gICAgY29uc3QgaXRlbXNDb250YWluZXJFbCA9IFwiLnByb2R1Y3QtZ3JpZFwiOyAvLyBQYXJlbnQgZWxlbWVudCBzZWxlY3RvclxuICAgIGNvbnN0IGl0ZW1zQ29udGFpbmVyRWwyID0gXCIucHJvZHVjdEdyaWRcIjsgLy8gRmFsbGJhY2sgUGFyZW50IGVsZW1lbnQgc2VsZWN0b3JcbiAgICBjb25zdCBpdGVtc0NvbnRhaW5lckVsMyA9IFwiLmJyYW5kR3JpZFwiO1xuICAgIGxldCBpdGVtcyA9IFwiLnByb2R1Y3QtZ3JpZCAucHJvZHVjdFwiOyAvLyBJdGVtcyBzZWxlY3RvclxuICAgIGxldCBpdGVtID0gXCIucHJvZHVjdFwiOyAvLyBTaW5nbGUgaXRlbSBzZWxlY3RvclxuICAgIGxldCBpdGVtc0NvbnRhaW5lcjtcbiAgICBsZXQgaXRlbXNQZXJQYWdlID0gY29udGV4dC50aGVtZVNldHRpbmdzLmNhdGVnb3J5cGFnZV9wcm9kdWN0c19wZXJfcGFnZTsgLy8gRGVjaWRlcyBob3cgbWFueSBlbGVtZW50cyB0byB1c2UgZm9yIHVwZGF0aW5nIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICBjb25zdCBwYWdlVHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RDb3VudEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0X19jb3VudFwiKTsgLy8gZWxlbWVudCBjb250YWluaW5nIHByb2R1Y3QgY291bnRcblxuICAgIC8vIFN3aXRjaCBiYXNlZCBvblxuICAgIGlmIChwYWdlVHlwZS5jbGFzc0xpc3QuY29udGFpbnMoXCJicmFuZHNcIikpIHtcbiAgICAgICAgLy8gQnJhbmRzIFBhZ2VcbiAgICAgICAgaXRlbXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jb250ZW50ICcgKyBpdGVtc0NvbnRhaW5lckVsMyk7XG4gICAgICAgIGl0ZW1zID0gXCIuYnJhbmRHcmlkIC5icmFuZFwiO1xuICAgICAgICBpdGVtID0gXCIuYnJhbmRcIjtcbiAgICAgICAgLy8gaXRlbXNQZXJQYWdlID0gNDg7XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jb250ZW50ICcgKyBpdGVtc0NvbnRhaW5lckVsKSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBOZXcgR3JpZCBQYWdlXG4gICAgICAgIGl0ZW1zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY29udGVudCAnICsgaXRlbXNDb250YWluZXJFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmFsbGJhY2tcbiAgICAgICAgaXRlbXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jb250ZW50ICcgKyBpdGVtc0NvbnRhaW5lckVsMik7XG4gICAgICAgIGl0ZW1zID0gXCIjbWFpbi1jb250ZW50IC5wcm9kdWN0R3JpZCAucHJvZHVjdFwiO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zQ291bnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLml0ZW1zLWNvdW50XCIpOyAvLyBQcm9kdWN0IHRvdGFsIGNvdW50IHNlbGVjdG9yXG4gICAgLy8gY29uc3QgaXRlbXNQcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uX19iYXJfX3Byb2dyZXNzJyk7XG4gICAgY29uc3QgaXRlbXNUb3RhbCA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnaW5hdGlvbl9fdG90YWxcIikuaW5uZXJIVE1MKTtcbiAgICBjb25zdCBwYWdlVXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgY29uc3QgcGFyYW1zID0gcGFnZVVybC5zZWFyY2hQYXJhbXM7XG4gICAgbGV0IGxvYWRlZFBhZ2VzID0gMTtcbiAgICBsZXQgbG9hZG1vcmUgPSB0cnVlO1xuICAgIGxldCBsYXN0UGFnZSA9IGZhbHNlO1xuICAgIGxldCB1bmxvYWRpbmcgPSBmYWxzZTtcbiAgICBsZXQgcHJldmlvdXNFbCA9IFwiXCI7XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIFBhZ2luYXRpb24gb24gcGFnZSBsb2FkXG4gICAgICovXG4gICAgaWYgKHBhZ2luYXRpb24gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIucGFnaW5hdGlvbi1saXN0XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgIC8vIENoZWNrIGlmIHBhZ2UgaGFzIG5vIHBhcmFtcywgc2hvdyB0aGUgYmxvY2tcbiAgICBjb25zdCBwYWdlTm8gPSBwYXJhbXMuZ2V0KFwicGFnZVwiKTtcblxuICAgIGlmIChwYWdlTm8gPT09IDEgfHwgcGFnZU5vID09PSBudWxsKSB7XG4gICAgICAgIC8vIGl0ZW1zQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAvLyBsb2FkZXJCdG4oJ2Rpc2FibGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgaXRlbXMgY291bnRcbiAgICAgKi9cbiAgICBpZiAocHJvZHVjdENvdW50RWwpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdENvdW50ID0gcHJvZHVjdENvdW50RWwuZGF0YXNldC5wcm9kdWN0Q291bnQ7XG4gICAgICAgIGNvbnN0IGJvdHRvbUNvdW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdpbmF0aW9uX190b3RhbFwiKTtcbiAgICAgICAgY29uc3QgdG9wQ291bnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGVnb3J5LWJhcl9fY291bnRcIik7XG4gICAgICAgIHRvcENvdW50Q29udGFpbmVyID8gKHRvcENvdW50Q29udGFpbmVyLmlubmVySFRNTCA9IGAke3Byb2R1Y3RDb3VudH0gcHJvZHVjdHNgKSA6IFwiXCI7XG4gICAgICAgIGJvdHRvbUNvdW50Q29udGFpbmVyID8gKGJvdHRvbUNvdW50Q29udGFpbmVyLmlubmVySFRNTCA9IGAke3Byb2R1Y3RDb3VudH1gKSA6IFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZGVyXG4gICAgICogQHBhcmFtIHsqfSB2aXNpYmlsaXR5XG4gICAgICovXG4gICAgZnVuY3Rpb24gbG9hZGVyQnRuKHZpc2liaWxpdHkpIHtcbiAgICAgICAgY29uc3QgcHJlbG9hZGVyVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZpbml0ZS1sb2FkZXIucHJlbG9hZGVyLXRvcFwiKTtcbiAgICAgICAgY29uc3QgcHJlTG9hZGVyQm90dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdpbmF0aW9uX19sb2FkZXIgLmctYnV0dG9uXCIpO1xuICAgICAgICBpZiAodmlzaWJpbGl0eSA9PT0gXCJlbmFibGVcIikge1xuICAgICAgICAgICAgcGFnaW5hdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgcHJlTG9hZGVyQm90dG9tLmNsYXNzTGlzdC5hZGQoXCJidXR0b24tLWRpc2FibGVkXCIpO1xuICAgICAgICAgICAgcHJlTG9hZGVyQm90dG9tLnRleHRDb250ZW50ID0gXCJMb2FkaW5nLi4uXCI7XG4gICAgICAgIH0gZWxzZSBpZiAodmlzaWJpbGl0eSA9PT0gXCJkaXNhYmxlXCIpIHtcbiAgICAgICAgICAgIHByZUxvYWRlckJvdHRvbS5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1kaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIHByZUxvYWRlckJvdHRvbS50ZXh0Q29udGVudCA9IFwiTG9hZCBtb3JlXCI7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSBlbHNlIGlmICh2aXNpYmlsaXR5ID09PSBcImhpZGVcIikge1xuICAgICAgICAgICAgcHJlTG9hZGVyQm90dG9tLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHByZUxvYWRlckJvdHRvbS50ZXh0Q29udGVudCA9IFwiTG9hZCBtb3JlXCI7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVuY3Rpb24gbm90IGRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBlbGVtbnQgaXMgZnVsbHkgaW4gdmllcG9ydCBvciBjb21wbGV0ZWQgZW50ZXJpbmcgdmlld3BvcnQuXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50XG4gICAgICogQHBhcmFtIHsqfSB0eXBlXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0luVmlld3BvcnQoZWxlbWVudCwgdHlwZSkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsYXN0UGFnZSA9IHRydWU7XG4gICAgICAgICAgICBsb2FkZXJCdG4oXCJkaXNhYmxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJib3R0b21cIikge1xuICAgICAgICAgICAgcmV0dXJuIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlY3QudG9wID49IDAgJiZcbiAgICAgICAgICAgICAgICByZWN0LmxlZnQgPj0gMCAmJlxuICAgICAgICAgICAgICAgIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiZcbiAgICAgICAgICAgICAgICByZWN0LnJpZ2h0IDw9ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvdW50IG9mIGl0ZW1zIGluIERPTVxuICAgICAqIEBwYXJhbSB7Kn0gY291bnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRJdGVtc0NvdW50KGNvdW50KSB7XG4gICAgICAgIGlmIChpdGVtc0NvdW50Q29udGFpbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpdGVtc0NvdW50Q29udGFpbmVyLmlubmVySFRNTCA9IGAke2NvdW50fWA7XG4gICAgICAgICAgICAvLyAgU2V0IHByb2dyZXNzIGJhclxuICAgICAgICAgICAgLy8gY29uc3QgcHJvZ3Jlc3NQZXJjZW50YWdlID0gKGNvdW50ICogMTAwKSAvIGl0ZW1zVG90YWw7XG4gICAgICAgICAgICAvLyBpdGVtc1Byb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gcHJvZ3Jlc3NQZXJjZW50YWdlICsgXCIlXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlIHNjcm9sbCBwb3NpdGlvbiBiYXNlZCBvbiByZWZyZXNoIG9yIGJhY2sgYnV0dG9uIHByZXNzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxQb3MoKSB7XG4gICAgICAgIC8vIElmIGhpc3RvcnkgaGFzIHByb2R1Y3QgcmVmZXJlbmNlIGkuZS4gYmFjayBidXR0b24gd2FzIHVzZWRcbiAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlLmxhc3RJdGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBlbGVtZW50IGludG8gdmlld1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9XCIke3dpbmRvdy5oaXN0b3J5LnN0YXRlLmxhc3RJdGVtfVwiXWApLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICAgIH0gLy8gSWYgaGlzdG9yeSBoYXMgbGFzdCBwYWdlIG5vIHJlZmVyZW5jZVxuICAgICAgICBlbHNlIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeS5zdGF0ZS5sYXN0UGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcyk7XG5cbiAgICAgICAgICAgIC8vIGdldCBsYXN0IHBhcmFtcyBzZXQgYmVmb3JlIHJlZnJlc2hcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHdpbmRvdy5oaXN0b3J5LnN0YXRlLmxhc3RQYXJhbXM7XG4gICAgICAgICAgICAvLyBHZXQgUmVmIHRvIDFzdCBlbCBvZiB0aGUgYmxvY2tcbiAgICAgICAgICAgIGNvbnN0IGVsUmVmID0gcGFyc2VJbnQocGFyYW1zKSAqIGl0ZW1zUGVyUGFnZSAtIGl0ZW1zUGVyUGFnZSArIDE7XG5cbiAgICAgICAgICAgIC8vIFNjcm9sbCB0byBsYXN0IHBvc2l0aW9uXG4gICAgICAgICAgICBpZiAoZWxSZWYgPiAxICYmIGVsZW1lbnRzW2VsUmVmXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbZWxSZWZdLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBxdWVyeSBwYXJhbXNcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2V0UXVlcnlQYXJhbXMoXCJwYWdlXCIsIHBhcmFtcyksIDEwMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgcGFnZSB3YXMgcmVmcmVzaGVkLlxuICAgICAgICAgICAgLy8gUmUgaXRlcmF0ZSBvdmVyIGFsbCB0aGUgZWxlbWVudHMgaW4gRE9NXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdXJsIHBhcmFtcyBvZiBjdXJyZW50IFVSTFxuICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hfcGFyYW1zID0gdXJsLnNlYXJjaFBhcmFtcztcblxuICAgICAgICAgICAgLy8gR2V0IFJlZiB0byAxc3QgZWwgb2YgdGhlIGJsb2NrXG4gICAgICAgICAgICBjb25zdCBlbFJlZiA9IHBhcnNlSW50KHNlYXJjaF9wYXJhbXMuZ2V0KFwicGFnZVwiKSkgKiBpdGVtc1BlclBhZ2UgLSBpdGVtc1BlclBhZ2UgKyAxO1xuXG4gICAgICAgICAgICAvLyBTY3JvbGwgdG8gbGFzdCBwb3NpdGlvblxuICAgICAgICAgICAgaWYgKGVsUmVmID4gMSAmJiBlbGVtZW50c1tlbFJlZl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzW2VsUmVmXS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgcXVlcnkgcGFyYW1zXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNldFF1ZXJ5UGFyYW1zKFwicGFnZVwiLCBwYXJzZUludChzZWFyY2hfcGFyYW1zLmdldChcInBhZ2VcIikpKSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEl0ZW1zIGZyb20gUHJldmlvdXMgUGFnZXNcbiAgICAgKiBAcGFyYW0geyp9IGNvdW50XG4gICAgICovXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UHJldkl0ZW1zKGNvdW50KSB7XG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgbGV0IGl0ZW1BcnIgPSBbXTtcbiAgICAgICAgbG9hZGVyQnRuKFwiZW5hYmxlXCIpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCBwcmV2aW91cyBpdGVtcyBhbmQgaW5zZXJ0IGJlZm9yZSBjdXJyZW50IGl0ZW1zXG4gICAgICAgICAgICBpdGVtQXJyLnB1c2goZmV0Y2hJdGVtc0J5UGFnZU5vKGkpKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSB3aGlsZSAoaSA8IGNvdW50KTtcblxuICAgICAgICBQcm9taXNlLmFsbChpdGVtQXJyKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlckJ0bihcImRpc2FibGVcIik7XG4gICAgICAgICAgICAgICAgcmVzLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICByZXMuZm9yRWFjaCgocGFnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhwYWdlLnByb2R1Y3RzLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdEFyciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChpdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzLmZvckVhY2goKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RBcnIucHVzaChwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RBcnIucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y3RBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgcHJvZHVjdEFycltpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGl0ZW1zQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChyZXN0b3JlU2Nyb2xsUG9zKCksIDEwMDApO1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudFxuICAgICAgICAgICAgICAgIHNldEl0ZW1zQ291bnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcykubGVuZ3RoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IGNvbnNvbGUubG9nKGUpKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1bMF0gPT09IFwicGFnZVwiKSB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQocGFyYW1bMV0pID4gMSkge1xuICAgICAgICAgICAgICAgIGdldFByZXZJdGVtcyhwYXJhbVsxXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGl0ZW1zQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBOZXh0IFBhZ2UgRWxlbWVudHNcbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBnZXROZXh0SXRlbXMoKSB7XG4gICAgICAgIC8vIFdhaXQgdGlsbCBpdCB0aGUgZW5kIG9mIGl0ZW1zIHJlYWNoZXMgJiBsb2FkIG5leHQgaXRlbXNcblxuICAgICAgICAvLyBTaG93IGJvdHRvbSBsb2FkZXJcbiAgICAgICAgbG9hZGVyQnRuKFwiZW5hYmxlXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIG5vdCBhIGxhc3RwYWdlXG4gICAgICAgIGlmIChsYXN0UGFnZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgLy8gZ2V0IHVybCBwYXJhbXMgb2YgY3VycmVudCBVUkxcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaF9wYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xuICAgICAgICAgICAgbGV0IHBhZ2VObyA9IHNlYXJjaF9wYXJhbXMuZ2V0KFwicGFnZVwiKSAhPT0gbnVsbCA/IHBhcnNlSW50KHNlYXJjaF9wYXJhbXMuZ2V0KFwicGFnZVwiKSkgOiAxO1xuXG4gICAgICAgICAgICBhd2FpdCBmZXRjaEl0ZW1zQnlQYWdlTm8ocGFnZU5vICsgMSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IEV2ZW50KFwic3RhbXBlZFJlbG9hZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gXCJvYmplY3RcIiAmJiByZXMucHJvZHVjdHMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXMucHJvZHVjdHMsIFwidGV4dC9odG1sXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFBhZ2UgPSBkb2MucXVlcnlTZWxlY3RvcihcIi5wYWdpbmF0aW9uIC5wYWdpbmF0aW9uLWl0ZW0tLW5leHRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0cyAhPT0gbnVsbCAmJiBwcm9kdWN0cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0cy5mb3JFYWNoKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0cyAhPT0gbnVsbCAmJiAhbmV4dFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZG1vcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyQnRuKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkbW9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlckJ0bihcImRpc2FibGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkUGFnZXMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJdGVtc0NvdW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlckJ0bihcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbmQgb2YgaXRlbXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRlbXNQcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlckJ0bihcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVuZCBvZiBpdGVtc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0UGFnZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlYWNoZWQgZW5kIG9mIGl0ZW1zXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggSXRlbXNcbiAgICAgKiBAcGFyYW0geyp9IHBhZ2VOb1xuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hJdGVtc0J5UGFnZU5vKHBhZ2VObykge1xuICAgICAgICAvLyBHZXQgY3VycmVudCBwYWdlIHVybFxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgLy8gZ2V0IHVybCBwYXJhbXMgb2YgY3VycmVudCBVUkxcbiAgICAgICAgY29uc3Qgc2VhcmNoX3BhcmFtcyA9IHVybC5zZWFyY2hQYXJhbXM7XG4gICAgICAgIC8vIHVwZGF0ZSBwYXJhbXNcbiAgICAgICAgc2VhcmNoX3BhcmFtcy5zZXQoXCJwYWdlXCIsIHBhZ2VObyk7XG4gICAgICAgIHVybC5zZWFyY2ggPSBzZWFyY2hfcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIGZpbmFsbHkgd2UgbWFrZSBhIHJlcXVlc3QgdG8gbW9kaWZpZWQgcGFnZVxuICAgICAgICBjb25zdCByZXMgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmZXRjaCh1cmwpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHJlc29sdmUoeyBwcm9kdWN0czogZGF0YSwgaW5kZXg6IHBhZ2VObyB9KSkgLy8gUmV0dXJuaW5nIGVhY2ggb2JqZWN0IHdpdGggcGFnZSBubywgaW4gb3JkZXIgdG8gaW5qZWN0IGJhY2sgdG8gRE9NIGluIHNhbWUgb3JkZXJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBCcm93c2VyIHF1ZXJ5IHBhcmFtc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN5bmNRdWVyeVBhcmFtcygpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gcHJvZHVjdHMubGVuZ3RoO1xuICAgICAgICAvLyBHZXQgcmVmIHRvIGV2ZXJ5IG50aCBlbGVtZW50XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSA9IGkgKyBpdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGVsIGluIHZpc2liaWxpdHkgdXBkYXRlIHBhcmFtXG4gICAgICAgICAgICBpZiAoaXNJblZpZXdwb3J0KHByb2R1Y3RzW2ldKSAmJiBwcm9kdWN0c1tpXSAhPT0gcHJldmlvdXNFbCkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzRWwgPSBwcm9kdWN0c1tpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWdlTm8gPSAoaSAtIDEpIC8gaXRlbXNQZXJQYWdlICsgMTtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwicGFnZVwiLCBwYWdlTm8pO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgdXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRcbiAgICAgKi9cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBDb3VudCBwcm9kdWN0cyBvbiBwYWdlXG4gICAgICAgIGNvbnN0IHByb2R1Y3RDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbmV4dFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2luYXRpb24gLnBhZ2luYXRpb24taXRlbS0tbmV4dFwiKTtcbiAgICAgICAgc2V0SXRlbXNDb3VudChwcm9kdWN0Q291bnQpO1xuICAgICAgICBpZiAocHJvZHVjdENvdW50IDwgaXRlbXNQZXJQYWdlICYmICFuZXh0UGFnZSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbm90IGVub3VnaCBpdGVtcyBmb3IgbG9hZGVyXG4gICAgICAgICAgICBsb2FkZXJCdG4oXCJoaWRlXCIpO1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBRdWVyeSBQYXJhbXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRRdWVyeVBhcmFtcyhuYW1lLCB2YWx1ZSkge1xuICAgICAgICBsZXQgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24pO1xuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgdXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBXaW5kb3cgVW5sb2FkXG4gICAgICovXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKHVubG9hZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbik7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBsYXN0UGFyYW1zOiB1cmwuc2VhcmNoUGFyYW1zLmdldChcInBhZ2VcIikgfSwgXCJcIiwgXCJcIik7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IFwibWFudWFsXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENsaWNrIEV2ZW50IExpc3RlbmVyXG4gICAgICovXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGxldCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbik7XG4gICAgICAgIC8vIENoZWNrIGlmIGl0cyBhIHByb2R1Y3QgdGhhdHMgY2xpY2tlZDtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoaXRlbSkpIHtcbiAgICAgICAgICAgIHVubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBpdGVtRWwgPSBlLnRhcmdldC5jbG9zZXN0KGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgaXRlbVJlZiA9IGl0ZW1FbC5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHsgbGFzdEl0ZW06IGl0ZW1SZWYsIGxhc3RQYXJhbXM6IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwicGFnZVwiKSB9LCBcIlwiLCBcIlwiKTsgLy8gUHVzaCByZWZlcmVuY2UgdG8gcHJvZHVjdCBJRCBvbiBuYXZpZ2F0aW5nIGF3YXkuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBsb2FkIG1vcmUgYnV0dG9uIGNsaWNrZWRcbiAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubG9hZE1vcmUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGdldE5leHRJdGVtcygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgRXZlbnQgTGlzdGVuZXJcbiAgICAgKi9cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgc3luY1F1ZXJ5UGFyYW1zKCk7XG4gICAgICAgIC8vIGxvYWQgbW9yZSBpdGVtcy4uLlxuICAgICAgICBpZiAoaXNJblZpZXdwb3J0KGl0ZW1zQ29udGFpbmVyLCBcImJvdHRvbVwiKSAmIChsb2FkbW9yZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIC8vIGdldE5leHRJdGVtcygpOyAtIERpc2FibGVkIGF1dG8gc2Nyb2xsXG4gICAgICAgICAgICBsb2FkbW9yZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9