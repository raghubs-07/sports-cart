import svgInjector from "svg-injector";

export default function (context) {
    // Merging all the teams together
    // Updating each team name to match SVG team logo naming convention "icon-team-name.svg"
    const teams = [...context.aflTeams, ...context.nrlTeams].map((team) => `icon-teams-${team?.name ? team.name.replace(/\s+/g, "-").toLowerCase() : ""}`);

    // Trigger the injection
    svgInjector(document.querySelectorAll("svg[data-src]"), {}, function (totalSVGsInjected) {
        // Callback after all SVGs are injected

        //Putt all of the SVG id values in an array
        const svgIds = Array.from(document.querySelector(".icons-svg-sprite").getElementsByTagName("symbol")).map((symbol) => symbol.id);

        const teamsWithNoSVGLogo = teams.filter(function (item) {
            return !svgIds.includes(item);
        });

        //Show placeholder image
        teamsWithNoSVGLogo.forEach((team) => {
            document.querySelector(`.${team}-placeholder`)?.style.setProperty("display", "block");});
    });
}
