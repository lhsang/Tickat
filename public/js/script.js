
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
$('#modal-login').on('shown.bs.modal', function () {
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
