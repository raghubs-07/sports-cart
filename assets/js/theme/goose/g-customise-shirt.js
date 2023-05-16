export default function (product) {
    function validateInput(input) {
        const inputLength = input.value.toString(10).length;

        if (inputLength > 2) {
            alert("Please only enter up to two numbers.");
        }

        input.value = input.value.slice(0, 2);

        return inputLength;
    }

    function handleModiferSelection(input, shirtNumberTypeOptionValues) {
        let modiferTargetKey;

        // Checking if the input is empty
        if (input.value === "") {
            shirtNumberTypeOptionInputs[0].checked = true;

            // We need to un focus the input in order to trigger the change event,
            // which then tiggers the option update function from BC
            input.blur();
            input.focus();
        } else {
            const inputLength = input.value.toString(10).length;

            switch (inputLength) {
                case 1:
                    modiferTargetKey = singleDigitKey;
                    break;
                case 2:
                    modiferTargetKey = doubleDigitKey;
                    break;
                default:
                    modiferTargetKey = undefined;
            }

            shirtNumberTypeOptionValues.forEach((value) => {
                // console.log(value, modiferTargetKey);
                if (value.label == modiferTargetKey) {
                    document.querySelector(`[value="${value.id}"]`).checked = true;

                    // We need to un focus the input in order to trigger the change event,
                    // which then tiggers the option update function from BC
                    input.blur();
                    input.focus();
                }
            });
        }
    }

    function inputHandler(event) {
        if (!event) return;

        const input = event.target;
        const inputLabels = input.labels;
        const inputTarget = Array.from(inputLabels).filter((label) => label.dataset.label === inputKey);

        if (!inputTarget.length > 0) return;

        const inputLength = validateInput(input);

        handleModiferSelection(input, shirtNumberTypeOptionValues);
    }

    function init() {
        // console.log(product);
        // Hide the shirt number modifier options (these are what controls the price)
        shirtNumberTypeOptionData = product.options.filter((option) => option.display_name === priceRuleModifiersKey);

        if (!shirtNumberTypeOptionData.length > 0) return;

        shirtNumberTypeOptionValues = shirtNumberTypeOptionData[0].values;
        shirtNumberTypeOptionEl = document.querySelector(`[data-option-id="${shirtNumberTypeOptionData[0].id}"`);
        shirtNumberTypeOptionInputs = Array.from(shirtNumberTypeOptionEl.querySelectorAll("input"));
        shirtNumberFormField = document.querySelector(`[data-input-name="${inputKey}"`);

        if (!shirtNumberFormField) return;

        if (shirtNumberTypeOptionEl) {
            shirtNumberTypeOptionEl.setAttribute("style", "display:none;");
        }

        ////////// Enhance the  Shirt Number form field //////////

        // Configure the Shirt Number input
        const shirtNumberFormFieldInput = shirtNumberFormField.querySelector("input");
        shirtNumberFormFieldInput.value = "";
        shirtNumberFormFieldInput.setAttribute("placeholder", "Enter up to two numbers");
        shirtNumberFormFieldInput.setAttribute("style", "width:100%");

        // Configure the Shirt Number form field
        const formFieldWrap = document.createElement("div");
        const formFeildHtml = `
            <h4 class="heading">Personalisation</h4>
            <p class="text">Have your favourite players number transferred onto this for an <strong>extra +$10 AUD</strong> per number.</p>
        `;
        formFieldWrap.insertAdjacentHTML("afterbegin", formFeildHtml);
        formFieldWrap.classList.add("product-view-options__customise");
        shirtNumberFormField.parentNode.insertBefore(formFieldWrap, shirtNumberFormField);
        formFieldWrap.appendChild(shirtNumberFormField);
    }

    //------ Inits and Event Listeners
    let shirtNumberTypeOptionData;
    let shirtNumberTypeOptionValues;
    let shirtNumberTypeOptionEl;
    let shirtNumberTypeOptionInputs;
    let shirtNumberFormField;

    //Setup
    // We use the modifiers label to target the input
    const priceRuleModifiersKey = "Shirt Number Type";
    const inputKey = "Shirt Number";
    const singleDigitKey = "Single Digit";
    const doubleDigitKey = "Double Digit";

    init();

    document.addEventListener(
        "input",
        (event) => {
            inputHandler(event);
        },
        false
    );
}
