import StencilUtils from "@bigcommerce/stencil-utils";

export default function () {

    const categoryLinks = document.getElementsByClassName('js-category-link');
    
    /*
    ** Set first category active on page load
    */
   if (categoryLinks.length > 0) {
       const firstCategoryLink = categoryLinks[0];
       const firstProductList = document.getElementsByClassName('js-category-products')[0];

       firstCategoryLink.setAttribute("aria-selected", "true");
       firstProductList.removeAttribute("hidden");
    }


    /**
     * Fetch products as a grid from category based on URL
     * @param {*} category 
     * @returns 
     */

    async function getProductsFromCategory(category) {
        return new Promise((resolve, reject) => {
            StencilUtils.api.getPage(category, {
                template: 'goose/g-grid',
            }, (err, response) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(response);
            });
        });
    }

    const categoryProductsContainers = document.querySelectorAll(".js-category-products");
    categoryProductsContainers.forEach((container) => {
        let categoryUrl = container.getAttribute("data-category-url");
        let productList = [];

        productList.push(getProductsFromCategory(categoryUrl));

        Promise.all(productList)
            .then(response => {
                container.innerHTML = response;
            })
    });

}
