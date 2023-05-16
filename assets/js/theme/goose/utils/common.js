/**
 * Get Total Product Page Count
 *
 * @param {el} element  // dom element
 * @param {el} className // className check
 * @returns {String}
 */

import StencilUtils from "@bigcommerce/stencil-utils";
import { normalizeFormData } from "../../common/utils/api";

function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);

    return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

/**
 * Add product to cart
 * @param {*} productId
 * @param {*} qty
 * @returns
 */
async function addToCart(productId, qty) {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append("action", "add");
        form.append("product_id", productId);
        form.append("qty[]", qty);
        StencilUtils.api.cart.itemAdd(normalizeFormData(form), (err, response) => {
            const errorMessage = err || response.data.error;

            // Guard statement
            if (errorMessage) {
                // Strip the HTML from the error message
                reject({ error: errorMessage });
                return;
            }

            if (response.data.cart_item.id) {
                resolve({ itemId: response.data.cart_item.id, status: 200 });
            } else {
                reject({ res: response });
            }
        });
    });
}

/**
 * Pass element name and overlay status, make sure to add g-overlay element in document root.
 * we also need to add custom z-index for each element in overlays.scss using modifiers. E.g. g-overlay--nav (does not need to be exact name just something to relate an ek to)
 * @param {*} el
 * @param {*} status
 */
function handleOverlay(el, status) {
    const overlayEl = document.querySelector(".g-overlay");
    const body = document.querySelector("body");

    switch (status) {
        case "add":
            if (overlayEl.classList.length === 1) {
                overlayEl.classList.add("g-overlay--active");
                body.classList.add("g-body-overlay--active");
            }
            overlayEl.classList.add(`g-overlay--${el}`);
            break;
        case "remove":
            overlayEl.classList.remove(`g-overlay--${el}`);
            if (overlayEl.classList.length === 2) {
                overlayEl.classList.remove("g-overlay--active");
                body.classList.remove("g-body-overlay--active");
            }
            break;
        case "reset":
            overlayEl.className = ".g-overlay";
            break;
        default:
    }
}

const gCookies = {
    // setCookie("cookiename", cookieExist, COOKIE_EXPIRY_TIME);
    // example - setCookie("username", cookieExist, (0.5 * 60 * 1000)); this cookie expires in 30 seconds.
    // the cookie expiry time have to be in seconds so convert your time in seconds and after that pass it.
    setCookie(name, value, days) {
        var expires = "";

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }

        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    // get a cookie and Its value
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }

        return null;
    },

    // pass the name of the cookie as string which you want to check that if It exists or not.
    checkCookie(cookiename) {
        let cookieExist = getCookie(cookiename);

        if (cookieExist != "") {
            return cookieExist;
        }

        return false;
    },
};

function updateCartQty(secureBaseUrl, cartId) {
    const $body = $("body");
    const cartQtyPromise = new Promise((resolve, reject) => {
        StencilUtils.api.cart.getCartQuantity({ baseUrl: secureBaseUrl, cartId }, (err, qty) => {
            if (err) {
                // If this appears to be a 404 for the cart ID, set cart quantity to 0
                if (err === "Not Found") {
                    resolve(0);
                } else {
                    reject(err);
                }
            }
            resolve(qty);
        });
    });

    // If the Cart API gives us a different quantity number, update it
    cartQtyPromise.then((qty) => {
        const quantity = qty;
        $body.trigger("cart-quantity-update", quantity);
    });
}

/**
 * Remove duplicate entries from an array of objects
 * @param {*} array 
 * @returns 
 */
function deDuplicateArray(array) {
    return array.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.place === value.place && t.name === value.name
    ))
  )
}

/**
 * Shuffle an array
 * @param {*} array
 */
function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default {
    hasClass,
    gCookies,
    addToCart,
    handleOverlay,
    updateCartQty,
    shuffleArray,
    handleOverlay,
    deDuplicateArray
};
