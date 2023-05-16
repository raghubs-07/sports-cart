import StencilUtils from "@bigcommerce/stencil-utils";
import urlUtils from "../common/utils/url-utils";
import gUtils from "../goose/utils";

const {
    common: { handleOverlay },
} = gUtils;

const tabletBreakpoint = 1025;

export default function () {
    const filterDrawer = document.querySelector(".fb-drawer");

    if (!filterDrawer) return;

    function handleFilterToggle(e) {
        filterDrawer.classList.toggle("is-open");
    }

    function handlFilterClose(e) {
        filterDrawer.classList.remove("is-open");
        handleOverlay("fb-drawer", "remove");
    }

    function resetUrl() {
        urlUtils.goToUrl(window.location.href.split("?")[0]);
    }

    function enableSubCatExpand() {
        if (window.innerWidth < tabletBreakpoint) return;

        let length = 0;
        const subCatNavItems = document.querySelectorAll(".sub-cat-nav .sub-cat-nav__list .sub-cat-nav__item");
        const subCatNavList = document.querySelector(".sub-cat-nav .sub-cat-nav__list");
        const toggleLink = document.querySelector(".sub-cat-nav .toggleLink");

        subCatNavItems.forEach(el => {
            length += el.getBoundingClientRect().width;
        });

        if (length > 1520) {
            toggleLink.style.display = 'block';
            subCatNavList.style.justifyContent = 'flex-start';
        }
    }

    document.addEventListener("click", (e) => {
        if (e.target.closest(".js-filter-toggle")) {
            handleFilterToggle(e);
            handleOverlay("fb-drawer", "add");
        }

        if (e.target.closest(".fb-drawer-wrap .close")) {
            handlFilterClose(e);
        }

        if (e.target.closest(".js-clear-url")) {
            resetUrl();
        }

        if (!e.target.closest(".js-filter-toggle") && !e.target.closest(".fb-drawer-wrap")) {
            handlFilterClose(e);
        }
    });

    enableSubCatExpand();
}



export function setCatCount(count) {
    const producCount = document.querySelector(".category-view__product-count");
    const fbCount = document.querySelectorAll(".fb-items-count");

    if (!producCount) return;

    producCount.innerHTML = count != 1 ? `${count} items` : `${count} item`;

    if (!fbCount) return;

    fbCount.forEach((el) => (el.innerHTML = count));
}
