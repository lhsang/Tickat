// optional
/*
$('#blogCarousel').carousel({
    interval: 5000
});
*/
/*
// footer start
$('#carousel-example').on('slide.bs.carousel', function (e) {
 
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 5;
    var totalItems = $('.carousel-item').length;
 
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
}); 
*/
// footer end

// dashboard-stats start
// function loadchart(){
//     loadColumChart();
//     loadPieChart();
//     loadLinechart();
//     loadMapChart();
// }


// function loadColumChart(){
//     google.charts.load('current', {packages: ['corechart', 'bar']});
//     google.charts.setOnLoadCallback(drawBasic);
    
//     function drawBasic() {
    
//         var data = google.visualization.arrayToDataTable([
//             ["Element", "Sales", { role: "style" } ],
//             ["Jan", 120, "#F85D2C"],
//             ["Feb", 100, "#F85D2C"],
//             ["Mar", 50, "#F85D2C"],
//             ["Apr", 120, "#F85D2C"],
//             ["May", 100, "#F85D2C"],
//             ["Jun", 50, "#F85D2C"],
//             ["Jul", 120, "#F85D2C"],
//             ["Aug", 100, "#F85D2C"],
//             ["Sep", 50, "#F85D2C"],
//             ["Oct", 120, "#F85D2C"],
//             ["Nov", 100, "#F85D2C"],
//             ["Dec", 50, "#F85D2C"],

//           ]);
    
//           var view = new google.visualization.DataView(data);
//           view.setColumns([0, 1,
//                            { calc: "stringify",
//                              sourceColumn: 1,
//                              type: "string",
//                              role: "annotation" },
//                            2]);
    
//           var options = {
//             title: "Sales Graph by month in 2019",
//             width: 1000,
//             height: 400,
//             legend: { position: "none" },
//             vAxis: {format:'# $', max:1000}
         

//           };
//           var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
//           chart.draw(view, options);
//         }
// }


// function loadPieChart(){
//     google.charts.load("current", {packages:["corechart"]});
//     google.charts.setOnLoadCallback(drawChart);
//     function drawChart() {
//       var data = google.visualization.arrayToDataTable([
//         ['Gen', 'Visitors in day'],
//         ['Men',     600],
//         ['Women',      1200],

//       ]);

 

//       var options = {
//         title: 'Visitor in March 2019',
//         pieHole: 0.4,
//         colors: ['#F85D2C', '#1FAE66'],


//       };

//       var chart = new google.visualization.PieChart(document.getElementById('piechart'));
//       chart.draw(data, options);
//     }
// }


// function loadLinechart(){
//   google.charts.load("current", {packages:["corechart"]});
//       google.charts.setOnLoadCallback(drawChart);
//       function drawChart() {
//         var data = new google.visualization.DataTable();
//         data.addColumn('date', 'Day');
//         data.addColumn('number', 'Revenue');
//         data.addColumn('number', 'Cost');
      
      
//         data.addRows([
//           [new Date(2019,3,0),500,200],
//           [new Date(2019,3,1),600,100],
//           [new Date(2019,3,2),800,150],
//           [new Date(2019,3,3),900,120],
//           [new Date(2019,3,4),500,200],
//           [new Date(2019,3,5),600,100],
//           [new Date(2019,3,6),800,500],
//           [new Date(2019,3,7),900,120],
//           [new Date(2019,3,8),500,200],
//           [new Date(2019,3,9),600,400],
//           [new Date(2019,3,10),800,150],
//           [new Date(2019,3,11),900,120],
//         ]);

//         var options = {
//           'title':'Revenue and Cost',

//           colors: ['#F85D2C', '#1FAE66'],
//           vAxis:{
//             viewWindow:{
//               max:1000
//             }
//           },
//           legend: {
//             position: 'bottom',
//             pagingTextStyle: { color: '#666' },
//             scrollArrows: 'none'
//         },
//           pointSize: 10,
//           vAxis: {format:'# $'}

//         };
//         var chart = new google.visualization.AreaChart(document.getElementById('lineChart'));
//         chart.draw(data, options);
//     }
// }

// function loadMapChart(){

//      google.charts.load('current', {
//        'packages': ['geochart'],
//        // Note: you will need to get a mapsApiKey for your project.
//        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
//        'mapsApiKey': 'AIzaSyCrBoLGhhGM3kumSqM5HiBB4HhY4o2Lav0'
//      });
//      google.charts.setOnLoadCallback(drawRegionsMap);

//       function drawRegionsMap() {
//         var data = google.visualization.arrayToDataTable([
//           ['Country', 'Vistors'],
//           ['Germany', 200],
//           ['United States', 300],
//           ['Brazil', 400],
//           ['Canada', 500],
//           ['France', 600],
//           ['RU', 700],
//           ['VietNam', 700]
//         ]);

//         var options = {
//           title:'Visitors Map',
//           colors: ['#F85D2C'],
//         };

//       var chart = new google.visualization.GeoChart(document.getElementById('mapChart'));
//       chart.draw(data, options);
//     };
// }
// dashboard-stats end

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

function showSnackbar(content) {
  var x = document.getElementById("snackbar");
  x.innerHTML = content;
  x.className = "show";
  var audio = new Audio('/sound/notification.mp3');
  audio.play();
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//login validate
$("#txtusername").focusout(function() { 
  var username=$('#txtusername').val();
  if(username != "" && typeof username != 'undefined'){
    $.ajax({
      type: "POST",
      url:  "/check-username",
      data: {username:username},
      success: function (response) {
          if(response.status===200){
               $("#signup :submit").attr("disabled", true);
                $("#txtusername").addClass('is-invalid');   
          }else{
                $("#signup :submit").removeAttr("disabled");
                $("#txtusername").removeClass('is-invalid');
          }
      }
    });
  }
});

$("#repassword").focusout(function() { 
  var repass=$('#repassword').val();
  var pass=$('#txtpassword').val();
  if(repass!=pass){
      $("#signup :submit").attr("disabled", true);
      $("#repassword").addClass('is-invalid');
  }else{
      $("#signup :submit").removeAttr("disabled");
      $("#repassword").removeClass('is-invalid');
  }
});


$("#signup-form").on("submit", function(){
  var link = location.href;
  var isAdmin = link.includes('admin');
  
  var data = {
    username: $('#txtusername').val(),
    password: $('#txtpassword').val(),
    mail : $('#mail').val(),
    tel : $('#tel').val(),
    address : $('#address').val(),
    date_of_birth : $('#date_of_birth').val(),
    full_name: $('#full_name').val(),
    admin: false
  };
  if(isAdmin)
    data.admin = true;
  $.ajax({
    type: "POST",
    url: "/users",
    data: data,
    success: function (res) {
      if(res.status==200){
        showSnackbar("Đăng ký thành công");
        setTimeout(function () {
          if(isAdmin)
            location.href = "/admin";
          else location.reload();
        }, 1000);
      }
      else $("#message").html(res.msg);
    }
});
 return false;
});

(() =>{  
  var li = document.getElementsByClassName("pagination")[0].getElementsByTagName("li");
  for (var i = 0; i < li.length; i++) {
      li[i].classList.add("paginate-item");
      li[i].getElementsByTagName("a")[0].classList.add("page-link");
  }
})();

//end login validate
$.ajax({
  type: "method",
  url: "url",
  data: "data",
  dataType: "dataType",
  success: function (response) {
    
  }
});