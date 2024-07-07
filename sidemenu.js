// Öppnar sidomeny -- Gör ingenting för för tillfället
function openNav() {
    document.getElementById("settings").style.height = "0"; // Ändra till 100%
    document.getElementById("settings").style.padding = "0px"; // Ändra till 20px
    document.getElementById("menubtn").onclick = closeNav;
};
// Stänger sidomeny
function closeNav() {
    document.getElementById("settings").style.height = "0";
    document.getElementById("settings").style.padding = "0px";
    document.getElementById("menubtn").onclick = openNav;
};