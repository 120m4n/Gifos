//DOM navbar
const $hamburger = document.querySelector(".navbar__menu--burger");
const $home = document.querySelector(".navbar__menu--logo");
const $btndark = document.querySelector("#navbar__btn--dark");
const $btnfav = document.querySelector("#fav__btn");
const $navbar__nav = document.querySelector(".navbar__nav");

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