

// LOAD TRENDINGS TERMS
getApiInfo(urlTrendingTerms).then(data => {
    $trendingStrings.innerHTML = '';
    for (var i = 0; i < 5; i++) {
        if (i < 4) {
            $trendingStrings.innerHTML += `<a href="#section-main" class="link">${data[i].charAt(0).toUpperCase()}${data[i].slice(1)}</a>, `;
        } else {
            $trendingStrings.innerHTML += `<a href="#section-main" class="link">${data[i].charAt(0).toUpperCase()}${data[i].slice(1)}</a>.`;
        }
    }

    //Add Events to navLinks
    $trendingStrings.querySelectorAll('a').forEach(element => {
        element.addEventListener('click', event => {
            beforeSearch();
            clearSearch();
            searchForText(element.innerText);
            $bar_btn.classList.add('hide');
            $bar_btn_close.classList.remove('hide');
            $bar_input.value = element.innerText;
            event.stopPropagation();
        })
    });

}).catch(console.error);

const defaultSearchSection = () => {
    $separator.classList.add('hide');
    $search__text.classList.add('hide');
    $searchMoreBtn.classList.add('hidden');
    $search__text.innerText = '';
    clearSearch();
}

const beforeSearch = ()=>{
    $search_container.classList.remove('hidden');
    $separator.classList.remove('hide');
    $search__text.classList.remove('hide');
}

const clearSearch = () => {
    $search_gifs_container.innerHTML ='';
}

const no_results = () => {

    $no_results.classList.remove('hidden');
    $searchMoreBtn.classList.add('hidden');
}

// LOAD TRENDINGS GIFS FROM API REQUESTED
getApiInfo(urlTrendingGifs).then(data => {

    addGifsToContainer(data, $trending_gifs_container );

    //scroll effect 
    $leftArrow.addEventListener('click', event => {
        
        scrollSize = $trending_gifs_container.scrollLeft - 1000;
        if(scrollSize < 0){scrollSize = 0};
        $trending_gifs_container.scroll(scrollSize, 0);
        // console.log(`scrollSize = ${scrollSize}`)
        event.stopPropagation();
    })
    
    $rightArrow.addEventListener('click', event => {
        scrollSize = $trending_gifs_container.scrollLeft + 1000;
        $trending_gifs_container.scroll(scrollSize, 0);
        // console.log(`scrollSize = ${scrollSize}`)
        event.stopPropagation();
    })

}).catch(console.error);


//busqueda texto en la api de giphy

function searchForText(queryText) {

    $search__text.innerText = queryText.charAt(0).toUpperCase()+ queryText.slice(1);

    searchOffset = 0;

    urlSearchText =  `${urlApi}/gifs/search?api_key=${api_key}&q=${queryText}&limit=12&offset=${searchOffset}`;
    getApiInfo(urlSearchText).then(data => {
        if (data.length === 0) {
            no_results();
        } else {
            $no_results.classList.add('hidden');
            addGifsToContainer(data, $search_gifs_container);
            $searchMoreBtn.classList.remove('hidden');
        }
    });
}

