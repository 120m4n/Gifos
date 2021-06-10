function DoWork() {
    console.log("Start Work", this)
    //let overlay = this.querySelector('.gifcard-overlay');
    //overlay.classList.toggle("show")
    //createconsole.log(overlay);
};
function RevertWork() {
    console.log("Start Revert Work")
};

var imgs = document.getElementsByClassName('gifcard');
for (var i = 0; i < imgs.length; i++) {
    imgs[i].onmouseover = DoWork;
    imgs[i].onmouseout = RevertWork;
}