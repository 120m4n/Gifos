

const updateFavs = ()=> {
 
    if (FavoriteGifs.length > 0) {
        $favGifsResults.innerHTML = "";
        $favGifsResultsEmpty.classList.add('hidden');
        $favGifsResults.classList.remove('hidden');

        if(FavoriteGifs.length > offsetFavs){
            $favGifsMoreBtn.classList.remove('hidden');
        }else{
            $favGifsMoreBtn.classList.add('hidden');
        }

        if(FavoriteGifs.length > offsetFavs && $favGifsMoreBtn.classList.contains('hidden')){
            // display the residual favorities gifs in array 
            offsetFavs = favGifs.length;
        }

        addGifsToContainer(FavoriteGifs.slice(0, offsetFavs), $favGifsResults);
    } else {
        $favGifsResults.innerHTML = "";
        $favGifsResults.classList.add('hidden');
        $favGifsMoreBtn.classList.add('hidden');
        $favGifsResultsEmpty.classList.remove('hidden');
    }
   
}

$favGifsMoreBtn.addEventListener('click', event => {
    offsetFavs+= 12;
    if(offsetFavs > FavoriteGifs.length){
        offsetFavs = FavoriteGifs.length;
        $favGifsMoreBtn.classList.add('hidden');
    }
    updateFavs();
    event.stopPropagation();
})



updateFavs();