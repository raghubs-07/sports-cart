(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);
  function CatalogPage(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }
  var _proto = CatalogPage.prototype;
  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');
    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");










var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
  priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal')[0],
  modalOpen: false
};

/**
 * Faceted search view component
 */
var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;
    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Show limited items by default
    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    });

    // Mark initially collapsed accordions
    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    });

    // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped
    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    });

    // Observe user events
    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  }

  // Public methods
  var _proto = FacetedSearch.prototype;
  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    }

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Restore view state
    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems();

    // Bind events
    this.bindEvents();
  };
  _proto.updateView = function updateView() {
    var _this2 = this;
    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["api"].getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();
      if (err) {
        throw new Error(err);
      }

      // Refresh view with new content
      _this2.refreshView(content);
    });
  };
  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id');

    // Remove
    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
  };
  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');
    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
    }
  };
  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id');

    // Toggle depending on `collapsed` flag
    if (this.collapsedFacetItems.includes(id)) {
      this.getMoreFacetResults($navList);
      return true;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl();
    var drawer = document.querySelector(".fb-drawer");
    if (this.requestOptions.showMore) {
      drawer.classList.add("g-is-loading");
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["api"].getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        // Goose Logic Begin
        document.getElementById("facetedSearch-content--" + facet.replace(/\s+/g, '-').toLowerCase()).innerHTML = response;
        drawer.classList.remove("g-is-loading");
        // Goose Logic End
      });
    }

    this.collapseFacetItems($navList);
    return false;
  };
  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };
  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };
  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };
  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this3 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this3.collapseFacet($accordionToggle);
    });
  };
  _proto.expandAllFacets = function expandAllFacets() {
    var _this4 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this4.expandFacet($accordionToggle);
    });
  }

  // Private methods
  ;
  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }
    var validator = Object(_nod__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__["Validators"].setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };
  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this5 = this;
    var $navLists = $(this.options.facetNavListSelector);

    // Restore collapsed state for each facet
    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');
      var shouldCollapse = _this5.collapsedFacetItems.includes(id);
      if (shouldCollapse) {
        _this5.collapseFacetItems($navList);
      } else {
        _this5.expandFacetItems($navList);
      }
    });
  };
  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this6 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;
      var shouldCollapse = _this6.collapsedFacets.includes(id);
      if (shouldCollapse) {
        _this6.collapseFacet($accordionToggle);
      } else {
        _this6.expandFacet($accordionToggle);
      }
    });
  };
  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents();

    // DOM events
    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation();

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href'));

    // Prevent default
    event.preventDefault();

    // Toggle visible items
    this.toggleFacetItems($navList);
  };
  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected');

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_4___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();
    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_9__["default"].constants.VALID)) {
      return;
    }
    var url = url__WEBPACK_IMPORTED_MODULE_4___default.a.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].parseQueryParams(queryParams);
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    }

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };
  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;
    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, id);
    }
  };
  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl);
    // If searchParams does not contain a page value then modify url query string to have page=1
    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, 'page=1');
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }
    $(window).trigger('statechange');
  };
  return FacetedSearch;
}();
/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/url-utils.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/utils/url-utils.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);

var urlUtils = {
  getUrl: function getUrl() {
    return "" + window.location.pathname + window.location.search;
  },
  goToUrl: function goToUrl(url) {
    window.history.pushState({}, document.title, url);
    $(window).trigger('statechange');
  },
  replaceParams: function replaceParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0___default.a.parse(url, true);
    var param;

    // Let the formatter use the query object to build the new url
    parsed.search = null;
    for (param in params) {
      if (params.hasOwnProperty(param)) {
        parsed.query[param] = params[param];
      }
    }
    return url__WEBPACK_IMPORTED_MODULE_0___default.a.format(parsed);
  },
  buildQueryString: function buildQueryString(queryData) {
    var out = '';
    var key;
    for (key in queryData) {
      if (queryData.hasOwnProperty(key)) {
        if (Array.isArray(queryData[key])) {
          var ndx = void 0;
          for (ndx in queryData[key]) {
            if (queryData[key].hasOwnProperty(ndx)) {
              out += "&" + key + "=" + queryData[key][ndx];
            }
          }
        } else {
          out += "&" + key + "=" + queryData[key];
        }
      }
    }
    return out.substring(1);
  },
  parseQueryParams: function parseQueryParams(queryData) {
    var params = {};
    for (var i = 0; i < queryData.length; i++) {
      var temp = queryData[i].split('=');
      if (temp[0] in params) {
        if (Array.isArray(params[temp[0]])) {
          params[temp[0]].push(temp[1]);
        } else {
          params[temp[0]] = [params[temp[0]], temp[1]];
        }
      } else {
        params[temp[0]] = temp[1];
      }
    }
    return params;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (urlUtils);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      return false;
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdXJsLXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cy5qcyJdLCJuYW1lcyI6WyJDYXRhbG9nUGFnZSIsIl9QYWdlTWFuYWdlciIsIl9pbmhlcml0c0xvb3NlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJpZCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsIiRzb3J0QnlTZWxlY3RvciIsIiQiLCJnZXRJdGVtIiwiZm9jdXMiLCJyZW1vdmVJdGVtIiwib25Tb3J0QnlTdWJtaXQiLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ1cmwiLCJVcmwiLCJwYXJzZSIsImxvY2F0aW9uIiwiaHJlZiIsInF1ZXJ5UGFyYW1zIiwic2VyaWFsaXplIiwic3BsaXQiLCJxdWVyeSIsInBhZ2UiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1hdCIsInBhdGhuYW1lIiwic2VhcmNoIiwidXJsVXRpbHMiLCJidWlsZFF1ZXJ5U3RyaW5nIiwiUGFnZU1hbmFnZXIiLCJkZWZhdWx0T3B0aW9ucyIsImFjY29yZGlvblRvZ2dsZVNlbGVjdG9yIiwiYmxvY2tlclNlbGVjdG9yIiwiY2xlYXJGYWNldFNlbGVjdG9yIiwiY29tcG9uZW50U2VsZWN0b3IiLCJmYWNldE5hdkxpc3RTZWxlY3RvciIsInByaWNlUmFuZ2VFcnJvclNlbGVjdG9yIiwicHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3IiLCJwcmljZVJhbmdlRm9ybVNlbGVjdG9yIiwicHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IiLCJwcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvciIsInNob3dNb3JlVG9nZ2xlU2VsZWN0b3IiLCJmYWNldGVkU2VhcmNoRmlsdGVySXRlbXMiLCJtb2RhbCIsIm1vZGFsRmFjdG9yeSIsIm1vZGFsT3BlbiIsIkZhY2V0ZWRTZWFyY2giLCJyZXF1ZXN0T3B0aW9ucyIsImNhbGxiYWNrIiwib3B0aW9ucyIsIl9leHRlbmQiLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiY29sbGFwc2libGVGYWN0b3J5IiwiaW5pdFByaWNlVmFsaWRhdG9yIiwiZWFjaCIsImluZGV4IiwibmF2TGlzdCIsImNvbGxhcHNlRmFjZXRJdGVtcyIsImFjY29yZGlvblRvZ2dsZSIsIiRhY2NvcmRpb25Ub2dnbGUiLCJjb2xsYXBzaWJsZSIsImRhdGEiLCJpc0NvbGxhcHNlZCIsInB1c2giLCJ0YXJnZXRJZCIsInNldFRpbWVvdXQiLCJpcyIsImNvbGxhcHNlQWxsRmFjZXRzIiwib25TdGF0ZUNoYW5nZSIsImJpbmQiLCJvblRvZ2dsZUNsaWNrIiwib25BY2NvcmRpb25Ub2dnbGUiLCJvbkNsZWFyRmFjZXQiLCJvbkZhY2V0Q2xpY2siLCJvblJhbmdlU3VibWl0IiwiZmlsdGVyRmFjZXRJdGVtcyIsImJpbmRFdmVudHMiLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMiLCJ1cGRhdGVWaWV3IiwiX3RoaXMyIiwic2hvdyIsImFwaSIsImdldFBhZ2UiLCJnZXRVcmwiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJleHBhbmRGYWNldEl0ZW1zIiwiJG5hdkxpc3QiLCJhdHRyIiwiX3dpdGhvdXQiLCJoYXNNb3JlUmVzdWx0cyIsIl91bmlvbiIsInRvZ2dsZUZhY2V0SXRlbXMiLCJpbmNsdWRlcyIsImdldE1vcmVGYWNldFJlc3VsdHMiLCJmYWNldCIsImZhY2V0VXJsIiwiZHJhd2VyIiwicXVlcnlTZWxlY3RvciIsInNob3dNb3JlIiwiY2xhc3NMaXN0IiwiYWRkIiwidGVtcGxhdGUiLCJwYXJhbXMiLCJsaXN0X2FsbCIsInJlc3BvbnNlIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJpbm5lckhUTUwiLCJyZW1vdmUiLCIkaXRlbXMiLCJ2YWwiLCJlbGVtZW50IiwidGV4dCIsImluZGV4T2YiLCJleHBhbmRGYWNldCIsIm9wZW4iLCJjb2xsYXBzZUZhY2V0IiwiY2xvc2UiLCJfdGhpczMiLCIkYWNjb3JkaW9uVG9nZ2xlcyIsImV4cGFuZEFsbEZhY2V0cyIsIl90aGlzNCIsImxlbmd0aCIsInZhbGlkYXRvciIsIm5vZCIsInNlbGVjdG9ycyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJWYWxpZGF0b3JzIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJwcmljZVJhbmdlVmFsaWRhdG9yIiwiX3RoaXM1IiwiJG5hdkxpc3RzIiwic2hvdWxkQ29sbGFwc2UiLCJfdGhpczYiLCJ1bmJpbmRFdmVudHMiLCJvbiIsIm9uUG9wU3RhdGUiLCJob29rcyIsIm9mZiIsIiRsaW5rIiwic3RvcFByb3BhZ2F0aW9uIiwiZ29Ub1VybCIsIiR0b2dnbGUiLCJ0b2dnbGVDbGFzcyIsInVybFF1ZXJ5UGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwiYXJlQWxsIiwiY29uc3RhbnRzIiwiVkFMSUQiLCJkZWNvZGVVUkkiLCJwYXJzZVF1ZXJ5UGFyYW1zIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJjdXJyZW50VXJsIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiaGFzIiwibGlua1VybCIsInJlIiwidXBkYXRlZExpbmtVcmwiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidGl0bGUiLCJ0cmlnZ2VyIiwicHVzaFN0YXRlIiwicmVwbGFjZVBhcmFtcyIsInBhcnNlZCIsInBhcmFtIiwicXVlcnlEYXRhIiwib3V0IiwiQXJyYXkiLCJpc0FycmF5IiwibmR4Iiwic3Vic3RyaW5nIiwiaSIsInRlbXAiLCJkZWNyZW1lbnRDb3VudGVyIiwiY291bnRlciIsIml0ZW0iLCJzcGxpY2UiLCJpbmNyZW1lbnRDb3VudGVyIiwidXBkYXRlQ291bnRlck5hdiIsInVybHMiLCJhZGRDbGFzcyIsImNvbXBhcmUiLCJqb2luIiwiZmluZCIsImh0bWwiLCJyZW1vdmVDbGFzcyIsIl9yZWYiLCJub0NvbXBhcmVNZXNzYWdlIiwiY29tcGFyZUNvdW50ZXIiLCIkY29tcGFyZUxpbmsiLCIkY2hlY2tlZCIsIm1hcCIsInZhbHVlIiwiZ2V0IiwidHJpZ2dlckhhbmRsZXIiLCJwcm9kdWN0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkY2xpY2tlZENoZWNrZWRJbnB1dCIsInNob3dBbGVydE1vZGFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFDTztBQUMxQjtBQUFBLElBRURBLFdBQVcsMEJBQUFDLFlBQUE7RUFBQUMsY0FBQSxDQUFBRixXQUFBLEVBQUFDLFlBQUE7RUFDNUIsU0FBQUQsWUFBWUcsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNqQkEsS0FBQSxHQUFBSCxZQUFBLENBQUFJLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBRWRHLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFlBQU07TUFDMUMsSUFBSUMsUUFBUSxDQUFDQyxhQUFhLENBQUNDLEVBQUUsS0FBSyxNQUFNLEVBQUU7UUFDdENKLE1BQU0sQ0FBQ0ssWUFBWSxDQUFDQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQztNQUMzRDtJQUNKLENBQUMsQ0FBQztJQUFDLE9BQUFSLEtBQUE7RUFDUDtFQUFDLElBQUFTLE1BQUEs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N0MsQ0FBQyxNQUFNO01BQ0h0QixnQkFBZ0IsQ0FBQ2UsY0FBYyxFQUFFTyxPQUFPLENBQUM7SUFDN0M7SUFFQWpCLGdCQUFnQixDQUFDVSxjQUFjLEVBQUVRLG1CQUFtQixFQUFFakIsSUFBSSxDQUFDO0VBQy9ELENBQUMsQ0FBQztFQUVGN0wsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDNkksRUFBRSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxZQUFNO0lBQy9DLElBQU1tRSxvQkFBb0IsR0FBR2hOLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ2lNLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQztJQUVqRixJQUFJZSxvQkFBb0IsQ0FBQ3JGLE1BQU0sSUFBSSxDQUFDLEVBQUU7TUFDbENzRiw2REFBYyxDQUFDWixnQkFBZ0IsQ0FBQztNQUNoQyxPQUFPLEtBQUs7SUFDaEI7RUFDSixDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZCA9PT0gJ3NvcnQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0QnlTdGF0dXMnLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYW5nZUZvY3VzT25Tb3J0QnkoKSB7XG4gICAgICAgIGNvbnN0ICRzb3J0QnlTZWxlY3RvciA9ICQoJ1tkYXRhLXNvcnQtYnk9XCJwcm9kdWN0XCJdICNzb3J0Jyk7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29ydEJ5U3RhdHVzJykpIHtcbiAgICAgICAgICAgICRzb3J0QnlTZWxlY3Rvci5mb2N1cygpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzb3J0QnlTdGF0dXMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBob29rcywgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL3V0aWxzL3VybC11dGlscyc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29sbGFwc2libGUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgbm9kIGZyb20gJy4vbm9kJztcblxuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBhY2NvcmRpb25Ub2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tbmF2aWdhdGlvbiwgI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtdG9nZ2xlJyxcbiAgICBibG9ja2VyU2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuYmxvY2tlcicsXG4gICAgY2xlYXJGYWNldFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtY2xlYXJMaW5rJyxcbiAgICBjb21wb25lbnRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoLW5hdkxpc3QnLFxuICAgIGZhY2V0TmF2TGlzdFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLm5hdkxpc3QnLFxuICAgIHByaWNlUmFuZ2VFcnJvclNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0taW5saW5lTWVzc2FnZScsXG4gICAgcHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1maWVsZHNldCcsXG4gICAgcHJpY2VSYW5nZUZvcm1TZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtJyxcbiAgICBwcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1heF9wcmljZV0nLFxuICAgIHByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWluX3ByaWNlXScsXG4gICAgc2hvd01vcmVUb2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tY29udGVudCAudG9nZ2xlTGluaycsXG4gICAgZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zOiAnI2ZhY2V0ZWRTZWFyY2gtZmlsdGVySXRlbXMgLmZvcm0taW5wdXQnLFxuICAgIG1vZGFsOiBtb2RhbEZhY3RvcnkoJyNtb2RhbCcpWzBdLFxuICAgIG1vZGFsT3BlbjogZmFsc2UsXG59O1xuXG4vKipcbiAqIEZhY2V0ZWQgc2VhcmNoIHZpZXcgY29tcG9uZW50XG4gKi9cbmNsYXNzIEZhY2V0ZWRTZWFyY2gge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyAtIE9iamVjdCB3aXRoIG9wdGlvbnMgZm9yIHRoZSBhamF4IHJlcXVlc3RzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIGZldGNoaW5nIHRlbXBsYXRlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQ29uZmlndXJhYmxlIG9wdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogbGV0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAqICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICogICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAqICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJ1xuICAgICAqICAgICB9XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCB0ZW1wbGF0ZXNEaWRMb2FkID0gZnVuY3Rpb24oY29udGVudCkge1xuICAgICAqICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgKiAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBsZXQgZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCB0ZW1wbGF0ZXNEaWRMb2FkKTtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IFtdO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBbXTtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxuICAgICAgICB0aGlzLmluaXRQcmljZVZhbGlkYXRvcigpO1xuXG4gICAgICAgIC8vIFNob3cgbGltaXRlZCBpdGVtcyBieSBkZWZhdWx0XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKS5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJChuYXZMaXN0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1hcmsgaW5pdGlhbGx5IGNvbGxhcHNlZCBhY2NvcmRpb25zXG4gICAgICAgICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKS5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMucHVzaChjb2xsYXBzaWJsZS50YXJnZXRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNlIGFsbCBmYWNldHMgaWYgaW5pdGlhbGx5IGhpZGRlblxuICAgICAgICAvLyBOT1RFOiBOZWVkIHRvIGV4ZWN1dGUgYWZ0ZXIgQ29sbGFwc2libGUgZ2V0cyBib290c3RyYXBwZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29tcG9uZW50U2VsZWN0b3IpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsRmFjZXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9ic2VydmUgdXNlciBldmVudHNcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Ub2dnbGVDbGljayA9IHRoaXMub25Ub2dnbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlID0gdGhpcy5vbkFjY29yZGlvblRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xlYXJGYWNldCA9IHRoaXMub25DbGVhckZhY2V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25GYWNldENsaWNrID0gdGhpcy5vbkZhY2V0Q2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhbmdlU3VibWl0ID0gdGhpcy5vblJhbmdlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyA9IHRoaXMuZmlsdGVyRmFjZXRJdGVtcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcmVmcmVzaFZpZXcoY29udGVudCkge1xuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpO1xuICAgICAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudHNcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5zaG93KCk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIHRoaXMucmVxdWVzdE9wdGlvbnMsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3RvcikuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdmlldyB3aXRoIG5ldyBjb250ZW50XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KGNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBSZW1vdmVcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgIGNvbnN0IGhhc01vcmVSZXN1bHRzID0gJG5hdkxpc3QuZGF0YSgnaGFzTW9yZVJlc3VsdHMnKTtcblxuICAgICAgICBpZiAoaGFzTW9yZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBbaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBkZXBlbmRpbmcgb24gYGNvbGxhcHNlZGAgZmxhZ1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgZmFjZXQgPSAkbmF2TGlzdC5kYXRhKCdmYWNldCcpO1xuICAgICAgICBjb25zdCBmYWNldFVybCA9IHVybFV0aWxzLmdldFVybCgpO1xuICAgICAgICBjb25zdCBkcmF3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZiLWRyYXdlclwiKTtcblxuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSkge1xuICAgICAgICAgICAgZHJhd2VyLmNsYXNzTGlzdC5hZGQoXCJnLWlzLWxvYWRpbmdcIik7XG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShmYWNldFVybCwge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0X2FsbDogZmFjZXQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBHb29zZSBMb2dpYyBCZWdpblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmYWNldGVkU2VhcmNoLWNvbnRlbnQtLSR7ZmFjZXQucmVwbGFjZSgvXFxzKy9nLCAnLScpLnRvTG93ZXJDYXNlKCl9YCkuaW5uZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgZHJhd2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJnLWlzLWxvYWRpbmdcIik7XG4gICAgICAgICAgICAgICAgLy8gR29vc2UgTG9naWMgRW5kXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZmlsdGVyRmFjZXRJdGVtcyhldmVudCkge1xuICAgICAgICBjb25zdCAkaXRlbXMgPSAkKCcubmF2TGlzdC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICRpdGVtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9ICQoZWxlbWVudCkudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5vcGVuKCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKSB7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG5cbiAgICAgICAgY29sbGFwc2libGUuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRBbGxGYWNldHMoKSB7XG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xuXG4gICAgICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuICAgIGluaXRQcmljZVZhbGlkYXRvcigpIHtcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gbm9kKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRXJyb3JTZWxlY3RvcixcbiAgICAgICAgICAgIGZpZWxkc2V0U2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBtYXhQcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH07XG5cbiAgICAgICAgVmFsaWRhdG9ycy5zZXRNaW5NYXhQcmljZVZhbGlkYXRpb24odmFsaWRhdG9yLCBzZWxlY3RvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyk7XG5cbiAgICAgICAgdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuICAgIH1cblxuICAgIHJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCkge1xuICAgICAgICBjb25zdCAkbmF2TGlzdHMgPSAkKHRoaXMub3B0aW9ucy5mYWNldE5hdkxpc3RTZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBjb2xsYXBzZWQgc3RhdGUgZm9yIGVhY2ggZmFjZXRcbiAgICAgICAgJG5hdkxpc3RzLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQobmF2TGlzdCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcy5pbmNsdWRlcyhpZCk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkQ29sbGFwc2UgPSB0aGlzLmNvbGxhcHNlZEZhY2V0cy5pbmNsdWRlcyhpZCk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgLy8gQ2xlYW4tdXBcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcblxuICAgICAgICAvLyBET00gZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vbignc3RhdGVjaGFuZ2UnLCB0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuICAgICAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd0b2dnbGUuY29sbGFwc2libGUnLCB0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25BY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9uKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgICAgICAvLyBIb29rc1xuICAgICAgICBob29rcy5vbignZmFjZXRlZFNlYXJjaC1mYWNldC1jbGlja2VkJywgdGhpcy5vbkZhY2V0Q2xpY2spO1xuICAgICAgICBob29rcy5vbignZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWQnLCB0aGlzLm9uUmFuZ2VTdWJtaXQpO1xuICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgIHVuYmluZEV2ZW50cygpIHtcbiAgICAgICAgLy8gRE9NIGV2ZW50c1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMub3B0aW9ucy5zaG93TW9yZVRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uVG9nZ2xlQ2xpY2spO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9mZignY2xpY2snLCB0aGlzLm9uQ2xlYXJGYWNldCk7XG5cbiAgICAgICAgLy8gSG9va3NcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgICAgIGhvb2tzLm9mZignZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWQnLCB0aGlzLm9uUmFuZ2VTdWJtaXQpO1xuICAgICAgICBob29rcy5vZmYoJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICBvbkNsZWFyRmFjZXQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGxpbmsgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIFVSTFxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVDbGljayhldmVudCkge1xuICAgICAgICBjb25zdCAkdG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgJG5hdkxpc3QgPSAkKCR0b2dnbGUuYXR0cignaHJlZicpKTtcblxuICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBpdGVtc1xuICAgICAgICB0aGlzLnRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgIH1cblxuICAgIG9uRmFjZXRDbGljayhldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCAkbGluayA9ICQoY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRsaW5rLnRvZ2dsZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBVUkxcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubW9kYWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIC8vIFVybCBvYmplY3QgYHF1ZXJ5YCBpcyBub3QgYSB0cmFkaXRpb25hbCBKYXZhU2NyaXB0IE9iamVjdCBvbiBhbGwgc3lzdGVtcywgY2xvbmUgaXQgaW5zdGVhZFxuICAgICAgICBjb25zdCB1cmxRdWVyeVBhcmFtcyA9IHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKHVybFF1ZXJ5UGFyYW1zLCB1cmwucXVlcnkpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybChVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSB9KSk7XG4gICAgfVxuXG4gICAgb25SYW5nZVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yLmFyZUFsbChub2QuY29uc3RhbnRzLlZBTElEKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gZGVjb2RlVVJJKCQoY3VycmVudFRhcmdldCkuc2VyaWFsaXplKCkpLnNwbGl0KCcmJyk7XG4gICAgICAgIHF1ZXJ5UGFyYW1zID0gdXJsVXRpbHMucGFyc2VRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChxdWVyeVBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5W2tleV0gPSBxdWVyeVBhcmFtc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XG5cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybChVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSB9KSk7XG4gICAgfVxuXG4gICAgb25TdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgb25BY2NvcmRpb25Ub2dnbGUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG4gICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XG5cbiAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldHMsIFtpZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldHMsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUG9wU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhjdXJyZW50VXJsKTtcbiAgICAgICAgLy8gSWYgc2VhcmNoUGFyYW1zIGRvZXMgbm90IGNvbnRhaW4gYSBwYWdlIHZhbHVlIHRoZW4gbW9kaWZ5IHVybCBxdWVyeSBzdHJpbmcgdG8gaGF2ZSBwYWdlPTFcbiAgICAgICAgaWYgKCFzZWFyY2hQYXJhbXMuaGFzKCdwYWdlJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtVcmwgPSAkKCcucGFnaW5hdGlvbi1saW5rJykuYXR0cignaHJlZicpO1xuICAgICAgICAgICAgY29uc3QgcmUgPSAvcGFnZT1bMC05XSsvaTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMaW5rVXJsID0gbGlua1VybC5yZXBsYWNlKHJlLCAncGFnZT0xJyk7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cGRhdGVkTGlua1VybCk7XG4gICAgICAgIH1cbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3N0YXRlY2hhbmdlJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGYWNldGVkU2VhcmNoO1xuIiwiaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5jb25zdCB1cmxVdGlscyA9IHtcbiAgICBnZXRVcmw6ICgpID0+IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0ke3dpbmRvdy5sb2NhdGlvbi5zZWFyY2h9YCxcblxuICAgIGdvVG9Vcmw6ICh1cmwpID0+IHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXJsKTtcbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3N0YXRlY2hhbmdlJyk7XG4gICAgfSxcblxuICAgIHJlcGxhY2VQYXJhbXM6ICh1cmwsIHBhcmFtcykgPT4ge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBVcmwucGFyc2UodXJsLCB0cnVlKTtcbiAgICAgICAgbGV0IHBhcmFtO1xuXG4gICAgICAgIC8vIExldCB0aGUgZm9ybWF0dGVyIHVzZSB0aGUgcXVlcnkgb2JqZWN0IHRvIGJ1aWxkIHRoZSBuZXcgdXJsXG4gICAgICAgIHBhcnNlZC5zZWFyY2ggPSBudWxsO1xuXG4gICAgICAgIGZvciAocGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xuICAgICAgICAgICAgICAgIHBhcnNlZC5xdWVyeVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFVybC5mb3JtYXQocGFyc2VkKTtcbiAgICB9LFxuXG4gICAgYnVpbGRRdWVyeVN0cmluZzogKHF1ZXJ5RGF0YSkgPT4ge1xuICAgICAgICBsZXQgb3V0ID0gJyc7XG4gICAgICAgIGxldCBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHF1ZXJ5RGF0YSkge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5RGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocXVlcnlEYXRhW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZHg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChuZHggaW4gcXVlcnlEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeURhdGFba2V5XS5oYXNPd25Qcm9wZXJ0eShuZHgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ICs9IGAmJHtrZXl9PSR7cXVlcnlEYXRhW2tleV1bbmR4XX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0ICs9IGAmJHtrZXl9PSR7cXVlcnlEYXRhW2tleV19YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0LnN1YnN0cmluZygxKTtcbiAgICB9LFxuXG4gICAgcGFyc2VRdWVyeVBhcmFtczogKHF1ZXJ5RGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXJ5RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IHF1ZXJ5RGF0YVtpXS5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICBpZiAodGVtcFswXSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXNbdGVtcFswXV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1t0ZW1wWzBdXS5wdXNoKHRlbXBbMV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1t0ZW1wWzBdXSA9IFtwYXJhbXNbdGVtcFswXV0sIHRlbXBbMV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dID0gdGVtcFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVybFV0aWxzO1xuIiwiaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuL21vZGFsJztcblxuZnVuY3Rpb24gZGVjcmVtZW50Q291bnRlcihjb3VudGVyLCBpdGVtKSB7XG4gICAgY29uc3QgaW5kZXggPSBjb3VudGVyLmluZGV4T2YoaXRlbSk7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBjb3VudGVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbmNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb3VudGVyLnB1c2goaXRlbSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXJOYXYoY291bnRlciwgJGxpbmssIHVybHMpIHtcbiAgICBpZiAoY291bnRlci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaWYgKCEkbGluay5pcygndmlzaWJsZScpKSB7XG4gICAgICAgICAgICAkbGluay5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgICB9XG4gICAgICAgICRsaW5rLmF0dHIoJ2hyZWYnLCBgJHt1cmxzLmNvbXBhcmV9LyR7Y291bnRlci5qb2luKCcvJyl9YCk7XG4gICAgICAgICRsaW5rLmZpbmQoJ3NwYW4uY291bnRQaWxsJykuaHRtbChjb3VudGVyLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGxpbmsucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IG5vQ29tcGFyZU1lc3NhZ2UsIHVybHMgfSkge1xuICAgIGxldCBjb21wYXJlQ291bnRlciA9IFtdO1xuXG4gICAgY29uc3QgJGNvbXBhcmVMaW5rID0gJCgnYVtkYXRhLWNvbXBhcmUtbmF2XScpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjb21wYXJlUmVzZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0ICRjaGVja2VkID0gJCgnYm9keScpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XG5cbiAgICAgICAgY29tcGFyZUNvdW50ZXIgPSAkY2hlY2tlZC5sZW5ndGggPyAkY2hlY2tlZC5tYXAoKGluZGV4LCBlbGVtZW50KSA9PiBlbGVtZW50LnZhbHVlKS5nZXQoKSA6IFtdO1xuICAgICAgICB1cGRhdGVDb3VudGVyTmF2KGNvbXBhcmVDb3VudGVyLCAkY29tcGFyZUxpbmssIHVybHMpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtY29tcGFyZS1pZF0nLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCAkY2xpY2tlZENvbXBhcmVMaW5rID0gJCgnYVtkYXRhLWNvbXBhcmUtbmF2XScpO1xuXG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGluY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVjcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDb3VudGVyTmF2KGNvbXBhcmVDb3VudGVyLCAkY2xpY2tlZENvbXBhcmVMaW5rLCB1cmxzKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnYVtkYXRhLWNvbXBhcmUtbmF2XScsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDaGVja2VkSW5wdXQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBpZiAoJGNsaWNrZWRDaGVja2VkSW5wdXQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKG5vQ29tcGFyZU1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9