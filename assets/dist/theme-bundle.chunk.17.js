(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _goose_g_infiniteScroll__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./goose/g-infiniteScroll */ "./assets/js/theme/goose/g-infiniteScroll.js");
/* harmony import */ var _goose_g_category__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./goose/g-category */ "./assets/js/theme/goose/g-category.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var leftArrowKey = 37;
var rightArrowKey = 39;
var Search = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);
  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }
  var _proto = Search.prototype;
  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;
    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };
    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }
    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }
    return nodeData;
  };
  _proto.showProducts = function showProducts(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$productListingContainer.removeClass('u-hidden');
    this.$facetedSearchContainer.removeClass('u-hidden');
    this.$contentResultsContainer.addClass('u-hidden');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-product-results-toggle]'));
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-product-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.showContent = function showContent(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$contentResultsContainer.removeClass('u-hidden');
    this.$productListingContainer.addClass('u-hidden');
    this.$facetedSearchContainer.addClass('u-hidden');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-content-results-toggle]'));
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-content-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.activateTab = function activateTab($tabToActivate) {
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    $tabsCollection.each(function (idx, tab) {
      var $tab = $(tab);
      if ($tab.is($tabToActivate)) {
        $tab.removeAttr('tabindex');
        $tab.attr('aria-selected', true);
        return;
      }
      $tab.attr('tabindex', '-1');
      $tab.attr('aria-selected', false);
    });
  };
  _proto.onTabChangeWithArrows = function onTabChangeWithArrows(event) {
    var eventKey = event.which;
    var isLeftOrRightArrowKeydown = eventKey === leftArrowKey || eventKey === rightArrowKey;
    if (!isLeftOrRightArrowKeydown) return;
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    var isActiveElementNotTab = $tabsCollection.index($(document.activeElement)) === -1;
    if (isActiveElementNotTab) return;
    var $activeTab = $("#" + document.activeElement.id);
    var activeTabIdx = $tabsCollection.index($activeTab);
    var lastTabIdx = $tabsCollection.length - 1;
    var nextTabIdx;
    switch (eventKey) {
      case leftArrowKey:
        nextTabIdx = activeTabIdx === 0 ? lastTabIdx : activeTabIdx - 1;
        break;
      case rightArrowKey:
        nextTabIdx = activeTabIdx === lastTabIdx ? 0 : activeTabIdx + 1;
        break;
      default:
        break;
    }
    $($tabsCollection.get(nextTabIdx)).focus().trigger('click');
  };
  _proto.onReady = function onReady() {
    var _this2 = this;
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    this.arrangeFocusOnSortBy();

    // Goose - set totals
    var count = this.context.totalSearchResults;
    console.log(this.context);
    Object(_goose_g_category__WEBPACK_IMPORTED_MODULE_11__["setCatCount"])(count);
    Object(_goose_g_category__WEBPACK_IMPORTED_MODULE_11__["default"])();
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_6___default.a.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content');

    // Init faceted search
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    // Init collapsibles
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showContent();
    });
    $('[data-search-page-tabs]').on('keyup', this.onTabChangeWithArrows);
    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent(false);
    } else {
      this.showProducts(false);
    }
    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();
      if (!validator.check()) {
        return event.preventDefault();
      }
      $searchForm.find('input[name="category\[\]"]').remove();
      for (var _iterator = _createForOfIteratorHelperLoose(selectedCategoryIds), _step; !(_step = _iterator()).done;) {
        var categoryId = _step.value;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
    var $searchResultsMessage = $("<p\n            class=\"aria-description--hidden\"\n            tabindex=\"-1\"\n            role=\"status\"\n            aria-live=\"polite\"\n            >" + this.context.searchResultsCount + "</p>").prependTo('body');
    setTimeout(function () {
      return $searchResultsMessage.focus();
    }, 100);
  };
  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;
    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };
  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;
    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this5 = this;
    // eslint-disable-next-line object-curly-newline
    var _this$context = this.context,
      onMinPriceError = _this$context.onMinPriceError,
      onMaxPriceError = _this$context.onMaxPriceError,
      minPriceNotEntered = _this$context.minPriceNotEntered,
      maxPriceNotEntered = _this$context.maxPriceNotEntered,
      onInvalidPrice = _this$context.onInvalidPrice;
    var $productListingContainer = $('#product-listing-container');
    var $contentListingContainer = $('#search-results-content');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var $contentCount = $('#search-results-content-count');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'search/product-listing',
        contentListing: 'search/content-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count',
        contentCount: 'search/content-count'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__["default"](requestOptions, function (content) {
      $searchHeading.html(content.heading);
      var url = url__WEBPACK_IMPORTED_MODULE_6___default.a.parse(window.location.href, true);
      if (url.query.section === 'content') {
        $contentListingContainer.html(content.contentListing);
        $contentCount.html(content.contentCount);
        _this5.showContent(false);
      } else {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);
        $searchCount.html(content.productCount);
        _this5.showProducts(false);
      }
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
      Object(_goose_g_infiniteScroll__WEBPACK_IMPORTED_MODULE_10__["default"])(_this5.context);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
    Object(_goose_g_infiniteScroll__WEBPACK_IMPORTED_MODULE_10__["default"])(this.context);
  };
  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_9__["default"])({
      submit: $form,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    return this;
  };
  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }
    return this;
  };
  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }
    return false;
  };
  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImxlZnRBcnJvd0tleSIsInJpZ2h0QXJyb3dLZXkiLCJTZWFyY2giLCJfQ2F0YWxvZ1BhZ2UiLCJfaW5oZXJpdHNMb29zZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlIiwibm9kZSIsIl90aGlzIiwibm9kZURhdGEiLCJ0ZXh0IiwiZGF0YSIsImlkIiwibWV0YWRhdGEiLCJzdGF0ZSIsInNlbGVjdGVkIiwib3BlbmVkIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGROb2RlIiwicHVzaCIsInNob3dQcm9kdWN0cyIsIm5hdmlnYXRlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsIiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciIsImFkZENsYXNzIiwiJCIsImFjdGl2YXRlVGFiIiwic2VhcmNoRGF0YSIsInVybCIsImNvdW50IiwidXJsVXRpbHMiLCJyZXBsYWNlUGFyYW1zIiwicGFnZSIsImdvVG9VcmwiLCJzaG93Q29udGVudCIsIiR0YWJUb0FjdGl2YXRlIiwiJHRhYnNDb2xsZWN0aW9uIiwiZmluZCIsImVhY2giLCJpZHgiLCJ0YWIiLCIkdGFiIiwiaXMiLCJyZW1vdmVBdHRyIiwiYXR0ciIsIm9uVGFiQ2hhbmdlV2l0aEFycm93cyIsImV2ZW50IiwiZXZlbnRLZXkiLCJ3aGljaCIsImlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24iLCJpc0FjdGl2ZUVsZW1lbnROb3RUYWIiLCJpbmRleCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIiRhY3RpdmVUYWIiLCJhY3RpdmVUYWJJZHgiLCJsYXN0VGFiSWR4IiwibGVuZ3RoIiwibmV4dFRhYklkeCIsImdldCIsImZvY3VzIiwidHJpZ2dlciIsIm9uUmVhZHkiLCJfdGhpczIiLCJjb21wYXJlUHJvZHVjdHMiLCJjb250ZXh0IiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJ0b3RhbFNlYXJjaFJlc3VsdHMiLCJjb25zb2xlIiwibG9nIiwic2V0Q2F0Q291bnQiLCJnQ2F0ZWdvcnkiLCIkc2VhcmNoRm9ybSIsIiRjYXRlZ29yeVRyZWVDb250YWluZXIiLCJVcmwiLCJwYXJzZSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInRyZWVEYXRhIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJldmVudERlZmF1bHQiLCJxdWVyeSIsInNlY3Rpb24iLCJ2YWxpZGF0b3IiLCJpbml0VmFsaWRhdGlvbiIsImJpbmRWYWxpZGF0aW9uIiwiY2F0ZWdvcnlUcmVlIiwiY2F0ZWdvcnlUcmVlRGF0YSIsImNyZWF0ZUNhdGVnb3J5VHJlZSIsInNlbGVjdGVkQ2F0ZWdvcnlJZHMiLCJqc3RyZWUiLCJnZXRfc2VsZWN0ZWQiLCJjaGVjayIsInJlbW92ZSIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UiLCJfc3RlcCIsImRvbmUiLCJjYXRlZ29yeUlkIiwidmFsdWUiLCJpbnB1dCIsInR5cGUiLCJuYW1lIiwiYXBwZW5kIiwiJHNlYXJjaFJlc3VsdHNNZXNzYWdlIiwic2VhcmNoUmVzdWx0c0NvdW50IiwicHJlcGVuZFRvIiwic2V0VGltZW91dCIsImxvYWRUcmVlTm9kZXMiLCJjYiIsIl90aGlzMyIsImFqYXgiLCJzZWxlY3RlZENhdGVnb3J5SWQiLCJwcmVmaXgiLCJoZWFkZXJzIiwiQkNEYXRhIiwiY3NyZl90b2tlbiIsImZvcm1hdHRlZFJlc3VsdHMiLCJkYXRhTm9kZSIsIiRjb250YWluZXIiLCJfdGhpczQiLCJ0cmVlT3B0aW9ucyIsImNvcmUiLCJ0aGVtZXMiLCJpY29ucyIsImNoZWNrYm94IiwidGhyZWVfc3RhdGUiLCJwbHVnaW5zIiwiX3RoaXM1IiwiX3RoaXMkY29udGV4dCIsIm9uTWluUHJpY2VFcnJvciIsIm9uTWF4UHJpY2VFcnJvciIsIm1pblByaWNlTm90RW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwiJGNvbnRlbnRMaXN0aW5nQ29udGFpbmVyIiwiJHNlYXJjaEhlYWRpbmciLCIkc2VhcmNoQ291bnQiLCIkY29udGVudENvdW50IiwicHJvZHVjdHNQZXJQYWdlIiwic2VhcmNoUHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiY29udGVudExpc3RpbmciLCJzaWRlYmFyIiwiaGVhZGluZyIsInByb2R1Y3RDb3VudCIsImNvbnRlbnRDb3VudCIsImNvbmZpZyIsInByb2R1Y3RfcmVzdWx0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZ0luZmluaXRlU2Nyb2xsIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCIkZm9ybSIsIm5vZCIsInN1Ym1pdCIsInRhcCIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCIkZWxlbWVudCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJlcnJvck1lc3NhZ2UiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJDYXRhbG9nUGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUNmO0FBQ2dCO0FBQ2tCO0FBQ2Q7QUFDUjtBQUMxQjtBQUNnQztBQUN0QztBQUNlO0FBQ3dCO0FBQ0s7QUFFNUQsSUFBTUEsWUFBWSxHQUFHLEVBQUU7QUFDdkIsSUFBTUMsYUFBYSxHQUFHLEVBQUU7QUFBQyxJQUVKQyxNQUFNLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsTUFBQSxFQUFBQyxZ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Q0FBQztRQUNmQyxRQUFRLEVBQUVGLFFBQVE7UUFDbEJHLFFBQVEsRUFBRSxVQUFVO1FBQ3BCQyxZQUFZLEVBQUVKLFFBQVEsQ0FBQ3JLLElBQUksQ0FBQyxjQUFjO01BQzlDLENBQUMsQ0FBQztJQUNOO0lBRUEsT0FBTyxJQUFJO0VBQ2YsQ0FBQztFQUFBUCxNQUFBLENBRURpRyxLQUFLLEdBQUwsU0FBQUEsTUFBQSxFQUFRO0lBQ0osSUFBSSxJQUFJLENBQUNULFNBQVMsRUFBRTtNQUNoQixJQUFJLENBQUNBLFNBQVMsQ0FBQ3lGLFlBQVksQ0FBQyxDQUFDO01BQzdCLE9BQU8sSUFBSSxDQUFDekYsU0FBUyxDQUFDMEYsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN6QztJQUVBLE9BQU8sS0FBSztFQUNoQixDQUFDO0VBQUEsT0FBQXZMLE1BQUE7QUFBQSxFQTVWK0J3TCxnREFBVyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgJ2pzdHJlZSc7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgZ0luZmluaXRlU2Nyb2xsIGZyb20gJy4vZ29vc2UvZy1pbmZpbml0ZVNjcm9sbCc7XG5pbXBvcnQgZ0NhdGVnb3J5LCB7IHNldENhdENvdW50IH0gZnJvbSAnLi9nb29zZS9nLWNhdGVnb3J5JztcblxuY29uc3QgbGVmdEFycm93S2V5ID0gMzc7XG5jb25zdCByaWdodEFycm93S2V5ID0gMzk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgICBmb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUobm9kZSkge1xuICAgICAgICBjb25zdCBub2RlRGF0YSA9IHtcbiAgICAgICAgICAgIHRleHQ6IG5vZGUuZGF0YSxcbiAgICAgICAgICAgIGlkOiBub2RlLm1ldGFkYXRhLmlkLFxuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogbm9kZS5zZWxlY3RlZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG5vZGUuc3RhdGUpIHtcbiAgICAgICAgICAgIG5vZGVEYXRhLnN0YXRlLm9wZW5lZCA9IG5vZGUuc3RhdGUgPT09ICdvcGVuJztcbiAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBub2RlRGF0YS5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBub2RlRGF0YS5jaGlsZHJlbi5wdXNoKHRoaXMuZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlKGNoaWxkTm9kZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZURhdGE7XG4gICAgfVxuXG4gICAgc2hvd1Byb2R1Y3RzKG5hdmlnYXRlID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kY29udGVudFJlc3VsdHNDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG5cbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbi1jb2xvci0tYWN0aXZlJyk7XG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uJyk7XG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVUYWIoJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKSk7XG5cbiAgICAgICAgaWYgKCFuYXZpZ2F0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoRGF0YSA9ICQoJyNzZWFyY2gtcmVzdWx0cy1wcm9kdWN0LWNvdW50IHNwYW4nKS5kYXRhKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IChzZWFyY2hEYXRhLmNvdW50ID4gMCkgPyBzZWFyY2hEYXRhLnVybCA6IHVybFV0aWxzLnJlcGxhY2VQYXJhbXMoc2VhcmNoRGF0YS51cmwsIHtcbiAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICB9XG5cbiAgICBzaG93Q29udGVudChuYXZpZ2F0ZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kY29udGVudFJlc3VsdHNDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XG5cbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcblxuICAgICAgICB0aGlzLmFjdGl2YXRlVGFiKCQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykpO1xuXG4gICAgICAgIGlmICghbmF2aWdhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaERhdGEgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudC1jb3VudCBzcGFuJykuZGF0YSgpO1xuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICB9KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGVUYWIoJHRhYlRvQWN0aXZhdGUpIHtcbiAgICAgICAgY29uc3QgJHRhYnNDb2xsZWN0aW9uID0gJCgnW2RhdGEtc2VhcmNoLXBhZ2UtdGFic10nKS5maW5kKCdbcm9sZT1cInRhYlwiXScpO1xuXG4gICAgICAgICR0YWJzQ29sbGVjdGlvbi5lYWNoKChpZHgsIHRhYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhYiA9ICQodGFiKTtcblxuICAgICAgICAgICAgaWYgKCR0YWIuaXMoJHRhYlRvQWN0aXZhdGUpKSB7XG4gICAgICAgICAgICAgICAgJHRhYi5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgICR0YWIuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHRhYi5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgICAgJHRhYi5hdHRyKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblRhYkNoYW5nZVdpdGhBcnJvd3MoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC53aGljaDtcbiAgICAgICAgY29uc3QgaXNMZWZ0T3JSaWdodEFycm93S2V5ZG93biA9IGV2ZW50S2V5ID09PSBsZWZ0QXJyb3dLZXlcbiAgICAgICAgICAgIHx8IGV2ZW50S2V5ID09PSByaWdodEFycm93S2V5O1xuICAgICAgICBpZiAoIWlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24pIHJldHVybjtcblxuICAgICAgICBjb25zdCAkdGFic0NvbGxlY3Rpb24gPSAkKCdbZGF0YS1zZWFyY2gtcGFnZS10YWJzXScpLmZpbmQoJ1tyb2xlPVwidGFiXCJdJyk7XG5cbiAgICAgICAgY29uc3QgaXNBY3RpdmVFbGVtZW50Tm90VGFiID0gJHRhYnNDb2xsZWN0aW9uLmluZGV4KCQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpID09PSAtMTtcbiAgICAgICAgaWYgKGlzQWN0aXZlRWxlbWVudE5vdFRhYikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0ICRhY3RpdmVUYWIgPSAkKGAjJHtkb2N1bWVudC5hY3RpdmVFbGVtZW50LmlkfWApO1xuICAgICAgICBjb25zdCBhY3RpdmVUYWJJZHggPSAkdGFic0NvbGxlY3Rpb24uaW5kZXgoJGFjdGl2ZVRhYik7XG4gICAgICAgIGNvbnN0IGxhc3RUYWJJZHggPSAkdGFic0NvbGxlY3Rpb24ubGVuZ3RoIC0gMTtcblxuICAgICAgICBsZXQgbmV4dFRhYklkeDtcbiAgICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIGxlZnRBcnJvd0tleTpcbiAgICAgICAgICAgIG5leHRUYWJJZHggPSBhY3RpdmVUYWJJZHggPT09IDAgPyBsYXN0VGFiSWR4IDogYWN0aXZlVGFiSWR4IC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHJpZ2h0QXJyb3dLZXk6XG4gICAgICAgICAgICBuZXh0VGFiSWR4ID0gYWN0aXZlVGFiSWR4ID09PSBsYXN0VGFiSWR4ID8gMCA6IGFjdGl2ZVRhYklkeCArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAkKCR0YWJzQ29sbGVjdGlvbi5nZXQobmV4dFRhYklkeCkpLmZvY3VzKCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgIC8vIEdvb3NlIC0gc2V0IHRvdGFsc1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuY29udGV4dC50b3RhbFNlYXJjaFJlc3VsdHM7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGV4dClcbiAgICAgICAgc2V0Q2F0Q291bnQoY291bnQpO1xuXG4gICAgICAgIGdDYXRlZ29yeSgpO1xuXG4gICAgICAgIGNvbnN0ICRzZWFyY2hGb3JtID0gJCgnW2RhdGEtYWR2YW5jZWQtc2VhcmNoLWZvcm1dJyk7XG4gICAgICAgIGNvbnN0ICRjYXRlZ29yeVRyZWVDb250YWluZXIgPSAkc2VhcmNoRm9ybS5maW5kKCdbZGF0YS1zZWFyY2gtY2F0ZWdvcnktdHJlZV0nKTtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgdHJlZURhdGEgPSBbXTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50Jyk7XG5cbiAgICAgICAgLy8gSW5pdCBmYWNldGVkIHNlYXJjaFxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2VhcmNoLXBhZ2UtdGFic10nKS5vbigna2V5dXAnLCB0aGlzLm9uVGFiQ2hhbmdlV2l0aEFycm93cyk7XG5cbiAgICAgICAgaWYgKHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmZpbmQoJ2xpLnByb2R1Y3QnKS5sZW5ndGggPT09IDAgfHwgdXJsLnF1ZXJ5LnNlY3Rpb24gPT09ICdjb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0cyhmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSB0aGlzLmluaXRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtKVxuICAgICAgICAgICAgLmJpbmRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtLmZpbmQoJyNzZWFyY2hfcXVlcnlfYWR2JykpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dC5jYXRlZ29yeVRyZWUuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgdHJlZURhdGEucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShub2RlKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSA9IHRyZWVEYXRhO1xuICAgICAgICB0aGlzLmNyZWF0ZUNhdGVnb3J5VHJlZSgkY2F0ZWdvcnlUcmVlQ29udGFpbmVyKTtcblxuICAgICAgICAkc2VhcmNoRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeUlkcyA9ICRjYXRlZ29yeVRyZWVDb250YWluZXIuanN0cmVlKCkuZ2V0X3NlbGVjdGVkKCk7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yLmNoZWNrKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNlYXJjaEZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNhdGVnb3J5XFxbXFxdXCJdJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlJZCBvZiBzZWxlY3RlZENhdGVnb3J5SWRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSAkKCc8aW5wdXQ+Jywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NhdGVnb3J5W10nLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzZWFyY2hGb3JtLmFwcGVuZChpbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0ICRzZWFyY2hSZXN1bHRzTWVzc2FnZSA9ICQoYDxwXG4gICAgICAgICAgICBjbGFzcz1cImFyaWEtZGVzY3JpcHRpb24tLWhpZGRlblwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgIHJvbGU9XCJzdGF0dXNcIlxuICAgICAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgICAgID4ke3RoaXMuY29udGV4dC5zZWFyY2hSZXN1bHRzQ291bnR9PC9wPmApXG4gICAgICAgICAgICAucHJlcGVuZFRvKCdib2R5Jyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiAkc2VhcmNoUmVzdWx0c01lc3NhZ2UuZm9jdXMoKSwgMTAwKTtcbiAgICB9XG5cbiAgICBsb2FkVHJlZU5vZGVzKG5vZGUsIGNiKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvcmVtb3RlL3YxL2NhdGVnb3J5LXRyZWUnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2F0ZWdvcnlJZDogbm9kZS5pZCxcbiAgICAgICAgICAgICAgICBwcmVmaXg6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICd4LXhzcmYtdG9rZW4nOiB3aW5kb3cuQkNEYXRhICYmIHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA/IHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA6ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChkYXRhTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShkYXRhTm9kZSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNiKGZvcm1hdHRlZFJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVDYXRlZ29yeVRyZWUoJGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCB0cmVlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvcmU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAobm9kZSwgY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUm9vdCBub2RlXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlkID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMYXp5IGxvYWRlZCBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkVHJlZU5vZGVzKG5vZGUsIGNiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhlbWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tib3g6IHtcbiAgICAgICAgICAgICAgICB0aHJlZV9zdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgICdjaGVja2JveCcsXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuXG4gICAgICAgICRjb250YWluZXIuanN0cmVlKHRyZWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgICAgIGNvbnN0IHsgb25NaW5QcmljZUVycm9yLCBvbk1heFByaWNlRXJyb3IsIG1pblByaWNlTm90RW50ZXJlZCwgbWF4UHJpY2VOb3RFbnRlcmVkLCBvbkludmFsaWRQcmljZSB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkY29udGVudExpc3RpbmdDb250YWluZXIgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudCcpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJHNlYXJjaEhlYWRpbmcgPSAkKCcjc2VhcmNoLXJlc3VsdHMtaGVhZGluZycpO1xuICAgICAgICBjb25zdCAkc2VhcmNoQ291bnQgPSAkKCcjc2VhcmNoLXJlc3VsdHMtcHJvZHVjdC1jb3VudCcpO1xuICAgICAgICBjb25zdCAkY29udGVudENvdW50ID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQtY291bnQnKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LnNlYXJjaFByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnc2VhcmNoL3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgY29udGVudExpc3Rpbmc6ICdzZWFyY2gvY29udGVudC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnc2VhcmNoL3NpZGViYXInLFxuICAgICAgICAgICAgICAgIGhlYWRpbmc6ICdzZWFyY2gvaGVhZGluZycsXG4gICAgICAgICAgICAgICAgcHJvZHVjdENvdW50OiAnc2VhcmNoL3Byb2R1Y3QtY291bnQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRDb3VudDogJ3NlYXJjaC9jb250ZW50LWNvdW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0X3Jlc3VsdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnc2VhcmNoL3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkc2VhcmNoSGVhZGluZy5odG1sKGNvbnRlbnQuaGVhZGluZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAodXJsLnF1ZXJ5LnNlY3Rpb24gPT09ICdjb250ZW50Jykge1xuICAgICAgICAgICAgICAgICRjb250ZW50TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQuY29udGVudExpc3RpbmcpO1xuICAgICAgICAgICAgICAgICRjb250ZW50Q291bnQuaHRtbChjb250ZW50LmNvbnRlbnRDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcbiAgICAgICAgICAgICAgICAkc2VhcmNoQ291bnQuaHRtbChjb250ZW50LnByb2R1Y3RDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgZ0luZmluaXRlU2Nyb2xsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGdJbmZpbml0ZVNjcm9sbCh0aGlzLmNvbnRleHQpO1xuICAgIH1cblxuICAgIGluaXRWYWxpZGF0aW9uKCRmb3JtKSB7XG4gICAgICAgIHRoaXMuJGZvcm0gPSAkZm9ybTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkZm9ybSxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYmluZFZhbGlkYXRpb24oJGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAkZWxlbWVudCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICRlbGVtZW50LmRhdGEoJ2Vycm9yTWVzc2FnZScpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==