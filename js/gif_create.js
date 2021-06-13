/*

*/



// se ocultan los botones que no se necesitan
$buttonGrabar.style.display = 'none';
$buttonFinalizar.style.display = 'none';
$buttonSubirGif.style.display = 'none';

let recorder;
let blob;



// seteo del timer
let timer;
let hours = '00';
let minutes = '00';
let seconds = '00';

// condiciones iniciales
const initializeSection = () =>{
	$crearGifTitle.innerHTML = 'Aquí podrás <br> crear tus propios <span class="aqua-text">GIFOS</span>';
	$crearGifText.innerHTML = `¡Crea tu GIFO en solo 3 pasos! <br> (solo necesitas
		una
		cámara para grabar un video)`;
	$crearGifTitle.classList.remove('hidden');
	$crearGifText.classList.remove('hidden');	
	$rawgif.classList.add('hidden');
	$overlay.classList.remove('blur');
	$overlayBar.classList.add('hidden');
	$overlayInfo.classList.add('hidden');
	$overlayStatusIcon.src = '../assets/loader.svg';
	$overlayStatusText.innerHTML = 'Estamos subiendo tu GIFO';
	$step1.classList.remove('step-active');
	$step2.classList.remove('step-active');
	$step3.classList.remove('step-active');

	$buttonComenzar.removeAttribute("style");
	$buttonSubirGif.removeAttribute("style");
	$buttonSubirGif.style.display = 'none';
}


//  función que ejecuta la cámara y se setea la API
const getStreamAndRecord = async () => {
	$crearGifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;
	$crearGifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
	$buttonComenzar.style.visibility = 'hidden';
	$step1.classList.add('step-active');

	await navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				width: 480,
				height: 320,
				facingMode: 'user'
			}
		})
		.then((mediaStreamObj) => {

			window.localStream = mediaStreamObj;

			$crearGifTitle.classList.add('hidden');
			$crearGifText.classList.add('hidden');
			$step1.classList.remove('step-active');
			$step2.classList.add('step-active');
			$buttonComenzar.style.display = 'none';
			$buttonGrabar.style.display = 'block';

			$video.classList.remove('hidden');
			$video.srcObject = mediaStreamObj;
			$video.play();

			recorder = RecordRTC(mediaStreamObj, {
				type: 'gif',
				frameRate: 1,
				quality: 10,
				width: 480,
				height: 320,
				onGifRecordingStarted: function () {
					console.log('started');
				}
			});
		})
		.catch((err) => console.log(err));
};

// Cuando clickea comenzar, se ejecuta la cámara y se setea la API
$buttonComenzar.addEventListener('click', getStreamAndRecord);

//  función para empezar
const createGifo = () => {
	console.log('está grabando');
	$buttonGrabar.style.display = 'none';
	$buttonFinalizar.style.display = 'block';
	$timer.classList.remove('hidden');
	$repeatBtn.classList.add('hidden');
	recorder.startRecording();
	timer = setInterval(timerActive, 1000);
};

$buttonGrabar.addEventListener('click', createGifo);

//  función para parar la grabación
const stopCreatingGif = () => {
	$video.classList.add('hidden');
	$rawgif.classList.remove('hidden');
	$recordedGifo.classList.remove('hidden');
	recorder.stopRecording(() => {
		blob = recorder.getBlob();
		$recordedGifo.src = URL.createObjectURL(blob);
	});

	$buttonFinalizar.style.display = 'none';
	$buttonSubirGif.style.display = 'block';
	$timer.classList.add('hidden');
	$repeatBtn.classList.remove('hidden');

	//set 0 values to timer
	clearInterval(timer);
	hours = '00';
	minutes = '00';
	seconds = '00';
	$timer.innerText = `${hours}:${minutes}:${seconds}`;
};

$buttonFinalizar.addEventListener('click', stopCreatingGif);

//  función para subir a Giphy y almacenar el gif en Mis gifos
const uploeadCreatedGif = async () => {
	$step2.classList.remove('step-active');
	$step3.classList.add('step-active');
	$repeatBtn.classList.add('hidden');
	$buttonSubirGif.style.visibility = 'hidden';

	$overlayInfo.classList.remove('hidden');
	$overlay.classList.add('blur');

	let form = new FormData();
	form.append('file', blob, 'myGif.gif');

	await fetch(`${uploadGifEndpoint}?api_key=${api_key}`, {
		method: 'POST',
		body: form,
	})
		.then((response) => response.json())
		.then((myGif) => {

			let uploadedGifId = myGif.data.id
			console.log(myGif.data.id);

			
			$overlayStatusIcon.src = '../assets/check.svg';
			$overlayStatusText.innerHTML = 'GIFO subido con éxito';

			$overlayBar.classList.remove('hidden');

			$overlayBar.querySelector('.btn-download').onclick = function() {downloadCreatedGif(uploadedGifId)}
			$overlayBar.querySelector('.btn-link').onclick = function() {window.open(`https://media1.giphy.com/media/${uploadedGifId}/giphy.gif`)}

			let data = {
                id: uploadedGifId,
                username: '120m4n',
                title: `myGif${MyGifos.length}`,
                display: `https://media1.giphy.com/media/${uploadedGifId}/giphy.gif`,
                downlink: `https://media1.giphy.com/media/${uploadedGifId}/giphy.gif`
            };
            
			MyGifos.saveToStorage(data);

			updateMyGifos();

			// stop both video and audio
			localStream.getTracks().forEach( (track) => {
				track.stop();
			});

		})
		.catch((err) => {
			console.error(err);
		});
};

$buttonSubirGif.addEventListener('click', uploeadCreatedGif);

//  función para repetir
const repeatRecordingGif = (event) => {

	$rawgif.classList.add('hidden');

	event.preventDefault();
	recorder.reset();
	$step2.classList.add('step-active');
	$repeatBtn.classList.add('hidden');
	$buttonGrabar.style.display = 'block';
	$buttonSubirGif.style.display = 'none';
	$video.classList.remove('hidden');
	$recordedGifo.classList.add('hidden');

	$video.play();
};
$repeatBtn.addEventListener('click', repeatRecordingGif);

//  función para descargar el gif creado
const downloadCreatedGif = async (myGifId) => {
	let blob = await fetch(
		`https://media.giphy.com/media/${myGifId}/giphy.gif`
	).then((img) => img.blob());
	invokeSaveAsDialog(blob, `My_Gif_${myGifId}.gif`);
};

//  función para el timer
function timerActive() {
	seconds++;

	if (seconds < 10) seconds = `0` + seconds;

	if (seconds > 59) {
		seconds = `00`;
		minutes ++;

		if (minutes < 10) minutes = `0` + minutes;
	}

	if (minutes > 59) {
		minutes = `00`;
		hours++;

		if (hours < 10) hours = `0` + hours;
	}

	$timer.innerHTML = `${hours}:${minutes}:${seconds}`;
}
