//"VER MAS" BUTTON
$searchMoreBtn.addEventListener('click', (event) => {
    searchOffset += 12;
    queryText = $search__text.innerHTML;
    //console.log(queryText);
    urlSrch = `${urlApi}/gifs/search?api_key=${api_key}&q=${queryText}&limit=12&offset=${searchOffset}`;
    getApiInfo(urlSrch).then(data => {
        addGifsToContainer(data, $search_gifs_container);
        if (data.length < 12) {
            $searchMoreBtn.classList.add('hidden');
        }
    });

    event.stopPropagation();
});

// ADD events to suggestion list items
function addEventsToSuggestItem(){
    
    allItems = document.querySelectorAll('.suggest__item');
    allItems.forEach(element => {
        element.addEventListener('click', (event) => {
            $bar_input.value = element.innerText;
            beforeSearch();
            clearSearch();
            searchForText(element.innerText);
            $bar_suggest_list.classList.add('hide');
            event.stopPropagation();
        });
        

    });
}

const createSuggestItem = (parent, text) => {
    let item = document.createElement('div');
    item.classList.add('suggest__item');
    item.innerHTML = $suggest_list_item.innerHTML;
    item.querySelector('#suggest__item--txt').innerText = text;
    parent.appendChild(item);
}

/* ------------------------ CREATE SEARCH SUGGESTIONS ITEM LIST ----------------------- */
const createSearchSuggestions = () => {
  if ($bar_input.value !== '') {
    getApiInfo(urlSrchSuggests + $bar_input.value).then(data => {
        $bar_suggest_list.innerHTML = "";
        // console.log(data);
        if (data.length > 0) {
            data.forEach(suggestion => {
                createSuggestItem($bar_suggest_list, suggestion.name);
            });
            $bar_suggest_list.classList.remove('hide');
            
            addEventsToSuggestItem();


        } else {
            
            $bar_suggest_list.classList.add('hide');
            // $bar_btn.classList.remove('hide');
            // $bar_btn_close.classList.add('hide');
            
        }
    });

  }else {
    $bar_suggest_list.classList.add('hide');
    }
}

//add event to close-btn
$bar_btn_close.addEventListener('click', (event) => {
    if ($bar_input.value == "") {
        $search__text.innerText = "";
        $search_gifs_container.innerHTML = "";
        $search_container.classList.add('hidden');
        $section__main.classList.remove('hidden');
        $bar_btn.classList.remove('hide');
        $bar_btn_close.classList.add('hide');
    } else {
        $bar_input.value = null;
        $bar_input.focus();
        $bar_suggest_list.classList.add('hide');
    }
    event.stopPropagation();
});

//add event to btn-search
$bar_btn.addEventListener('click', (event) => {
    // srchQuery = srchInput.value;
    // srchTitle.innerText = srchQuery;
    console.log('$bar_btn.addEventListener');
    if ($bar_input.value !== ''){
        beforeSearch();
        clearSearch();
        searchForText($bar_input.value);
        $bar_btn.classList.add('hide');
        $bar_btn_close.classList.remove('hide');

        event.stopPropagation();
    }
})

//CLICK INSIDE/OUTSIDE SEARCH BAR OPTIONS 
window.addEventListener('click', (event) => {
    if ($section__search__bar.contains(event.target)) {

        $bar_input.focus();
        $bar_btn.classList.add('hide');
        $bar_btn_close.classList.remove('hide');

        $section__main.classList.add('hidden');

        //Show search suggestions list if click inside
        createSearchSuggestions();
    } else {

        $bar_btn_close.classList.add('hide');
        $bar_btn.classList.remove('hide');
        $bar_suggest_list.classList.add('hide');

        
        if ($section__favorites.classList.contains('hidden')){
            if ($createGifSection.classList.contains('hidden')){
                if ($section__mygifos.classList.contains('hidden')){
                    $section__main.classList.remove('hidden');
                }
            }
        }
        
    }
    event.stopPropagation();
});

const hideAndroidKeyboard = () => {
    //https://stackoverflow.com/questions/8335834/how-can-i-hide-the-android-keyboard-using-javascript
  //this set timeout needed for case when hideKeyborad
  //is called inside of 'onfocus' event handler
  setTimeout(function() {

    //creating temp field
    var field = document.createElement('input');
    field.setAttribute('type', 'text');
    //hiding temp field from peoples eyes
    //-webkit-user-modify is nessesary for Android 4.x
    field.setAttribute('style', 'position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;');
    document.body.appendChild(field);

    //adding onfocus event handler for out temp field
    field.onfocus = function(){
      //this timeout of 200ms is nessasary for Android 2.3.x
      setTimeout(function() {

        field.setAttribute('style', 'display:none;');
        setTimeout(function() {
          document.body.removeChild(field);
          document.body.focus();
        }, 14);

      }, 200);
    };
    //focusing it
    field.focus();

  }, 50); 
}

//add event to keypress actions in input field
$bar_input.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'Enter':
            if ($bar_input.value !== "") {
                beforeSearch();
                clearSearch();
                searchForText($bar_input.value);
                if( isMobile.any() ){
                    hideAndroidKeyboard();
                }
                // console.log($bar_input.value);
            }
            break;

        case 'ArrowDown':
            console.log('todo navegate in options');
            break;

        default:
            // GENERATE SEARCH SUGGESTIONS WHILE TAPPING
            createSearchSuggestions();
            break;
    }
});