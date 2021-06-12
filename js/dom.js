//DOM navbar
const $hamburger = document.querySelector(".navbar__menu--burger");
const $home = document.querySelector(".navbar__menu--logo");
const $btndark = document.querySelector("#navbar__btn--dark");
const $btnfav = document.querySelector("#fav__btn");
const $navbar__nav = document.querySelector(".navbar__nav");
const $btncrear = document.querySelector("#crear__btn")
const $btnmygifos = document.querySelector("#mygifos__btn");

let menuDisplayed = false;
let searchOffset;
let offsetFavs = 12;

//DOM main section
const $section__main = document.querySelector("#section-main");

//DOM favorites section
const $section__favorites = document.querySelector(".section__favorites");
const $favGifsResults = document.querySelector("#fav-gifs-results");
const $favGifsResultsEmpty = document.querySelector(".section__favorites__result--empty");
const $favGifsMoreBtn = document.querySelector('#fav-gifs-btn-more');

// DOM gif trend section.
const $gifAcctions = document.querySelectorAll('.gifActions');
const $popupGifSection = document.querySelector('#popupGif');
const $leftArrow = document.querySelector('.btn-left');
const $rightArrow = document.querySelector('.btn-right');

//DOM popupGif__container
const $popupGifContainer = document.querySelector('.popupGif__container');


//DOM gifcard
const $gifCardTemplate = document.querySelector('.gifcard-template');

//DOM trending-gifs-container
const $trending_gifs_container = document.getElementById('trending-gifs-container');
//DOM section gifos_slider
const $section_gifos_slider = document.querySelector('#section_gifos_slider');

//DOM searching section
const $section__search = document.querySelector('.section__search');
const $search_container = document.querySelector('.section__search__container');
const $separator = document.querySelector('.separator');
const $search__text = document.querySelector('.section__search--text');
const $no_results = document.querySelector('.section__search--no_results');

const $search_gifs_container = document.querySelector('.section__search__gifcards--container');
const $searchMoreBtn = document.querySelector('#search-gifs-btn-more');

//DOM search bar and elements
const $section__search__bar = document.querySelector('#section__search__bar');
const $bar_input = document.querySelector('#bar-input')
const $bar_btn = document.querySelector('#bar-btn');
const $bar_btn_close = document.querySelector('#bar-btn-close');
const $bar_suggest_list = document.querySelector('#bar-suggest-list');
const $suggest_list_item = document.querySelector('#suggest-list-item');

//DOM trendins terms section
const $trendingStrings = document.querySelector('.section__search__trending-s');

// DOM create GIFOs
const $createGifSection = document.querySelector('#createGifSection');
const $crearGifTitle = document.querySelector('#crearGif_title')
const $crearGifText = document.querySelector('#crearGif_text');
const $step1 = document.querySelector('#step-1');
const $step2 = document.querySelector('#step-2');
const $step3 = document.querySelector('#step-3');
const $buttonComenzar = document.querySelector('#button--comenzar');
const $buttonGrabar = document.querySelector('#button--grabar');
const $buttonFinalizar = document.querySelector('#button--finalizar');
const $buttonSubirGif = document.querySelector('#button--subirGif');
const $timer = document.querySelector('#timer-recording');
const $repeatBtn = document.querySelector('#repeatShot');
const $rawgif = document.querySelector('#raw-gif');
const $overlay = document.querySelector('#overlay')
const $overlayInfo = document.querySelector('#overlay_info')
const $overlayBar = document.querySelector('#overlay_bar')
const $overlayStatusIcon = document.querySelector('#overlay_status-icon');
const $overlayStatusText = document.querySelector('#overlay_status-text');
const $video = document.querySelector('#recording_video');
const $recordedGifo = document.querySelector('#recorded_gifo');

const $camera = document.querySelector('#camera');
const $celuloide = document.querySelector('#celuloide');


//DOM mygifos__section
const $section__mygifos = document.querySelector(".section__mygifos");
const $myGifsResults = document.querySelector("#mygifs-results");
const $myGifsResultsEmpty = document.querySelector(".section__mygifos__result--empty");
const $myGifsMoreBtn = document.querySelector('#mygifs-btn-more');


const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


// if( isMobile.any() ) alert('Mobile');

function getCssProperty(elmId, property){
    var elem = document.getElementById(elmId);
    return window.getComputedStyle(elem,null).getPropertyValue(property);
 }