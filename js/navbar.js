

$hamburger.addEventListener("click", (event) => {
  // change icon buger

  event.target.classList.toggle("close")
  event.stopPropagation();

  let nav = document.querySelector('nav');
  
  if (!menuDisplayed) {
      nav.style.left = "0%";
      // add listener to disable scroll
      // window.addEventListener('scroll', noScroll);
  }else{
      nav.style.left = "-100%";
      // Remove listener to re-enable scroll
      // window.removeEventListener('scroll', noScroll);
  }
  menuDisplayed = !menuDisplayed;
});

function noScroll() {
  window.scrollTo(0, 0);
}

//mygifos
$btnmygifos.addEventListener('click', (event) => {
  $section__mygifos.classList.remove('hidden');
  $section_gifos_slider.classList.remove('hidden');
  $section__main.classList.add('hidden');
  $section__search.classList.add('hidden');
  $createGifSection.classList.add('hidden');
  $section__favorites.classList.add('hidden');
  
  document.querySelector(".navbar__menu--burger").click();
  event.stopPropagation();
});

//favoritos
$btnfav.addEventListener('click', (event) => {
  $section__favorites.classList.remove('hidden');
  $section_gifos_slider.classList.remove('hidden');
  $section__main.classList.add('hidden');
  $section__search.classList.add('hidden');
  $createGifSection.classList.add('hidden');
  $section__mygifos.classList.add('hidden');
  
  document.querySelector(".navbar__menu--burger").click();
  event.stopPropagation();
});

//home initial 
$home.addEventListener('click', (event) => {
  $section__main.classList.remove('hidden');
  $section__search.classList.remove('hidden');
  $section_gifos_slider.classList.remove('hidden');
  $section__favorites.classList.add('hidden');
  $section__mygifos.classList.add('hidden');
  $createGifSection.classList.add('hidden');

  $search_container.classList.add('hidden');
  $bar_input.value = '';
  
  defaultSearchSection();
  offsetFavs = 12;
  updateFavs();
  let left = getCssProperty("navbar__nav", "left")
  if (left === '0px'){
    document.querySelector(".navbar__menu--burger").click();
  }
  event.stopPropagation();

});

//boton crear tu propio gif
$btncrear.addEventListener('click', (event)=>{
  $createGifSection.classList.remove('hidden');
  $section__main.classList.add('hidden');
  $section__favorites.classList.add('hidden');
  $section__search.classList.add('hidden');
  $section_gifos_slider.classList.add('hidden');
  $section__mygifos.classList.add('hidden');
  


  event.stopPropagation();
})