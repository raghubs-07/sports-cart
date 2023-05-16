import commonUtils from "./common";
import authUtils from "./auth";
import stencilUtils from "./stencil";
import swiperUtils from "./swiper";
import productUtils from "./product";

const gUtils = {
    common: {
        hasClass: commonUtils.hasClass,
        gCookies: commonUtils.gCookies,
        handleOverlay: commonUtils.handleOverlay,
        updateCartQty: commonUtils.updateCartQty,
        shuffleArray: commonUtils.shuffleArray,
        addToCart: commonUtils.addToCart,
        updateCartQty: commonUtils.updateCartQty,
        handleOverlay: commonUtils.handleOverlay,
        deDuplicateArray: commonUtils.deDuplicateArray,
    },
    auth: {
        gLogin: authUtils.gLogin,
        gLogout: authUtils.gLogout,
    },
    stencil: {
        gGetPage: stencilUtils.asyncGetPage,
    },
    swiper: {
        gInitSwiperSliders: swiperUtils.initSwiper,
    },
    product: {
        gUpdateProductAttributes: productUtils.gUpdateProductAttributes
    }
};

export default gUtils;
