// add events to fav button
const addEventsToFavButton = (gifObj) => {

	element = $popupGifContainer.querySelector('.btn-fav');

	if (element.classList.contains('fav-active')) {
		//Update favGifs LocalStorage
		//console.log('deleteFromStorage(gifObj.gifId)')
		deleteFromStorage(gifObj.id)
		// $popupGifContainer.querySelector(".btn-close").click();
		setTimeout(function() {
			$popupGifContainer.querySelector(".btn-close").click();
		  }, 450);


	} else if (element.classList.contains('trash')) {
		//TODO DELETE FROM FAVORITES AREA 
		console.log('Delete from FAVORITES AREA');

	} else {
		//Save to favGifs LocalStorage
		saveToStorage(gifObj);
		// $popupGifContainer.querySelector(".btn-close").click();
		setTimeout(function() {
			$popupGifContainer.querySelector(".btn-close").click();
		  }, 450);
	}
	element.classList.toggle('fav-active');
	updateFavs();
}

// update state of fav-btn
const updateStateGifcard = ()=>{
    const $gifCards = document.querySelectorAll('.gifcard');
    $gifCards.forEach( gifcard => {

        btnfav = gifcard.querySelector('.btn-fav');
        gifid = gifcard.getAttribute('gifid');

        if (checkExists(gifid)){
            btnfav.classList.add('fav-active');
        }else{
            btnfav.classList.remove('fav-active');
        }

    });
}


const maximizeGif = (gifObj) => {
	$popupGifSection.classList.remove('hide');
	$popupGifSection.classList.add('popupGif');
	//todo change properties of popupGifSection

	if (checkExists(gifObj.id)){
		$popupGifContainer.querySelector('.btn-fav').classList.add('fav-active');
	}else{
		$popupGifContainer.querySelector('.btn-fav').classList.remove('fav-active');
	}
	
	$popupGifContainer.querySelector('.gif_user').innerHTML = gifObj.username;
	$popupGifContainer.querySelector('.gif_title').innerHTML = gifObj.title; 
	$popupGifContainer.querySelector('.popupGif__img').src = gifObj.display;

	//addEventsToFavButton($popupGifContainer.querySelector('.btn-fav'), gifObj);
	$popupGifContainer.querySelector('.btn-fav').onclick = function() {addEventsToFavButton(gifObj)}

	$popupGifContainer.querySelector('.btn-download').onclick = function() {downloadGif(gifObj.downlink, gifObj.title)}
};

const closeMaximized = () => {
	$popupGifSection.classList.add('hide');
	$popupGifSection.classList.remove('popupGif');
	updateStateGifcard();
};

// ---- Descargar ---- \\

const downloadGif = async (url, title) => {
	let blob = await fetch(url).then((img) => img.blob());
	invokeSaveAsDialog(blob, title + '.gif');
};



