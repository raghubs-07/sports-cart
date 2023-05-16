import Swiper, { Navigation, Pagination, Scrollbar } from "swiper";

function parseJson(el, obj) {
    let json;
    try {
        json = JSON.parse(obj);
        json.modules = [Navigation, Pagination, Scrollbar]; // Inject modules within json object
    } catch (e) {
        console.log("Invalid JSON");
        console.log(el);
        console.log(e);
    }

    return json;
}

/**
 * Handle initialising swiper instances
 * @param {NodeList} swiperSliders
 * @param {Object} swiperConfig
 * @returns
 */

function initSwiper(swiperSliders = [], swiperConfig = null) {
    swiperSliders.forEach((el) => {
        if (parseJson(el, el.dataset.gSwiper)) {
            const swiper = new Swiper(el, swiperConfig ? swiperConfig : parseJson(el, el.dataset.gSwiper));
        }
    });
}

export default { initSwiper };
