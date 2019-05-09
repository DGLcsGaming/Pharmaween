$(document).ready(function (){

///////////////// Click and Submit Events //////////////////

    $(document).on('click', '#logout', function() {
        logout();
    });
   
    $(document).on('submit', '#formSignup', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var submitButton = $(this).find(':submit');
        submitButton.prop('disabled', true);
        $('#formContent-signup').css('filter','blur(50px)');
        $('#loginLoading').show();

        $.ajax({
          url: '/api/register',
          type: 'POST',
          data : $('#formSignup').serialize(),
          success: function(response){
              if(response.error == 0){
                  alert(response.data);
                  window.location.replace('./login');
              }else{
                alert(JSON.stringify(response.data));
              }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج");
          },
          complete: function(){
            submitButton.prop('disabled', false);
            $('#formContent-signup').css('filter','blur(0px)');
            $('#loginLoading').hide();
          }
        });
        return false;
    });

    $("#formSignup").validate({
      rules: {
        first_name: {
            required: true,
            minlength: 2
        },
        last_name: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        tel: {
          required: true,
          minlength: 9,
          maxlength: 9,
          number: true
        },
        password: {
          required: true,
          minlength: 8
        },
        confirm_password: {
          required: true,
          minlength: 8,
          equalTo: "#password_signup"
        }
      },
      messages: {
          first_name: {
              required: "الرجاء إدخال الإسم الأول",
              minlength: "يجب على الإسم الأول أن يكون على الأقل مكون من حرفين"
          },
          last_name: {
            required: "الرجاء إدخال إسم العائلة",
            minlength: "يجب على إسم العائلة أن يكون على الأقل مكون من حرفين"
          },
          email: {
            required: "الرجاء إدخال البريد إلكتروني",
            email: "الرجاء إدخال بريد إلكتروني صحيح"
          },
          tel: {
            required: "الرجاء إدخال رقم الهاتف",
            minlength: "يجب على رقم الهاتف أن يتكون على من 9 أرقام",
            maxlength: "يجب على رقم الهاتف أن يتكون على من 9 أرقام",
            number: "الرجاء إدخال أرقام فقط"
          },
          password: {
            required: "الرجاء إدخال كلمة سر",
            minlength: "يجب على كلمة السر أن تتكون على الأقل من 8 حروف"
          },
          confirm_password: {
            required: "الرجاء إعادة إدخال كلمة السر",
            minlength: "يجب على كلمة السر أن تتكون على الأقل من 8 حروف",
            equalTo: "كلمتا السر غير متطابقتان"
          }
      }
    });
    ///////////////////////////////////////////////
    
});



    








