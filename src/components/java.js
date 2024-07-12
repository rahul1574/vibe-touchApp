var hasexpand=false;
function expand(){
    if(!hasexpand){
        var div=document.getElementById("nowplay")
        div.classList.add('animate')
        hasexpand=true;
    }
    
}
function reset() {
    var div = document.getElementById('animateDiv');
    div.classList.remove('animate');
    hasexpand= false;
}