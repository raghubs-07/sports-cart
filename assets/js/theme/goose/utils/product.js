function gUpdateProductAttributes(data, scope) {
    const behavior = data.out_of_stock_behavior;
    const inStockIds = data.in_stock_attributes;
    const outOfStockMessage = ` (${data.out_of_stock_message})`;

    if (behavior !== 'hide_option' && behavior !== 'label_option') {
        return;
    }

    $('[data-product-attribute-value]', scope).each((i, attribute) => {
        const $attribute = $(attribute);
        const attrId = parseInt($attribute.data('productAttributeValue'), 10);


        if (inStockIds.indexOf(attrId) !== -1) {
            enableAttribute($attribute, behavior, outOfStockMessage);
        } else {
            disableAttribute($attribute, behavior, outOfStockMessage);
        }
    });
}

function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
        return enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }

    if (behavior === 'hide_option') {
        $attribute.show();
    } else {
        $attribute.removeClass('unavailable');
    }
}

function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
        return disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }

    if (behavior === 'hide_option') {
        $attribute.hide(0);
    } else {
        $attribute.addClass('unavailable');
    }
}

function getAttributeType($attribute) {
    const $parent = $attribute.closest('[data-product-attribute]');

    return $parent ? $parent.data('productAttribute') : null;
}

function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    const $select = $attribute.parent();

    if (behavior === 'hide_option') {
        $attribute.toggleOption(false);
        // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
        if ($select.val() === $attribute.attr('value')) {
            $select[0].selectedIndex = 0;
        }
    } else {
        $attribute.attr('disabled', 'disabled');
        $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
}

function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
        $attribute.toggleOption(true);
    } else {
        $attribute.prop('disabled', false);
        $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
}

export default {
    gUpdateProductAttributes
};
