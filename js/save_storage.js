// ---- Storage Engine - Load and Save data from LocalStorage\\
//Global Variables
let FavoriteGifs;
let MyGifos = [];
let genericGifObj = {
    id: "",
    username: "",
    title: "",
    display: "",
    downlink: ""
};

(function (){

    console.log('Iniciando Variables')

    if (localStorage.getItem('FavoriteGifs') != null) {
        FavoriteGifs = JSON.parse(localStorage.getItem('FavoriteGifs'));
    } else {
        FavoriteGifs = [];
    }

    if (localStorage.getItem('MyGifos') != null) {
        MyGifos = JSON.parse(localStorage.getItem('MyGifos'));
    } else {
        MyGifos = [];
    }
    

}());


const checkExists = (id) => {
    
    let obj = FavoriteGifs.find(o => o.id === id);

    if (obj === undefined) {
        return false;
    }else{
        return true;
    }

}

const saveToStorage = (gifObj) => {

    if (checkExists(gifObj.id)) {
        console.log("object exist in localstorage")
    }else{
        FavoriteGifs.push({
            id: gifObj.id,
            username: gifObj.username,
            title: gifObj.title,
            display: gifObj.display,
            downlink: gifObj.downlink
        });
        localStorage.setItem('FavoriteGifs', JSON.stringify(FavoriteGifs));
        // FavoriteGifs();
    }
};



const deleteFromStorage = (gifId) => {
    if (FavoriteGifs.length > 0) {
        for (let i = 0; i < FavoriteGifs.length; i++) {
            if (FavoriteGifs[i].id === gifId) {
                FavoriteGifs.splice(i, 1);
                localStorage.setItem('FavoriteGifs', JSON.stringify(FavoriteGifs));
            }
        }
    } 
};


function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

MyGifos.securePush = function(data) {
    let id = data.id;
    let obj = this.find(o => o.id === id);
    if (obj === undefined) {
        this.push(data)
    }
};

MyGifos.saveToStorage = function (data){
    this.securePush(data);
    if (storageAvailable('localStorage')) {
        // console.log(' Yippee! We can use localStorage awesomeness');
        localStorage.setItem('MyGifos', JSON.stringify(this));
      }
      else {
         console.log('Too bad, no localStorage for us')
      }
}


MyGifos.deleteFromStorage = function(data){
    let gifId = data.id;

    if (this.length > 0) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].id === gifId) {
                this.splice(i, 1);
                if (storageAvailable('localStorage')) {
                    localStorage.setItem('MyGifos', JSON.stringify(this));
                }
                else {
                   console.log('Too bad, no localStorage for us')
                }
            }
        }
    } 

};

