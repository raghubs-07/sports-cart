/**
 * Handle Accordions
 *
 * @param {Boolean} closeOpen // If the other open accordion items should close
 * @returns {}
 */
export default function (el = null, closeOpen = false) {
    // Find all the accordions on a page
    let accordions = el ? [el] : document.querySelectorAll(".g-accordion");

    function closeOtherAccordionItems(items) {
        items.forEach((element) => {
            element.classList.remove("is-open");
        });
    }

    function handleAria(el, bool) {
        el.setAttribute("aria-expanded", `${bool}`);
        el.setAttribute("aria-selected", `${bool}`);
    }

    accordions.forEach((accordion) => {
        const accordionItems = accordion.querySelectorAll(".g-accordion__item");

        accordionItems.forEach((accordionItem) => {
            accordionItem.addEventListener(
                "click",
                (event) => {
                    if (closeOpen) {
                        closeOtherAccordionItems(accordionItems);
                    }

                    if (event.target.closest(".g-accordion__toggle")) {
                        accordionItem.classList.toggle("is-open");

                        if (accordionItem.classList.contains("is-open")) {
                            handleAria(accordionItem, true);
                        } else {
                            handleAria(accordionItem, false);
                        }
                    }
                },
                false
            );
        });
    });
}
