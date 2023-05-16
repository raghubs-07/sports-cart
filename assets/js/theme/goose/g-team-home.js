import gUtils from "../goose/utils";
const {
    stencil: { gGetPage },
} = gUtils;

export default function () {
    const topGutter = document.querySelector(".top-gutter");
    const header = document.querySelector(".g-header");
    const uspBar = document.querySelector(".usp-bar");
    const headerHeight = topGutter.offsetHeight + header.offsetHeight + uspBar.offsetHeight;

    function init() {
        document.body.setAttribute("style", `--winHeight: ${innerHeight}px; --headerHeight: ${headerHeight}px`);

        const teamHomeFeaturedProducts = document.querySelectorAll(".js-team-featured-products");

        const productList = [];

        teamHomeFeaturedProducts.forEach((featuredProducts) => {
            const categoryUrl = featuredProducts.getAttribute("data-category-url");

            productList.push(gGetPage(categoryUrl, "goose/product-card-list", { category: { products: { limit: 4 } } }, featuredProducts));
        });

        productList.forEach((item) => {
            item.then((res) => {
                res.target.innerHTML = res.response;
            }).catch((err) => console.log(err));
        });
    }

    let resizeTimer;

    $(window).on("resize", function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            document.body.setAttribute("style", `--winHeight: ${innerHeight}px; --headerHeight: ${headerHeight}px`);
        }, 250);
    });

    //------ Inits and Event Listeners
    init();
}
