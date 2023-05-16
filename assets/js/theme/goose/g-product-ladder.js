import { tools } from "@bigcommerce/stencil-utils";
import gUtils from "../goose/utils";

const {
    stencil: { gGetPage },
} = gUtils;

export default function (context) {
    const productLadder = document.querySelectorAll(".js-product-ladder");
    const productList = [];

    productLadder.forEach((ladder) => {
        const categoryUrl = ladder.getAttribute("data-category-url");
        productList.push(gGetPage(categoryUrl, "goose/json-this", { category: { products: { limit: 5 } } }, ladder));
    });

    productList.forEach((productListItem) => {
        productListItem
            .then((res) => {
                const ladderBody = res.target.querySelector("tbody");
                const products = JSON.parse(res.response).category.products;

                products.forEach((product, index) => {
                    const image = product.image ? product.image.data : context.placeholder_product;

                    const html = `
                    <tr q-component="ladder-body-row" class="ladder__row u-border-bottom">
                        <td class="ladder__item ladder__item--position">
                            <span class="ladder-position">${index + 1}</span>
                        </td>
                        <td class="ladder__item ladder__item--product">
                            <a href="${product.url}" class="ladder-product">
                                <span class="ladder-product__img">
                                    <img alt="${product.image ? product.image.alt : product.name}" src="${tools.image.getSrc(image, {
                        "1x": "54x54",
                    })}" srcset="${tools.imageSrcset.getSrcset(image, {
                        "1x": "54x54",
                    })}" />
                                </span>
                                <span class="ladder-product__name">
                                    ${product.name}
                                </span>
                            </a>
                        </td>
                        ${
                            product.price?.sale_price_with_tax
                                ? `<td class="ladder__item ladder__item--price">
                        <span class="ladder__item-price--non-sale">${product.price.with_tax.formatted}</span>
                        <span class="ladder__item-price--sale">${product.price.with_tax.formatted}</span>
                        </td>`
                                : `<td class="ladder__item ladder__item--price">
                            ${product.price.with_tax.formatted}
                        </td>`
                        }
                    </tr>
                `;

                    ladderBody.innerHTML = ladderBody.innerHTML + html;
                });
            })
            .catch((err) => console.log(err));
    });
}
