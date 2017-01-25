var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

DOMReady(function () {
    var carousel = new ch.Carousel(ch('.more-products__carousel')[0], {
        pagination: true,
        limitPerPage: 3
    }).on('ready', function () {
        ch('.ch-carousel-mask')[0].style.height = '100px';
    });
});