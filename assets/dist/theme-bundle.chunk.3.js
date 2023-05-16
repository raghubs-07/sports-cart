(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./assets/js/theme/goose/g-customise-shirt.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/goose/g-customise-shirt.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (product) {
  function validateInput(input) {
    var inputLength = input.value.toString(10).length;
    if (inputLength > 2) {
      alert("Please only enter up to two numbers.");
    }
    input.value = input.value.slice(0, 2);
    return inputLength;
  }
  function handleModiferSelection(input, shirtNumberTypeOptionValues) {
    var modiferTargetKey;

    // Checking if the input is empty
    if (input.value === "") {
      shirtNumberTypeOptionInputs[0].checked = true;

      // We need to un focus the input in order to trigger the change event,
      // which then tiggers the option update function from BC
      input.blur();
      input.focus();
    } else {
      var inputLength = input.value.toString(10).length;
      switch (inputLength) {
        case 1:
          modiferTargetKey = singleDigitKey;
          break;
        case 2:
          modiferTargetKey = doubleDigitKey;
          break;
        default:
          modiferTargetKey = undefined;
      }
      shirtNumberTypeOptionValues.forEach(function (value) {
        // console.log(value, modiferTargetKey);
        if (value.label == modiferTargetKey) {
          document.querySelector("[value=\"" + value.id + "\"]").checked = true;

          // We need to un focus the input in order to trigger the change event,
          // which then tiggers the option update function from BC
          input.blur();
          input.focus();
        }
      });
    }
  }
  function inputHandler(event) {
    if (!event) return;
    var input = event.target;
    var inputLabels = input.labels;
    var inputTarget = Array.from(inputLabels).filter(function (label) {
      return label.dataset.label === inputKey;
    });
    if (!inputTarget.length > 0) return;
    var inputLength = validateInput(input);
    handleModiferSelection(input, shirtNumberTypeOptionValues);
  }
  function init() {
    // console.log(product);
    // Hide the shirt number modifier options (these are what controls the price)
    shirtNumberTypeOptionData = product.options.filter(function (option) {
      return option.display_name === priceRuleModifiersKey;
    });
    if (!shirtNumberTypeOptionData.length > 0) return;
    shirtNumberTypeOptionValues = shirtNumberTypeOptionData[0].values;
    shirtNumberTypeOptionEl = document.querySelector("[data-option-id=\"" + shirtNumberTypeOptionData[0].id + "\"");
    shirtNumberTypeOptionInputs = Array.from(shirtNumberTypeOptionEl.querySelectorAll("input"));
    shirtNumberFormField = document.querySelector("[data-input-name=\"" + inputKey + "\"");
    if (!shirtNumberFormField) return;
    if (shirtNumberTypeOptionEl) {
      shirtNumberTypeOptionEl.setAttribute("style", "display:none;");
    }

    ////////// Enhance the  Shirt Number form field //////////

    // Configure the Shirt Number input
    var shirtNumberFormFieldInput = shirtNumberFormField.querySelector("input");
    shirtNumberFormFieldInput.value = "";
    shirtNumberFormFieldInput.setAttribute("placeholder", "Enter up to two numbers");
    shirtNumberFormFieldInput.setAttribute("style", "width:100%");

    // Configure the Shirt Number form field
    var formFieldWrap = document.createElement("div");
    var formFeildHtml = "\n            <h4 class=\"heading\">Personalisation</h4>\n            <p class=\"text\">Have your favourite players number transferred onto this for an <strong>extra +$10 AUD</strong> per number.</p>\n        ";
    formFieldWrap.insertAdjacentHTML("afterbegin", formFeildHtml);
    formFieldWrap.classList.add("product-view-options__customise");
    shirtNumberFormField.parentNode.insertBefore(formFieldWrap, shirtNumberFormField);
    formFieldWrap.appendChild(shirtNumberFormField);
  }

  //------ Inits and Event Listeners
  var shirtNumberTypeOptionData;
  var shirtNumberTypeOptionValues;
  var shirtNumberTypeOptionEl;
  var shirtNumberTypeOptionInputs;
  var shirtNumberFormField;

  //Setup
  // We use the modifiers label to target the input
  var priceRuleModifiersKey = "Shirt Number Type";
  var inputKey = "Shirt Number";
  var singleDigitKey = "Single Digit";
  var doubleDigitKey = "Double Digit";
  init();
  document.addEventListener("input", function (event) {
    inputHandler(event);
  }, false);
});

/***/ }),

/***/ "./assets/js/theme/goose/g-pack-product.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/goose/g-pack-product.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/utils/api */ "./assets/js/theme/common/utils/api.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _g_customise_shirt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./g-customise-shirt */ "./assets/js/theme/goose/g-customise-shirt.js");
/* harmony import */ var _goose_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../goose/utils */ "./assets/js/theme/goose/utils/index.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var gUpdateProductAttributes = _goose_utils__WEBPACK_IMPORTED_MODULE_5__["default"].product.gUpdateProductAttributes;
/**
 * A pack product must contain a custom field named pack_products, with a value of comma separated list of product id's as value
 * If there's a discount for the pack a custom field name pack_discount should be set on the product as well, with a value of number which will translate to percentage discount. e.g value of 5 will set 5% discount on the entire pack.
 */

/* harmony default export */ __webpack_exports__["default"] = (function (_x) {
  return _ref.apply(this, arguments);
});
function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(context) {
    var priceContainer, priceArr, discountRate, qty, stockArr, getCart, _getCart, setMaxQtyLimit, getProductVariant, _getProductVariant, getProductOptionsFromPage, _getProductOptionsFromPage, addProductArrToCart, _addProductArrToCart, createCart, _createCart, setProductPrice, updateProductPriceArr, handleProductOptionChange, _handleProductOptionChange, addAllProductsToCart, _addAllProductsToCart, getPackProducts, init;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          init = function _init() {
            getPackProducts();
          };
          getPackProducts = function _getPackProducts() {
            // Check if a custom field called pack_products exists
            var customFields = context.product.custom_fields;
            var packFields = customFields ? customFields == null ? void 0 : customFields.filter(function (field) {
              return field.name == "pack_products";
            }) : [];
            if (packFields.length === 0) return;

            // Check if discount rate exists on pack product.
            customFields.forEach(function (field) {
              if (field.name === "pack_discount") {
                discountRate = parseInt(field.value);
              }
            });
            var promiseArr = [];
            var packProducts = context.product.custom_fields.filter(function (field) {
              return field.name == "pack_products";
            });
            if (packProducts.length === 0) return;
            var packProductIds = packProducts[0].value.split(",");
            for (var i = 0; i < packProductIds.length; i++) {
              promiseArr.push(getProductOptionsFromPage(packProductIds[i]));
            }
            Promise.all(promiseArr).then(function (res) {
              var optionsContainer = document.createElement("div");
              var packProductsBlock = document.querySelector(".product-view__packProduct");
              optionsContainer.setAttribute("class", "product-options-container");
              packProductsBlock.style.display = "flex";
              document.querySelector(".product-view__packProduct").insertAdjacentElement("afterbegin", optionsContainer);

              // Now we parse all products response and inject into DOM
              res.forEach(function (product) {
                var productId = JSON.parse(product.json).product.id;
                var price = JSON.parse(product.json).product.price.with_tax.value;
                document.querySelector(".product-options-container").insertAdjacentHTML("beforeend", product.html);
                var scope = document.querySelector(".sub-product[data-product-id=\"" + JSON.parse(product.json).product.id + "\"]");
                updateProductPriceArr(productId, price);
                getProductVariant(productId, new URLSearchParams(new FormData(product.html.outerHTML)).toString(), scope);
                Object(_g_customise_shirt__WEBPACK_IMPORTED_MODULE_4__["default"])(JSON.parse(product.json).product);
              });
            });
            document.getElementById("add-to-cart-pack").addEventListener("click", /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      e.preventDefault();
                      // const productData
                      _context.next = 3;
                      return addAllProductsToCart();
                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function (_x10) {
                return _ref2.apply(this, arguments);
              };
            }());
            document.addEventListener("click", function (e) {
              var qtyArr = stockArr.map(function (item) {
                return parseInt(item.stock);
              });
              var minQty = Math.min.apply(Math, qtyArr);

              // Handle qty buttons
              if (e.target.closest("[data-action='inc']")) {
                var incBtn = e.target.closest("[data-action='inc']");
                var qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");
                if (qtyBox.value >= minQty) {
                  e.preventDefault();
                  qtyBox.value = minQty;
                  incBtn.setAttribute("disabled", true);
                }
              }
              if (e.target.closest("[data-action='dec']")) {
                var _incBtn = e.target.closest(".form-increment").querySelector("[data-action='inc']");
                var _qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");
                if (_qtyBox.value < minQty) {
                  _incBtn.removeAttribute("disabled");
                }
              }
            });

            // Change event listener
            document.addEventListener("change", function (e) {
              var qtyArr = stockArr.map(function (item) {
                return parseInt(item.stock);
              });
              var minQty = Math.min.apply(Math, qtyArr);
              if (e.target.closest(".sub-product")) {
                handleProductOptionChange(e);
              }
              if (e.target.closest(".form-increment[data-quantity-change]")) {
                var qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");
                if (qtyBox.value > minQty) {
                  qtyBox.value = minQty;
                }
              }
            });
          };
          _addAllProductsToCart = function _addAllProductsToCart3() {
            _addAllProductsToCart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
              var _cart$;
              var cartBtn, originalBtnValue, waitMessage, cart, productsArr, validityArr, arr1, arr2, hasAllIitems, res;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    cartBtn = document.getElementById("add-to-cart-pack");
                    originalBtnValue = cartBtn.dataset.value;
                    waitMessage = cartBtn.dataset.waitMessage;
                    _context10.next = 5;
                    return getCart()["catch"](function (err) {
                      console.log("Error:", err);
                    });
                  case 5:
                    cart = _context10.sent;
                    productsArr = [];
                    validityArr = [];
                    document.querySelectorAll(".sub-product").forEach(function (el) {
                      validityArr.push(el.reportValidity());
                    });
                    if (!validityArr.includes(false)) {
                      _context10.next = 11;
                      break;
                    }
                    return _context10.abrupt("return");
                  case 11:
                    cartBtn.setAttribute("disabled", "true");
                    cartBtn.innerHTML = waitMessage;
                    document.querySelectorAll(".sub-product").forEach( /*#__PURE__*/function () {
                      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(el) {
                        var productId, productVariantOptions, form, _iterator, _step, pair;
                        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                          while (1) switch (_context9.prev = _context9.next) {
                            case 0:
                              productId = parseInt(el.dataset.productId);
                              productVariantOptions = [];
                              form = new FormData(el);
                              for (_iterator = _createForOfIteratorHelperLoose(form.entries()); !(_step = _iterator()).done;) {
                                pair = _step.value;
                                productVariantOptions.push({
                                  optionId: parseInt(pair[0].split("[")[1].split("]")[0]),
                                  optionValue: pair[1]
                                }); // Stripping non int stuff
                              }

                              productsArr.push({
                                productId: productId,
                                productVariantOptions: productVariantOptions
                              });
                            case 5:
                            case "end":
                              return _context9.stop();
                          }
                        }, _callee9);
                      }));
                      return function (_x12) {
                        return _ref4.apply(this, arguments);
                      };
                    }());

                    // Update glbal qty var
                    qty = parseInt(document.querySelector(".form-input--incrementTotal").value);

                    // Begin - Check if pack already exists
                    arr1 = [];
                    arr2 = [];
                    productsArr.forEach(function (el) {
                      return arr1.push(el.productId);
                    });
                    (_cart$ = cart[0]) == null ? void 0 : _cart$.lineItems.physicalItems.forEach(function (el) {
                      return arr2.push(el.productId);
                    });
                    hasAllIitems = arr1.every(function (el) {
                      return arr2.includes(el);
                    }); // if (hasAllIitems) {
                    //     showAlertModal("Due to technical limitations you can only add one pack in the cart at once for now.");
                    //     cartBtn.removeAttribute("disabled");
                    //     cartBtn.innerHTML = originalBtnValue;
                    //     return;
                    // }
                    // End - Check if pack already exists
                    if (!cart.length) {
                      _context10.next = 26;
                      break;
                    }
                    _context10.next = 23;
                    return addProductArrToCart(productsArr, cart[0].id);
                  case 23:
                    _context10.t0 = _context10.sent;
                    _context10.next = 29;
                    break;
                  case 26:
                    _context10.next = 28;
                    return createCart(productsArr);
                  case 28:
                    _context10.t0 = _context10.sent;
                  case 29:
                    res = _context10.t0;
                    cartBtn.removeAttribute("disabled");
                    cartBtn.innerHTML = originalBtnValue;
                    return _context10.abrupt("return", res);
                  case 33:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return _addAllProductsToCart.apply(this, arguments);
          };
          addAllProductsToCart = function _addAllProductsToCart2() {
            return _addAllProductsToCart.apply(this, arguments);
          };
          _handleProductOptionChange = function _handleProductOptionC2() {
            _handleProductOptionChange = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(e) {
              var productForm, productId, res, objIndex;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    productForm = e.target.closest(".sub-product");
                    productId = productForm.dataset.productId;
                    _context8.next = 4;
                    return getProductVariant(productId, new URLSearchParams(new FormData(productForm)).toString());
                  case 4:
                    res = _context8.sent;
                    updateProductPriceArr(productId, res.data.price.with_tax.value);

                    /**
                     * Add stock level for each variant. Please make sure show stock is enabled in backend of bc.
                     */
                    if (res.data.stock) {
                      _context8.next = 8;
                      break;
                    }
                    return _context8.abrupt("return");
                  case 8:
                    objIndex = stockArr.findIndex(function (obj) {
                      return obj.productId == productId;
                    });
                    if (objIndex === -1) {
                      stockArr.push({
                        productId: productId,
                        stock: res.data.stock
                      });
                    } else {
                      stockArr[objIndex].stock = res.data.stock;
                    }
                    setMaxQtyLimit();
                  case 11:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return _handleProductOptionChange.apply(this, arguments);
          };
          handleProductOptionChange = function _handleProductOptionC(_x9) {
            return _handleProductOptionChange.apply(this, arguments);
          };
          updateProductPriceArr = function _updateProductPriceAr(productId, price) {
            var objIndex = priceArr.findIndex(function (obj) {
              return obj.productId == productId;
            });
            if (objIndex === -1) {
              priceArr.push({
                productId: productId,
                price: price
              });
            } else {
              priceArr[objIndex] = {
                productId: productId,
                price: price
              };
            }

            // Now we set the price.
            var totalPrice = 0;
            priceArr.forEach(function (el) {
              totalPrice += parseFloat(el.price);
            });

            // Finally display price
            setProductPrice(totalPrice, discountRate);
          };
          setProductPrice = function _setProductPrice(totalPrice, discountRate) {
            var discountedPrice = (totalPrice - discountRate / 100 * totalPrice).toFixed(2);
            if (discountRate !== 0) {
              priceContainer.innerHTML = "<div class=\"price-section price-section--withTax non-sale-price--withTax\">\n            <span data-product-non-sale-price-with-tax=\"\" class=\"price price--non-sale\">\n                $" + totalPrice.toFixed(2) + "\n            </span>\n            </div>\n            <div class=\"price-section price-section--withTax\">\n                <span data-product-price-with-tax=\"\" class=\"price price--withTax price--sale\">$" + discountedPrice + "</span> \n            </div>";
            } else {
              priceContainer.innerHTML = "<div class=\"price-section price-section--withTax\">\n            <span data-product-price-with-tax=\"\" class=\"price price--withTax \">$" + totalPrice.toFixed(2) + "</span>\n        </div>";
            }
          };
          _createCart = function _createCart3() {
            _createCart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(productArr) {
              var form, finalRes, result1;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    form = new FormData();
                    form.append("product_id", productArr[0].productId);
                    form.append("action", "add");
                    form.append("qty[]", qty);
                    productArr[0].productVariantOptions.forEach(function (option) {
                      form.append("attribute[" + option.optionId + "]", option.optionValue);
                    });
                    result1 = new Promise(function (resolve, reject) {
                      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(Object(_common_utils_api__WEBPACK_IMPORTED_MODULE_2__["normalizeFormData"])(form), function (err, response) {
                        var errorMessage = err || response.data.error;
                        if (errorMessage) {
                          reject(errorMessage);
                        }
                        if (response) {
                          console.log("Cart Created");
                          resolve(response);
                        }
                      });
                    });
                    _context7.next = 8;
                    return result1.then( /*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(res) {
                        var productArr2, i, result2;
                        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                          while (1) switch (_context6.prev = _context6.next) {
                            case 0:
                              if (!(productArr.length > 1)) {
                                _context6.next = 9;
                                break;
                              }
                              productArr2 = [];
                              for (i = 1; i < productArr.length; i++) {
                                productArr2.push(productArr[i]);
                              }
                              _context6.next = 5;
                              return addProductArrToCart(productArr2, res.data.cart_id);
                            case 5:
                              result2 = _context6.sent;
                              finalRes = result2;
                              _context6.next = 10;
                              break;
                            case 9:
                              finalRes = result1;
                            case 10:
                            case "end":
                              return _context6.stop();
                          }
                        }, _callee6);
                      }));
                      return function (_x11) {
                        return _ref3.apply(this, arguments);
                      };
                    }());
                  case 8:
                    return _context7.abrupt("return", finalRes);
                  case 9:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return _createCart.apply(this, arguments);
          };
          createCart = function _createCart2(_x8) {
            return _createCart.apply(this, arguments);
          };
          _addProductArrToCart = function _addProductArrToCart3() {
            _addProductArrToCart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(productArr, cartId) {
              var lineItemArr, i;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    lineItemArr = {
                      lineItems: []
                    };
                    for (i = 0; i < productArr.length; i++) {
                      lineItemArr.lineItems.push({
                        quantity: qty,
                        productId: productArr[i].productId,
                        optionSelections: productArr[i].productVariantOptions
                      });
                    }
                    return _context5.abrupt("return", new Promise(function (resolve, reject) {
                      fetch("/api/storefront/carts/" + cartId + "/items", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify(lineItemArr)
                      }).then(function (response) {
                        if (response.status === 200) {
                          resolve(response);
                          var evt = new Event("openMcDrawer");
                          document.dispatchEvent(evt);
                          return response.json();
                        } else {
                          reject(response);
                          return response;
                        }
                      }).then(function (data) {
                        return data;
                      })["catch"](function (err) {
                        console.log(err);
                      });
                    }));
                  case 3:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return _addProductArrToCart.apply(this, arguments);
          };
          addProductArrToCart = function _addProductArrToCart2(_x6, _x7) {
            return _addProductArrToCart.apply(this, arguments);
          };
          _getProductOptionsFromPage = function _getProductOptionsFro2() {
            _getProductOptionsFromPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(productId) {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", new Promise(function (resolve, reject) {
                      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(productId, {
                        template: {
                          html: "goose/product/product-options",
                          json: "goose/json-this"
                        }
                      }, function (err, response) {
                        if (err) {
                          console.log(err);
                          reject(err);
                          return;
                        }
                        resolve(response);
                      });
                    }));
                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return _getProductOptionsFromPage.apply(this, arguments);
          };
          getProductOptionsFromPage = function _getProductOptionsFro(_x5) {
            return _getProductOptionsFromPage.apply(this, arguments);
          };
          _getProductVariant = function _getProductVariant3() {
            _getProductVariant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(productId, productVariantOptions, scope) {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", new Promise(function (resolve, reject) {
                      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.productAttributes.optionChange(productId, productVariantOptions, "goose/json-this", function (err, response) {
                        if (err) {
                          console.log(err);
                          reject(err);
                          return;
                        }
                        if (scope) {
                          gUpdateProductAttributes(response.data, scope);
                        }
                        // const scope = ;
                        resolve(response);
                      });
                    }));
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return _getProductVariant.apply(this, arguments);
          };
          getProductVariant = function _getProductVariant2(_x2, _x3, _x4) {
            return _getProductVariant.apply(this, arguments);
          };
          setMaxQtyLimit = function _setMaxQtyLimit() {
            var qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");
            var addToCartNoticeBox = document.querySelector("#add-to-cart-wrapper .productAttributes-message");
            var addToCartNotice = addToCartNoticeBox.querySelector(".alertBox-message");
            var qtyArr = stockArr.map(function (item) {
              return parseInt(item.stock);
            });
            var minQty = Math.min.apply(Math, qtyArr);
            qtyBox.dataset.packQtyMax = minQty;

            // Check if value higher than max, bring it down
            var currentValue = qtyBox.value;
            if (currentValue > minQty) {
              qtyBox.value = minQty;
            }
            addToCartNoticeBox.style.display = 'block';
            addToCartNotice.innerHTML = "Max product quantity for this combination is " + minQty;
          };
          _getCart = function _getCart3() {
            _getCart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              var result;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    result = fetch("/api/storefront/carts?include=lineItems.physicalItems.options").then(function (response) {
                      return response.status == 200 ? response.json() : response;
                    }).then(function (data) {
                      return data;
                    })["catch"](function (err) {
                      return console.log(err);
                    });
                    return _context2.abrupt("return", result);
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _getCart.apply(this, arguments);
          };
          getCart = function _getCart2() {
            return _getCart.apply(this, arguments);
          };
          priceContainer = document.querySelector(".product-view__price");
          priceArr = [];
          discountRate = 0;
          qty = 1;
          stockArr = [];
          /**
           * Return current cart data
           */
          /**
           * Set qty limit
           */
          /**
           * Get product variant details based on chosen options.
           * @param {*} productId
           * @param {*} productVariantOptions
           */
          /**
           *
           * @param {*} productId
           */
          /**
           *
           * @param {*} productArr
           * @param {*} cartId
           * @returns
           */
          /**
           *
           * @param {*} lineItem
           * @returns
           */
          /**
           * Set innerhtml price value and discounted value. Pass discount rate as 0 if no discount.
           * @param {*} totalPrice
           * @param {*} discountRate
           */
          /**
           * Update global array of product prices.
           * @param {*} productId
           * @param {*} price
           */
          /**
           * Handle change of product options
           * @param {*} e
           */
          /**
           * Add all products of pack product to cart, based on dropdown selections.
           * @returns
           */
          // Ininitalization.
          init();
        case 25:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _ref.apply(this, arguments);
}

/***/ }),

/***/ "./assets/js/theme/goose/g-size-chart.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/goose/g-size-chart.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goose_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../goose/utils */ "./assets/js/theme/goose/utils/index.js");
/* harmony import */ var _goose_g_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../goose/g-accordion */ "./assets/js/theme/goose/g-accordion.js");


var gGetPage = _goose_utils__WEBPACK_IMPORTED_MODULE_0__["default"].stencil.gGetPage;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var sizeChartContainer = document.querySelector(".js-size-chart-container");
  var sizeChart = document.querySelector("[data-size-chart]");
  if (!sizeChartContainer || !sizeChart) return;
  var sizeChartValue = sizeChart.dataset.sizeChart;
  if (!sizeChartValue) return;
  fetch("https://store-ydx5derqj4.mybigcommerce.com/content/size-charts/size-chart-" + sizeChartValue + ".html").then(function (response) {
    if (response.status === 404) {
      throw new Error("Size chart file not found. Please check the size chart name.");
    }
    return response.text();
  }).then(function (html) {
    sizeChartContainer.insertAdjacentHTML("afterbegin", html);
  })["catch"](function (err) {
    console.warn("Something went wrong.", err);
  });
});

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _goose_g_pack_product__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./goose/g-pack-product */ "./assets/js/theme/goose/g-pack-product.js");
/* harmony import */ var _goose_g_size_chart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./goose/g-size-chart */ "./assets/js/theme/goose/g-size-chart.js");
/* harmony import */ var _goose_g_customise_shirt__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./goose/g-customise-shirt */ "./assets/js/theme/goose/g-customise-shirt.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*
 Import all product specific js
 */










var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])("#modal-review-form")[0];
    return _this;
  }
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on("close.fndtn.reveal", function () {
      if (_this2.url.indexOf("#write_review") !== -1 && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($(".product-view"), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_goose_g_pack_product__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context);
    Object(_goose_g_size_chart__WEBPACK_IMPORTED_MODULE_8__["default"])();
    Object(_goose_g_customise_shirt__WEBPACK_IMPORTED_MODULE_9__["default"])(this.context.product);
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])(".writeReview-form");
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    $("body").on("click", '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on("submit", function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll("valid");
      }
      return false;
    });
    this.productReviewHandler();
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find("[data-input]").each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr("name") + "-msg";
      $input.siblings("span").attr("id", msgSpanId);
      $input.attr("aria-describedby", msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf("#write_review") !== -1) {
      this.$reviewLink.trigger("click");
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf("#bulk_pricing") !== -1) {
      this.$bulkPricingLink.trigger("click");
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZ29vc2UvZy1jdXN0b21pc2Utc2hpcnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2dvb3NlL2ctcGFjay1wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nb29zZS9nLXNpemUtY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJuYW1lcyI6WyJwcm9kdWN0IiwidmFsaWRhdGVJbnB1dCIsImlucHV0IiwiaW5wdXRMZW5ndGgiLCJ2YWx1ZSIsInRvU3RyaW5nIiwibGVuZ3RoIiwiYWxlcnQiLCJzbGljZSIsImhhbmRsZU1vZGlmZXJTZWxlY3Rpb24iLCJzaGlydE51bWJlclR5cGVPcHRpb25WYWx1ZXMiLCJtb2RpZmVyVGFyZ2V0S2V5Iiwic2hpcnROdW1iZXJUeXBlT3B0aW9uSW5wdXRzIiwiY2hlY2tlZCIsImJsdXIiLCJmb2N1cyIsInNpbmdsZURpZ2l0S2V5IiwiZG91YmxlRGlnaXRLZXkiLCJ1bmRlZmluZWQiLCJmb3JFYWNoIiwibGFiZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsImlucHV0SGFuZGxlciIsImV2ZW50IiwidGFyZ2V0IiwiaW5wdXRMYWJlbHMiLCJsYWJlbHMiLCJpbnB1dFRhcmdldCIsIkFycmF5IiwiZnJvbSIsImZpbHRlciIsImRhdGFzZXQiLCJpbnB1dEtleSIsImluaXQiLCJzaGlydE51bWJlclR5cGVPcHRpb25EYXRhIiwib3B0aW9ucyIsIm9wdGlvbiIsImRpc3BsYXlfbmFtZSIsInByaWNlUnVsZU1vZGlmaWVyc0tleSIsInZhbHVlcyIsInNoaXJ0TnVtYmVyVHlwZU9wdGlvbkVsIiwicXVlcnlTZWxlY3RvckFsbCIsInNoaXJ0TnVtYmVyRm9ybUZpZWxkIiwic2V0QXR0cmlidXRlIiwic2hpcnROdW1iZXJGb3JtRmllbGRJbnB1dCIsImZvcm1GaWVsZFdyYXAiLCJjcmVhdGVFbGVtZW50IiwiZm9ybUZlaWxkSHRtbCIsImluc2VydEFkamFjZW50SFRNTCIsImNsYXNzTGlzdCIsImFkZCIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZXhwb3J0cyIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsImRlc2MiLCIkU3ltYm9sIiwiU3ltYm9sIiwiaXRlcmF0b3JTeW1ib2wiLCJpdGVyYXRvciIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImVyciIsIndyYXAiLCJpbm5lckZuIiwib3V0ZXJGbiIsInNlbGYiLCJ0cnlMb2NzTGlzdCIsInByb3RvR2VuZXJhdG9yIiwiR2VuZXJhdG9yIiwiZ2VuZXJhdG9yIiwiY3JlYXRlIiwiY29udGV4dCIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJmbiIsImFyZyIsInR5cGUiLCJjYWxsIiwiQ29udGludWVTZW50aW5lbCIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJJdGVyYXRvclByb3RvdHlwZSIsImdldFByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJOYXRpdmVJdGVyYXRvclByb3RvdHlwZSIsIkdwIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwibWV0aG9kIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJQcm9taXNlSW1wbCIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJfX2F3YWl0IiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJkb25lIiwibWV0aG9kTmFtZSIsIlR5cGVFcnJvciIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsImkiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJpdGVyIiwia2V5cyIsInZhbCIsIm9iamVjdCIsInJldmVyc2UiLCJwb3AiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInN0b3AiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsIl9uZXh0IiwiX3Rocm93IiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmdzIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJnVXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJnVXRpbHMiLCJfeCIsIl9yZWYiLCJfY2FsbGVlMTEiLCJwcmljZUNvbnRhaW5lciIsInByaWNlQXJyIiwiZGlzY291bnRSYXRlIiwicXR5Iiwic3RvY2tBcnIiLCJnZXRDYXJ0IiwiX2dldENhcnQiLCJzZXRNYXhRdHlMaW1pdCIsImdldFByb2R1Y3RWYXJpYW50IiwiX2dldFByb2R1Y3RWYXJpYW50IiwiZ2V0UHJvZHVjdE9wdGlvbnNGcm9tUGFnZSIsIl9nZXRQcm9kdWN0T3B0aW9uc0Zyb21QYWdlIiwiYWRkUHJvZHVjdEFyclRvQ2FydCIsIl9hZGRQcm9kdWN0QXJyVG9DYXJ0IiwiY3JlYXRlQ2FydCIsIl9jcmVhdGVDYXJ0Iiwic2V0UHJvZHVjdFByaWNlIiwidXBkYXRlUHJvZHVjdFByaWNlQXJyIiwiaGFuZGxlUHJvZHVjdE9wdGlvbkNoYW5nZSIsIl9oYW5kbGVQcm9kdWN0T3B0aW9uQ2hhbmdlIiwiYWRkQWxsUHJvZHVjdHNUb0NhcnQiLCJfYWRkQWxsUHJvZHVjdHNUb0NhcnQiLCJnZXRQYWNrUHJvZHVjdHMiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsIl9pbml0IiwiX2dldFBhY2tQcm9kdWN0cyIsImN1c3RvbUZpZWxkcyIsImN1c3RvbV9maWVsZHMiLCJwYWNrRmllbGRzIiwiZmllbGQiLCJwYXJzZUludCIsInByb21pc2VBcnIiLCJwYWNrUHJvZHVjdHMiLCJwYWNrUHJvZHVjdElkcyIsInNwbGl0IiwiYWxsIiwicmVzIiwib3B0aW9uc0NvbnRhaW5lciIsInBhY2tQcm9kdWN0c0Jsb2NrIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwicHJvZHVjdElkIiwiSlNPTiIsInBhcnNlIiwianNvbiIsInByaWNlIiwid2l0aF90YXgiLCJodG1sIiwic2NvcGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJGb3JtRGF0YSIsIm91dGVySFRNTCIsImdDdXN0b21pc2VTaGlydCIsImdldEVsZW1lbnRCeUlkIiwiX3JlZjIiLCJfY2FsbGVlIiwiZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2ZW50RGVmYXVsdCIsIl94MTAiLCJxdHlBcnIiLCJtYXAiLCJpdGVtIiwic3RvY2siLCJtaW5RdHkiLCJNYXRoIiwibWluIiwiY2xvc2VzdCIsImluY0J0biIsInF0eUJveCIsInJlbW92ZUF0dHJpYnV0ZSIsIl9hZGRBbGxQcm9kdWN0c1RvQ2FydDMiLCJfY2FsbGVlMTAiLCJfY2FydCQiLCJjYXJ0QnRuIiwib3JpZ2luYWxCdG5WYWx1ZSIsIndhaXRNZXNzYWdlIiwiY2FydCIsInByb2R1Y3RzQXJyIiwidmFsaWRpdHlBcnIiLCJhcnIxIiwiYXJyMiIsImhhc0FsbElpdGVtcyIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwiY29uc29sZSIsImxvZyIsImVsIiwicmVwb3J0VmFsaWRpdHkiLCJpbmNsdWRlcyIsImlubmVySFRNTCIsIl9yZWY0IiwiX2NhbGxlZTkiLCJwcm9kdWN0VmFyaWFudE9wdGlvbnMiLCJmb3JtIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJwYWlyIiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSIsImVudHJpZXMiLCJvcHRpb25JZCIsIm9wdGlvblZhbHVlIiwiX3gxMiIsImxpbmVJdGVtcyIsInBoeXNpY2FsSXRlbXMiLCJldmVyeSIsInQwIiwiX2FkZEFsbFByb2R1Y3RzVG9DYXJ0MiIsIl9oYW5kbGVQcm9kdWN0T3B0aW9uQzIiLCJfY2FsbGVlOCIsInByb2R1Y3RGb3JtIiwib2JqSW5kZXgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJkYXRhIiwiZmluZEluZGV4IiwiX2hhbmRsZVByb2R1Y3RPcHRpb25DIiwiX3g5IiwiX3VwZGF0ZVByb2R1Y3RQcmljZUFyIiwidG90YWxQcmljZSIsInBhcnNlRmxvYXQiLCJfc2V0UHJvZHVjdFByaWNlIiwiZGlzY291bnRlZFByaWNlIiwidG9GaXhlZCIsIl9jcmVhdGVDYXJ0MyIsIl9jYWxsZWU3IiwicHJvZHVjdEFyciIsImZpbmFsUmVzIiwicmVzdWx0MSIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImFwcGVuZCIsIlN0ZW5jaWxVdGlscyIsImFwaSIsIml0ZW1BZGQiLCJub3JtYWxpemVGb3JtRGF0YSIsInJlc3BvbnNlIiwiZXJyb3JNZXNzYWdlIiwiX3JlZjMiLCJfY2FsbGVlNiIsInByb2R1Y3RBcnIyIiwicmVzdWx0MiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImNhcnRfaWQiLCJfeDExIiwiX2NyZWF0ZUNhcnQyIiwiX3g4IiwiX2FkZFByb2R1Y3RBcnJUb0NhcnQzIiwiX2NhbGxlZTUiLCJjYXJ0SWQiLCJsaW5lSXRlbUFyciIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInF1YW50aXR5Iiwib3B0aW9uU2VsZWN0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsImJvZHkiLCJzdHJpbmdpZnkiLCJzdGF0dXMiLCJldnQiLCJFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJfYWRkUHJvZHVjdEFyclRvQ2FydDIiLCJfeDYiLCJfeDciLCJfZ2V0UHJvZHVjdE9wdGlvbnNGcm8yIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJnZXRCeUlkIiwidGVtcGxhdGUiLCJfZ2V0UHJvZHVjdE9wdGlvbnNGcm8iLCJfeDUiLCJfZ2V0UHJvZHVjdFZhcmlhbnQzIiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJwcm9kdWN0QXR0cmlidXRlcyIsIm9wdGlvbkNoYW5nZSIsIl9nZXRQcm9kdWN0VmFyaWFudDIiLCJfeDIiLCJfeDMiLCJfeDQiLCJfc2V0TWF4UXR5TGltaXQiLCJhZGRUb0NhcnROb3RpY2VCb3giLCJhZGRUb0NhcnROb3RpY2UiLCJwYWNrUXR5TWF4IiwiY3VycmVudFZhbHVlIiwiX2dldENhcnQzIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJfZ2V0Q2FydDIiLCJnR2V0UGFnZSIsInN0ZW5jaWwiLCJzaXplQ2hhcnRDb250YWluZXIiLCJzaXplQ2hhcnQiLCJzaXplQ2hhcnRWYWx1ZSIsInRleHQiLCJ3YXJuIiwiUHJvZHVjdCIsIl9QYWdlTWFuYWdlciIsIl9pbmhlcml0c0xvb3NlIiwiX3RoaXMiLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiQiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJfcHJvdG8iLCJvblJlYWR5IiwiX3RoaXMyIiwib24iLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCJnUGFja1Byb2R1Y3QiLCJnU2l6ZUNoYXJ0IiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiJHJldmlld0Zvcm0iLCJjbGFzc2lmeUZvcm0iLCJyZXZpZXciLCJSZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJwcm9kdWN0UmV2aWV3SGFuZGxlciIsIiRmb3JtIiwiZmluZCIsImVhY2giLCJfIiwiJGlucHV0IiwibXNnU3BhbklkIiwiYXR0ciIsInNpYmxpbmdzIiwidHJpZ2dlciIsIlBhZ2VNYW5hZ2VyIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJiaW5kIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIsImluZGV4IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFlLHlFQUFVQSxPQUFPLEVBQUU7RUFDOUIsU0FBU0MsYUFBYUEsQ0FBQ0MsS0FBSyxFQUFFO0lBQzFCLElBQU1DLFdBQVcsR0FBR0QsS0FBSyxDQUFDRSxLQUFLLENBQUNDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQ0MsTUFBTTtJQUVuRCxJQUFJSCxXQUFXLEdBQUcsQ0FBQyxFQUFFO01BQ2pCSSxLQUFLLENBQUMsc0NBQXNDLENBQUM7SUFDakQ7SUFFQUwsS0FBSyxDQUFDRSxLQUFLLEdBQUdGLEtBQUssQ0FBQ0UsS0FBSyxDQUFDSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVyQyxPQUFPTCxXQUFXO0VBQ3RCO0VBRUEsU0FBU00sc0JBQXNCQSxDQUFDUCxLQUFLLEVBQUVRLDJCQUEyQixFQUFFO0lBQ2hFLElBQUlDLGdCQUFnQjs7SUFFcEI7SUFDQSxJQUFJVCxLQUFLLENBQUNFLEtBQUssS0FBSyxFQUFFLEVBQUU7TUFDcEJRLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDQyxPQUFPLEdBQUcsSUFBSTs7TUFFN0M7TUFDQTtNQUNBWCxLQUFLLENBQUNZLElBQUksQ0FBQyxDQUFDO01BQ1paLEtBQUssQ0FBQ2EsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQyxNQUFNO01BQ0gsSUFBTVosV0FBVyxHQUFHRCxLQUFLLENBQUNFLEtBQUssQ0FBQ0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDQyxNQUFNO01BRW5ELFFBQVFILFdBQVc7UUFDZixLQUFLLENBQUM7VUFDRlEsZ0JBQWdCLEdBQUdLLGNBQWM7VUFDakM7UUFDSixLQUFLLENBQUM7VUFDRkwsZ0JBQWdCLEdBQUdNLGNBQWM7VUFDakM7UUFDSjtVQUNJTixnQkFBZ0IsR0FBR08sU0FBUztNQUNwQztNQUVB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QUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzBDLGNBQWMsQ0FBQ1EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVELENBQUM7RUFBQSxPQUFBZCxZQUFBO0FBQUE7QUFHVSxTQUFTdkIsWUFBWUEsQ0FBQSxFQUFHO0VBQ25DLElBQU1zQyxTQUFTLEdBQUcsZUFBZTtFQUNqQyxJQUFNQyxhQUFhLEdBQUczRCxDQUFDLFlBQVUwRCxTQUFTLE1BQUcsQ0FBQztFQUU5Q0MsYUFBYSxDQUFDeEIsSUFBSSxDQUFDLFVBQUN5QixLQUFLLEVBQUVDLE9BQU8sRUFBSztJQUNuQyxJQUFNQyxHQUFHLEdBQUc5RCxDQUFDLENBQUM2RCxPQUFPLENBQUM7SUFDdEIsSUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUMvSixJQUFJLENBQUMySixTQUFTLENBQUMsWUFBWWYsWUFBWTtJQUVqRSxJQUFJb0IsYUFBYSxFQUFFO01BQ2Y7SUFDSjtJQUVBRCxHQUFHLENBQUMvSixJQUFJLENBQUMySixTQUFTLEVBQUUsSUFBSWYsWUFBWSxDQUFDbUIsR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9kdWN0KSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVJbnB1dChpbnB1dCkge1xuICAgICAgICBjb25zdCBpbnB1dExlbmd0aCA9IGlucHV0LnZhbHVlLnRvU3RyaW5nKDEwKS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGlucHV0TGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2Ugb25seSBlbnRlciB1cCB0byB0d28gbnVtYmVycy5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnNsaWNlKDAsIDIpO1xuXG4gICAgICAgIHJldHVybiBpbnB1dExlbmd0aDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNb2RpZmVyU2VsZWN0aW9uKGlucHV0LCBzaGlydE51bWJlclR5cGVPcHRpb25WYWx1ZXMpIHtcbiAgICAgICAgbGV0IG1vZGlmZXJUYXJnZXRLZXk7XG5cbiAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdGhlIGlucHV0IGlzIGVtcHR5XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgc2hpcnROdW1iZXJUeXBlT3B0aW9uSW5wdXRzWzBdLmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHVuIGZvY3VzIHRoZSBpbnB1dCBpbiBvcmRlciB0byB0cmlnZ2VyIHRoZSBjaGFuZ2UgZXZlbnQsXG4gICAgICAgICAgICAvLyB3aGljaCB0aGVuIHRpZ2dlcnMgdGhlIG9wdGlvbiB1cGRhdGUgZnVuY3Rpb24gZnJvbSBCQ1xuICAgICAgICAgICAgaW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0TGVuZ3RoID0gaW5wdXQudmFsdWUudG9TdHJpbmcoMTApLmxlbmd0aDtcblxuICAgICAgICAgICAgc3dpdGNoIChpbnB1dExlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZlclRhcmdldEtleSA9IHNpbmdsZURpZ2l0S2V5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmZXJUYXJnZXRLZXkgPSBkb3VibGVEaWdpdEtleTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZlclRhcmdldEtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hpcnROdW1iZXJUeXBlT3B0aW9uVmFsdWVzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUsIG1vZGlmZXJUYXJnZXRLZXkpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sYWJlbCA9PSBtb2RpZmVyVGFyZ2V0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt2YWx1ZT1cIiR7dmFsdWUuaWR9XCJdYCkuY2hlY2tlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgbmVlZCB0byB1biBmb2N1cyB0aGUgaW5wdXQgaW4gb3JkZXIgdG8gdHJpZ2dlciB0aGUgY2hhbmdlIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCB0aGVuIHRpZ2dlcnMgdGhlIG9wdGlvbiB1cGRhdGUgZnVuY3Rpb24gZnJvbSBCQ1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnB1dEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBpbnB1dExhYmVscyA9IGlucHV0LmxhYmVscztcbiAgICAgICAgY29uc3QgaW5wdXRUYXJnZXQgPSBBcnJheS5mcm9tKGlucHV0TGFiZWxzKS5maWx0ZXIoKGxhYmVsKSA9PiBsYWJlbC5kYXRhc2V0LmxhYmVsID09PSBpbnB1dEtleSk7XG5cbiAgICAgICAgaWYgKCFpbnB1dFRhcmdldC5sZW5ndGggPiAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaW5wdXRMZW5ndGggPSB2YWxpZGF0ZUlucHV0KGlucHV0KTtcblxuICAgICAgICBoYW5kbGVNb2RpZmVyU2VsZWN0aW9uKGlucHV0LCBzaGlydE51bWJlclR5cGVPcHRpb25WYWx1ZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xuICAgICAgICAvLyBIaWRlIHRoZSBzaGlydCBudW1iZXIgbW9kaWZpZXIgb3B0aW9ucyAodGhlc2UgYXJlIHdoYXQgY29udHJvbHMgdGhlIHByaWNlKVxuICAgICAgICBzaGlydE51bWJlclR5cGVPcHRpb25EYXRhID0gcHJvZHVjdC5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiBvcHRpb24uZGlzcGxheV9uYW1lID09PSBwcmljZVJ1bGVNb2RpZmllcnNLZXkpO1xuXG4gICAgICAgIGlmICghc2hpcnROdW1iZXJUeXBlT3B0aW9uRGF0YS5sZW5ndGggPiAwKSByZXR1cm47XG5cbiAgICAgICAgc2hpcnROdW1iZXJUeXBlT3B0aW9uVmFsdWVzID0gc2hpcnROdW1iZXJUeXBlT3B0aW9uRGF0YVswXS52YWx1ZXM7XG4gICAgICAgIHNoaXJ0TnVtYmVyVHlwZU9wdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtb3B0aW9uLWlkPVwiJHtzaGlydE51bWJlclR5cGVPcHRpb25EYXRhWzBdLmlkfVwiYCk7XG4gICAgICAgIHNoaXJ0TnVtYmVyVHlwZU9wdGlvbklucHV0cyA9IEFycmF5LmZyb20oc2hpcnROdW1iZXJUeXBlT3B0aW9uRWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpKTtcbiAgICAgICAgc2hpcnROdW1iZXJGb3JtRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbnB1dC1uYW1lPVwiJHtpbnB1dEtleX1cImApO1xuXG4gICAgICAgIGlmICghc2hpcnROdW1iZXJGb3JtRmllbGQpIHJldHVybjtcblxuICAgICAgICBpZiAoc2hpcnROdW1iZXJUeXBlT3B0aW9uRWwpIHtcbiAgICAgICAgICAgIHNoaXJ0TnVtYmVyVHlwZU9wdGlvbkVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lO1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLy8vLy8vLy8gRW5oYW5jZSB0aGUgIFNoaXJ0IE51bWJlciBmb3JtIGZpZWxkIC8vLy8vLy8vLy9cblxuICAgICAgICAvLyBDb25maWd1cmUgdGhlIFNoaXJ0IE51bWJlciBpbnB1dFxuICAgICAgICBjb25zdCBzaGlydE51bWJlckZvcm1GaWVsZElucHV0ID0gc2hpcnROdW1iZXJGb3JtRmllbGQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgICAgICBzaGlydE51bWJlckZvcm1GaWVsZElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgc2hpcnROdW1iZXJGb3JtRmllbGRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIkVudGVyIHVwIHRvIHR3byBudW1iZXJzXCIpO1xuICAgICAgICBzaGlydE51bWJlckZvcm1GaWVsZElucHV0LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwid2lkdGg6MTAwJVwiKTtcblxuICAgICAgICAvLyBDb25maWd1cmUgdGhlIFNoaXJ0IE51bWJlciBmb3JtIGZpZWxkXG4gICAgICAgIGNvbnN0IGZvcm1GaWVsZFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBmb3JtRmVpbGRIdG1sID0gYFxuICAgICAgICAgICAgPGg0IGNsYXNzPVwiaGVhZGluZ1wiPlBlcnNvbmFsaXNhdGlvbjwvaDQ+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInRleHRcIj5IYXZlIHlvdXIgZmF2b3VyaXRlIHBsYXllcnMgbnVtYmVyIHRyYW5zZmVycmVkIG9udG8gdGhpcyBmb3IgYW4gPHN0cm9uZz5leHRyYSArJDEwIEFVRDwvc3Ryb25nPiBwZXIgbnVtYmVyLjwvcD5cbiAgICAgICAgYDtcbiAgICAgICAgZm9ybUZpZWxkV3JhcC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGZvcm1GZWlsZEh0bWwpO1xuICAgICAgICBmb3JtRmllbGRXcmFwLmNsYXNzTGlzdC5hZGQoXCJwcm9kdWN0LXZpZXctb3B0aW9uc19fY3VzdG9taXNlXCIpO1xuICAgICAgICBzaGlydE51bWJlckZvcm1GaWVsZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmb3JtRmllbGRXcmFwLCBzaGlydE51bWJlckZvcm1GaWVsZCk7XG4gICAgICAgIGZvcm1GaWVsZFdyYXAuYXBwZW5kQ2hpbGQoc2hpcnROdW1iZXJGb3JtRmllbGQpO1xuICAgIH1cblxuICAgIC8vLS0tLS0tIEluaXRzIGFuZCBFdmVudCBMaXN0ZW5lcnNcbiAgICBsZXQgc2hpcnROdW1iZXJUeXBlT3B0aW9uRGF0YTtcbiAgICBsZXQgc2hpcnROdW1iZXJUeXBlT3B0aW9uVmFsdWVzO1xuICAgIGxldCBzaGlydE51bWJlclR5cGVPcHRpb25FbDtcbiAgICBsZXQgc2hpcnROdW1iZXJUeXBlT3B0aW9uSW5wdXRzO1xuICAgIGxldCBzaGlydE51bWJlckZvcm1GaWVsZDtcblxuICAgIC8vU2V0dXBcbiAgICAvLyBXZSB1c2UgdGhlIG1vZGlmaWVycyBsYWJlbCB0byB0YXJnZXQgdGhlIGlucHV0XG4gICAgY29uc3QgcHJpY2VSdWxlTW9kaWZpZXJzS2V5ID0gXCJTaGlydCBOdW1iZXIgVHlwZVwiO1xuICAgIGNvbnN0IGlucHV0S2V5ID0gXCJTaGlydCBOdW1iZXJcIjtcbiAgICBjb25zdCBzaW5nbGVEaWdpdEtleSA9IFwiU2luZ2xlIERpZ2l0XCI7XG4gICAgY29uc3QgZG91YmxlRGlnaXRLZXkgPSBcIkRvdWJsZSBEaWdpdFwiO1xuXG4gICAgaW5pdCgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlucHV0SGFuZGxlcihldmVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbn1cbiIsImltcG9ydCBTdGVuY2lsVXRpbHMgZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUZvcm1EYXRhIH0gZnJvbSBcIi4uL2NvbW1vbi91dGlscy9hcGlcIjtcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSBcIi4uL2dsb2JhbC9tb2RhbFwiO1xuaW1wb3J0IGdDdXN0b21pc2VTaGlydCBmcm9tIFwiLi9nLWN1c3RvbWlzZS1zaGlydFwiO1xuaW1wb3J0IGdVdGlscyBmcm9tIFwiLi4vZ29vc2UvdXRpbHNcIjtcblxuY29uc3Qge1xuICAgIHByb2R1Y3Q6IHsgZ1VwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIH0sXG59ID0gZ1V0aWxzO1xuLyoqXG4gKiBBIHBhY2sgcHJvZHVjdCBtdXN0IGNvbnRhaW4gYSBjdXN0b20gZmllbGQgbmFtZWQgcGFja19wcm9kdWN0cywgd2l0aCBhIHZhbHVlIG9mIGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIHByb2R1Y3QgaWQncyBhcyB2YWx1ZVxuICogSWYgdGhlcmUncyBhIGRpc2NvdW50IGZvciB0aGUgcGFjayBhIGN1c3RvbSBmaWVsZCBuYW1lIHBhY2tfZGlzY291bnQgc2hvdWxkIGJlIHNldCBvbiB0aGUgcHJvZHVjdCBhcyB3ZWxsLCB3aXRoIGEgdmFsdWUgb2YgbnVtYmVyIHdoaWNoIHdpbGwgdHJhbnNsYXRlIHRvIHBlcmNlbnRhZ2UgZGlzY291bnQuIGUuZyB2YWx1ZSBvZiA1IHdpbGwgc2V0IDUlIGRpc2NvdW50IG9uIHRoZSBlbnRpcmUgcGFjay5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGNvbnN0IHByaWNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0LXZpZXdfX3ByaWNlXCIpO1xuICAgIGxldCBwcmljZUFyciA9IFtdO1xuICAgIGxldCBkaXNjb3VudFJhdGUgPSAwO1xuICAgIGxldCBxdHkgPSAxO1xuICAgIGNvbnN0IHN0b2NrQXJyID0gW107XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBjdXJyZW50IGNhcnQgZGF0YVxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIGdldENhcnQoKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZldGNoKFwiL2FwaS9zdG9yZWZyb250L2NhcnRzP2luY2x1ZGU9bGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMub3B0aW9uc1wiKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCA/IHJlc3BvbnNlLmpzb24oKSA6IHJlc3BvbnNlKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHF0eSBsaW1pdFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldE1heFF0eUxpbWl0KCkge1xuICAgICAgICBjb25zdCBxdHlCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0taW5jcmVtZW50W2RhdGEtcXVhbnRpdHktY2hhbmdlXSAuZm9ybS1pbnB1dFwiKTtcbiAgICAgICAgY29uc3QgYWRkVG9DYXJ0Tm90aWNlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdG8tY2FydC13cmFwcGVyIC5wcm9kdWN0QXR0cmlidXRlcy1tZXNzYWdlXCIpO1xuICAgICAgICBjb25zdCBhZGRUb0NhcnROb3RpY2UgPSBhZGRUb0NhcnROb3RpY2VCb3gucXVlcnlTZWxlY3RvcihcIi5hbGVydEJveC1tZXNzYWdlXCIpO1xuICAgICAgICBjb25zdCBxdHlBcnIgPSBzdG9ja0Fyci5tYXAoaXRlbSA9PiBwYXJzZUludChpdGVtLnN0b2NrKSk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IE1hdGgubWluKC4uLnF0eUFycik7XG5cbiAgICAgICAgcXR5Qm94LmRhdGFzZXQucGFja1F0eU1heCA9IG1pblF0eTtcblxuICAgICAgICAvLyBDaGVjayBpZiB2YWx1ZSBoaWdoZXIgdGhhbiBtYXgsIGJyaW5nIGl0IGRvd25cbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gcXR5Qm94LnZhbHVlO1xuXG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPiBtaW5RdHkpIHtcbiAgICAgICAgICAgIHF0eUJveC52YWx1ZSA9IG1pblF0eTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb0NhcnROb3RpY2VCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGFkZFRvQ2FydE5vdGljZS5pbm5lckhUTUwgPSBgTWF4IHByb2R1Y3QgcXVhbnRpdHkgZm9yIHRoaXMgY29tYmluYXRpb24gaXMgJHttaW5RdHl9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgcHJvZHVjdCB2YXJpYW50IGRldGFpbHMgYmFzZWQgb24gY2hvc2VuIG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHsqfSBwcm9kdWN0SWRcbiAgICAgKiBAcGFyYW0geyp9IHByb2R1Y3RWYXJpYW50T3B0aW9uc1xuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RWYXJpYW50KHByb2R1Y3RJZCwgcHJvZHVjdFZhcmlhbnRPcHRpb25zLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgU3RlbmNpbFV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCBwcm9kdWN0VmFyaWFudE9wdGlvbnMsIFwiZ29vc2UvanNvbi10aGlzXCIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBnVXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocmVzcG9uc2UuZGF0YSwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zdCBzY29wZSA9IDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gcHJvZHVjdElkXG4gICAgICovXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZHVjdE9wdGlvbnNGcm9tUGFnZShwcm9kdWN0SWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIFN0ZW5jaWxVdGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB7IGh0bWw6IFwiZ29vc2UvcHJvZHVjdC9wcm9kdWN0LW9wdGlvbnNcIiwganNvbjogXCJnb29zZS9qc29uLXRoaXNcIiB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHByb2R1Y3RBcnJcbiAgICAgKiBAcGFyYW0geyp9IGNhcnRJZFxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkUHJvZHVjdEFyclRvQ2FydChwcm9kdWN0QXJyLCBjYXJ0SWQpIHtcbiAgICAgICAgY29uc3QgbGluZUl0ZW1BcnIgPSB7XG4gICAgICAgICAgICBsaW5lSXRlbXM6IFtdLFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjdEFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGluZUl0ZW1BcnIubGluZUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHF1YW50aXR5OiBxdHksXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0QXJyW2ldLnByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICBvcHRpb25TZWxlY3Rpb25zOiBwcm9kdWN0QXJyW2ldLnByb2R1Y3RWYXJpYW50T3B0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGZldGNoKGAvYXBpL3N0b3JlZnJvbnQvY2FydHMvJHtjYXJ0SWR9L2l0ZW1zYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShsaW5lSXRlbUFyciksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IEV2ZW50KFwib3Blbk1jRHJhd2VyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IGxpbmVJdGVtXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBjcmVhdGVDYXJ0KHByb2R1Y3RBcnIpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBsZXQgZmluYWxSZXM7XG4gICAgICAgIGZvcm0uYXBwZW5kKFwicHJvZHVjdF9pZFwiLCBwcm9kdWN0QXJyWzBdLnByb2R1Y3RJZCk7XG4gICAgICAgIGZvcm0uYXBwZW5kKFwiYWN0aW9uXCIsIFwiYWRkXCIpO1xuICAgICAgICBmb3JtLmFwcGVuZChcInF0eVtdXCIsIHF0eSk7XG5cbiAgICAgICAgcHJvZHVjdEFyclswXS5wcm9kdWN0VmFyaWFudE9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZChgYXR0cmlidXRlWyR7b3B0aW9uLm9wdGlvbklkfV1gLCBvcHRpb24ub3B0aW9uVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXN1bHQxID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgU3RlbmNpbFV0aWxzLmFwaS5jYXJ0Lml0ZW1BZGQobm9ybWFsaXplRm9ybURhdGEoZm9ybSksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3I7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhcnQgQ3JlYXRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHJlc3VsdDEudGhlbihhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvZHVjdEFyci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdEFycjIgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHByb2R1Y3RBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEFycjIucHVzaChwcm9kdWN0QXJyW2ldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQyID0gYXdhaXQgYWRkUHJvZHVjdEFyclRvQ2FydChwcm9kdWN0QXJyMiwgcmVzLmRhdGEuY2FydF9pZCk7XG5cbiAgICAgICAgICAgICAgICBmaW5hbFJlcyA9IHJlc3VsdDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzID0gcmVzdWx0MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpbmFsUmVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBpbm5lcmh0bWwgcHJpY2UgdmFsdWUgYW5kIGRpc2NvdW50ZWQgdmFsdWUuIFBhc3MgZGlzY291bnQgcmF0ZSBhcyAwIGlmIG5vIGRpc2NvdW50LlxuICAgICAqIEBwYXJhbSB7Kn0gdG90YWxQcmljZVxuICAgICAqIEBwYXJhbSB7Kn0gZGlzY291bnRSYXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0UHJvZHVjdFByaWNlKHRvdGFsUHJpY2UsIGRpc2NvdW50UmF0ZSkge1xuICAgICAgICBjb25zdCBkaXNjb3VudGVkUHJpY2UgPSAodG90YWxQcmljZSAtIChkaXNjb3VudFJhdGUgLyAxMDApICogdG90YWxQcmljZSkudG9GaXhlZCgyKTtcblxuICAgICAgICBpZiAoZGlzY291bnRSYXRlICE9PSAwKSB7XG4gICAgICAgICAgICBwcmljZUNvbnRhaW5lci5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aFRheCBub24tc2FsZS1wcmljZS0td2l0aFRheFwiPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGgtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0tbm9uLXNhbGVcIj5cbiAgICAgICAgICAgICAgICAkJHt0b3RhbFByaWNlLnRvRml4ZWQoMil9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhUYXhcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS13aXRoVGF4IHByaWNlLS1zYWxlXCI+JCR7ZGlzY291bnRlZFByaWNlfTwvc3Bhbj4gXG4gICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJpY2VDb250YWluZXIuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhUYXhcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1wcmljZS13aXRoLXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLXdpdGhUYXggXCI+JCR7dG90YWxQcmljZS50b0ZpeGVkKDIpfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBnbG9iYWwgYXJyYXkgb2YgcHJvZHVjdCBwcmljZXMuXG4gICAgICogQHBhcmFtIHsqfSBwcm9kdWN0SWRcbiAgICAgKiBAcGFyYW0geyp9IHByaWNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJvZHVjdFByaWNlQXJyKHByb2R1Y3RJZCwgcHJpY2UpIHtcbiAgICAgICAgY29uc3Qgb2JqSW5kZXggPSBwcmljZUFyci5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnByb2R1Y3RJZCA9PSBwcm9kdWN0SWQpO1xuXG4gICAgICAgIGlmIChvYmpJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHByaWNlQXJyLnB1c2goeyBwcm9kdWN0SWQsIHByaWNlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJpY2VBcnJbb2JqSW5kZXhdID0geyBwcm9kdWN0SWQsIHByaWNlIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3cgd2Ugc2V0IHRoZSBwcmljZS5cbiAgICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuICAgICAgICBwcmljZUFyci5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgdG90YWxQcmljZSArPSBwYXJzZUZsb2F0KGVsLnByaWNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRmluYWxseSBkaXNwbGF5IHByaWNlXG4gICAgICAgIHNldFByb2R1Y3RQcmljZSh0b3RhbFByaWNlLCBkaXNjb3VudFJhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjaGFuZ2Ugb2YgcHJvZHVjdCBvcHRpb25zXG4gICAgICogQHBhcmFtIHsqfSBlXG4gICAgICovXG4gICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlUHJvZHVjdE9wdGlvbkNoYW5nZShlKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RGb3JtID0gZS50YXJnZXQuY2xvc2VzdChcIi5zdWItcHJvZHVjdFwiKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gcHJvZHVjdEZvcm0uZGF0YXNldC5wcm9kdWN0SWQ7XG5cbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0UHJvZHVjdFZhcmlhbnQocHJvZHVjdElkLCBuZXcgVVJMU2VhcmNoUGFyYW1zKG5ldyBGb3JtRGF0YShwcm9kdWN0Rm9ybSkpLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIHVwZGF0ZVByb2R1Y3RQcmljZUFycihwcm9kdWN0SWQsIHJlcy5kYXRhLnByaWNlLndpdGhfdGF4LnZhbHVlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIHN0b2NrIGxldmVsIGZvciBlYWNoIHZhcmlhbnQuIFBsZWFzZSBtYWtlIHN1cmUgc2hvdyBzdG9jayBpcyBlbmFibGVkIGluIGJhY2tlbmQgb2YgYmMuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXJlcy5kYXRhLnN0b2NrKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb2JqSW5kZXggPSBzdG9ja0Fyci5maW5kSW5kZXgoKG9iaiA9PiBvYmoucHJvZHVjdElkID09IHByb2R1Y3RJZCkpXG5cbiAgICAgICAgaWYgKG9iakluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgc3RvY2tBcnIucHVzaCh7cHJvZHVjdElkLCBzdG9jazogcmVzLmRhdGEuc3RvY2t9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIHN0b2NrQXJyW29iakluZGV4XS5zdG9jayA9IHJlcy5kYXRhLnN0b2NrXG4gICAgICAgIH1cblxuICAgICAgICBzZXRNYXhRdHlMaW1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbGwgcHJvZHVjdHMgb2YgcGFjayBwcm9kdWN0IHRvIGNhcnQsIGJhc2VkIG9uIGRyb3Bkb3duIHNlbGVjdGlvbnMuXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBhZGRBbGxQcm9kdWN0c1RvQ2FydCgpIHtcbiAgICAgICAgY29uc3QgY2FydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRvLWNhcnQtcGFja1wiKTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxCdG5WYWx1ZSA9IGNhcnRCdG4uZGF0YXNldC52YWx1ZTtcbiAgICAgICAgY29uc3Qgd2FpdE1lc3NhZ2UgPSBjYXJ0QnRuLmRhdGFzZXQud2FpdE1lc3NhZ2U7XG5cbiAgICAgICAgY29uc3QgY2FydCA9IGF3YWl0IGdldENhcnQoKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOlwiLCBlcnIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwcm9kdWN0c0FyciA9IFtdO1xuICAgICAgICBjb25zdCB2YWxpZGl0eUFyciA9IFtdO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3ViLXByb2R1Y3RcIikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIHZhbGlkaXR5QXJyLnB1c2goZWwucmVwb3J0VmFsaWRpdHkoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh2YWxpZGl0eUFyci5pbmNsdWRlcyhmYWxzZSkpIHJldHVybjtcblxuICAgICAgICBjYXJ0QnRuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgY2FydEJ0bi5pbm5lckhUTUwgPSB3YWl0TWVzc2FnZTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1Yi1wcm9kdWN0XCIpLmZvckVhY2goYXN5bmMgKGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSBwYXJzZUludChlbC5kYXRhc2V0LnByb2R1Y3RJZCk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudE9wdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoZWwpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgZm9ybS5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudE9wdGlvbnMucHVzaCh7IG9wdGlvbklkOiBwYXJzZUludChwYWlyWzBdLnNwbGl0KFwiW1wiKVsxXS5zcGxpdChcIl1cIilbMF0pLCBvcHRpb25WYWx1ZTogcGFpclsxXSB9KTsgLy8gU3RyaXBwaW5nIG5vbiBpbnQgc3R1ZmZcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvZHVjdHNBcnIucHVzaCh7IHByb2R1Y3RJZCwgcHJvZHVjdFZhcmlhbnRPcHRpb25zIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVcGRhdGUgZ2xiYWwgcXR5IHZhclxuICAgICAgICBxdHkgPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0taW5wdXQtLWluY3JlbWVudFRvdGFsXCIpLnZhbHVlKTtcblxuICAgICAgICAvLyBCZWdpbiAtIENoZWNrIGlmIHBhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgY29uc3QgYXJyMSA9IFtdO1xuICAgICAgICBjb25zdCBhcnIyID0gW107XG5cbiAgICAgICAgcHJvZHVjdHNBcnIuZm9yRWFjaChlbCA9PiBhcnIxLnB1c2goZWwucHJvZHVjdElkKSk7XG5cbiAgICAgICAgY2FydFswXT8ubGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMuZm9yRWFjaChlbCA9PiBhcnIyLnB1c2goZWwucHJvZHVjdElkKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBoYXNBbGxJaXRlbXMgPSBhcnIxLmV2ZXJ5KGVsID0+IGFycjIuaW5jbHVkZXMoZWwpKTtcblxuICAgICAgICAvLyBpZiAoaGFzQWxsSWl0ZW1zKSB7XG4gICAgICAgIC8vICAgICBzaG93QWxlcnRNb2RhbChcIkR1ZSB0byB0ZWNobmljYWwgbGltaXRhdGlvbnMgeW91IGNhbiBvbmx5IGFkZCBvbmUgcGFjayBpbiB0aGUgY2FydCBhdCBvbmNlIGZvciBub3cuXCIpO1xuICAgICAgICAvLyAgICAgY2FydEJ0bi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgLy8gICAgIGNhcnRCdG4uaW5uZXJIVE1MID0gb3JpZ2luYWxCdG5WYWx1ZTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBFbmQgLSBDaGVjayBpZiBwYWNrIGFscmVhZHkgZXhpc3RzXG4gICAgXG4gICAgICAgIGNvbnN0IHJlcyA9IGNhcnQubGVuZ3RoID8gYXdhaXQgYWRkUHJvZHVjdEFyclRvQ2FydChwcm9kdWN0c0FyciwgY2FydFswXS5pZCkgOiBhd2FpdCBjcmVhdGVDYXJ0KHByb2R1Y3RzQXJyKTtcblxuICAgICAgICBjYXJ0QnRuLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICBjYXJ0QnRuLmlubmVySFRNTCA9IG9yaWdpbmFsQnRuVmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYWNrUHJvZHVjdHMoKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGEgY3VzdG9tIGZpZWxkIGNhbGxlZCBwYWNrX3Byb2R1Y3RzIGV4aXN0c1xuICAgICAgICBjb25zdCBjdXN0b21GaWVsZHMgPSBjb250ZXh0LnByb2R1Y3QuY3VzdG9tX2ZpZWxkcztcbiAgICAgICAgY29uc3QgcGFja0ZpZWxkcyA9IGN1c3RvbUZpZWxkcyA/IGN1c3RvbUZpZWxkcz8uZmlsdGVyKChmaWVsZCkgPT4gZmllbGQubmFtZSA9PSBcInBhY2tfcHJvZHVjdHNcIikgOiBbXTtcblxuICAgICAgICBpZiAocGFja0ZpZWxkcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAvLyBDaGVjayBpZiBkaXNjb3VudCByYXRlIGV4aXN0cyBvbiBwYWNrIHByb2R1Y3QuXG4gICAgICAgIGN1c3RvbUZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpZWxkLm5hbWUgPT09IFwicGFja19kaXNjb3VudFwiKSB7XG4gICAgICAgICAgICAgICAgZGlzY291bnRSYXRlID0gcGFyc2VJbnQoZmllbGQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwcm9taXNlQXJyID0gW107XG4gICAgICAgIGNvbnN0IHBhY2tQcm9kdWN0cyA9IGNvbnRleHQucHJvZHVjdC5jdXN0b21fZmllbGRzLmZpbHRlcigoZmllbGQpID0+IGZpZWxkLm5hbWUgPT0gXCJwYWNrX3Byb2R1Y3RzXCIpO1xuXG4gICAgICAgIGlmIChwYWNrUHJvZHVjdHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcGFja1Byb2R1Y3RJZHMgPSBwYWNrUHJvZHVjdHNbMF0udmFsdWUuc3BsaXQoXCIsXCIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja1Byb2R1Y3RJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb21pc2VBcnIucHVzaChnZXRQcm9kdWN0T3B0aW9uc0Zyb21QYWdlKHBhY2tQcm9kdWN0SWRzW2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlQXJyKS50aGVuKChyZXMpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBwYWNrUHJvZHVjdHNCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZHVjdC12aWV3X19wYWNrUHJvZHVjdFwiKTtcbiAgICAgICAgICAgIG9wdGlvbnNDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcm9kdWN0LW9wdGlvbnMtY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgcGFja1Byb2R1Y3RzQmxvY2suc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0LXZpZXdfX3BhY2tQcm9kdWN0XCIpLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgb3B0aW9uc0NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIC8vIE5vdyB3ZSBwYXJzZSBhbGwgcHJvZHVjdHMgcmVzcG9uc2UgYW5kIGluamVjdCBpbnRvIERPTVxuICAgICAgICAgICAgcmVzLmZvckVhY2goKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSBKU09OLnBhcnNlKHByb2R1Y3QuanNvbikucHJvZHVjdC5pZDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmljZSA9IEpTT04ucGFyc2UocHJvZHVjdC5qc29uKS5wcm9kdWN0LnByaWNlLndpdGhfdGF4LnZhbHVlO1xuIFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZHVjdC1vcHRpb25zLWNvbnRhaW5lclwiKS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgcHJvZHVjdC5odG1sKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zdWItcHJvZHVjdFtkYXRhLXByb2R1Y3QtaWQ9XCIke0pTT04ucGFyc2UocHJvZHVjdC5qc29uKS5wcm9kdWN0LmlkfVwiXWApO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2R1Y3RQcmljZUFycihwcm9kdWN0SWQsIHByaWNlKTtcbiAgICAgICAgICAgICAgICBnZXRQcm9kdWN0VmFyaWFudChwcm9kdWN0SWQsIG5ldyBVUkxTZWFyY2hQYXJhbXMobmV3IEZvcm1EYXRhKHByb2R1Y3QuaHRtbC5vdXRlckhUTUwpKS50b1N0cmluZygpLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgZ0N1c3RvbWlzZVNoaXJ0KEpTT04ucGFyc2UocHJvZHVjdC5qc29uKS5wcm9kdWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10by1jYXJ0LXBhY2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyBjb25zdCBwcm9kdWN0RGF0YVxuICAgICAgICAgICAgYXdhaXQgYWRkQWxsUHJvZHVjdHNUb0NhcnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgcXR5QXJyID0gc3RvY2tBcnIubWFwKGl0ZW0gPT4gcGFyc2VJbnQoaXRlbS5zdG9jaykpO1xuICAgICAgICAgICAgY29uc3QgbWluUXR5ID0gTWF0aC5taW4oLi4ucXR5QXJyKTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHF0eSBidXR0b25zXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWFjdGlvbj0naW5jJ11cIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmNCdG4gPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtYWN0aW9uPSdpbmMnXVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBxdHlCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0taW5jcmVtZW50W2RhdGEtcXVhbnRpdHktY2hhbmdlXSAuZm9ybS1pbnB1dFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChxdHlCb3gudmFsdWUgPj0gbWluUXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcXR5Qm94LnZhbHVlID0gbWluUXR5O1xuICAgICAgICAgICAgICAgICAgICBpbmNCdG4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWFjdGlvbj0nZGVjJ11cIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmNCdG4gPSBlLnRhcmdldC5jbG9zZXN0KFwiLmZvcm0taW5jcmVtZW50XCIpLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY3Rpb249J2luYyddXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHF0eUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1pbmNyZW1lbnRbZGF0YS1xdWFudGl0eS1jaGFuZ2VdIC5mb3JtLWlucHV0XCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHF0eUJveC52YWx1ZSA8IG1pblF0eSkge1xuICAgICAgICAgICAgICAgICAgICBpbmNCdG4ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIENoYW5nZSBldmVudCBsaXN0ZW5lclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdHlBcnIgPSBzdG9ja0Fyci5tYXAoaXRlbSA9PiBwYXJzZUludChpdGVtLnN0b2NrKSk7XG4gICAgICAgICAgICBjb25zdCBtaW5RdHkgPSBNYXRoLm1pbiguLi5xdHlBcnIpO1xuXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5zdWItcHJvZHVjdFwiKSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZVByb2R1Y3RPcHRpb25DaGFuZ2UoZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KFwiLmZvcm0taW5jcmVtZW50W2RhdGEtcXVhbnRpdHktY2hhbmdlXVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHF0eUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1pbmNyZW1lbnRbZGF0YS1xdWFudGl0eS1jaGFuZ2VdIC5mb3JtLWlucHV0XCIpO1xuICAgICAgICAgICAgICAgIGlmIChxdHlCb3gudmFsdWUgPiBtaW5RdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcXR5Qm94LnZhbHVlID0gbWluUXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSW5pbml0YWxpemF0aW9uLlxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGdldFBhY2tQcm9kdWN0cygpO1xuICAgIH1cblxuICAgIGluaXQoKTtcbn1cbiIsImltcG9ydCBnVXRpbHMgZnJvbSBcIi4uL2dvb3NlL3V0aWxzXCI7XG5pbXBvcnQgZ0FjY29yZGlvbiBmcm9tIFwiLi4vZ29vc2UvZy1hY2NvcmRpb25cIjtcblxuY29uc3Qge1xuICAgIHN0ZW5jaWw6IHsgZ0dldFBhZ2UgfSxcbn0gPSBnVXRpbHM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzaXplQ2hhcnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNpemUtY2hhcnQtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHNpemVDaGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zaXplLWNoYXJ0XVwiKTtcblxuICAgIGlmICghc2l6ZUNoYXJ0Q29udGFpbmVyIHx8ICFzaXplQ2hhcnQpIHJldHVybjtcblxuICAgIGNvbnN0IHNpemVDaGFydFZhbHVlID0gc2l6ZUNoYXJ0LmRhdGFzZXQuc2l6ZUNoYXJ0O1xuXG4gICAgaWYgKCFzaXplQ2hhcnRWYWx1ZSkgcmV0dXJuO1xuXG4gICAgZmV0Y2goYGh0dHBzOi8vc3RvcmUteWR4NWRlcnFqNC5teWJpZ2NvbW1lcmNlLmNvbS9jb250ZW50L3NpemUtY2hhcnRzL3NpemUtY2hhcnQtJHtzaXplQ2hhcnRWYWx1ZX0uaHRtbGApXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2l6ZSBjaGFydCBmaWxlIG5vdCBmb3VuZC4gUGxlYXNlIGNoZWNrIHRoZSBzaXplIGNoYXJ0IG5hbWUuXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgc2l6ZUNoYXJ0Q29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaHRtbCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJTb21ldGhpbmcgd2VudCB3cm9uZy5cIiwgZXJyKTtcbiAgICAgICAgfSk7XG59XG4iLCIvKlxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xuICovXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSBcIi4vcGFnZS1tYW5hZ2VyXCI7XG5pbXBvcnQgUmV2aWV3IGZyb20gXCIuL3Byb2R1Y3QvcmV2aWV3c1wiO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tIFwiLi9jb21tb24vY29sbGFwc2libGVcIjtcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tIFwiLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzXCI7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gXCIuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeVwiO1xuaW1wb3J0IHsgY2xhc3NpZnlGb3JtIH0gZnJvbSBcIi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHNcIjtcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSBcIi4vZ2xvYmFsL21vZGFsXCI7XG5pbXBvcnQgZ1BhY2tQcm9kdWN0IGZyb20gXCIuL2dvb3NlL2ctcGFjay1wcm9kdWN0XCI7XG5pbXBvcnQgZ1NpemVDaGFydCBmcm9tIFwiLi9nb29zZS9nLXNpemUtY2hhcnRcIjtcbmltcG9ydCBnQ3VzdG9taXNlU2hpcnQgZnJvbSBcIi4vZ29vc2UvZy1jdXN0b21pc2Utc2hpcnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcbiAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtYnVsay1wcmljaW5nXCJdJyk7XG4gICAgICAgIHRoaXMucmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoXCIjbW9kYWwtcmV2aWV3LWZvcm1cIilbMF07XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsb3NlLmZuZHRuLnJldmVhbFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZihcIiN3cml0ZV9yZXZpZXdcIikgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbGlkYXRvcjtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJChcIi5wcm9kdWN0LXZpZXdcIiksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICAgICAgZ1BhY2tQcm9kdWN0KHRoaXMuY29udGV4dCk7XG4gICAgICAgIGdTaXplQ2hhcnQoKTtcbiAgICAgICAgZ0N1c3RvbWlzZVNoaXJ0KHRoaXMuY29udGV4dC5wcm9kdWN0KTtcblxuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xuXG4gICAgICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKFwiLndyaXRlUmV2aWV3LWZvcm1cIik7XG5cbiAgICAgICAgaWYgKCRyZXZpZXdGb3JtLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoeyAkcmV2aWV3Rm9ybSB9KTtcblxuICAgICAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsICdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScsICgpID0+IHtcbiAgICAgICAgICAgIHZhbGlkYXRvciA9IHJldmlldy5yZWdpc3RlclZhbGlkYXRpb24odGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJldmlld0Zvcm0ub24oXCJzdWJtaXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmFyZUFsbChcInZhbGlkXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAgICAgJGZvcm0uZmluZChcIltkYXRhLWlucHV0XVwiKS5lYWNoKChfLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgICAgICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cihcIm5hbWVcIil9LW1zZ2A7XG5cbiAgICAgICAgICAgICRpbnB1dC5zaWJsaW5ncyhcInNwYW5cIikuYXR0cihcImlkXCIsIG1zZ1NwYW5JZCk7XG4gICAgICAgICAgICAkaW5wdXQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgbXNnU3BhbklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKFwiI3dyaXRlX3Jldmlld1wiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZihcIiNidWxrX3ByaWNpbmdcIikgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgIH1cblxuICAgIHNldE1haW5WaWRlbygpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XG5cbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9