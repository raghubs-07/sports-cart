import gUtils from "../goose/utils";

const {
    common: { handleOverlay },
} = gUtils;

export default function (context) {
    /**
     * Hanle opening wishlist
     * @param {*} e
     */
    function handleOpenAccNav(e) {
        if (e) e.preventDefault();

        handleOverlay("accNav-drawer", "add");
        document.querySelector(".accNav-drawer").classList.add("is-open");
    }

    /**
     * Handle closing wishlist
     * @param {*} e
     */
    function handleCloseAccNav(e) {
        // e.preventDefault();

        handleOverlay("accNav-drawer", "remove");
        document.querySelector(".accNav-drawer").classList.remove("is-open");
    }


    document.addEventListener("click", e => {
        if (e.target.closest(".accNav-icon--positive")) {
            console.log("ailaa")
            handleOpenAccNav(e);
        }

        if (e.target.closest(".accNav__header .close") || (!e.target.closest(".accNav-drawer-wrap") && !e.target.closest(".utility-icons__account"))) {
            handleCloseAccNav(e);
        }
    });

}
