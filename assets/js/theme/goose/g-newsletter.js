import "regenerator-runtime/runtime";

export default async function () {
    try {
        // Store our DOM elements
        const newsletterForms = document.querySelectorAll(".newsletter-form__form");

        if (newsletterForms === undefined || newsletterForms === null) {
            return;
        }
        const buttonStates = ["button--loading", "button--success", "button--error", "button--subscribed"];

        /**
         * Add the option price to option values
         * @param {Element} button A button style element
         * @param {String} state A string loading, error, success
         * @return {}
         */
        function handleSubmitBtnState(button, state, message) {
            // Reset state
            button.classList.remove(...buttonStates);
            message.classList.remove("g-success", "g-error");
            console.log(button.value);
            const defaultButtonText = button.dataset.defaultValue;
            // Handle state
            switch (state) {
                case "loading":
                    button.value = "Please wait";
                    button.classList.add(`button--${state}`);
                    button.disabled = true;
                    break;
                case "success":
                    message.innerHTML = "Thank you, you're now subscribed!";
                    message.classList.add("g-success");
                    button.classList.add(`button--${state}`);
                    setTimeout(function () {
                        handleSubmitBtnState(button, "", message);
                    }, 4000);
                    button.disabled = false;
                    break;
                case "subscribed":
                    message.innerHTML = "This email address is already subscribed";
                    message.classList.add("g-error");
                    button.classList.add(`button--${state}`);
                    setTimeout(function () {
                        handleSubmitBtnState(button, "", message);
                    }, 3000);
                    button.disabled = true;
                    break;
                case "error":
                    message.innerHTML = "Error, please try again later!";
                    message.classList.add("g-error");
                    button.classList.add(`button--${state}`);
                    setTimeout(function () {
                        handleSubmitBtnState(button, "", message);
                    }, 2000);
                    button.disabled = true;
                    break;
                default:
                    button.value = defaultButtonText;
                    button.disabled = false;
                    message.innerHTML = "";
            }
        }

        /**
         * Perform the form submission
         * @param {Event} e The submit event from the form
         * @return {}
         */

        async function handleFormSubmission(e) {
            e.preventDefault(); //stop form from submitting

            const botField = e.target.querySelector(".g_bot_check");
            const submit = e.target.querySelector("input[type='submit']");
            const message = e.target.closest(".newsletter-form__form").querySelector(".js-newsletter-message");

            if (botField.value !== "") {
                return;
            }

            // Update the submit button loading state
            handleSubmitBtnState(submit, "loading", message);

            // Init formData
            const formData = new FormData(e.target);

            // Setup formData object

            // Submit the form
            fetch("/subscribe.php", {
                method: "post",
                body: formData,
            })
                .then((response) => {
                    const responseUrl = new URL(response.url);
                    const paramValue = responseUrl.searchParams.get("result"); // already_subscribed or success

                    if (paramValue === "success") {
                        // Update the submit button loading state
                        handleSubmitBtnState(submit, "success", message);
                    }

                    if (paramValue === "already_subscribed") {
                        // Update the submit button loading state
                        handleSubmitBtnState(submit, "subscribed", message);
                    }
                })
                .catch((response) => {
                    handleSubmitBtnState(submit, "error", message);
                });
        }

        // Loop over all newsletter forms
        newsletterForms.forEach((form) => {
            const emailInput = form.querySelector("input[name='nl_email']");
            const submit = form.querySelector("input[type='submit']");
            const message = form.querySelector(".js-newsletter-message");

            // Inits and event listners
            form.addEventListener("submit", (e) => handleFormSubmission(e), false);

            // Custom validation message for submission with empty input
            submit.addEventListener(
                "click",
                (e) => {
                    if (emailInput.validity.valueMissing) {
                        emailInput.setCustomValidity("Please provide a valid email address.");
                    } else {
                        emailInput.setCustomValidity("");
                    }
                },
                false
            );
        });

        // Handle form submission event
    } catch (err) {
        console.log(err);
    }
}
