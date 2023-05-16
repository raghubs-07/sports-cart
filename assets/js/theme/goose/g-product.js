
import StencilUtils from "@bigcommerce/stencil-utils";
import { Fancybox } from "@fancyapps/ui";

export default function (context) { 

    /**
     * Get product variant details based on chosen options.
     * @param {*} productId 
     * @param {*} productVariantOptions 
     */
    async function getProductVariant(productId, productVariantOptions) {
        return new Promise((resolve, reject) => {
            StencilUtils.api.productAttributes.optionChange(productId, productVariantOptions, 'goose/json-this', (err, response) => {
                console.log(productVariantOptions);
                console.log(productId)
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                resolve(response);
            })
        })

    }

    if (context.template == "pages/product") {

        Fancybox.bind("[data-fancybox]", {
            // Your options go here
          });

        //   Link Buy Now Button
        const buyNowBtn = document.querySelector(".js-button-buyNow");

        if (!buyNowBtn) return;

        buyNowBtn.addEventListener("click", async e => {
            e.preventDefault();

            const productForm = document.querySelector(".form--product");
            const validity = productForm.reportValidity();

            if (!validity) return;

            const res = await getProductVariant(context.product.id, new URLSearchParams(new FormData(productForm)).toString());
            const buyNowUrl = `/cart.php?action=buy&sku=${res.data.sku}`;
            window.location.href = buyNowUrl;
        })

    }
}
