import * as L from "leaflet";

const LeafIcon = L.Icon.extend({
    options: {},
  });

let blueIcon = new LeafIcon({
    iconUrl:
      "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconRetinaUrl: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconAnchor: [12,25],
    popupAnchor: [-0,-0],
  })
let greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
      
  });

let redIcon = new LeafIcon({
iconUrl:
    "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconRetinaUrl: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconAnchor: [12,25],
    popupAnchor: [-0,-0],
});

let purpleIcon = new LeafIcon({
iconUrl:
    "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
});

export {blueIcon, greenIcon, redIcon, purpleIcon}
