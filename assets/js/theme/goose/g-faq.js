import gUtils from "../goose/utils";
import gAccordion from "../goose/g-accordion";

const {
    stencil: { gGetPage },
} = gUtils;

export default function () {
    const faqTarget = document.querySelector('[data-target-content="faq"]');
    const faqstype = document.querySelector("[data-faqs]") ? document.querySelector("[data-faqs]").getAttribute("data-faqs") : "";

    if (!faqTarget) return;

    const accordion = document.createElement("div");
    accordion.className = "g-accordion";
    faqTarget.appendChild(accordion);

    /**
     * Handle click events
     * @param {event} event
     * @returns {}
     */
    function clickHandler(event) {
        const faqToggle = event.target.closest(".faq-toggle");
        const faqToggleButton = event.target.closest(".faq-toggle__button");

        if (faqToggleButton) {
            faqToggle.classList.toggle("is-open");
        }
    }

    //------ Inits and Event Listeners
    document.addEventListener("click", (event) => clickHandler(event), false);

    if (!faqTarget) {
        return;
    } else {
        fetch("/content/faq.json")
            .then((response) => response.json())
            .then((data) => {
                let faqData = data.faqs;

                if (faqstype) {
                    faqData = data.faqs.filter((faqItem) => faqItem.faqtype.includes(faqstype));
                }

                faqData.forEach((faq) => {
                    const faqItem = `<div class="g-accordion__item" aria-expanded="false" aria-selected="false">
                        <div class="g-accordion__title g-accordion__toggle">
                            <h6 class="heading g-accordion__heading">${faq.question}</h6>
                            <div class="g-accordion__toggle__icon">
                                <svg class="open-close-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-minus"></use>
                                </svg>
                                <svg class="open-close-icon open-close-icon--animate">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-minus"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="g-accordion__content">${faq.answer}</div>
                    </div>`;

                    accordion.insertAdjacentHTML("afterbegin", faqItem);
                });
            })
            .then(() => {
                gAccordion(accordion);
            });
    }
}
