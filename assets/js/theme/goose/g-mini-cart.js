import StencilUtils from "@bigcommerce/stencil-utils";
import { showAlertModal } from "../global/modal";
import gUtils from "../goose/utils";
import { gSuggested } from "./g-card";
import $clamp from "clamp-js";

const {
    common: { addToCart, deDuplicateArray, updateCartQty, handleOverlay, shuffleArray },
} = gUtils;

export default function (context, secureBaseUrl, cartId) {
    const body = document.body;
    const $body = $("body");
    const mcWrapper = document.querySelector(".mc-drawer-wrap");
    const mcDrawer = mcWrapper.querySelector(".mc");
    const mcCrossSellDrawer = mcWrapper.querySelector(".mc-cross-sell");
    const mcMobileCrossSellDrawer = mcWrapper.querySelector(".mc__related-products");
    const mcTitle = document.querySelector(".mc__header .cart-summary__header");
    const mcBody = document.querySelector(".mc__body");
    const mcItems = document.querySelector(".mc__items");
    const mcFooter = document.querySelector(".mc__footer");
    // const minShipping = document.querySelector(".free-shipping-bar").dataset.shippingThreshold;
    const cssRootVars = document.querySelector(":root");

    function handleMiniCartQtyUpdate(event) {
        const target = event.target.closest("[data-g-cart-update]");
        const itemId = target.dataset.cartItemid;
        // this.$activeCartItemId = itemId;
        // this.$activeCartItemBtnAction = $target.data('action');

        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data("quantityMax"), 10);
        const minQty = parseInt($el.data("quantityMin"), 10);
        const minError = $el.data("quantityMinError");
        const maxError = $el.data("quantityMaxError");
        const newQty = target.dataset.action === "inc" ? oldQty + 1 : oldQty - 1;
        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return showAlertModal(minError);
        } else if (maxQty > 0 && newQty > maxQty) {
            return showAlertModal(maxError);
        }

        StencilUtils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            if (response.data.status === "succeed") {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = newQty === 0;
                getMiniCartItems();
            } else {
                $el.val(oldQty);
                showAlertModal(response.data.errors.join("\n"));
            }
        });
    }

    // Get Related Products from gql based on array of product ids
    async function getRelatesItems(productArr) {
        const relatedProducts = [];

        const results = await fetch("/graphql", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.storefront_api}`,
            },
            body: JSON.stringify({
                query: `query getRelatedProducts($productArray: [Int!]) {
                    site {
                      products(entityIds: $productArray) {
                        edges {
                          node {
                            name
                            id
                            entityId
                            relatedProducts {
                              edges {
                                node{
                                  name
                                  id
                                  path
                                  entityId
                                  defaultImage {
                                    urlOriginal
                                  }
                                  prices(includeTax: true) {
                                    price {
                                        value
                                        formatted
                                      }
                                      basePrice {
                                        value
                                        formatted
                                      }
                                      salePrice {
                                        value
                                        formatted
                                      }
                                      retailPrice {
                                        value
                                        formatted
                                      }
                                  }
                                  variants {
                                    edges {
                                      node {
                                        id
                                        sku
                                      }
                                    }
                                  }
                                  availabilityV2 {
                                    status
                                  }
                                  customFields {
                                    edges {
                                      node {
                                        name
                                      }
                                    }
                                  }
                                  inventory {
                                    isInStock
                                  }
                                  showCartAction
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }`,
                variables: {
                    productArray: productArr,
                },
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((error) => console.error(error));

        // Get related products for each product and push in an array
        results.data.site.products.edges.forEach((product) => {
            product.node.relatedProducts.edges.forEach((relatedProduct) => {
                relatedProducts.push(relatedProduct.node);
            });
        });

        const filteredRelatedProducts = deDuplicateArray(relatedProducts);
        return shuffleArray(filteredRelatedProducts).slice(0, 4); // Finally we shuffle products in random order and take first 4 products.
    }

    // Parse raw product data to html
    function parseDataToProductCard(data) {
        let packCfFields = data.customFields.edges.filter((field) => field.node.name == "pack_products");
        const isPackProduct = packCfFields.length == 0 ? false : true;
        const hasVariants = data.variants.edges.length == 1 ? false : true;
        const imageUrl = data.defaultImage !== null ? data.defaultImage.urlOriginal : context.placeholder_product;

        const dataObj = {
            title: data.name,
            path: data.path,
            id: data.entityId,
            image: imageUrl,
            isPackProduct,
            hasVariants,
            isInStock: data.inventory.isInStock,
            showCartAction: data.showCartAction,
            price: {
                basePrice: data.prices.basePrice?.formatted,
                salePrice: data.prices.salePrice?.formatted,
            },
        };

        return gSuggested(dataObj);
    }

    /**
     * Handle getting and displaying related products
     * @param {*} productArr
     */
    async function handleRelatedItems(productArr) {
        const relatedItemsContainer = document.querySelector(".mc-cross-sell__body");
        const relatedMobileItemsContainer = document.querySelector(".mc__related-products");

        // Set loader on related products container
        relatedItemsContainer.classList.add("g-is-loading");
        relatedMobileItemsContainer.classList.add("g-is-loading");

        // Fetch related products
        const products = await getRelatesItems(productArr);
        const relateItemsInnerContainer = document.createElement("div");
        relateItemsInnerContainer.classList.add("cs-items");

        const relateMobileItemsInnerContainer = document.createElement("div");
        relateMobileItemsInnerContainer.classList.add("cs-wrapper");

        const relateMobileItems = document.createElement("div");
        relateMobileItems.classList.add("cs-items");

        const mobileHeading = document.createElement("div");
        mobileHeading.classList.add("related-heading");
        mobileHeading.innerHTML = "Related Products"
        relateMobileItemsInnerContainer.appendChild(mobileHeading);

        // Parse related products in container
        if (products.length) {
            products.forEach((productData) => {
                const parsedProduct = parseDataToProductCard(productData);
                relateItemsInnerContainer.insertAdjacentHTML("beforeend", parsedProduct);
                relateMobileItems.insertAdjacentHTML("beforeend", parsedProduct);
            });
            relatedItemsContainer.innerHTML = relateItemsInnerContainer.outerHTML;
            relateMobileItemsInnerContainer.appendChild(relateMobileItems);
            relatedMobileItemsContainer.innerHTML = relateMobileItemsInnerContainer.outerHTML;
        } else {
            // we can handle this even better maybe?
            relateItemsInnerContainer.insertAdjacentHTML("beforeend", "No suggested products found.");
            relateMobileItemsInnerContainer.insertAdjacentHTML("beforeend", "No suggested products found.");
            relatedItemsContainer.innerHTML = relateItemsInnerContainer.outerHTML;
            relateMobileItemsInnerContainer.appendChild(relateMobileItems);
            relatedMobileItemsContainer.innerHTML = relateMobileItemsInnerContainer.outerHTML;
        }

        relatedItemsContainer.classList.remove("g-is-loading");
        relatedMobileItemsContainer.classList.remove("g-is-loading");

        let FlickityEle = relatedMobileItemsContainer.querySelector('.cs-items')

        let flkty = new Flickity(FlickityEle, {
            freeScroll: true,
            pageDots: false,
            freeScroll: true,
            arrowShape: { 
                x0: 10,
                x1: 60, y1: 50,
                x2: 70, y2: 50,
                x3: 20
              }
        });
    }

    /**
     * Self explanatory - Remove items from cart
     * @param {*} itemId
     */
    function miniCartItemRemove(itemId) {
        StencilUtils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === "succeed") {
                getMiniCartItems();
            } else {
                showAlertModal(response.data.errors.join("\n"));
            }
        });
    }

    // Fn adapted from cart.js
    function handleMiniCartItemRemove(event) {
        const target = event.target.closest(".g-cart-remove");
        const itemId = target.dataset.cartItemid;
        const string = target.dataset.confirmDelete;

        miniCartItemRemove(itemId);

        event.preventDefault();
    }

    // function handleShippingBar(total) {
    //     // Calculate percentage
    //     const percentage = (100 * total) / minShipping;
    //     const amtNeeded = (minShipping - total).toFixed(2);
    //     const progressBar = document.querySelector(".free-shipping-bar__bottom");
    //     const targetBubble = document.querySelector(".free-shipping-bar__right");

    //     if (total === 0) {
    //         mcDrawer.classList.add("mc--empty");
    //     } else {
    //         mcDrawer.classList.remove("mc--empty");
    //     }

    //     const shippingBarProgressLine = document.querySelector(".free-shipping-bar__progress");
    //     shippingBarProgressLine.style.width = percentage + "%";

    //     if (percentage < 100) {
    //         progressBar.innerHTML = `Spend an extra $${amtNeeded} to unlock Free Shipping`;
    //         targetBubble.classList.remove("target-complete");
    //     } else {
    //         progressBar.innerHTML = `Congratulations!. Free Shipping unlocked.`;
    //         targetBubble.classList.add("target-complete");
    //     }
    // }

    function getMiniCartItems(isUpdate = false) {
        let cartTotal = 0;

        const options = {
            template: {
                content: "goose/minicart/g-minicart-content",
                totals: "goose/minicart/g-minicart-totals",
                pageTitle: "goose/minicart/g-minicart-page-title",
                statusMessages: "goose/minicart/g-minicart-status-messages",
                cartTotal: "goose/json-this",
            },
        };

        mcDrawer.classList.add("g-is-loading");

        StencilUtils.api.cart.getContent(options, (err, response) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(response);

            const content = new DOMParser().parseFromString(response.content, "text/html");

            cartTotal += JSON.parse(response.cartTotal).cart.grand_total.value;
            mcDrawer.classList.remove("g-is-loading");
            mcTitle.innerHTML = response.pageTitle;
            mcItems.innerHTML = response.content;

            const mcProductList = mcItems.querySelector(".mc__products-list");
            const mcNoticeContainer = mcItems.querySelector(".mc__notice-container");
            mcNoticeContainer.innerHTML = response.statusMessages;
            mcFooter.innerHTML = response.totals;

            // handleShippingBar(cartTotal);
            updateCartQty(secureBaseUrl, cartId);

            // Finally we get some related products and pop them in.
            const proudctArr = [];
            JSON.parse(response.cartTotal).cart.items.forEach((item) => proudctArr.push(item.product_id));
            handleRelatedItems(proudctArr);
        });
    }

    function handleCrossSellDrawerToggle(event) {
        const toggle = event.target.closest(".js-cross-sell-toggle");

        if (!toggle) return;

        mcCrossSellDrawer.classList.add("is-open");
        mcMobileCrossSellDrawer.classList.add("mobile");
        mcBody.classList.remove("h-100");

        handleUpdateDrawerState();
    }

    function handleCloseDrawer(event) {
        const closeBtn = event.target.closest(".js-mc-drawer-close");
        const mcSideDrawer = event.target.closest(".mc-drawer.is-open");

        if (!mcSideDrawer || !closeBtn) return;

        mcSideDrawer.classList.remove("is-open");

        handleUpdateDrawerState();
    }

    function handleUpdateDrawerState(bool = false) {
        if (!mcWrapper) return;

        const mcDrawerState = bool;

        // Handle cross sell panel should only be open when mc is open
        if (mcDrawerState === false) {
            mcCrossSellDrawer.classList.remove("is-open");
            mcMobileCrossSellDrawer.classList.remove("mobile");
            mcBody.classList.add("h-100");
            mcDrawer.classList.remove("is-open");
            mcWrapper.dataset.mcOpen = mcDrawerState;
        }

        const mcCrossSellDrawerState = document.querySelector(".mc-cross-sell").classList.contains("is-open");

        if (mcDrawerState === true) {
            mcDrawer.classList.add("is-open");
            mcWrapper.dataset.mcOpen = mcDrawerState;
        }

        //Update drawer open states
        mcWrapper.dataset.mcCrossSellOpen = mcCrossSellDrawerState;

        // Update grey curtain
        mcDrawerState ? handleOverlay("mc-drawer", "add") : handleOverlay("mc-drawer", "remove");
    }

    function handleAddToCartButtonState(button, buttonContainer, state) {
        const buttonStates = ["button--loading", "button--success", "button--error"];
        button.classList.remove(...buttonStates);
        const defaultButtonText = "Add to Cart";
        // Handle state
        switch (state) {
            case "loading":
                button.innerHTML = "Please wait";
                button.classList.add(`button--${state}`);
                button.disabled = true;
                buttonContainer.style.opacity = "1";
                break;
            case "success":
                button.classList.add(`button--${state}`);
                button.innerHTML = "Product Added";
                setTimeout(function () {
                    handleAddToCartButtonState(button, buttonContainer, "");
                }, 4000);
                button.disabled = false;
                break;
            case "error":
                button.classList.add(`button--${state}`);
                button.innerHTML = "Error Occured";
                setTimeout(function () {
                    handleAddToCartButtonState(button, buttonContainer, "");
                }, 2000);
                button.disabled = true;
                break;
            default:
                button.innerHTML = defaultButtonText;
                button.disabled = false;
                buttonContainer.style.removeProperty("opacity");
        }
    }

    async function handleAddToCart(event) {
        event.preventDefault();

        const button = event.target.closest(".g-button");
        const productId = button.dataset.productId;
        const buttonContainer = event.target.closest(".card-figcaption");
        // const productTitle = event.target.closest(".card").dataset.productTitle;

        handleAddToCartButtonState(button, buttonContainer, "loading");

        await gUtils.common
            .addToCart(productId, 1)
            .then((res) => {
                if (res.status === 200) {
                    handleAddToCartButtonState(button, buttonContainer, "success");
                    handleOpenMcnCs(event);
                    // setTimeout(() => {
                    //     mcCrossSellDrawer.classList.add("is-open");
                    //     document.querySelector(".mc-cross-sell__header .text").innerHTML = `You added 1x ${productTitle} to your cart`;
                    //     handleUpdateDrawerState(true);
                    // }, 1000);
                } else {
                    handleAddToCartButtonState(button, buttonContainer, "error");
                    showAlertModal(res);
                }
            })
            .catch((e) => {
                console.log(e);
                showAlertModal(e.error);
                handleAddToCartButtonState(button, buttonContainer, "error");
            });
    }

    /**
     * Open Minicart & Load Products
     * @param {*} event
     */
    function handleOpenMc(event) {
        handleUpdateDrawerState(true);

        getMiniCartItems();
    }

    /**
     * Open Minicart & Cross Sell Drawer
     * @param {*} event
     */
    function handleOpenMcnCs(event) {
        const productTitle = event.target.closest("[data-product-title]").dataset.productTitle;

        handleUpdateDrawerState(true);
        getMiniCartItems();

        if (!productTitle) return;

        setTimeout(() => {
            mcCrossSellDrawer.classList.add("is-open");
            mcMobileCrossSellDrawer.classList.add("mobile");
            mcBody.classList.remove("h-100");
            const mcCrossSellHeader = document.querySelector(".mc-cross-sell__header .text");
            mcCrossSellHeader.innerHTML = `<p>You added 1x ${productTitle} to your cart</p>`;
            $clamp(mcCrossSellHeader, { clamp: 2 });
            handleUpdateDrawerState(true);
        }, 1000);
    }

    function clickHandler(event) {
        if (!event) return;

        // Close Drawer
        if (event.target.closest(".mc-drawer.is-open")) {
            // event.preventDefault(); // Conflicting with inner buttons of drawer, needs better implementation
            handleCloseDrawer(event);
        }

        // Update item qty
        if (event.target.closest("[data-g-cart-update]")) {
            handleMiniCartQtyUpdate(event);
        }

        // Remove Item
        if (event.target.closest(".g-cart-remove")) {
            handleMiniCartItemRemove(event);
        }

        // Add Item to Cart
        if (event.target.closest('[data-button-type="add-cart"')) {
            handleAddToCart(event);
        }

        // Open mini-cart from cart icon
        if (event.target.closest(".utility-icons__cart")) {
            event.preventDefault();
            handleOpenMc(event);
        }

        // Close Drawer on outside click
        if (!event.target.closest(".mc-drawer.is-open") && !event.target.closest(".utility-icons__cart")) {
            document.querySelectorAll(".mc-drawer.is-open").forEach((el) => el.classList.remove("is-open"));
            handleOverlay("mc-drawer", "remove");
        }
    }

    function init() {
        handleUpdateDrawerState();
    }

    //------ Inits and Event Listeners
    document.addEventListener("click", (event) => clickHandler(event), false);
    document.addEventListener("openMcDrawer", (e) => handleOpenMc(e));
    document.addEventListener("openMc&CrossSellDrawer", (e) => handleOpenMcnCs(e));
    // document.addEventListener("keydown", keyDownHandler, false);

    init();
}
