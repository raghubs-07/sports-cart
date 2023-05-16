import StencilUtils from "@bigcommerce/stencil-utils";
import gUtils from "../goose/utils";
const handleOverlay = gUtils.common.handleOverlay;

let popularProducts; // To temporarily store data

export default function () {
    const header = document.querySelector(".g-header");
    const topGutter = document.querySelector(".top-gutter");
    const body = document.querySelector("body");
    const searchInput = document.querySelector(".g-header__search .form-input");
    const searchResultsContainer = document.querySelector(".g-header__searchResults");
    const mobileBreakPoint = 1025;
    
    function toggleSearch(e) {
        e.preventDefault();

        header.classList.toggle("search--active");
    }

    function openSearchResults() {
        body.classList.add("search-results--active");
        handleOverlay("search-results", "add");
        setResultsHeight();
    }

    function closeSearchResults() {
        body.classList.remove("search-results--active");
        handleOverlay("search-results", "remove");
        searchInput.blur();
    }

    function showClearButton() {
        header.classList.add("search-results--active-keyword");
    }

    function hideClearButton() {
        header.classList.remove("search-results--active-keyword");
    }

    function clearInput() {
        searchInput.value = '';
        hideClearButton();
    }

    /**
     * Set height for search results block
     */
    function setResultsHeight() {
        // Return if not a mobile device.
        if (window.innerWidth > mobileBreakPoint) return;

        const windowHeight = window.innerHeight;
        let resultsHeight = windowHeight;
        const headeHeight = header ? header.getBoundingClientRect().height : 0;
        const topGutterHeight = topGutter ? topGutter.getBoundingClientRect().height : 0;

        resultsHeight -= headeHeight;
        resultsHeight -= topGutterHeight;

        searchResultsContainer.style.height = resultsHeight + 'px';
    }

    async function init() {
        await setPopularProducts();
    }

    searchInput.addEventListener("keydown", () => {
        if (searchInput.value.length > 1) {
            showClearButton();
        } else {
            hideClearButton();
        }
    })

    searchInput.addEventListener("focus", () => {
        openSearchResults();
    });

    document.addEventListener('click', e => {
        if (e.target.closest(".g-search-toggle")) {
            toggleSearch(e);
        }

        if (e.target.closest(".g-search-clear")) {
            e.preventDefault();
            clearInput();
        }

        if (e.target.closest(".g-search-close")) {
            e.preventDefault();
            closeSearchResults();
        }

        if (!e.target.closest(".g-header") && !e.target.closest(".g-header__searchResults")) {
            closeSearchResults();
        }
    });

    // Esc 
    document.addEventListener("keydown", e => {
        if (e.code === 'Escape') {
            closeSearchResults();
        }
    })

    init();
}

/**
 * Set popular products, exporting to be able to call in other files
 * @returns 
 */
export async function setPopularProducts() {
    const searchResultsContainer = document.querySelector(".g-header__searchResults");
    const populatProductsContainer = document.querySelector(".g-search-results-products");
    searchResultsContainer.classList.add("g-is-loading");

    return new Promise((resolve, reject) => {
        if (popularProducts) {
            populatProductsContainer.innerHTML = popularProducts;
            searchResultsContainer.classList.remove("g-is-loading");
            resolve(popularProducts)
        } else {
            StencilUtils.api.getPage('/Adelaide-Crows/', {
                template: 'goose/g-grid'
            }, (err, content) => {
                if (err) {
                    console.log(err);
                    return;
                }

                popularProducts = content;
                populatProductsContainer.innerHTML = content;
                searchResultsContainer.classList.remove("g-is-loading");
                resolve(content);
            })
        }
    })
}
