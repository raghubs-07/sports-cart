import StencilUtils from "@bigcommerce/stencil-utils";
import "regenerator-runtime/runtime";
import { normalizeFormData } from "../common/utils/api";
import { showAlertModal } from "../global/modal";
import gCustomiseShirt from "./g-customise-shirt";
import gUtils from "../goose/utils";

const {
    product: { gUpdateProductAttributes },
} = gUtils;
/**
 * A pack product must contain a custom field named pack_products, with a value of comma separated list of product id's as value
 * If there's a discount for the pack a custom field name pack_discount should be set on the product as well, with a value of number which will translate to percentage discount. e.g value of 5 will set 5% discount on the entire pack.
 */

export default async function (context) {
    const priceContainer = document.querySelector(".product-view__price");
    let priceArr = [];
    let discountRate = 0;
    let qty = 1;
    const stockArr = [];


    /**
     * Return current cart data
     */
    async function getCart() {
        const result = fetch("/api/storefront/carts?include=lineItems.physicalItems.options")
            .then((response) => (response.status == 200 ? response.json() : response))
            .then((data) => {
                return data;
            })
            .catch((err) => console.log(err));

        return result;
    }

    /**
     * Set qty limit
     */
    function setMaxQtyLimit() {
        const qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");
        const addToCartNoticeBox = document.querySelector("#add-to-cart-wrapper .productAttributes-message");
        const addToCartNotice = addToCartNoticeBox.querySelector(".alertBox-message");
        const qtyArr = stockArr.map(item => parseInt(item.stock));
        const minQty = Math.min(...qtyArr);

        qtyBox.dataset.packQtyMax = minQty;

        // Check if value higher than max, bring it down
        const currentValue = qtyBox.value;

        if (currentValue > minQty) {
            qtyBox.value = minQty;
        }
        addToCartNoticeBox.style.display = 'block';
        addToCartNotice.innerHTML = `Max product quantity for this combination is ${minQty}`;
    }

    /**
     * Get product variant details based on chosen options.
     * @param {*} productId
     * @param {*} productVariantOptions
     */
    async function getProductVariant(productId, productVariantOptions, scope) {
        return new Promise((resolve, reject) => {
            StencilUtils.api.productAttributes.optionChange(productId, productVariantOptions, "goose/json-this", (err, response) => {
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
        });
    }

    /**
     *
     * @param {*} productId
     */
    async function getProductOptionsFromPage(productId) {
        return new Promise((resolve, reject) => {
            StencilUtils.api.product.getById(
                productId,
                {
                    template: { html: "goose/product/product-options", json: "goose/json-this" },
                },
                (err, response) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }

                    resolve(response);
                }
            );
        });
    }

    /**
     *
     * @param {*} productArr
     * @param {*} cartId
     * @returns
     */
    async function addProductArrToCart(productArr, cartId) {
        const lineItemArr = {
            lineItems: [],
        };

        for (let i = 0; i < productArr.length; i++) {
            lineItemArr.lineItems.push({
                quantity: qty,
                productId: productArr[i].productId,
                optionSelections: productArr[i].productVariantOptions,
            });
        }

        return new Promise((resolve, reject) => {
            fetch(`/api/storefront/carts/${cartId}/items`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify(lineItemArr),
            })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response);
                        const evt = new Event("openMcDrawer");
                        document.dispatchEvent(evt);
                        return response.json();
                    } else {
                        reject(response);
                        return response;
                    }
                })
                .then((data) => {
                    return data;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    /**
     *
     * @param {*} lineItem
     * @returns
     */
    async function createCart(productArr) {
        const form = new FormData();
        let finalRes;
        form.append("product_id", productArr[0].productId);
        form.append("action", "add");
        form.append("qty[]", qty);

        productArr[0].productVariantOptions.forEach((option) => {
            form.append(`attribute[${option.optionId}]`, option.optionValue);
        });

        const result1 = new Promise((resolve, reject) => {
            StencilUtils.api.cart.itemAdd(normalizeFormData(form), (err, response) => {
                const errorMessage = err || response.data.error;

                if (errorMessage) {
                    reject(errorMessage);
                }

                if (response) {
                    console.log("Cart Created");
                    resolve(response);
                }
            });
        });

        await result1.then(async (res) => {
            if (productArr.length > 1) {
                const productArr2 = [];
                for (let i = 1; i < productArr.length; i++) {
                    productArr2.push(productArr[i]);
                }

                const result2 = await addProductArrToCart(productArr2, res.data.cart_id);

                finalRes = result2;
            } else {
                finalRes = result1;
            }
        });

        return finalRes;
    }

    /**
     * Set innerhtml price value and discounted value. Pass discount rate as 0 if no discount.
     * @param {*} totalPrice
     * @param {*} discountRate
     */
    function setProductPrice(totalPrice, discountRate) {
        const discountedPrice = (totalPrice - (discountRate / 100) * totalPrice).toFixed(2);

        if (discountRate !== 0) {
            priceContainer.innerHTML = `<div class="price-section price-section--withTax non-sale-price--withTax">
            <span data-product-non-sale-price-with-tax="" class="price price--non-sale">
                $${totalPrice.toFixed(2)}
            </span>
            </div>
            <div class="price-section price-section--withTax">
                <span data-product-price-with-tax="" class="price price--withTax price--sale">$${discountedPrice}</span> 
            </div>`;
        } else {
            priceContainer.innerHTML = `<div class="price-section price-section--withTax">
            <span data-product-price-with-tax="" class="price price--withTax ">$${totalPrice.toFixed(2)}</span>
        </div>`;
        }
    }

    /**
     * Update global array of product prices.
     * @param {*} productId
     * @param {*} price
     */
    function updateProductPriceArr(productId, price) {
        const objIndex = priceArr.findIndex((obj) => obj.productId == productId);

        if (objIndex === -1) {
            priceArr.push({ productId, price });
        } else {
            priceArr[objIndex] = { productId, price };
        }

        // Now we set the price.
        let totalPrice = 0;
        priceArr.forEach((el) => {
            totalPrice += parseFloat(el.price);
        });

        // Finally display price
        setProductPrice(totalPrice, discountRate);
    }

    /**
     * Handle change of product options
     * @param {*} e
     */
    async function handleProductOptionChange(e) {
        const productForm = e.target.closest(".sub-product");
        const productId = productForm.dataset.productId;

        const res = await getProductVariant(productId, new URLSearchParams(new FormData(productForm)).toString());

        updateProductPriceArr(productId, res.data.price.with_tax.value);

        /**
         * Add stock level for each variant. Please make sure show stock is enabled in backend of bc.
         */
        if (!res.data.stock) return;

        const objIndex = stockArr.findIndex((obj => obj.productId == productId))

        if (objIndex === -1) {
            stockArr.push({productId, stock: res.data.stock})
        } else {
             stockArr[objIndex].stock = res.data.stock
        }

        setMaxQtyLimit();
    }

    /**
     * Add all products of pack product to cart, based on dropdown selections.
     * @returns
     */
    async function addAllProductsToCart() {
        const cartBtn = document.getElementById("add-to-cart-pack");
        const originalBtnValue = cartBtn.dataset.value;
        const waitMessage = cartBtn.dataset.waitMessage;

        const cart = await getCart().catch((err) => {
            console.log("Error:", err);
        });

        const productsArr = [];
        const validityArr = [];

        document.querySelectorAll(".sub-product").forEach((el) => {
            validityArr.push(el.reportValidity());
        });

        if (validityArr.includes(false)) return;

        cartBtn.setAttribute("disabled", "true");
        cartBtn.innerHTML = waitMessage;

        document.querySelectorAll(".sub-product").forEach(async (el) => {
            const productId = parseInt(el.dataset.productId);
            const productVariantOptions = [];
            const form = new FormData(el);

            for (const pair of form.entries()) {
                productVariantOptions.push({ optionId: parseInt(pair[0].split("[")[1].split("]")[0]), optionValue: pair[1] }); // Stripping non int stuff
            }

            productsArr.push({ productId, productVariantOptions });
        });

        // Update glbal qty var
        qty = parseInt(document.querySelector(".form-input--incrementTotal").value);

        // Begin - Check if pack already exists
        const arr1 = [];
        const arr2 = [];

        productsArr.forEach(el => arr1.push(el.productId));

        cart[0]?.lineItems.physicalItems.forEach(el => arr2.push(el.productId));
        
        const hasAllIitems = arr1.every(el => arr2.includes(el));

        // if (hasAllIitems) {
        //     showAlertModal("Due to technical limitations you can only add one pack in the cart at once for now.");
        //     cartBtn.removeAttribute("disabled");
        //     cartBtn.innerHTML = originalBtnValue;
        //     return;
        // }
        // End - Check if pack already exists
    
        const res = cart.length ? await addProductArrToCart(productsArr, cart[0].id) : await createCart(productsArr);

        cartBtn.removeAttribute("disabled");
        cartBtn.innerHTML = originalBtnValue;

        return res;
    }

    function getPackProducts() {
        // Check if a custom field called pack_products exists
        const customFields = context.product.custom_fields;
        const packFields = customFields ? customFields?.filter((field) => field.name == "pack_products") : [];

        if (packFields.length === 0) return;

        // Check if discount rate exists on pack product.
        customFields.forEach((field) => {
            if (field.name === "pack_discount") {
                discountRate = parseInt(field.value);
            }
        });

        const promiseArr = [];
        const packProducts = context.product.custom_fields.filter((field) => field.name == "pack_products");

        if (packProducts.length === 0) return;

        const packProductIds = packProducts[0].value.split(",");

        for (let i = 0; i < packProductIds.length; i++) {
            promiseArr.push(getProductOptionsFromPage(packProductIds[i]));
        }

        Promise.all(promiseArr).then((res) => {

            const optionsContainer = document.createElement("div");
            const packProductsBlock = document.querySelector(".product-view__packProduct");
            optionsContainer.setAttribute("class", "product-options-container");
            packProductsBlock.style.display = "flex";
            document.querySelector(".product-view__packProduct").insertAdjacentElement("afterbegin", optionsContainer);

            // Now we parse all products response and inject into DOM
            res.forEach((product) => {
                const productId = JSON.parse(product.json).product.id;
                const price = JSON.parse(product.json).product.price.with_tax.value;
 
                document.querySelector(".product-options-container").insertAdjacentHTML("beforeend", product.html);
                const scope = document.querySelector(`.sub-product[data-product-id="${JSON.parse(product.json).product.id}"]`);
                updateProductPriceArr(productId, price);
                getProductVariant(productId, new URLSearchParams(new FormData(product.html.outerHTML)).toString(), scope);
                gCustomiseShirt(JSON.parse(product.json).product);
            });
        });

        document.getElementById("add-to-cart-pack").addEventListener("click", async (e) => {
            e.preventDefault();
            // const productData
            await addAllProductsToCart();
        });

        document.addEventListener("click", e => {
            const qtyArr = stockArr.map(item => parseInt(item.stock));
            const minQty = Math.min(...qtyArr);

            // Handle qty buttons
            if (e.target.closest("[data-action='inc']")) {
                const incBtn = e.target.closest("[data-action='inc']");
                const qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");

                if (qtyBox.value >= minQty) {
                    e.preventDefault();
                    qtyBox.value = minQty;
                    incBtn.setAttribute("disabled", true);
                }
            }

            if (e.target.closest("[data-action='dec']")) {
                const incBtn = e.target.closest(".form-increment").querySelector("[data-action='inc']");
                const qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");

                if (qtyBox.value < minQty) {
                    incBtn.removeAttribute("disabled");
                }
            }
        })

        // Change event listener
        document.addEventListener("change", (e) => {
            const qtyArr = stockArr.map(item => parseInt(item.stock));
            const minQty = Math.min(...qtyArr);

            if (e.target.closest(".sub-product")) {
                handleProductOptionChange(e);
            }

            if (e.target.closest(".form-increment[data-quantity-change]")) {
                const qtyBox = document.querySelector(".form-increment[data-quantity-change] .form-input");
                if (qtyBox.value > minQty) {
                    qtyBox.value = minQty;
                }
            }
        });
    }

    // Ininitalization.
    function init() {
        getPackProducts();
    }

    init();
}
