// ---- Favoritear ---- \\
//Global Variables
let FavoriteGifs;

if (localStorage.getItem('FavoriteGifs') != null) {
    FavoriteGifs = JSON.parse(localStorage.getItem('FavoriteGifs'));
    // console.log(FavoriteGifs)
} else {
    FavoriteGifs = [];
    // console.log(favGifs)
}

let genericGifObj = {
    id: "",
    username: "",
    title: "",
    display: "",
    downlink: ""
};

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


