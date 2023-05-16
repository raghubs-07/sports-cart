import gUtils from "../goose/utils";

export default function () {
    function handleClubToggle() {
        if (!window.StampedFn) {
            window.location.assign("/market-sports-club-rewards/");
        } else {
            if (document.body.classList.contains("club-hidden")) {
                window.StampedFn.toggleRewardsModal();
            } else {
                window.StampedFn.toggleRewardsModal();
            }
        }
    }

    /**
     * Handle click events
     * @param {event} event
     * @returns {}
     */
    function clickHandler(event) {
        const clubToggle = event.target.closest(".js-club-toggle");

        if (clubToggle) {
            event.preventDefault();
            handleClubToggle();
        }
    }

    function init() {
        // Hide the club bubble
        document.body.classList.add("club-hidden");
    }

    //------ Inits and Event Listeners
    function addEventListenerStamped(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent("on" + eventName, function () {
                handler.call(el);
            });
        }
    }

    // Listening for launcher loaded event
    addEventListenerStamped(document, "stamped:launcher:opened", function (e) {
        document.body.classList.remove("club-hidden");
    });

    document.addEventListener("click", (event) => clickHandler(event), false);

    init();
}
