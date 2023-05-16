import gUtils from "./utils";

const {
    common: { handleOverlay },
} = gUtils;

export default function (context) {
    const body = document.body;

    function updateNavPanelImages(targetImgEl) {
        if (!targetImgEl) return;

        const panelImgs = document.querySelectorAll(".main-nav-image-panel img");

        // Remove exisiting visible class
        panelImgs.forEach((img) => {
            if (img.getAttribute("data-image-panel-img") !== "default") {
                img.classList.remove("is-visible");
            }
        });

        // Add visible class to the target image
        if (!targetImgEl.classList.contains(".is-visible")) {
            targetImgEl.classList.add("is-visible");
        }
    }

    function handleCloseSubNav(event) {
        const backArrowBtn = event.target.closest(".js-mob-child-nav-back");
        const navItem = event.target.closest(".primary-nav-children__item");
        const childNav = event.target.closest(".children-nav");

        childNav.classList.remove("is-open");
        navItem.classList.remove("is-open");
        document.querySelector(".primary-nav-children__panel.is-open").classList.remove("is-open");
    }

    function updateSubNav(targetImgEl) {
        const subNavItems = document.querySelectorAll(".primary-nav-children__item");
        const subnavPanel = document.querySelector(".primary-nav-children__panel");

        // Remove exisiting open class
        subNavItems.forEach((subNavItem) => {
            subNavItem.classList.remove("is-open");
        });

        // Add visible class to the target image
        if (!targetImgEl.classList.contains(".is-open")) {
            targetImgEl.classList.add("is-open");
            subnavPanel.classList.add("is-open");
        }
    }

    function handleOpenNav() {
        const navigation = document.querySelector(".js-main-nav-drawer");
        navigation.classList.add("is-open");
        handleOverlay("navigation", "add");
    }

    function handleCloseNav() {
        const navigation = document.querySelector(".js-main-nav-drawer");
        const isOpenElements = navigation.querySelectorAll(".is-open");

        navigation.classList.remove("is-open");
        handleOverlay("navigation", "remove");

        isOpenElements.forEach((el) => {
            el.classList.remove("is-open");
        });
    }

    function handleTabBtn(event) {
        const childNavContainer = document.querySelector(".children-nav");
        const subNavItems = document.querySelectorAll(".primary-nav-children__item");
        const subnavPanel = document.querySelector(".primary-nav-children__panel");
        const imgTarget = document.querySelector(`[data-image-panel-img="default"]`);

        subNavItems.forEach((subNavItem) => {
            subNavItem.classList.remove("is-open");
        });

        childNavContainer.classList.remove("is-open");
        subnavPanel.classList.remove("is-open");

        // Handle menu panel images
        updateNavPanelImages(imgTarget);
    }

    function handleSubNav(event) {
        const childNavContainer = document.querySelector(".children-nav");
        const trigger = event.target.closest("[data-subnav-target]");
        const subNavTargetKey = trigger.getAttribute("data-subnav-target");
        const subNavTarget = document.querySelector(`[data-subnav-nav=${subNavTargetKey}]`);
        const primaryNavItems = document.querySelectorAll(".primary-nav__item");

        if (!subNavTarget) return;

        //Set parent navigation item to is-open
        primaryNavItems.forEach((el) => {
            el.classList.remove("is-open");
        });

        childNavContainer.classList.add("is-open");
        trigger.classList.add("is-open");

        // Handle menu state
        updateSubNav(subNavTarget);
    }

    function handleImgPanel(event) {
        const trigger = event.target.closest("[data-image-panel-target]");
        const imgTargetKey = trigger.getAttribute("data-image-panel-target");
        const imgTarget = document.querySelector(`[data-image-panel-img=${imgTargetKey}]`);

        // Handle menu panel images
        updateNavPanelImages(imgTarget);
    }

    function mouseOverHandler(event) {
        if (!event) return;

        if (event.target.closest("[data-image-panel-target]")) {
            handleImgPanel(event);
        }
    }

    function keyDownHandler(event) {
        if (!event) return;

        // Handle close menu click
        if (!event.target.closest(".js-main-nav-drawer") || event.target.closest(".js-main-menu-close")) {
            if (event.keyCode == 27) {
                document.querySelector(".js-main-nav-drawer.is-open") ? handleCloseNav() : "";
            }
        }
    }

    function clickHandler(event) {
        if (!event) return;

        // Handle main tab navigation click
        if (event.target.closest(".g-tabs__link")) {
            event.preventDefault();
            handleTabBtn(event);
        }

        // Handle navigation click
        if (event.target.closest("[data-subnav-target]")) {
            if (event.target.closest(".has-children")) {
                event.preventDefault();
            }

            handleSubNav(event);
        }

        // Handle close mobile nav
        if (event.target.closest(".js-mob-main-nav-close")) {
            event.preventDefault();
            handleCloseNav();
        }

        // Handle mobile child nav back arrow
        if (event.target.closest(".js-mob-child-nav-back")) {
            event.preventDefault();
            handleCloseSubNav(event);
        }

        // Handle close menu click
        if (!event.target.closest(".js-main-nav-drawer") || event.target.closest(".js-main-menu-close")) {
            document.querySelector(".js-main-nav-drawer.is-open") ? handleCloseNav() : "";
        }

        // Handle open menu click
        if (event.target.closest(".js-nav-trigger")) {
            event.preventDefault();
            handleOpenNav();
        }
    }

    //------ Inits and Event Listeners
    document.addEventListener("click", (event) => clickHandler(event), false);
    document.addEventListener("mouseover", mouseOverHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
}
