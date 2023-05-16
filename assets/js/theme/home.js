import PageManager from './page-manager';
import gShopOurRange from "./goose/g-shop-our-range";
import gShopByStyle from "./goose/g-shop-by-style";

export default class Home extends PageManager {
    onReady() {
        gShopOurRange();
        gShopByStyle();
    }
}

