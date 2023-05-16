import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';
import { setPopularProducts } from '../goose/g-search';
import gUtils from "../goose/utils";

const {
    common: { deDuplicateArray },
} = gUtils;

export default function () {
    const TOP_STYLING = 'top: 49px;';
    const $quickSearchResults = $('.g-header__searchResults'); // Updated by Goose
    const $quickSearchForms = $('[data-quick-search-form]');
    const $quickSearchExpand = $('#quick-search-expand');
    const $searchQuery = $quickSearchForms.find('[data-search-quick]');
    const stencilDropDownExtendables = {
        hide: () => {
            $quickSearchExpand.attr('aria-expanded', false);
            $searchQuery.trigger('blur');
        },
        show: (event) => {
            $quickSearchExpand.attr('aria-expanded', true);
            $searchQuery.trigger('focus');
            event.stopPropagation();
        },
    };
    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $('#quickSearch'), TOP_STYLING);

    stencilDropDownExtendables.onBodyClick = (e, $container) => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if ($(e.target).closest('[data-prevent-quick-search-close], .modal-background').length === 0) {
            stencilDropDown.hide($container);
        }
    };

    // stagger searching for 1200ms after last input
    const debounceWaitTime = 1200;
    const doSearch = _.debounce((searchQuery) => {
        $quickSearchResults.addClass("g-is-loading");

        utils.api.search.search(searchQuery, {
            template: {
                results: 'goose/search/g-search-results',
                json: "goose/json-this"
            }
        }, (err, response) => {
            if (err) {
                return false;
            }

            /**
             * Create an empty array to filter out duplicate categories
             */
            const suggestedCategories = [];
            const resCategories = JSON.parse(response.json).category_results;
            let suggestedCategoriesHTML = "";

            resCategories.forEach(cat => {
                for (let i = 0; i < cat.length; i++) {
                    suggestedCategories.push(cat[i])
                }
            })

            // Deduplicating categories array
            const filteredSuggestedCategories = deDuplicateArray(suggestedCategories).splice(0, 15); // We're also setting limit to max results

            // Create DOM element to be injected
            if (filteredSuggestedCategories.length) {
                for (let i = 0; i < filteredSuggestedCategories.length; i++) {
                    suggestedCategoriesHTML += `<a href="${filteredSuggestedCategories[i].url}" class="search-results__category">${filteredSuggestedCategories[i].name}</a>`;
                }   
            } else {
                suggestedCategoriesHTML += `No suggested categories found.`;
            }

            $quickSearchResults.html(response.results);

            // Finally Push related categories to search results.
            $(".search-results__categories-container").html(suggestedCategoriesHTML)
            $quickSearchResults.removeClass("g-is-loading");

            if (JSON.parse(response.json).product_results.pagination.total == 0) {
                setPopularProducts();
            }
        });
    }, debounceWaitTime);

    utils.hooks.on('search-quick', (event, currentTarget) => {
        const searchQuery = $(currentTarget).val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            return;
        }

        doSearch(searchQuery);
    });

    // Catch the submission of the quick-search forms
    $quickSearchForms.on('submit', event => {
        event.preventDefault();

        const $target = $(event.currentTarget);
        const searchQuery = $target.find('input').val();
        const searchUrl = $target.data('url');

        if (searchQuery.length === 0) {
            return;
        }

        window.location.href = `${searchUrl}?search_query=${encodeURIComponent(searchQuery)}`;
    });
}
