/**
 *  Infinite Scroll Loader by Goose.
 *
 * Instructions:
 * Set itemsContainerEl display value to none within HTML
 * Set pagination-list display value to none within HTML
 * Wrap count of product number in a span with class 'product-count'
 *
 */

import "regenerator-runtime";

export default function (context) {
    /**
     * Define globals
     */
    const pagination = document.querySelector(".pagination"); // Pagination el selector
    const itemsContainerEl = ".product-grid"; // Parent element selector
    const itemsContainerEl2 = ".productGrid"; // Fallback Parent element selector
    const itemsContainerEl3 = ".brandGrid";
    let items = ".product-grid .product"; // Items selector
    let item = ".product"; // Single item selector
    let itemsContainer;
    let itemsPerPage = context.themeSettings.categorypage_products_per_page; // Decides how many elements to use for updating query parameters
    const pageType = document.querySelector("main");
    const productCountEl = document.querySelector(".product__count"); // element containing product count

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

    const itemsCountContainer = document.querySelector(".items-count"); // Product total count selector
    // const itemsProgressBar = document.querySelector('.pagination__bar__progress');
    const itemsTotal = parseInt(document.querySelector(".pagination__total").innerHTML);
    const pageUrl = new URL(window.location.href);
    const params = pageUrl.searchParams;
    let loadedPages = 1;
    let loadmore = true;
    let lastPage = false;
    let unloading = false;
    let previousEl = "";

    /**
     * Hide Pagination on page load
     */
    if (pagination === null) {
        return;
    }
    pagination.querySelector(".pagination-list").style.display = "none";

    // Check if page has no params, show the block
    const pageNo = params.get("page");

    if (pageNo === 1 || pageNo === null) {
        // itemsContainer.style.display = 'block';
        // loaderBtn('disable');
    }

    /**
     * Set items count
     */
    if (productCountEl) {
        const productCount = productCountEl.dataset.productCount;
        const bottomCountContainer = document.querySelector(".pagination__total");
        const topCountContainer = document.querySelector(".category-bar__count");
        topCountContainer ? (topCountContainer.innerHTML = `${productCount} products`) : "";
        bottomCountContainer ? (bottomCountContainer.innerHTML = `${productCount}`) : "";
    }

    /**
     * Loader
     * @param {*} visibility
     */
    function loaderBtn(visibility) {
        const preloaderTop = document.querySelector(".infinite-loader.preloader-top");
        const preLoaderBottom = document.querySelector(".pagination__loader .g-button");
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
        const rect = element.getBoundingClientRect();
        if (type === "bottom") {
            return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
        } else {
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    }

    /**
     * Update count of items in DOM
     * @param {*} count
     */
    function setItemsCount(count) {
        if (itemsCountContainer !== null) {
            itemsCountContainer.innerHTML = `${count}`;
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
            document.querySelector(`[data-index="${window.history.state.lastItem}"]`).scrollIntoView({ behavior: "smooth" });
        } // If history has last page no reference
        else if (window.history.state && window.history.state.lastParams !== undefined) {
            const elements = document.querySelectorAll(items);

            // get last params set before refresh
            const params = window.history.state.lastParams;
            // Get Ref to 1st el of the block
            const elRef = parseInt(params) * itemsPerPage - itemsPerPage + 1;

            // Scroll to last position
            if (elRef > 1 && elements[elRef] !== undefined) {
                elements[elRef].scrollIntoView({ behavior: "smooth" });
            }

            // Update query params
            setTimeout(setQueryParams("page", params), 1000);
        } else {
            // if page was refreshed.
            // Re iterate over all the elements in DOM
            const elements = document.querySelectorAll(items);

            // get url params of current URL
            const url = new URL(window.location.href);
            const search_params = url.searchParams;

            // Get Ref to 1st el of the block
            const elRef = parseInt(search_params.get("page")) * itemsPerPage - itemsPerPage + 1;

            // Scroll to last position
            if (elRef > 1 && elements[elRef] !== undefined) {
                elements[elRef].scrollIntoView({ behavior: "smooth" });
            }

            // Update query params
            setTimeout(setQueryParams("page", parseInt(search_params.get("page"))), 1000);
        }
    }

    /**
     * Load Items from Previous Pages
     * @param {*} count
     */
    async function getPrevItems(count) {
        let i = 1;
        let itemArr = [];
        loaderBtn("enable");

        do {
            // Get previous items and insert before current items
            itemArr.push(fetchItemsByPageNo(i));
            i++;
        } while (i < count);

        Promise.all(itemArr)
            .then((res) => {
                loaderBtn("disable");
                res.reverse();
                res.forEach((page) => {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(page.products, "text/html");
                    const productArr = [];
                    let products = doc.querySelectorAll(items);
                    products.forEach((product) => {
                        productArr.push(product);
                    });
                    productArr.reverse();
                    for (let i = 0; i < productArr.length; i++) {
                        itemsContainer.insertAdjacentElement("afterbegin", productArr[i]);
                    }
                });

                // itemsContainer.style.display = 'block';
                // Restore scroll position
                setTimeout(restoreScrollPos(), 1000);
                // Update count
                setItemsCount(document.querySelectorAll(items).length);
            })
            .catch((e) => console.log(e));
    }

    for (const param of params) {
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
    async function getNextItems() {
        // Wait till it the end of items reaches & load next items

        // Show bottom loader
        loaderBtn("enable");

        // Check if not a lastpage
        if (lastPage === false) {
            const url = new URL(window.location.href);
            // get url params of current URL
            const search_params = url.searchParams;
            let pageNo = search_params.get("page") !== null ? parseInt(search_params.get("page")) : 1;

            await fetchItemsByPageNo(pageNo + 1)
                .then((res) => {
                    setTimeout(() => {
                        const evt = new Event("stampedReload");
                        document.dispatchEvent(evt);
                    }, 500);

                    if (typeof res === "object" && res.products !== null) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(res.products, "text/html");
                        let products = doc.querySelectorAll(items);
                        const nextPage = doc.querySelector(".pagination .pagination-item--next");

                        if (products !== null && products.length !== 0) {
                            products.forEach((product) => {
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
                })
                .catch((e) => {
                    console.log(e);
                    lastPage = true;
                });
        } else {
            console.log("reached end of items");
        }
    }

    /**
     * Fetch Items
     * @param {*} pageNo
     * @returns
     */
    async function fetchItemsByPageNo(pageNo) {
        // Get current page url
        const url = new URL(window.location.href);
        // get url params of current URL
        const search_params = url.searchParams;
        // update params
        search_params.set("page", pageNo);
        url.search = search_params.toString();
        // finally we make a request to modified page
        const res = new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.text())
                .then((data) => resolve({ products: data, index: pageNo })) // Returning each object with page no, in order to inject back to DOM in same order
                .catch((err) => reject(err));
        });

        return res;
    }

    /**
     * Update Browser query params
     */
    function syncQueryParams() {
        const products = document.querySelectorAll(items);
        const length = products.length;
        // Get ref to every nth element
        for (let i = 1; i <= length; i = i + itemsPerPage) {
            // check if el in visibility update param
            if (isInViewport(products[i]) && products[i] !== previousEl) {
                previousEl = products[i];
                const pageNo = (i - 1) / itemsPerPage + 1;
                let url = new URL(window.location);
                url.searchParams.set("page", pageNo);
                window.history.pushState({}, "", url);
            }
        }
    }

    /**
     * Init
     */
    (function () {
        // Count products on page
        const productCount = document.querySelectorAll(items).length;
        const nextPage = document.querySelector(".pagination .pagination-item--next");
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
        let url = new URL(window.location);
        url.searchParams.set(name, value);
        window.history.pushState({}, "", url);
    }

    /**
     * On Window Unload
     */
    window.addEventListener("beforeunload", (e) => {
        if (unloading === false) {
            let url = new URL(window.location);
            window.history.pushState({ lastParams: url.searchParams.get("page") }, "", "");
            window.history.scrollRestoration = "manual";
        }
    });

    /**
     * Click Event Listener
     */
    document.addEventListener("click", (e) => {
        let url = new URL(window.location);
        // Check if its a product thats clicked;
        if (e.target.closest(item)) {
            unloading = true;
            const itemEl = e.target.closest(item);
            const itemRef = itemEl.dataset.index;
            window.history.pushState({ lastItem: itemRef, lastParams: url.searchParams.get("page") }, "", ""); // Push reference to product ID on navigating away.
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
    document.addEventListener("scroll", () => {
        syncQueryParams();
        // load more items...
        if (isInViewport(itemsContainer, "bottom") & (loadmore === true)) {
            // getNextItems(); - Disabled auto scroll
            loadmore = false;
        }
    });
}
