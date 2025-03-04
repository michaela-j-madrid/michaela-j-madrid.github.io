/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


var xhr = new XMLHttpRequest();
xhr.open('GET', 'spearfish-voting-districts.geojson', true);
xhr.onload = function (e) {
if (xhr.readyState === 4) {
  if (xhr.status === 200) {
    var districts = JSON.parse(xhr.responseText);

    function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.Dist_Name) {
            layer.bindPopup(feature.properties.Dist_Name);
        }
    };

    function style(feature) {
        let opacity = 0.2;
        if (feature.properties.Dist_Name === 'Ward 3') {
            opacity = 0.8;
        };

        return {
            fillColor: 'gray',
            weight: 1,
            opacity: 1,
            color: 'black',
            fillOpacity: opacity
        };
    };

    const map = L.map('map').setView([44.51679, -103.82615], 12);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '<a href="https://www.spearfish.gov/ImageRepository/Document?documentId=234" target="_blank">View as PDF</a> | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.geoJSON(districts, {
      onEachFeature: onEachFeature,
      style: style
    }).addTo(map);

    const info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this._div.innerHTML = '<p>Ward map</p>'
        return this._div;
    };

    info.addTo(map);

  } else {
    console.error(xhr.statusText);
  }
}
};
xhr.onerror = function (e) {
console.error(xhr.statusText);
};
xhr.send(null);

