import gUtils from "../goose/utils";
// Import Swiper and modules
import Swiper, { Navigation, Pagination, Scrollbar } from "swiper";

const {
    swiper: { gInitSwiperSliders },
    stencil: { gGetPage },
} = gUtils;

export default function () {
    const tabPanelShopProducts = document.querySelectorAll(".js-shop-products");

    const productList = [];

    tabPanelShopProducts.forEach((products) => {
        const categoryUrl = products.getAttribute("data-category-url");

        const config = {
            category: {
                products: {
                    limit: 12,
                },
            },
        };

        productList.push(gGetPage(categoryUrl, "goose/product-card-carousel", config, products));
    });

    productList.forEach((item) => {
        item.then((res) => {
            res.target.innerHTML = res.response;

            return res.target.querySelectorAll("[data-g-swiper]");
        })
            .then((swiperSliders) => {
                const swiperConfig = {
                    modules: [Navigation, Pagination, Scrollbar],
                    slidesPerView: 2,
                    spaceBetween: 32,
                    breakpoints: {
                        750: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    },
                    scrollbar: {
                        el: ".swiper-scrollbar",
                        draggable: true,
                    },
                };

                gInitSwiperSliders(swiperSliders, swiperConfig);
            })
            .catch((err) => console.log(err));
    });
}
