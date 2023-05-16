(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _goose_g_category__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./goose/g-category */ "./assets/js/theme/goose/g-category.js");
/* harmony import */ var _goose_g_team_home__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./goose/g-team-home */ "./assets/js/theme/goose/g-team-home.js");
/* harmony import */ var _goose_g_product_ladder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./goose/g-product-ladder */ "./assets/js/theme/goose/g-product-ladder.js");
/* harmony import */ var _goose_g_infiniteScroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./goose/g-infiniteScroll */ "./assets/js/theme/goose/g-infiniteScroll.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$("[data-shop-by-price]").length) return;
    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }
    $("a.navList-action").on("click", function () {
      return _this2.setLiveRegionAttributes($("span.price-filter-message"), "status", "assertive");
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.arrangeFocusOnSortBy();

    // Goose - set totals
    var count = this.context.total_products;
    Object(_goose_g_category__WEBPACK_IMPORTED_MODULE_5__["setCatCount"])(count);
    $('[data-button-type="add-cart"]').on("click", function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), "status", "polite");
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
    }
    $("a.reset-btn").on("click", function () {
      return _this3.setLiveRegionsAttributes($("span.reset-message"), "status", "polite");
    });
    this.ariaNotifyNoProducts();
    Object(_goose_g_category__WEBPACK_IMPORTED_MODULE_5__["default"])();
    Object(_goose_g_team_home__WEBPACK_IMPORTED_MODULE_6__["default"])();
    Object(_goose_g_product_ladder__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context);
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $("[data-no-products-notification]");
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this4 = this;
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $("#product-listing-container");
    var $facetedSearchContainer = $("#faceted-search-container");
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: "category/product-listing",
        sidebar: "category/sidebar",
        count: "goose/json-this"
      },
      showMore: "category/show-more"
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      var count = JSON.parse(content.count).category.total_products;
      Object(_goose_g_category__WEBPACK_IMPORTED_MODULE_5__["setCatCount"])(count);
      $("body").triggerHandler("compareReset");
      $("html, body").animate({
        scrollTop: 0
      }, 100);

      // Refresh wishlist on reload
      var evt = new Event("wishlistReload");
      document.dispatchEvent(evt);
      Object(_goose_g_infiniteScroll__WEBPACK_IMPORTED_MODULE_8__["default"])(_this4.context);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
    Object(_goose_g_infiniteScroll__WEBPACK_IMPORTED_MODULE_8__["default"])(this.context);
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/goose/g-product-ladder.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/goose/g-product-ladder.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _goose_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../goose/utils */ "./assets/js/theme/goose/utils/index.js");


var gGetPage = _goose_utils__WEBPACK_IMPORTED_MODULE_1__["default"].stencil.gGetPage;
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var productLadder = document.querySelectorAll(".js-product-ladder");
  var productList = [];
  productLadder.forEach(function (ladder) {
    var categoryUrl = ladder.getAttribute("data-category-url");
    productList.push(gGetPage(categoryUrl, "goose/json-this", {
      category: {
        products: {
          limit: 5
        }
      }
    }, ladder));
  });
  productList.forEach(function (productListItem) {
    productListItem.then(function (res) {
      var ladderBody = res.target.querySelector("tbody");
      var products = JSON.parse(res.response).category.products;
      products.forEach(function (product, index) {
        var _product$price;
        var image = product.image ? product.image.data : context.placeholder_product;
        var html = "\n                    <tr q-component=\"ladder-body-row\" class=\"ladder__row u-border-bottom\">\n                        <td class=\"ladder__item ladder__item--position\">\n                            <span class=\"ladder-position\">" + (index + 1) + "</span>\n                        </td>\n                        <td class=\"ladder__item ladder__item--product\">\n                            <a href=\"" + product.url + "\" class=\"ladder-product\">\n                                <span class=\"ladder-product__img\">\n                                    <img alt=\"" + (product.image ? product.image.alt : product.name) + "\" src=\"" + _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["tools"].image.getSrc(image, {
          "1x": "54x54"
        }) + "\" srcset=\"" + _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["tools"].imageSrcset.getSrcset(image, {
          "1x": "54x54"
        }) + "\" />\n                                </span>\n                                <span class=\"ladder-product__name\">\n                                    " + product.name + "\n                                </span>\n                            </a>\n                        </td>\n                        " + ((_product$price = product.price) != null && _product$price.sale_price_with_tax ? "<td class=\"ladder__item ladder__item--price\">\n                        <span class=\"ladder__item-price--non-sale\">" + product.price.with_tax.formatted + "</span>\n                        <span class=\"ladder__item-price--sale\">" + product.price.with_tax.formatted + "</span>\n                        </td>" : "<td class=\"ladder__item ladder__item--price\">\n                            " + product.price.with_tax.formatted + "\n                        </td>") + "\n                    </tr>\n                ";
        ladderBody.innerHTML = ladderBody.innerHTML + html;
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  });
});

/***/ }),

/***/ "./assets/js/theme/goose/g-team-home.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/goose/g-team-home.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _goose_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../goose/utils */ "./assets/js/theme/goose/utils/index.js");

var gGetPage = _goose_utils__WEBPACK_IMPORTED_MODULE_0__["default"].stencil.gGetPage;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var topGutter = document.querySelector(".top-gutter");
  var header = document.querySelector(".g-header");
  var uspBar = document.querySelector(".usp-bar");
  var headerHeight = topGutter.offsetHeight + header.offsetHeight + uspBar.offsetHeight;
  function init() {
    document.body.setAttribute("style", "--winHeight: " + innerHeight + "px; --headerHeight: " + headerHeight + "px");
    var teamHomeFeaturedProducts = document.querySelectorAll(".js-team-featured-products");
    var productList = [];
    teamHomeFeaturedProducts.forEach(function (featuredProducts) {
      var categoryUrl = featuredProducts.getAttribute("data-category-url");
      productList.push(gGetPage(categoryUrl, "goose/product-card-list", {
        category: {
          products: {
            limit: 4
          }
        }
      }, featuredProducts));
    });
    productList.forEach(function (item) {
      item.then(function (res) {
        res.target.innerHTML = res.response;
      })["catch"](function (err) {
        return console.log(err);
      });
    });
  }
  var resizeTimer;
  $(window).on("resize", function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      document.body.setAttribute("style", "--winHeight: " + innerHeight + "px; --headerHeight: " + headerHeight + "px");
    }, 250);
  });

  //------ Inits and Event Listeners
  init();
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2dvb3NlL2ctcHJvZHVjdC1sYWRkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2dvb3NlL2ctdGVhbS1ob21lLmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIl90aGlzMiIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiX3RoaXMzIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJjb3VudCIsInRvdGFsX3Byb2R1Y3RzIiwic2V0Q2F0Q291bnQiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCJnQ2F0ZWdvcnkiLCJnVGVhbUNhdGVnb3J5IiwiZ1Byb2R1Y3RMYWRkZXIiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJfdGhpczQiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwiSlNPTiIsInBhcnNlIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZXZ0IiwiRXZlbnQiLCJkb2N1bWVudCIsImRpc3BhdGNoRXZlbnQiLCJnSW5maW5pdGVTY3JvbGwiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIiwiZ0dldFBhZ2UiLCJnVXRpbHMiLCJzdGVuY2lsIiwicHJvZHVjdExhZGRlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcm9kdWN0TGlzdCIsImZvckVhY2giLCJsYWRkZXIiLCJjYXRlZ29yeVVybCIsImdldEF0dHJpYnV0ZSIsInB1c2giLCJwcm9kdWN0TGlzdEl0ZW0iLCJ0aGVuIiwicmVzIiwibGFkZGVyQm9keSIsInRhcmdldCIsInF1ZXJ5U2VsZWN0b3IiLCJyZXNwb25zZSIsInByb2R1Y3QiLCJpbmRleCIsIl9wcm9kdWN0JHByaWNlIiwiaW1hZ2UiLCJkYXRhIiwicGxhY2Vob2xkZXJfcHJvZHVjdCIsInVybCIsImFsdCIsIm5hbWUiLCJ0b29scyIsImdldFNyYyIsImltYWdlU3Jjc2V0IiwiZ2V0U3Jjc2V0IiwicHJpY2UiLCJzYWxlX3ByaWNlX3dpdGhfdGF4Iiwid2l0aF90YXgiLCJmb3JtYXR0ZWQiLCJpbm5lckhUTUwiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidG9wR3V0dGVyIiwiaGVhZGVyIiwidXNwQmFyIiwiaGVhZGVySGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiaW5pdCIsImJvZHkiLCJzZXRBdHRyaWJ1dGUiLCJpbm5lckhlaWdodCIsInRlYW1Ib21lRmVhdHVyZWRQcm9kdWN0cyIsImZlYXR1cmVkUHJvZHVjdHMiLCJpdGVtIiwicmVzaXplVGltZXIiLCJ3aW5kb3ciLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUNmO0FBQ29CO0FBQ0o7QUFDbUM7QUFDM0I7QUFDWjtBQUNNO0FBQ0M7QUFBQSxJQUVsQ0EsUUFBUSwwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLFFBQUEsRUFBQUMsWUFBQTtFQUN6QixTQUFBRCxTQUFZRyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFILFlBQUEsQ0FB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TSxDQUFDb0IsU0FBUyxHQUFHdEIsR0FBRyxDQUFDSSxRQUFRO01BQ3ZDLENBQUMsQ0FBQyxTQUFNLENBQUMsVUFBQ21CLEdBQUc7UUFBQSxPQUFLQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDO01BQUEsRUFBQztJQUN2QyxDQUFDLENBQUM7RUFDTjtFQUVBLElBQUllLFdBQVc7RUFFZjVJLENBQUMsQ0FBQzZJLE1BQU0sQ0FBQyxDQUFDekksRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVTyxDQUFDLEVBQUU7SUFDaENtSSxZQUFZLENBQUNGLFdBQVcsQ0FBQztJQUN6QkEsV0FBVyxHQUFHRyxVQUFVLENBQUMsWUFBWTtNQUNqQ2pGLFFBQVEsQ0FBQ3dFLElBQUksQ0FBQ0MsWUFBWSxDQUFDLE9BQU8sb0JBQWtCQyxXQUFXLDRCQUF1QkwsWUFBWSxPQUFJLENBQUM7SUFDM0csQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUNYLENBQUMsQ0FBQzs7RUFFRjtFQUNBRSxJQUFJLENBQUMsQ0FBQztBQUNWLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tIFwiQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHNcIjtcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tIFwiLi9jYXRhbG9nXCI7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gXCIuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzXCI7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tIFwiLi9jb21tb24vZmFjZXRlZC1zZWFyY2hcIjtcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gXCIuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzXCI7XG5pbXBvcnQgZ0NhdGVnb3J5LCB7IHNldENhdENvdW50IH0gZnJvbSBcIi4vZ29vc2UvZy1jYXRlZ29yeVwiO1xuaW1wb3J0IGdUZWFtQ2F0ZWdvcnkgZnJvbSBcIi4vZ29vc2UvZy10ZWFtLWhvbWVcIjtcbmltcG9ydCBnUHJvZHVjdExhZGRlciBmcm9tIFwiLi9nb29zZS9nLXByb2R1Y3QtbGFkZGVyXCI7XG5pbXBvcnQgZ0luZmluaXRlU2Nyb2xsIGZyb20gXCIuL2dvb3NlL2ctaW5maW5pdGVTY3JvbGxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgICAgICRlbGVtZW50LmF0dHIoe1xuICAgICAgICAgICAgcm9sZTogcm9sZVR5cGUsXG4gICAgICAgICAgICBcImFyaWEtbGl2ZVwiOiBhcmlhTGl2ZVN0YXR1cyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICAgICAgaWYgKCEkKFwiW2RhdGEtc2hvcC1ieS1wcmljZV1cIikubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCQoXCIubmF2TGlzdC1hY3Rpb25cIikuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikpIHtcbiAgICAgICAgICAgICQoXCJhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZVwiKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChcImEubmF2TGlzdC1hY3Rpb25cIikub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoXCJzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlXCIpLCBcInN0YXR1c1wiLCBcImFzc2VydGl2ZVwiKSk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgIC8vIEdvb3NlIC0gc2V0IHRvdGFsc1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuY29udGV4dC50b3RhbF9wcm9kdWN0cztcbiAgICAgICAgc2V0Q2F0Q291bnQoY291bnQpO1xuXG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbihcImNsaWNrXCIsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksIFwic3RhdHVzXCIsIFwicG9saXRlXCIpKTtcblxuICAgICAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJChcIiNmYWNldGVkU2VhcmNoXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbihcInNvcnRCeS1zdWJtaXR0ZWRcIiwgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKFwiYS5yZXNldC1idG5cIikub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKFwic3Bhbi5yZXNldC1tZXNzYWdlXCIpLCBcInN0YXR1c1wiLCBcInBvbGl0ZVwiKSk7XG5cbiAgICAgICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuXG4gICAgICAgIGdDYXRlZ29yeSgpO1xuICAgICAgICBnVGVhbUNhdGVnb3J5KCk7XG4gICAgICAgIGdQcm9kdWN0TGFkZGVyKHRoaXMuY29udGV4dCk7XG4gICAgfVxuXG4gICAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoXCJbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dXCIpO1xuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKFwiI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJChcIiNmYWNldGVkLXNlYXJjaC1jb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6IFwiY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nXCIsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogXCJjYXRlZ29yeS9zaWRlYmFyXCIsXG4gICAgICAgICAgICAgICAgY291bnQ6IFwiZ29vc2UvanNvbi10aGlzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6IFwiY2F0ZWdvcnkvc2hvdy1tb3JlXCIsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2goXG4gICAgICAgICAgICByZXF1ZXN0T3B0aW9ucyxcbiAgICAgICAgICAgIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gSlNPTi5wYXJzZShjb250ZW50LmNvdW50KS5jYXRlZ29yeS50b3RhbF9wcm9kdWN0cztcbiAgICAgICAgICAgICAgICBzZXRDYXRDb3VudChjb3VudCk7XG5cbiAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS50cmlnZ2VySGFuZGxlcihcImNvbXBhcmVSZXNldFwiKTtcblxuICAgICAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgMTAwXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggd2lzaGxpc3Qgb24gcmVsb2FkXG4gICAgICAgICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IEV2ZW50KFwid2lzaGxpc3RSZWxvYWRcIik7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICAgICAgICAgIGdJbmZpbml0ZVNjcm9sbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGdJbmZpbml0ZVNjcm9sbCh0aGlzLmNvbnRleHQpO1xuICAgIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiIsImltcG9ydCB7IHRvb2xzIH0gZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQgZ1V0aWxzIGZyb20gXCIuLi9nb29zZS91dGlsc1wiO1xuXG5jb25zdCB7XG4gICAgc3RlbmNpbDogeyBnR2V0UGFnZSB9LFxufSA9IGdVdGlscztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBwcm9kdWN0TGFkZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wcm9kdWN0LWxhZGRlclwiKTtcbiAgICBjb25zdCBwcm9kdWN0TGlzdCA9IFtdO1xuXG4gICAgcHJvZHVjdExhZGRlci5mb3JFYWNoKChsYWRkZXIpID0+IHtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlVcmwgPSBsYWRkZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYXRlZ29yeS11cmxcIik7XG4gICAgICAgIHByb2R1Y3RMaXN0LnB1c2goZ0dldFBhZ2UoY2F0ZWdvcnlVcmwsIFwiZ29vc2UvanNvbi10aGlzXCIsIHsgY2F0ZWdvcnk6IHsgcHJvZHVjdHM6IHsgbGltaXQ6IDUgfSB9IH0sIGxhZGRlcikpO1xuICAgIH0pO1xuXG4gICAgcHJvZHVjdExpc3QuZm9yRWFjaCgocHJvZHVjdExpc3RJdGVtKSA9PiB7XG4gICAgICAgIHByb2R1Y3RMaXN0SXRlbVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhZGRlckJvZHkgPSByZXMudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0cyA9IEpTT04ucGFyc2UocmVzLnJlc3BvbnNlKS5jYXRlZ29yeS5wcm9kdWN0cztcblxuICAgICAgICAgICAgICAgIHByb2R1Y3RzLmZvckVhY2goKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gcHJvZHVjdC5pbWFnZSA/IHByb2R1Y3QuaW1hZ2UuZGF0YSA6IGNvbnRleHQucGxhY2Vob2xkZXJfcHJvZHVjdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gYFxuICAgICAgICAgICAgICAgICAgICA8dHIgcS1jb21wb25lbnQ9XCJsYWRkZXItYm9keS1yb3dcIiBjbGFzcz1cImxhZGRlcl9fcm93IHUtYm9yZGVyLWJvdHRvbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFkZGVyX19pdGVtIGxhZGRlcl9faXRlbS0tcG9zaXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhZGRlci1wb3NpdGlvblwiPiR7aW5kZXggKyAxfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWRkZXJfX2l0ZW0gbGFkZGVyX19pdGVtLS1wcm9kdWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvZHVjdC51cmx9XCIgY2xhc3M9XCJsYWRkZXItcHJvZHVjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhZGRlci1wcm9kdWN0X19pbWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiJHtwcm9kdWN0LmltYWdlID8gcHJvZHVjdC5pbWFnZS5hbHQgOiBwcm9kdWN0Lm5hbWV9XCIgc3JjPVwiJHt0b29scy5pbWFnZS5nZXRTcmMoaW1hZ2UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiMXhcIjogXCI1NHg1NFwiLFxuICAgICAgICAgICAgICAgICAgICB9KX1cIiBzcmNzZXQ9XCIke3Rvb2xzLmltYWdlU3Jjc2V0LmdldFNyY3NldChpbWFnZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIxeFwiOiBcIjU0eDU0XCIsXG4gICAgICAgICAgICAgICAgICAgIH0pfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWRkZXItcHJvZHVjdF9fbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtwcm9kdWN0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0LnByaWNlPy5zYWxlX3ByaWNlX3dpdGhfdGF4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDx0ZCBjbGFzcz1cImxhZGRlcl9faXRlbSBsYWRkZXJfX2l0ZW0tLXByaWNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhZGRlcl9faXRlbS1wcmljZS0tbm9uLXNhbGVcIj4ke3Byb2R1Y3QucHJpY2Uud2l0aF90YXguZm9ybWF0dGVkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFkZGVyX19pdGVtLXByaWNlLS1zYWxlXCI+JHtwcm9kdWN0LnByaWNlLndpdGhfdGF4LmZvcm1hdHRlZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBgPHRkIGNsYXNzPVwibGFkZGVyX19pdGVtIGxhZGRlcl9faXRlbS0tcHJpY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Byb2R1Y3QucHJpY2Uud2l0aF90YXguZm9ybWF0dGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5gXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgICAgICBsYWRkZXJCb2R5LmlubmVySFRNTCA9IGxhZGRlckJvZHkuaW5uZXJIVE1MICsgaHRtbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgZ1V0aWxzIGZyb20gXCIuLi9nb29zZS91dGlsc1wiO1xuY29uc3Qge1xuICAgIHN0ZW5jaWw6IHsgZ0dldFBhZ2UgfSxcbn0gPSBnVXRpbHM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0b3BHdXR0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvcC1ndXR0ZXJcIik7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nLWhlYWRlclwiKTtcbiAgICBjb25zdCB1c3BCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzcC1iYXJcIik7XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gdG9wR3V0dGVyLm9mZnNldEhlaWdodCArIGhlYWRlci5vZmZzZXRIZWlnaHQgKyB1c3BCYXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgLS13aW5IZWlnaHQ6ICR7aW5uZXJIZWlnaHR9cHg7IC0taGVhZGVySGVpZ2h0OiAke2hlYWRlckhlaWdodH1weGApO1xuXG4gICAgICAgIGNvbnN0IHRlYW1Ib21lRmVhdHVyZWRQcm9kdWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtdGVhbS1mZWF0dXJlZC1wcm9kdWN0c1wiKTtcblxuICAgICAgICBjb25zdCBwcm9kdWN0TGlzdCA9IFtdO1xuXG4gICAgICAgIHRlYW1Ib21lRmVhdHVyZWRQcm9kdWN0cy5mb3JFYWNoKChmZWF0dXJlZFByb2R1Y3RzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeVVybCA9IGZlYXR1cmVkUHJvZHVjdHMuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYXRlZ29yeS11cmxcIik7XG5cbiAgICAgICAgICAgIHByb2R1Y3RMaXN0LnB1c2goZ0dldFBhZ2UoY2F0ZWdvcnlVcmwsIFwiZ29vc2UvcHJvZHVjdC1jYXJkLWxpc3RcIiwgeyBjYXRlZ29yeTogeyBwcm9kdWN0czogeyBsaW1pdDogNCB9IH0gfSwgZmVhdHVyZWRQcm9kdWN0cykpO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcm9kdWN0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHJlcy50YXJnZXQuaW5uZXJIVE1MID0gcmVzLnJlc3BvbnNlO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCByZXNpemVUaW1lcjtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xuICAgICAgICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgLS13aW5IZWlnaHQ6ICR7aW5uZXJIZWlnaHR9cHg7IC0taGVhZGVySGVpZ2h0OiAke2hlYWRlckhlaWdodH1weGApO1xuICAgICAgICB9LCAyNTApO1xuICAgIH0pO1xuXG4gICAgLy8tLS0tLS0gSW5pdHMgYW5kIEV2ZW50IExpc3RlbmVyc1xuICAgIGluaXQoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=