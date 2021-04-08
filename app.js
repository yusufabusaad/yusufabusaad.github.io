function showPicture() 
{
    let preview = document.querySelector('#preview');

    if(this.files)
    {
        [].forEach.call(this.files,readAndPreview);
    }
    function readAndPreview(file)
    {
        if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
            return alert(file.name + " is not an image");
          } 

          var reader = new FileReader();
          reader.addEventListener('load',function() {
              let image = new Image();
              image.className = 'mx-1  image is-96x96'
              image.style.borderRadius = "5px";
              image.style.border = "1px dashed #48c774";
              image.style.padding = "2px";
              image.title = file.name;
              image.src = this.result;
              //console.log(image.outerHTML)
              image.onclick = function()
              {
                let fullSizePreview = window.open();
                fullSizePreview.document.write(image.outerHTML);
                fullSizePreview.document.querySelector('img').style.cssText = "border:0; width:100% ; height:auto"
                
              }
           
              preview.appendChild(image);
          });

          reader.readAsDataURL(file)
    }
}
let x = document.querySelector("#MAP");
function getLocation(event) {
    event.preventDefault();
    x.setAttribute('disabled','');
    document.querySelector('#googleMap').innerHTML = '';
    //new Code
    
    if ( navigator.permissions && navigator.permissions.query) {
        //try permissions APIs first
        navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
            // Will return ['granted', 'prompt', 'denied']
            const permission = result.state;
            if ( permission === 'granted' || permission === 'prompt' ) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        });
      } else if (navigator.geolocation) {
        //then Navigation APIs
        navigator.geolocation.getCurrentPosition(showPosition);
      }else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
  //--------------------------------------    

    //old Code 
    //if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    // x.innerHTML = "Geolocation is not supported by this browser.";
    //}
    
  }
  
  function showPosition(position) {
   
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    x.value = "קו רוחב : " + lat +
    " | קו אורך : " + lng;
    var map = new ol.Map({
      target: 'googleMap',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
              })
            ]
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([lng, lat]),
        zoom: 16
      })
    });
   

}

    



  


document.querySelector('#file-input').addEventListener('change',showPicture);
document.querySelector('#getLocation').addEventListener('click',getLocation);