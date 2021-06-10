

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

$btnfav.addEventListener('click', (event) => {

  $section__main.classList.add('hidden');
  $section__favorites.classList.remove('hidden');
  
  $section__search.classList.add('hidden');
  
  document.querySelector(".navbar__menu--burger").click();
  event.stopPropagation();
});

//home initial 
$home.addEventListener('click', (event) => {
  $section__main.classList.remove('hidden');
  $section__search.classList.remove('hidden');
  $section__favorites.classList.add('hidden');

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