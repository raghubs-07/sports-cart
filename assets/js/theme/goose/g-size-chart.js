import gUtils from "../goose/utils";
import gAccordion from "../goose/g-accordion";

const {
    stencil: { gGetPage },
} = gUtils;

export default function () {
    const sizeChartContainer = document.querySelector(".js-size-chart-container");
    const sizeChart = document.querySelector("[data-size-chart]");

    if (!sizeChartContainer || !sizeChart) return;

    const sizeChartValue = sizeChart.dataset.sizeChart;

    if (!sizeChartValue) return;

    fetch(`https://store-ydx5derqj4.mybigcommerce.com/content/size-charts/size-chart-${sizeChartValue}.html`)
        .then(function (response) {
            if (response.status === 404) {
                throw new Error("Size chart file not found. Please check the size chart name.");
            }

            return response.text();
        })
        .then(function (html) {
            sizeChartContainer.insertAdjacentHTML("afterbegin", html);
        })
        .catch(function (err) {
            console.warn("Something went wrong.", err);
        });
}
