// Öppnar sidomeny
function openNav() {
    document.getElementById("filterMenu").style.height = "100%";
    document.getElementById("filterMenu").style.padding = "20px";
    document.getElementById("menubtn").onclick = closeNav;
};
// Stänger sidomeny
function closeNav() {
    document.getElementById("filterMenu").style.height = "0";
    document.getElementById("filterMenu").style.padding = "0px";
    document.getElementById("menubtn").onclick = openNav;
};