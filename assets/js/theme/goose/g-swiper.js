import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

export default function () {
    /**
     * Usage: add data-g-swiper attribute to any element that needs to be setup as a swiper element. 
     * Make sure to properly add a valid json else 
     */

    const swiperSliders = document.querySelectorAll('[data-g-swiper]');

    swiperSliders.forEach(el => {
        // Here we can tackle configuration individually
        function parseJson(el, obj) {
            let json;
            try {
                json = JSON.parse(obj)
                json.modules = [Navigation, Pagination, Scrollbar]; // Inject modules within json object

            } catch (e) {
                console.log('Invalid JSON');
                console.log(el);
                console.log(e)
            }

            return json;
        }
        
        if (parseJson(el, el.dataset.gSwiper)) {
            const swiper = new Swiper(el, parseJson(el, el.dataset.gSwiper))
        }
    })

}
