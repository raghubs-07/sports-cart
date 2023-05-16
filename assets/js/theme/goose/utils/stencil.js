import StencilUtils from "@bigcommerce/stencil-utils";

/**
 * Wrap Stencil Util in asunc function and return a promise
 * @param {String} url
 * @param {String} template
 * @param {Object} config
 * @returns
 */

async function asyncGetPage(url = undefined, template = "goose/json-this", config = {}, target = null) {
    return new Promise((resolve, reject) => {
        StencilUtils.api.getPage(
            url,
            {
                template: template,
                config: config,
            },
            (err, response) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve({ target: target, response: response });
            }
        );
    });
}

export default { asyncGetPage };
