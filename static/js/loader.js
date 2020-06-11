$(document).ready(function() {
    //Preloader
    preloaderFadeOutTime = 3500;
    function hidePreloader() {
    var preloader = $('.spinner-wrapper');
    preloader.fadeOut(preloaderFadeOutTime);
    }
    hidePreloader();
    });