/**
 * Handle Accordions
 *
 * @param {Boolean} closeOpen // If the other open accordion items should close
 * @returns {}
 */
export default function (context) {
    const setSelectedTab = (tabs, clickedTab) => {
        const clickedTabId = clickedTab.id;

        tabs.forEach((tab) => {
            const id = tab.getAttribute("id");

            if (id === clickedTabId) {
                tab.setAttribute("tabindex", "0");
                tab.setAttribute("aria-selected", "true");
            } else {
                tab.setAttribute("tabindex", "-1");
                tab.setAttribute("aria-selected", "false");
            }
        });
    };

    const showActivePanel = (tabs, clickedTab, tabContent) => {
        const tabPanes = tabContent.querySelectorAll(".js-tabs-pane");
        const clickedTabId = clickedTab.id;

        tabPanes.forEach((tabPane) => {
            // console.log(tabPane);
            tabPane.hidden = "true";
        });

        const activePanel = tabContent.querySelector(`[aria-labelledby="${clickedTabId}"]`);

        activePanel.removeAttribute("hidden");
    };

    /**
     * Handle click events
     * @param {event} event
     * @param {element} filterBar
     * @returns {}
     */
    function clickHandler(event) {
        const tabsWrapper = event.target.closest(".js-g-tabs-wrap");
        const tabList = event.target.closest(".js-g-tabs");

        // Check if contains data-g-tab attr (for out of tab links)
        if (event.target.dataset.gTab) {
            event.preventDefault();
            handleExternalClick(event.target.dataset.gTab); 
        }

        if (!tabList) return;
        event.preventDefault();
        
        const tabs = tabList.querySelectorAll(".js-tabs-link");
        const clickedTab = event.target.closest(".js-tabs-link");

        const tabContent = tabsWrapper.querySelector(".js-my-tab-content");

        if (tabs) {
            setSelectedTab(tabs, clickedTab);
            showActivePanel(tabs, clickedTab, tabContent);
        }
    }

    /**
     * Handle opening tabs outside tabs el
     * @param {*} hash 
     */
    function handleExternalClick(hash) {
        const targetTab = document.getElementById(hash);
        const tabsWrapper = targetTab.closest(".js-g-tabs-wrap");
        const tabs = tabsWrapper.querySelectorAll(".js-tabs-link");
        let clickedTab;
        let tabContent;

        tabsWrapper.querySelectorAll('.js-tabs-link').forEach(tab => {
            if (tab.getAttribute("href") === "#" + hash) {
                clickedTab = tab;
            }
        });

        tabContent = tabsWrapper.querySelector(".js-my-tab-content");

        // Disable scroll on cart page only
        if (context.template !== "pages/cart") {
            tabContent.scrollIntoView();
        }

        setSelectedTab(tabs, clickedTab);
        showActivePanel(tabs, clickedTab, tabContent);
    }

    // Check if tab already active or 
    function init() {
        // check if url contains #
        if (window.location.hash) {
            handleExternalClick(window.location.hash.replace("#", ""));
        }
    }

    init();

    //------ Inits and Event Listeners
    document.addEventListener("click", (event) => { clickHandler(event); }, false);
}
