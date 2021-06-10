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

/*         <div class="gifcard.template hide" gifid="template">
            <img class="gifcard__img" onclick="maximizeGif('http://www.google.com','user_gif','title_gif')" src="route/to/gif" alt="Gif">
            <div class="gifcard-overlay">
                <div class="gifcard-overlay__bar-btns">
                    <button class="btn btn-fav"></button>
                    <button class="btn btn-download"></button>
                    <button class="btn btn-max"></button>
                </div>
                <div class="gifcard-overlay__info">
                    <h4 class="gifcard-overlay__info-user">User</h4>
                    <h3 class="gifcard-overlay__info-title">Titulo GIFO</h3>
                </div>
            </div>
        </div> */
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
            gifTitle = gifTitle.replace('GIF','');

        }

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
                //TODO DELETE FROM FAVORITES AREA 
                console.log('Delete from FAVORITES AREA');

            } else {
                //Save to favGifs LocalStorage
                saveToStorage(gifObj);
                $popupGifContainer.querySelector(".btn-close").click();
                
            }
            btnFav.classList.toggle('fav-active');
            updateFavs();
            
            event.stopPropagation();



        });
        // newGifcard.querySelector('.btn-download').onclick = function() {downloadGif(gifDownlink, gifTitle)}

        // newGifcard.querySelectorAll('.gifcard-down-link').forEach(k => {
        //     k.setAttribute('data-href', gifDownlink);
        //     k.setAttribute('download', gifTitle);
        // });

        //console.log(newGifcard);
        container.appendChild(newGifcard);
    });

    updateStateGifcard();

}


/*
    const $gifCards = document.querySelectorAll('.gifcard');
    $gifCards.forEach(element => {
        
        let user    =   element.querySelector('.gifcard-overlay__info-user').innerHTML;
        let title   =   element.querySelector('.gifcard-overlay__info-title').innerHTML;
        let url = element.querySelector('.gifcard__img').getAttribute('src');
        //Save/delete from favs
        element.querySelectorAll('.btn-fav').forEach(k => {
            //agrega el evento a cada elemento
            k.addEventListener('click', (event) => {
                    //si existe y esta selecionado como favoritos
                    //lo elimina de la lsita de favoritos
                if (k.classList.contains('fav-active')) {
                    //Update favGifs LocalStorage
                    //deleteFromStorages(element.getAttribute('gifid'))
                    console.log('delete from localStorage');


                    //Actions if 
                } else if (k.classList.contains('trash')) {
                    //TODO delete from LocalStorate
                    //DELETE FROM FAVORITES AREA 
                    console.log('Delete from FAVORITES AREA');
                } else {
                    //Save to favGifs LocalStorage
                    console.log('Save to favGifs LocalStorage');
                    // saveToStorage(gifObj);
                }
                //Change btn-fav state (like/unlike)
                //element.querySelectorAll('.btn-fav').forEach(j => j.classList.toggle('fav-inactive'))
                element.querySelectorAll('.btn-fav').forEach(j => j.classList.toggle('fav-active'))
                event.stopPropagation();
            });
        });

        //add favorite effect to element
        addFavoriteEvent(element.querySelector('.btn-fav'))
            
        //add Download Effect to element
        addDownloadEvent(element.querySelector('.btn-download'), url, title);
        //add Maximize Effect to element
        addMaximizeEvent(element.querySelector('.btn-max'), url, user, title)

    }); */