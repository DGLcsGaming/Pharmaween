$(document).ready(function () {
  ///////////////// Click and Submit Events //////////////////
  $(document).on('submit', '#formLogin', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var submitButton = $(this).find(':submit');
    submitButton.prop('disabled', true);
    $('#formContent-login').css('filter', 'blur(50px)');
    $('#loginLoading').show();
    var email = $('#email').val();
    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: $('#formLogin').serialize(),
      success: function (response) {
        if (response.error == 0 && response.token) { // No error
          window.localStorage.setItem('PharmacyToken', response.token);
          var decoded = JSON.parse(atob(response.token.split('.')[1]));
          if (decoded.isadmin)
            window.location.replace('/admin');
          else {
            window.location.replace('/moderator');
          }
        } else {
          alert(JSON.stringify(response.data));
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج");
      },
      complete: function () {
        submitButton.prop('disabled', false);
        $('#formContent-login').css('filter', 'blur(0px)');
        $('#loginLoading').hide();
      }
    });

    return false;
  });

  ///////////////////////////////////////////////

});

function loginView() {
  $('#formContent-login').show();
  $('#loginLoading').hide();
}