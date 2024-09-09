//Definera länkar till basemaps (grundkartor) OpenStreetMap & satellit
var basemaps = {
  OpenStreetMap: L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</a>.',
    },
  ),
  Satellit: L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    },
  ),
};

//Definerar grupper
var groups = {
  campfirering: new L.LayerGroup(),
  campfirerock: new L.LayerGroup(),
  firehouse: new L.LayerGroup(),
  campfireother: new L.LayerGroup(),
  windshelterfire: new L.LayerGroup(),
  windshelter: new L.LayerGroup(),
  coopsite: new L.LayerGroup(),
  obstaclecourse: new L.LayerGroup(),
  bstt: new L.LayerGroup(),
  vassarorunt: new L.LayerGroup(),
  naturetrail: new L.LayerGroup(),
  trapper: new L.LayerGroup(),
  yellowtrail: new L.LayerGroup(),
  pinktrail: new L.LayerGroup(),
  bunkertrail: new L.LayerGroup(),
  moorings: new L.LayerGroup(),
  wildernesstrail: new L.LayerGroup(),
  treetrail: new L.LayerGroup(),
  pooptrail: new L.LayerGroup(),
  knottrail: new L.LayerGroup(),
  startrail: new L.LayerGroup(),
  woodcrafttrail: new L.LayerGroup(),
  naturegame: new L.LayerGroup(),
  chargebox: new L.LayerGroup(),
  beachtrail: new L.LayerGroup(),
  toilets: new L.LayerGroup(),
  trashrooms: new L.LayerGroup(),
  // areas: new L.LayerGroup(),
  // bookablerooms: new L.LayerGroup(),
};

//Grupperar kartbakgrunder
var baseTree = {
  label: "Kartbakgrunder",
  children: [
    { label: "OpenStreetMap", layer: basemaps.OpenStreetMap },
    { label: "Satellit", layer: basemaps.Satellit },
  ],
};

//Grupperar kartlager
var overlaysTree = {
  label: "Kartfilter",
  selectAllCheckbox: "Un/select all",
  children: [
    {
      label: "Lägerbålsplatser",
      selectAllCheckbox: true,
      collapsed: true,
      children: [
        { label: "Stockringar", layer: groups.campfirering },
        { label: "Klipphällar", layer: groups.campfirerock },
        { label: "Eldstad med tak", layer: groups.firehouse },
        { label: "Andra", layer: groups.campfireother },
      ],
    },
    {
      label: "Vindskydd",
      selectAllCheckbox: true,
      collapsed: true,
      children: [
        { label: "Med eldstad", layer: groups.windshelterfire },
        { label: "Utan eldstad", layer: groups.windshelter },
      ],
    },
    {
      label: "Programaktiviteter",
      selectAllCheckbox: true,
      collapsed: true,
      children: [
        { label: "Trapperspåret", layer: groups.trapper },
        { label: "Vildmarksspåret", layer: groups.wildernesstrail },
        { label: "Samarbetsgläntan", layer: groups.coopsite },
        { label: "Hinderbanan", layer: groups.obstaclecourse },
        { label: "Blood, sweat, tears and teamwork", layer: groups.bstt },
        { label: "Naturleken", layer: groups.naturegame },
        { label: "Trädtränan", layer: groups.treetrail },
        { label: "Ovan molnen", layer: groups.startrail },
        { label: "Knopspåret", layer: groups.knottrail },
        { label: "Träck track", layer: groups.pooptrail },
        { label: "Woodcraftspåret", layer: groups.woodcrafttrail },
      ],
    },
    {
      label: "Vandringsstigar",
      selectAllCheckbox: true,
      collapsed: true,
      children: [
        { label: "Vässarö runt", layer: groups.vassarorunt },
        { label: "Naturnäran", layer: groups.naturetrail },
        { label: "Berättelsen", layer: groups.beachtrail },
        { label: "Bunkerspåret", layer: groups.bunkertrail },
        { label: "Rosa spåret", layer: groups.pinktrail },
        { label: "Gula spåret", layer: groups.yellowtrail },
      ],
    },
    {
      label: "Annat",
      selectAllCheckbox: false,
      collapsed: false,
      children: [
        { label: "Naturhamnar", layer: groups.moorings },
        { label: "Laddlådor", layer: groups.chargebox },
        { label: "Dass", layer: groups.toilets },
        { label: "Soprum", layer: groups.trashrooms },
      ],
      // "Lokaler": groups.bookablerooms,
      // "Områden": groups.areas,
    },
  ],
};

//Skapa en lista med källor för geojson-data
var sources = [
  "data/trapper.geojson",
  "data/trails.geojson",
  "data/activitySites.geojson",
  "data/moorings.geojson",
  "data/campfireSites.geojson",
  "data/chargeboxes.geojson",
  "data/visitors/toilets.geojson",
  "data/trashrooms.geojson",
  // "data/areas.geojson"
];

// Hämta geoJSON-objekt från varje fil
sources.forEach((source) => {
  fetch(source)
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          if (feature.properties.title) {
            layer.bindPopup(
              "<b>" +
                feature.properties.title +
                "</b><br>" +
                feature.properties.desc,
            );
          }
          if (feature.properties.skip !== true) {
            // || true) { // för att visa andra stigar
            eval("groups." + feature.properties.group).addLayer(layer);
          }
        },
        pointToLayer: function (feature, latlng) {
          if (feature.properties.icon) {
            thisMarker = L.marker(latlng, {
              icon: eval("icons." + feature.properties.icon),
            });
          } else {
            thisMarker = L.marker(latlng, {});
          }
          return thisMarker;
        },
        style: function (feature) {
          return {
            color: feature.properties.color,
            weight: 7,
            opacity: 1,
          };
        },
      });
    })
    .catch((error) => {
      console.error("Error loading GeoJSON:", error);
    });
});

// Inställningar till lagerkontrollen
var options = {
  closedSymbol: "&#10010;",
  openedSymbol: "<b>&minus;</b>",
  spaceSymbol: " ",
  selectorBack: false,
  namedToggle: false,
  collapseAll: "Kollapsa alla",
  expandAll: "Expandera alla",
  labelIsSelector: "both",
};

// Fönster ut ur filen
window.MapLayers = {
  BaseTree: baseTree,
  OverlaysTree: overlaysTree,
  Basemaps: basemaps,
  Options: options,
};
