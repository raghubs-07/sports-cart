import "focus-within-polyfill";

import "./global/jquery-migrate";
import "./common/select-option-plugin";
import PageManager from "./page-manager";
import quickSearch from "./global/quick-search";
import currencySelector from "./global/currency-selector";
import mobileMenuToggle from "./global/mobile-menu-toggle";
import menu from "./global/menu";
import foundation from "./global/foundation";
import quickView from "./global/quick-view";
import cartPreview from "./global/cart-preview";
import privacyCookieNotification from "./global/cookieNotification";
import carousel from "./common/carousel";
import svgInjector from "./global/svg-injector";

// Goose JS //
import gTabs from "./goose/g-tabs";
import gAccordion from "./goose/g-accordion";
import gNewsletter from "./goose/g-newsletter";
import gNavigation from "./goose/g-navigation";
import gSwiper from "./goose/g-swiper";
import gPromoBar from "./goose/g-promo-bar";
import gHome from "./goose/g-home";
import gMiniCart from "./goose/g-mini-cart";
import gWishlist from "./goose/g-wishlist";
import gLogin from "./goose/g-login";
import gProduct from "./goose/g-product";
import gSearch from "./goose/g-search";
import gGorgiasChat from "./goose/g-gorgias-chat";
import gStamped from "./goose/g-stamped";
import gFaq from "./goose/g-faq";
import gAccountNav from "./goose/g-account-nav";
export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector(this.context);
        gAccordion();
        gNewsletter();
        gTabs(this.context);
        gNavigation(this.context);
        gSwiper();
        gHome();
        gMiniCart(this.context, secureBaseUrl, cartId);
        gPromoBar();
        gWishlist(this.context);
        gLogin(this.context);
        gProduct(this.context);
        gSearch();
        gGorgiasChat();
        gStamped();
        gFaq();
        gAccountNav(this.context);
    }
}
