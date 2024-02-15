function changeValue(){
    for(i = 1; i <= 100; i++){
        
        setTimeout(()=>{
        }, 3000);
        document.getElementById('progress-bar').style.width=i+"vh";
            document.getElementById('per').innerHTML=i;
        // alert("");
        
    }
}



var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("progress-bar");
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        window.location.href="/orderDeliveryPage";
      } else {
        width++;
        elem.style.width = width + "%";
        document.getElementById('per').innerHTML=width+"%";
      }
    }
  }
}