<!DOCTYPE html>
<html lang="en">

<head>
    <title>Trappermapper </title>
    <link rel="icon" type="image/x-icon" href="img/hollyrosa.png">
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="style.css" />

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

    <script src="icons.js"></script>
    <script src="maplayers.js"></script>

    <link rel="stylesheet" href="src/L.Control.Locate.min.css" />
    <script src="src/L.Control.Locate.min.js" charset="utf-8"></script>
    <script src="src/L.Control.Layers.Tree.js"></script>
    <link rel="stylesheet" href="src/L.Control.Layers.Tree.css" />
    <!--<?php--><!--
    session_start();
    // TODO: Check how to add something?
    // If the user is not logged in redirect to the login page...
    if (isset($_SESSION['loggedin'])) {
        //echo '<script src="Path/to/whatever/file/with/locked/items.whatever"></script>';
        exit;
    }
    ?>-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
    <!--stulet från https://leafletjs.com/examples/mobile/example.html-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>

<body>

     <div id="hollyrosaruta" class="hollyrosa" onclick="loginPopup.showModal()">
         <center>
             <img src="img/hollyrosa.svg" alt="Programpatrullens maskot Hollyrosa" width="40px"><br>
             <small><b>Vässarö<br>Program</b></small>
         </center>
     </div>

     <!-- Öppnar en dialogruta med inloggningssidan när man klickar på HollyRosa-->
     <dialog id="loginPopup">
         <div class="login">
		        <h1>Login</h1>
		        <form action="authenticate.php" method="post">
			        <label for="username">
			            <i class="fas fa-user"></i>
			        </label>
			        <input type="text" name="username" placeholder="Användarnamn" id="username" required>
			        <label for="password">
                     <i class="fas fa-lock"></i>
			        </label>
			        <input type="password" name="password" placeholder="Lösenord" id="password" required>
			        <input type="submit" value="Logga in">
		        </form>
         </div>
         <button onclick="loginPopup.close()">Stäng</button>
     </dialog>

     <div id="map"></div>

    <script>
        // Skapar kartan med restriktioner på zoom -->
        var lfmap = L.map('map', {
            center: [60.25542, 18.69360],
            zoom: 14,
            minZoom: 12,
            layers: [MapLayers.Basemaps.OpenStreetMap],
        });

        // Definera kartans gränser (en bit utanför VÖ, Garpen, Bodskären)-->
        var southWest = L.latLng(60.0, 18.5);
        var northEast = L.latLng(60.4, 19.0);
        var bounds = L.latLngBounds(southWest, northEast);
        lfmap.setMaxBounds(bounds);
        lfmap.on('drag', function () {
            lfmap.panInsideBounds(bounds, { animate: false });
        });

        // Inställningar och aktivering av lokaliseringsfunktion - https://github.com/domoritz/leaflet-locatecontrol - För inställningar och instruktioner för locate.
        var lc = L.control
            .locate({
                position: "topleft",
                strings: {
                    title: "Visar din nuvarande position!"
                }
            }).addTo(lfmap);

        // Lägg till lager och kontroller till kartan.
        //L.control.groupedLayers(MapLayers.Basemaps, MapLayers.Overlays, MapLayers.Options).addTo(lfmap);
        L.control.layers.tree(MapLayers.BaseTree, MapLayers.OverlaysTree, MapLayers.Options).addTo(lfmap);
    </script>
</body>

</html>