// Js version of card
const gSuggested = (data) => `<li class="cs-item">
<div class="wl__product" data-item-row="" data-product-id="${data.id}" data-name="${data.title}" data-price="${data.price}">
    <div class="wl__product__figure-container">
        <div class="wl__product__figure">
                <img src="${data.image}" alt="${data.title}" data-sizes="auto" class="wl__product-image lazyautosizes lazyloaded" loading="lazy" sizes="104px">
        </div>
    </div>
    <div class="wl__product__detail">
            <a class="wl__product__title" href="${data.path}">${data.title}</a>
            <div class="wl__product__price-container">
                ${data.price.salePrice !== undefined ? 
                    `<div class="price-section price-section--withTax non-sale-price--withTax">
                        <span data-product-non-sale-price-with-tax="" class="price price--non-sale">
                            ${data.price.basePrice}
                        </span>
                    </div>
                    <div class="price-section price-section--withTax">
                        <span data-product-price-with-tax="" class="price price--withTax price--sale">${data.price.salePrice}</span>
                    </div>`
                : 
                `<span class="wl__product__price ">${data.price.basePrice}</span>` }
            </div>
    </div>
    ${data.isPackProduct == true || data.hasVariants == true  ? 
        `<a href="${data.path}" class="g-button g-button--primary g-button--fullbleed">Choose Options</a>`
        : data.isInStock == true && data.showCartAction == true ? `<a href="#" class="js-button-cs-moveToCart g-button g-button--primary g-button--fullbleed">Add to Cart</a>` : ``
    }
</div></li>`;

export {
    gSuggested
}
