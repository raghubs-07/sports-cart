import gUtils from "../goose/utils";

const gCookies = gUtils.common.gCookies;

export default function () {
    // Read session storage and check for all inactive bars
    const inactiveBars = gCookies.getCookie("hide-bars");
    const promoBars = document.querySelectorAll(".promo-bar");
    const inactiveBarsArr = [];

    if (inactiveBars) {
        const widgetIdArr = inactiveBars.split(",");
        widgetIdArr.forEach((el) => inactiveBarsArr.push(el));
    }

    promoBars.forEach((el) => {
        if (inactiveBarsArr.includes(el.closest("[data-widget-id]").dataset.widgetId)) {
            // Do noting. Leave the bar hidden
            return;
        } else {
            el.style.display = "block";
        }
    });

    // Listen to close event on each bar and push its widget id to array then session storage.
    document.addEventListener("click", (e) => {
        if (e.target.closest(".promo-bar__closeBtn")) {
            e.preventDefault();
            const bar = e.target.closest(".promo-bar");
            const widgetId = e.target.closest("[data-widget-id]").dataset.widgetId;
            bar.style.display = "none";

            if (gCookies.getCookie("hide-bars")) {
                const widgetIdArr = sessionStorage.getItem("hide-bars").split(",");
                widgetIdArr.push(widgetId);
                gCookies.setCookie("hide-bars", widgetIdArr);
            } else {
                gCookies.setCookie("hide-bars", widgetId);
            }
        }
    });
}
