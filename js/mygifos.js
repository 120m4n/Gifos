
//actualiza los gifcard se la seccion mygifos
const updateMyGifos = ()=> {
 
    if (MyGifos.length > 0) {
        $myGifsResults.innerHTML = "";
        $myGifsResultsEmpty.classList.add('hidden');
        $myGifsResults.classList.remove('hidden');

        if(MyGifos.length > offsetMyGifos){
            $myGifsMoreBtn.classList.remove('hidden');
        }else{
            $myGifsMoreBtn.classList.add('hidden');
        }

        if(MyGifos.length > offsetMyGifos && $myGifsMoreBtn.classList.contains('hidden')){
            // display the residual my gifs in array 
            offsetMyGifos = MyGifos.length;
        }

        addGifsToContainer(MyGifos.slice(0, offsetMyGifos), $myGifsResults);
    } else {
        $myGifsResults.innerHTML = "";
        $myGifsResults.classList.add('hidden');
        $myGifsMoreBtn.classList.add('hidden');
        $myGifsResultsEmpty.classList.remove('hidden');
    }
   
}

$myGifsMoreBtn.addEventListener('click', event => {
    offsetMyGifos+= 12;
    if(offsetMyGifos > MyGifos.length){
        offsetMyGifos = MyGifos.length;
        $myGifsMoreBtn.classList.add('hidden');
    }
    updateMyGifos();
    event.stopPropagation();
})



updateMyGifos();