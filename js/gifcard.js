 /* --------------- GIFCARDS BUTTONS FUNCTIONALITIES -------------- */
//Applies to gifcards on chosen container

const addDownloadEvent = (element, url, title) =>  {
    element.addEventListener('click', (event) => {
        downloadGif(url, title);
        event.stopPropagation();
	});
};

const addMaximizeEvent = (element, gifObj) => {
    element.addEventListener('click', (event) => {
        maximizeGif(gifObj);
        event.stopPropagation();
    });
}


const addGifsToContainer = (data,container) => {

    data.forEach(element => {


        let gifId = element.id,
            gifUser = element.username,
            gifTitleRaw = element.title;
        
        let gifTitle = '';


        // console.log('gifUser:gifTitle: '+gifUser+ ':'+ gifTitleRaw);

        
        if (gifTitleRaw.includes('by')){
            gifTitle = gifTitleRaw.split('by')[0];
            if (gifUser == ''){
                gifUser = gifTitleRaw.split('by')[1];
            } 
        }else{
            gifTitle = gifTitleRaw;
        }
        gifTitle = gifTitle.replace('GIF','');

        if (gifUser ==""){
            gifUser = "No User"
        }



        let gifDisplay, gifDownlink;
        if (typeof (element.images) != 'undefined') {
            if( isMobile.any() ){
                gifDisplay = element.images.fixed_width.url;
            }
            gifDisplay = element.images.downsized.url;
            gifDownlink = element.images.original.url;
        } else {
            gifDisplay = element.display;
            gifDownlink = element.downlink;
        }

        

         let newGifcard = document.createElement('div');
        newGifcard.setAttribute('class', 'gifcard');
        newGifcard.innerHTML = $gifCardTemplate.innerHTML;

        newGifcard.setAttribute('gifid', gifId);

        newGifcard.querySelector('.gifcard__img').setAttribute('src', gifDisplay);
        newGifcard.querySelector('.gifcard__img').setAttribute('loading', 'lazy');
        

        newGifcard.querySelector('.gifcard-overlay__info-user').innerText = gifUser;
        newGifcard.querySelector('.gifcard-overlay__info-title').innerText = gifTitle;

        let gifObj = Object.create(genericGifObj);
        gifObj.id= gifId;
        gifObj.title= gifTitle;
        gifObj.username=gifUser;
        gifObj.display = gifDisplay;
        gifObj.downlink = gifDownlink;

        newGifcard.querySelector('.gifcard__img').onclick = function() {maximizeGif(gifObj)}
        
        let btnFav = newGifcard.querySelector('.btn-fav')

        //add Download Effect to element
        addDownloadEvent(newGifcard.querySelector('.btn-download'), gifDownlink, gifTitle);
        //add Maximize Effect to element
        addMaximizeEvent(newGifcard.querySelector('.btn-max'), gifObj)

        //add favorite effect to element
        btnFav.addEventListener('click', (event) => {
            //console.log(newGifcard);

            if (btnFav.classList.contains('fav-active')) {
                //Update favGifs LocalStorage
                deleteFromStorage(gifId);

            } else if (btnFav.classList.contains('trash')) {
                //TODO DELETE FROM MyGifos AREA 
                // console.log('Delete from MyGifos AREA');
                MyGifos.deleteFromStorage(gifObj);
                //auto close form
                setTimeout(function() {
                    $popupGifContainer.querySelector(".btn-close").click();
                  }, 450);

            } else {
                //Save to favGifs LocalStorage
                saveToStorage(gifObj);
                $popupGifContainer.querySelector(".btn-close").click();
                
            }
            btnFav.classList.toggle('fav-active');
            updateFavs();
            updateMyGifos();
            
            event.stopPropagation();



        });


        //console.log(newGifcard);
        container.appendChild(newGifcard);
    });

    //change gifcard fav btn icon to trahs to e
    $myGifsResults.querySelectorAll('.btn-fav').forEach(element =>{
        element.classList.add('trash');
    });

    updateStateGifcard();

}

