import StencilUtils from "@bigcommerce/stencil-utils";
import "regenerator-runtime/runtime";
import Swal from "sweetalert2";
import { showAlertModal } from "../global/modal";
import gUtils from "../goose/utils";

const {
    common: { addToCart, handleOverlay },
} = gUtils;

/**
 * To do:
 * add notification on adding, removing products from wishlist
 */

/**
 * Handle wishlist on product cards using GraphQL
 *
 * Note:
 * Add a custom event dispatch to all functions where this function may need reloading e.g. faceted search or infinite scroll
 * load this script globally
 */
export default async function (context) {
    /**
     * Vars that can be customised
     */
    const defaultWishlistName = "My Favourites"; // This will be used to create a new wishlist if a wishlist does not exist
    const classWishlistButtonActive = "card-wl-icon--active"; // Toggle class to enable or disable status of wishlist item active.
    const wlIcon = document.querySelector(".wl-icon-top");
    const wishlistProductsContainer = document.querySelector(".wl__body");
    const wishlistDrawer = document.querySelector(".wl-drawer");
    const wlSubHeader = document.querySelector(".wl__sub-header");
    /**
     * Global Variables
     */
    let selectedProducts = []; // Empty array to be populated by functions below.
    let wishListId;
    let wishlists;

    /**
     * Set loading status of wl drawer
     * @param {*} status
     */
    function handleWlLoading(status) {
        switch (status) {
            case "loading":
                wishlistDrawer.classList.add("g-is-loading");
                break;
            default:
                // Remove loader.
                wishlistDrawer.classList.remove("g-is-loading");
        }
    }

    /**
     * Get products fron wishlist based on ID
     * @param {*} wishlistId
     * @returns
     */
    async function getWishlistProducts(wishlistId) {
        return new Promise((resolve, reject) => {
            StencilUtils.api.getPage(
                `/wishlist.php?action=viewwishlistitems&wishlistid=${wishlistId}`,
                {
                    template: "goose/wishlist/detail",
                },
                (err, content) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(content);
                }
            );
        });
    }

    /**
     * Get all wishlists for currently logged in user
     */
    async function getWishlists() {
        if (context.customer) {
            return fetch("/graphql", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${context.storefront_api}`,
                },
                body: JSON.stringify({
                    query: `query getWishlists {
                    customer {
                      wishlists {
                        edges {
                          node {
                            name
                            entityId
                            items {
                              edges {
                                node {
                                  entityId
                                  productEntityId
                                  variantEntityId
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }`,
                }),
            })
                .then((res) => res.json())
                .then((data) => data.data.customer.wishlists.edges)
                .catch((error) => console.error(error));
        } else {
            return [];
        }
    }

    /**
     * Create new wishlist - By default we are creating a non public wishlist, we can also have the ability to accept an input from customer with regards to this.
     */
    async function createWishlist() {
        return await fetch("/graphql", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.storefront_api}`,
            },
            body: JSON.stringify({
                query: `mutation createWishlist {
                wishlist {
                createWishlist(input: { name: "${defaultWishlistName}", isPublic: false }) {
                    result {
                    entityId
                    }
                }
                }
            }`,
            }),
        })
            .then((res) => res.json())
            .then((data) => data.data.wishlist.createWishlist?.result.entityId)
            .catch((error) => console.error(error));
    }

    /**
     *
     * @param {*} productId
     * @param {*} wishlistId
     */
    async function addProductToWishlist(productId, wishlistId) {
        return new Promise(async (resolve, reject) => {
            // Activate wishlist icon on confirmation
            const product = document.querySelector(`[data-product-id="${productId}"]`);
            product?.classList.add(classWishlistButtonActive);

            let res = await fetch("/graphql", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${context.storefront_api}`,
                },
                body: JSON.stringify({
                    query: `mutation addToWishList($items: [WishlistItemInput!]!) {
                wishlist {
                    addWishlistItems (input: {
                    entityId: ${wishlistId},
                    items: $items
                    }) {
                    result {
                        name
                        entityId
                        items {
                        edges {
                            node {
                            entityId
                            productEntityId
                            variantEntityId
                            }
                        }
                        }
                    }
                    }
                }
                }`,
                    variables: {
                        items: Array.isArray(productId) ? productId.map((productEntityId) => ({ productEntityId: parseInt(productEntityId) })) : [{ productEntityId: parseInt(productId) }],
                    },
                }),
            })
                .then((res) => res.json())
                .then((data) => data.data.wishlist.addWishlistItems.result)
                .catch((error) => console.error(error));

            // Check if response contains productId
            const filteredRes = res.items.edges.filter((item) => item.node.productEntityId == productId);

            if (filteredRes.length) {
                // Sent a nice notification maybe?
                Swal.fire({
                    customClass: {
                        confirmButton: "button button--primary",
                    },
                    buttonsStyling: false,
                    icon: "success",
                    text: "Product successfully added to wishlist.",
                });

                // Add entityid for deletion
                product.dataset.productEntityId = filteredRes[0].node.entityId;
            }

            resolve(res);
        });
    }

    /**
     *
     * @param {*} productId
     * @param {*} wishlistId
     */
    async function removeProductFromWishlist(productId, wishlistId) {
        return new Promise(async (resolve, reject) => {
            document.querySelector(`[data-product-entity-id="${productId}"]`)?.classList.remove(classWishlistButtonActive);

            let res = await fetch("/graphql", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${context.storefront_api}`,
                },
                body: JSON.stringify({
                    query: `mutation removeFromWishlist {
                        wishlist {
                            deleteWishlistItems( input: { entityId: ${wishlistId}, itemEntityIds: [${productId}] }) {
                            result {
                                items {
                                edges {
                                    node {
                                    entityId
                                    productEntityId
                                    variantEntityId
                                    }
                                }
                                }
                            }
                            }
                        }
                        }`,
                }),
            })
                .then((res) => res.json())
                .then((data) => data.data.wishlist.deleteWishlistItems.result)
                .catch((error) => console.error(error));

            const filteredRes = res.items.edges.filter((item) => item.node.entityId == productId);

            if (filteredRes.length) {
                // Restore icon if API call fails?
                reject();
            } else {
                // Sent a nice notification maybe?
                Swal.fire({
                    customClass: {
                        confirmButton: "button button--primary",
                    },
                    buttonsStyling: false,
                    icon: "success",
                    text: "Product successfully removed from wishlist.",
                });
                // Do nothing as array does not contain the product we needed to remove
            }

            resolve(res);
        });
    }

    /**
     *
     * @param {*} product
     */
    async function handleWishlistButton(mainEl) {
        const productSelector = mainEl.dataset.wishlistProductSelector;
        const product = mainEl.closest("." + productSelector);
        const productId = product?.dataset?.productId;
        const productTitle = product.dataset?.productTitle;
        const productImage = product.dataset?.productImage;
        const productUrl = product.dataset?.productUrl;
        const productType = product.dataset?.productType;
        const productEntityId = product?.dataset?.productEntityId;

        // Check if user logged in? else redirect to login page
        if (context.customer) {
            if (product.classList.contains(classWishlistButtonActive)) {
                if (productEntityId !== undefined) {
                    removeProductFromWishlist(productEntityId, wishListId);
                } else {
                    console.log("Product Entity Id not found");
                }
            } else {
                // Check if a wishlist exists
                if (wishListId) {
                    await addProductToWishlist(productId, wishListId);
                    globalInit(true);
                } else {
                    createWishlist().then(async (res) => {
                        wishListId = res;
                        await addProductToWishlist(productId, wishListId);
                        globalInit(true);
                    });
                }
            }
        } else {
            // Instead of redirect we do something clever. We use builting popup to log user on the same page and add the product afterwards.
            // If success we set the product id in local storage to be picked up by the logic on location reload, as that's when session will be updated.
            handleOpenWl();
            if (product.classList.contains(classWishlistButtonActive)) {
                handleRemoveProductFromStorage(productId);
                product.classList.remove(classWishlistButtonActive);
            } else {
                wishlistDrawer.classList.add("wl-drawer--product-added");
                product.classList.add(classWishlistButtonActive);
                handleAddProductToStorage({ productId, productTitle, productImage, productUrl, productType });
            }

            loadProductsFromStorage(); // Update drawer
        }
    }

    /**
     * Add all wishlist products to specified DOM target el
     * @param {*} products
     * @param {*} target
     */
    async function addProductsToDOM(wishlistId, target) {
        return new Promise(async (resolve, reject) => {
            const res = await getWishlistProducts(wishlistId);
            const parser = new DOMParser();
            const htmlRes = parser.parseFromString(res, "text/html");
            const count = htmlRes.querySelectorAll(".wl__product").length;
            wlSubHeader.innerHTML = `${defaultWishlistName} (${count < 1 || count > 1 ? count + " Products" : count + " Product"}) `;
            count < 1 ? wlIcon.classList.remove("wl-icon--positive") : wlIcon.classList.add("wl-icon--positive");
            target.innerHTML = res;
            resolve(res);
        });
    }

    /**
     * Load products from browser storage
     */
    function loadProductsFromStorage() {
        const productData = localStorage.getItem("wishlistItems");
        let productHtml = `<div class="alertBox">
            <div class="alertBox-column alertBox-icon">
                <icon glyph="ic-success" class="icon" aria-hidden="true">
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2981 12.2626C22.2981 14.8541 20.1973 16.9549 17.6058 16.9549C15.0143 16.9549 12.9135 14.8541 12.9135 12.2626C12.9135 9.67113 15.0143 7.57031 17.6058 7.57031C20.1973 7.57031 22.2981 9.67113 22.2981 12.2626ZM23.7981 12.2626C23.7981 15.6825 21.0257 18.4549 17.6058 18.4549C14.1859 18.4549 11.4135 15.6825 11.4135 12.2626C11.4135 8.8427 14.1859 6.07031 17.6058 6.07031C21.0257 6.07031 23.7981 8.8427 23.7981 12.2626ZM8.625 29.0703C8.625 24.6646 12.577 20.9742 17.6058 20.9742C20.1184 20.9742 22.3622 21.8955 23.9785 23.3669C22.6911 24.4674 21.875 26.1033 21.875 27.9297C21.875 31.2434 24.5613 33.9297 27.875 33.9297C31.1887 33.9297 33.875 31.2434 33.875 27.9297C33.875 24.616 31.1887 21.9297 27.875 21.9297C26.9416 21.9297 26.0579 22.1428 25.27 22.5231C23.3459 20.6397 20.6078 19.4742 17.6058 19.4742C11.8863 19.4742 7.125 23.7048 7.125 29.0703H8.625ZM27.875 32.4297C30.3603 32.4297 32.375 30.415 32.375 27.9297C32.375 25.4444 30.3603 23.4297 27.875 23.4297C25.3897 23.4297 23.375 25.4444 23.375 27.9297C23.375 30.415 25.3897 32.4297 27.875 32.4297ZM24.394 28.4854L29.4124 28.4854L27.9755 29.8505L28.7461 30.6616L31.4945 28.0506L28.7777 25.198L27.9675 25.9697L29.2979 27.3666H24.394V28.4854Z" fill="#09090C" stroke="none"/>
                </svg>
                </icon>
            </div>
            <p class="alertBox-column alertBox-message">
                <span>You're currently not logged in. Please <a href="#" class="js-login">login</a> or <a href="/login.php?action=create_account">Register</a> to save your wishlist.</span>
            </p>
        </div>`;

        const parsedProductData = JSON.parse(productData);

        if (parsedProductData && parsedProductData.length > 0) {
            wlSubHeader.innerHTML = `(${parsedProductData.length} items)`;
            wlIcon.classList.add("wl-icon--positive");
            productHtml += '<ul class="wishlist-items">';

            for (let i = 0; i < parsedProductData.length; i++) {
                // Push wishlist card into html string
                productHtml += `<li class="wishlist-item">
                <div class="wl__product" data-item-row="" data-product-id="${parsedProductData[i].productId}" data-name="${parsedProductData[i].productTitle}" data-price="225">
                    <div class="wl__product__figure-container">
                        <div class="wl__product__figure">
                                <img src="${parsedProductData[i].productImage}" alt="${parsedProductData[i].productTitle}" data-sizes="auto" class="wl__product-image lazyautosizes lazyloaded" loading="lazy" sizes="104px">
                        </div>
                    </div>
                    <div class="wl__product__detail">
                            <a class="wl__product__title" href="${parsedProductData[i].productUrl}">${parsedProductData[i].productTitle}</a>
                            <div class="wl__product__price-container">
                                <span class="wl__product__price "></span>
                            </div>
                
                        <div class="wl__product__bottom">
                            <div class="wl__product__qty-container cart-item-quantity">
                                <label class="form-label cart-item-label" for="qty-86">Quantity:</label>
                                <div class="form-increment">
                                    <button class="button button--icon js-qty-btn" data-cart-itemid="86" data-action="dec">
                                        <span class="is-srOnly">Decrease Quantity of ${parsedProductData[i].productTitle}</span>
                                        <i class="icon" aria-hidden="true"><svg><use xlink:href="#icon-remove"></use></svg></i>
                                    </button>
                                    <input class="form-input form-input--incrementTotal" id="qty-86" name="qty-86" type="tel" value="1" data-quantity-min="" data-quantity-max="" min="1" pattern="[0-9]*" data-cart-itemid="86" data-action="manualQtyChange" aria-label="${parsedProductData[i].productTitle}" aria-live="polite">
                                    <button class="button button--icon js-qty-btn" data-cart-itemid="86" data-action="inc">
                                        <span class="is-srOnly">Increase Quantity of ${parsedProductData[i].productTitle}</span>
                                        <i class="icon" aria-hidden="true"><svg><use xlink:href="#icon-add"></use></svg></i>
                                    </button>
                                </div>
                            </div>
                            <button class="wl__product__cart-remove wl-remove-storage" data-wl-itemid="86" data-confirm-delete="Are you sure you want to delete this item?" aria-label="Remove ${parsedProductData[i].productTitle} from cart">
                                Remove
                            </button>
                        </div>
                    </div>
                        ${parsedProductData[i].productType == 'simple' ? `<a href="#" class="js-button-wl-moveToCart g-button g-button--secondary g-button--fullbleed">Add to Cart</a>`: `<a href="${parsedProductData[i].productUrl}" class="g-button g-button--secondary g-button--fullbleed">Choose Options</a>` }
                </div></li>`;

                // Enable - Wishlist Icon
                const productCard = document.querySelector(`[data-product-id="${parsedProductData[i].productId}"]`);
                productCard?.classList.add(classWishlistButtonActive);
            }

            productHtml += "</ul>";
        } else {
            wlIcon.classList.remove("wl-icon--positive");
            let categoryLinks = "";
            context.categories.forEach(cat => {
                if (cat.name == "Shop All") {
                    console.log(cat);
                    cat.children.forEach(child => {
                        categoryLinks += `<a href="${child.url}" class="g-button g-button--primary g-button--fullbleed u-layout-margin-bottom-1">${child.name}</a>`;
                    })        
                }
            })
            productHtml += `<p class="u-layout-margin-bottom-2">There are currently no products in your wishlist.</p>
                <div class="u-layout-padding-horizontal-4">
               ${categoryLinks}
                <a href="/shop-all" class="g-button g-button--secondary g-button--fullbleed">Start Shopping</a>
                </div>`;
        }

        wishlistProductsContainer.innerHTML = productHtml;
    }

    /**
     * Save product to browser storage
     * @param {*} product
     * @returns
     */
    async function addProductToStorage({ productId, productTitle, productImage, productUrl, productType }) {
        return new Promise((resolve, reject) => {
            // Read from localstorage
            const existingPendingProducts = localStorage.getItem("wishlistItems") ? JSON.parse(localStorage.getItem("wishlistItems")) : [];

            // Add to local storage
            existingPendingProducts.push({ productId, productTitle, productImage, productUrl, productType });

            // Save to local storage
            localStorage.setItem("wishlistItems", JSON.stringify(existingPendingProducts));

            resolve();
        });
    }

    /**
     * Remove product from browser storage
     * @param {*} productId
     * @returns
     */
    async function removeProductFromStorage(productId) {
        return new Promise((resolve, reject) => {
            // Read from localstorage
            const products = localStorage.getItem("wishlistItems");

            if (products) {
                // Filter local storage
                const filteredProducts = JSON.parse(products).filter((product) => product.productId !== productId);

                // Save to local storage
                localStorage.setItem("wishlistItems", JSON.stringify(filteredProducts));
            } else {
                reject();
            }

            resolve();
        });
    }

    async function handleRemoveProductFromStorage(productId) {
        handleWlLoading("loading");

        await removeProductFromStorage(productId);

        // Disable - Wishlist Icon
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        productCard?.classList.remove(classWishlistButtonActive);

        loadProductsFromStorage();

        // Refresh wishlist drawer
        handleWlLoading();
    }

    async function handleAddProductToStorage({ productId, productTitle, productImage, productUrl, productType }) {
        handleWlLoading("loading");

        await addProductToStorage({ productId, productTitle, productImage, productUrl, productType });

        loadProductsFromStorage();

        handleWlLoading();
    }

    /**
     * Main Initialization function
     */
    async function globalInit(fetching) {
        return new Promise(async (resolve, reject) => {
            if (!context?.customer) {
                loadProductsFromStorage();
                resolve();
                return;
            }

            // We can skip fetching data via gql if its only quick reload
            if (fetching === true) {
                wishlists = await getWishlists();
            }

            // Check if any localStorage regarding a product to be added
            const pendingProducts = localStorage.getItem("wishlistItems") ? JSON.parse(localStorage.getItem("wishlistItems")) : [];
            const prendinProductsArr = pendingProducts.map((prod) => prod.productId);

            // return;
            if (wishlists.length > 0) {
                // Set first wishlist id as global
                wishListId = wishlists[0].node.entityId;

                if (pendingProducts.length > 0) {
                    await addProductToWishlist(prendinProductsArr, wishListId).then((res) => {
                        if (res.items.edges.length) {
                            localStorage.removeItem("wishlistItems");
                        }
                    });
                    globalInit(true);
                }

                if (fetching === true) {
                    wishlists.forEach((wishlist) => {
                        // Loop over all products in the wishlist and push them in a global array
                        wishlist.node.items.edges.forEach((product) => {
                            selectedProducts.push({ id: product.node.productEntityId, entityId: product.node.entityId });
                        });
                    });
                }

                // Now we loop over all products and set their status
                for (let i = 0; i < selectedProducts.length; i++) {
                    const product = document.querySelector(`[data-product-id="${selectedProducts[i].id}"]`);
                    if (product) {
                        product.classList.add(classWishlistButtonActive);
                        product.dataset.productEntityId = selectedProducts[i].entityId;
                    }
                }

                await addProductsToDOM(wishListId, wishlistProductsContainer);
                resolve();
            } else {
                if (pendingProducts.length > 0) {
                    createWishlist().then(async (res) => {
                        if (!res) {
                            console.log("Wishlist cannot be created");
                            resolve();
                            return;
                        }
                        wishListId = res;
                        await addProductToWishlist(pendingProducts, wishListId).then((response) => {
                            if (response.items.edges.length) {
                                localStorage.removeItem("wishlistItems");
                            }
                        });

                        globalInit(true);
                    });
                } else {
                    wishlistProductsContainer.innerHTML = "There are no products in your wishlist.";
                    resolve();
                }
            }
        });
    }

    /**
     * Hanle opening wishlist
     * @param {*} e
     */
    function handleOpenWl(e) {
        if (e) e.preventDefault();
        handleOverlay("wl-drawer", "add");
        document.querySelector(".wl-drawer").classList.add("is-open");
    }

    /**
     * Handle closing wishlist
     * @param {*} e
     */
    function handleCloseWl(e) {
        // e.preventDefault();

        handleOverlay("wl-drawer", "remove");
        document.querySelector(".wl-drawer").classList.remove("is-open", "wl-drawer--product-added");
    }

    function handleAddToCart(e) {
        e.preventDefault();
        const productId = e.target.closest(".wl__product").dataset.productId;
        const qty = parseInt(e.target.closest(".wl__product").querySelector(".form-increment .form-input").value);
        handleWlLoading("loading");

        // Handle button status
        addToCart(productId, qty)
            .then(async (res) => {
                if (res.status === 200) {
                    // Remove from Minicart
                    handleWlLoading();

                    // Switch drawers
                    handleCloseWl(e);

                    const evt = new Event("openMcDrawer");
                    document.dispatchEvent(evt);
                } else {
                    showAlertModal(res);
                }
            })
            .catch((e) => {
                console.log(e);
                handleWlLoading();
                showAlertModal(e);
            });
    }

    function handleQtyChange(e) {
        e.preventDefault();
        const mfunc = e.target.closest(".js-qty-btn").dataset.action;
        const qtyInput = e.target.closest(".form-increment").querySelector(".form-input");

        switch (mfunc) {
            case "dec":
                if (qtyInput.value > 1) {
                    qtyInput.value = parseInt(qtyInput.value) - 1;
                }
                return;
            case "inc":
                qtyInput.value = parseInt(qtyInput.value) + 1;
                return;
            default:
                return;
        }
    }

    /**
     * Listen to all clicks
     */
    document.addEventListener("click", async (e) => {
        if (e.target.closest(".j-card-wl-icon")) {
            e.preventDefault();
            const mainEl = e.target.closest(".j-card-wl-icon");
            handleWishlistButton(mainEl);
        }

        if (e.target.closest(".utility-icons__wishlist")) {
            handleOpenWl(e);
        }

        if (e.target.closest(".wl__header .close")) {
            handleCloseWl(e);
        }

        if (e.target.closest(".js-qty-btn")) {
            handleQtyChange(e);
        }

        if (!e.target.closest(".wl-drawer-wrap") && !e.target.closest(".utility-icons__wishlist") && !e.target.closest(".j-card-wl-icon")) {
            handleCloseWl(e);
        }

        if (e.target.closest(".wl-remove")) {
            const product = e.target.closest(".wl__product");
            const removeUrl = product.dataset.productRemoveurl;
            const urlParams = new URLSearchParams(removeUrl);
            const productId = urlParams.get("item_id");

            handleWlLoading("loading");

            const res = await removeProductFromWishlist(productId, wishListId);

            if (res.items.edges.length === 0) {
                window.location.reload();
            }

            // Remove product from DOM
            product.remove();

            // Refresh wishlist drawer
            handleWlLoading();

            //  Need a delay after removing product from wishlist.
            setTimeout(async () => {
                await globalInit(true);
            }, 10000);
        }

        if (e.target.closest(".js-button-wl-moveToCart") || e.target.closest(".js-button-cs-moveToCart")) {
            handleAddToCart(e);
        }

        // Storage Function
        if (e.target.closest(".wl-remove-storage")) {
            e.preventDefault();

            const product = e.target.closest(".wl__product");
            const productId = product.dataset.productId;
            handleRemoveProductFromStorage(productId);
        }
    });

    /**
     * Listen to custom event to reinitialize for e.g. on infinite scroll trigger and faceted search.
     */
    document.addEventListener("wishlistReload", () => {
        globalInit(false);
    });
    // Initialization
    globalInit(true);
}
