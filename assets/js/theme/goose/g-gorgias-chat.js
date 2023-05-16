import init from "../global/jquery-migrate/init";
import gUtils from "../goose/utils";

export default function () {
    function handleChatOnlineState(online) {
        if (online === true) {
            document.body.classList.add("chat-online");
        }
    }

    function handleChatToggle() {
        document.body.classList.toggle("chat-hidden");

        if (document.body.classList.contains("chat-hidden")) {
            GorgiasChat.close();
        } else {
            GorgiasChat.open();
        }
    }

    const initGorgiasChatPromise = window.GorgiasChat
        ? window.GorgiasChat.init()
        : new Promise(function (resolve) {
              window.addEventListener("gorgias-widget-loaded", function () {
                  resolve();
              });
          });

    /**
     * Handle click events
     * @param {event} event
     * @returns {}
     */
    function clickHandler(event) {
        const chatToggle = event.target.closest(".js-chat-toggle");

        if (chatToggle) {
            event.preventDefault();
            handleChatToggle();
        }
    }

    function init() {
        initGorgiasChatPromise.then(async (gorgiasChat) => {
            gorgiasChat.hidePoweredBy(true);

            // Hide the chat bubble
            document.body.classList.add("chat-hidden");

            setTimeout(() => {
                handleChatOnlineState(gorgiasChat.isChatOnline());
            }, 2000);
        });
    }

    //------ Inits and Event Listeners
    document.addEventListener("click", (event) => clickHandler(event), false);

    init();
}
