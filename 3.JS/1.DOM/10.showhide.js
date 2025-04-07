function showhide(){
    var mydiv = document.getElementById("showhide");
    
    if(mydiv.style.display == 'none'){
        mydiv.style.display = 'block';
    }else{
        mydiv.style.display = 'none';
    }
}