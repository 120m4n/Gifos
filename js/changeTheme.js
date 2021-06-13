
let darkTheme;

//check in memory localstore
//todo:

const saveThemeLocalStore = (status) => {
    localStorage.setItem('GifosThemeDark', status);
}

const updateThemeLocalStore = () => {
    if (localStorage.getItem('GifosThemeDark') != null) {
        
        darkTheme = JSON.parse(localStorage.getItem('GifosThemeDark'));
    //   console.log("paso por aqui: "+darkTheme)

    } else {    
        $btndark.innerText = 'Modo Nocturno'
        changeDarkMode('theme--dark','theme--light')
        darkTheme = false;
        saveThemeLocalStore(false);
        
    }

   
}


//change the theme  darktheme <>lighttheme

$btndark.addEventListener('click', event => {
       
    updateThemeLocalStore();

    if (!darkTheme) {
        $btndark.innerText = 'Modo Diurno'
        changeDarkMode('theme--light','theme--dark')
        //console.log('modo nocturno')
        darkTheme = true;

    }else {
        $btndark.innerText = 'Modo Nocturno'
        changeDarkMode('theme--dark','theme--light')
        //console.log('modo diurno')
        darkTheme = false;
        
    }

    saveThemeLocalStore(darkTheme);
    event.stopPropagation();
    document.querySelector(".navbar__menu--burger").click();

})

function changeDarkMode(oldClass, newClass) {
    document.body.classList.replace(oldClass, newClass)
}
function checkTheme(){
    updateThemeLocalStore();

    if (darkTheme) {
        $btndark.innerText = 'Modo Diurno'
        changeDarkMode('theme--light','theme--dark')        
    }
};

checkTheme();

