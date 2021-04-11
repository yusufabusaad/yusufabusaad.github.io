var firebaseConfig = {
  apiKey: "AIzaSyBG1wOKzTdOSqtRw_5beSfq_OpaBMWmEU0",
  authDomain: "myapp-a869f.firebaseapp.com",
  projectId: "myapp-a869f",
  storageBucket: "myapp-a869f.appspot.com",
  messagingSenderId: "290342628514",
  appId: "1:290342628514:web:32af31be2f09b3be7dfbfb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var ID = firebase.database().ref().push().key;

var Lname,Lnumber,Hnumber,MAP,idNumber;
function ready()
{
Lname = document.getElementById("Lname").value; 
Lnumber = document.getElementById("Lnumber").value;
Hnumber= document.getElementById("Hnumber").value;
MAP = document.getElementById("MAP").value;
idNumber = document.getElementById("idNumber").value;
}


var fileArry = []
function showPicture(event) 
{
    let preview = document.querySelector('#preview');

    if(this.files)
    {
        [].forEach.call(this.files,readAndPreview);
    }    
    var f = event.target.files;
    fileArry.push(f);
   
}

function uploadPhoto(event)
{
  event.preventDefault();
 
  if(validateForm() != false)
  {
  ready();
    let urlarray=[];
    
   // console.log(urlarray)
   if(fileArry.length === 0)
   {
    firebase.database().ref('data/'+ID).set({
      תעודת_זהות: idNumber,
      ישוב : Lname,
      שכונה :Lnumber,
      מספר_בור : Hnumber,
      מפה : MAP ,
      img :  ['noImage'],
    })  
   }else {
    let doc = Array.from(fileArry[0]);
   console.log('flag-1 ' + doc )
      doc.forEach(function(file){
        
        firebase.storage().ref('images/'+file.name).put(file).then(function(snapshot){
          
          snapshot.ref.getDownloadURL().then(function(url) {
            urlarray.push(url);
            console.log(urlarray);
            firebase.database().ref('data/'+ID).set({
              תעודת_זהות: idNumber,
              ישוב : Lname,
              שכונה :Lnumber,
              מספר_בור : Hnumber,
              מפה : MAP ,
              img : urlarray,
        })
        })
        })
      })
    }
  }
  clearInputs();
}
document.querySelector("#insert").addEventListener('click',uploadPhoto)


//----read files

function readAndPreview(file)
    {
        if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
            return alert(file.name + " is not an image");
          } 
        
         console.log(file.name)
          var reader = new FileReader();
          reader.addEventListener('load',function() {
              let image = new Image();
              image.className = 'image  is-128x128'
              image.style.borderRadius = "5px";
              image.style.border = "1px dashed #48c774";
              image.style.padding = "1px";
              image.style.marginLeft = "2px";
              image.style.marginTop = "2px";
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

//-----







let x = document.querySelector("#MAP");
function getLocation(event) {
    event.preventDefault();
    x.setAttribute('disabled','');
    document.querySelector('#googleMap').innerHTML = '';
    document.querySelector('#googleMap').style.height = '200px';
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
    x.value = "@"+lat+","+lng+',16z';
    var map = new ol.Map({
      controls: [],
      interactions: [],
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


function validateForm(){
var a = document.forms["Form"]["idNumber-input"].value;
var b = document.forms["Form"]["Lname-input"].value;
var c = document.forms["Form"]["Hnumber-input"].value;
var d = document.forms["Form"]["map-input"].value;
var e = document.forms["Form"]["file-input"].value;
    if(a== null || a=="",b==null || b=="",c==null || c=="",d==null || d=="")
    {
      alert("Please Fill All Required Field");
      return false;
    }
}


function clearInputs() {
  document.getElementById("Lname").value = '';
  document.getElementById("Lnumber").value = '';
  document.getElementById("Hnumber").value = '';
  document.getElementById("MAP").value = '';
  document.getElementById("preview").innerHTML = '';
  document.getElementById("googleMap").innerHTML = '';
  document.querySelector('#googleMap').style.height = '0';
}
//document.querySelector("#insert").addEventListener('click',insertData)
document.querySelector("#clearInput").addEventListener('click',clearInputs)
    



  


