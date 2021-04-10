

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

  function selectData()
  {
      firebase.database().ref('data').once('value',
      function(AllRecords){
          AllRecords.forEach(
              function(CurrentRecord) {
               // let dataobj = CurrentRecord.key;
                var Lname = CurrentRecord.val().ישוב;
                var Hnumber = CurrentRecord.val().מספר_בור;
               var MAP = CurrentRecord.val().מפה;
                var Lnumber = CurrentRecord.val().שכונה;
                var idNumber = CurrentRecord.val().תעודת_זהות;
                var images = CurrentRecord.val().links.img;

                 AddItemToTable(Lname,Hnumber,MAP,Lnumber,idNumber,dataobj=0,images);
              }
              
          );
          
                $(document).ready( function() {
                    /*
                    $('#dataTable thead .filters th').each(function() {
                        var title = $('#dataTable thead tr:eq(0) th').eq($(this).index()).text();
                        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                    });
                */
                var table = $('#dataTable').DataTable( {
                   
                    dom: 'Bfrtip',
                    buttons: [
                     'excel'
                    ],
                    orderCellsTop: true,
                    responsive:true,
                    "language" : {
                        
                    }

                } );
                /*
                table.columns().eq(0).each(function(colIdx) {
                    $('input', $('.filters th')[colIdx]).on('keyup change', function() {
                        table
                            .column(colIdx)
                            .search(this.value)
                            .draw();
                    });
                });
                */
                });
      })
  }

 window.onload  = selectData; 
var num = 0;
function AddItemToTable(Lname,Hnumber,MAP,Lnumber,idNumber,dataobj,images)
{
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
  //  var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');

    //td0.innerHTML = dataobj;
    td1.innerHTML = ++num;
    td2.innerHTML =Lname;
    td3.innerHTML =Hnumber;
    td4.innerHTML = "<a target='_blank' href=https://www.google.com/maps/"+MAP+">"+Lname+"</a>"
    td5.innerHTML =Lnumber;
    td6.innerHTML =idNumber;
    for(var i=0;i < images.length;i++)
    {
        td7.innerHTML += '<a class="button is-small" target="_blank" href='+images[i]+'>image </a>'
    }
    
    trow.appendChild(td1);
   // trow.appendChild(td0);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    tbody.appendChild(trow)
   
}
