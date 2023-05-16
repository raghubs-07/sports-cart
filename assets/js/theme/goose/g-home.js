import Swiper, { Autoplay, Pagination } from "swiper";

export default function () {
    const teamToggler = document.querySelectorAll(".js-toggle-team");
    const teamContainer = document.querySelectorAll(".js-team");
    const teamList = document.querySelectorAll(".js-team-list");
    const teamListHeightToggler = document.querySelectorAll(".js-toggle-height");

    /**
     * SHOP YOUR TEAM LIST TOGGLE
     */

    teamToggler.forEach((item, index) => {
        item.addEventListener("click", (evt) => {
            teamToggler.forEach((item) => {
                item.classList.remove("is-showing");
            });

            teamContainer.forEach((item) => {
                item.classList.remove("is-showing");
            });

            const teamSelected = item.dataset.team;

            item.classList.add("is-showing");
            document.querySelector('.js-team[data-team-list="' + teamSelected + '"]').classList.add("is-showing");
        });
    });

    /**
     * SHOP YOUR TEAM LIST SHOW MORE
     */
    teamListHeightToggler.forEach((item) => {
        item.addEventListener("click", (evt) => {
            const teamSelected = document.querySelector(".js-team.is-showing");
            const teamListSelected = teamSelected.getElementsByClassName("js-team-list")[0];
            let svg = item.querySelector("svg use");

            teamListSelected.classList.toggle("is-full-height");

            let svgIcon = teamListSelected.classList.contains("is-full-height") ? "#icon-remove" : "#icon-add";

            svg.setAttribute("xlink:href", svgIcon);
        });
    });

    if (!document.querySelector(".hero-carousel-slide")) return;

    if (document.querySelectorAll(".hero-carousel-slide").length > 1) {
        Swiper.use([Autoplay, Pagination]);

        let swiper;

        swiper = new Swiper(".hero-carousel-outer", {
            slidesPerView: "1",
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
}
