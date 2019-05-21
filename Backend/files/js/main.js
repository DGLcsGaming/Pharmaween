//var HOST = 'https://egybestenhancer.herokuapp.com'
var HOST = 'http://localhost:3000'
var id;
var token;
var email;
var first_name;
var last_name;
var daysleft;
var isadmin;


function isPremium() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: HOST+'/users/premium',
            type: 'POST',
            data: JSON.stringify({token: token}),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                if(response.error == 0){ // No error
                    daysleft = response.daysleft;
                    isadmin = response.isadmin;
                    resolve(response.ispremium);
                }else{
                    resolve(JSON.stringify(response.data));
                    alert(JSON.stringify(response.data));
                }
            },
            error : function(err){
                reject(err);
            }
          });
    });
}

$(document).ready(function (){

   // loading();
            ///////////////// Click and Submit Events //////////////////

    $(document).on('click', '#buyButton', function (e) {

        $.ajax({
            url: HOST+'/users/getpaymentimg',
            type: 'POST',
            data: JSON.stringify({token: token,email: email}),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                $('#premiumAdvTable').hide();
                $('#buyTable').show();
                if(response.error == 0){
                    
                    $('#paymentSlip').attr('src', HOST+'/'+response.img);
                    $('#paymentSlip').show();
                    $('#formPaymentSlip').hide(); // hide upload form
                }
            },
            error : function(err){
                alert(err);
            }
        });
        
        
   });

    $(document).on('click', '#formFooter-login > a', function(){
        SignupView();
    });
    $(document).on('click', '#formFooter-signup > a', function(){
        loginView();
    });
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
          url: HOST+'/users/register',
          type: 'POST',
          data : $('#formSignup').serialize(),
          success: function(response){
              if(response.error == 0){
                  alert('تم التسجيل بنجاح');
                  loginView();
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

    $(document).on('submit', '#formLogin', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var submitButton = $(this).find(':submit');
        submitButton.prop('disabled', true);
        $('#formContent-login').css('filter','blur(50px)');
        $('#loginLoading').show();
       $.ajax({
          url: HOST+'/users/login',
          type: 'POST',
          data : $('#formLogin').serialize(),
          success: function(response){
              if(response.token){ // No error
                  chrome.storage.local.set({'egybest_id': response.id, 'egybest_token': response.token,'egybest_email': response.email, 'egybest_first_name': response.first_name, 'egybest_last_name': response.last_name});
                  checkLogin().then(function(isLoggedIn){
                    if(isLoggedIn == false){ // Not Logged in
                        loginView();
                    }else{ // Already logged in
                        chrome.runtime.sendMessage({"type":"logout"});
                        isPremium().then(function(premium){
                            if(premium == 1){ // premium
                                DashboardViewPremium();
                            }else{
                                DashboardViewRegular();
                            }
                        });
                    }   
                    });
              }else{
                  alert(JSON.stringify(response.data));
              }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest);
              console.log(textStatus);
              console.log(errorThrown);
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج");
          },
          complete: function(){
            submitButton.prop('disabled', false);
            $('#formContent-login').css('filter','blur(0px)');
            $('#loginLoading').hide();
          }
        });
        
        return false;
    });

    $("#formPaymentSlip").on('submit',(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#formPaymentSlip').hide();
        $('#uploadLoading').show();
        $('#paymentSlip').hide();

        var formData = new FormData(this);
        formData.append("token", token);
        formData.append("email", email);
        formData.append("id", id);

        $.ajax({
         url: HOST+"/users/uploadpayment",
         type: "POST",
         data:  formData,
         headers: {
            'token':token,
            'email':email,
            'id':id
        },
         contentType: false,
         cache: false,
         processData:false,
         success: function(data)
         {
            $('#uploadLoading').hide();
          if(data=='invalid')
          {
            $('#formPaymentSlip').show();
           alert('ملف غير صالح, يرجى رفع صورة صحيحة');
          }
          else
          {
            if(data.error == 0){
                alert('تم رفع الصورة بنجاح');
                $("#formPaymentSlip")[0].reset(); 

                $.ajax({
                    url: HOST+'/users/getpaymentimg',
                    type: 'POST',
                    data: JSON.stringify({token: token,email: email}),
                    contentType: 'application/json; charset=utf-8',
                    success: function(response){
                        if(response.error == 0){
                            $('#paymentSlip').attr('src', HOST+'/'+response.img);
                            $('#paymentSlip').show();
                        }else{
                            alert(JSON.stringify(response.data));
                        }
                    },
                    error : function(err){
                        alert(err);
                    }
                  });

            }else{
                $('#formPaymentSlip').show();
                alert(JSON.stringify(data.data));
            }
          }
         },
         error: function(e) 
         {
            $('#uploadLoading').hide();
            $('#formPaymentSlip').show();
            alert("خطأ في رفع الصورة. ");
            alert(JSON.stringify(e));
            }          
         });
    }));

    $(document).on('submit', '#formSetPremium', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var submitButton = $(this).find(':submit');
        submitButton.prop('disabled', true);

       $.ajax({
          url: HOST+'/users/setpremium',
          type: 'POST',
          data : $('#formSetPremium').serialize() + "&token="+ token + "&email=" + email,
          success: function(response){
            $("#formSetPremium")[0].reset(); 
              if(response.error == 0){ // No error
                  alert(response.data);
              }else{
                  alert(JSON.stringify(response.data));
              }
          },
          error: function() {
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج");
          },
          complete: function(){
            submitButton.prop('disabled', false);
          }
        });
        
        return false;
    });

    $(document).on('submit', '#formGetPremium', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var submitButton = $(this).find(':submit');
        submitButton.prop('disabled', true);

       $.ajax({
          url: HOST+'/users/getpremium',
          type: 'POST',
          data : $('#formGetPremium').serialize() + "&token="+ token + "&email=" + email,
          success: function(response){
              if(response.error == 0){ // No error
                  alert("First Name: "+response.first_name+"\n"+
                        "Last Name: "+response.last_name+"\n"+
                        "Email: "+response.email+"\n"+
                        "Premium: "+response.ispremium+"\n"+
                        "Premium End: "+response.premiumend+"\n"+
                        "Days Left: "+response.daysleft);
              }else{
                  alert(JSON.stringify(response.data));
              }
              $("#formGetPremium")[0].reset(); 
          },
          error: function() {
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج");
          },
          complete: function(){
            submitButton.prop('disabled', false);
          }
        });
        
        return false;
    });

    $(document).on('submit', '#formSetRegular', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var submitButton = $(this).find(':submit');
        submitButton.prop('disabled', true);

       $.ajax({
          url: HOST+'/users/setregular',
          type: 'POST',
          data : $('#formSetRegular').serialize() + "&token="+ token + "&email=" + email,
          success: function(response){
            $("#formSetRegular")[0].reset(); 
              if(response.error == 0){ // No error
                  alert(response.data);
              }else{
                  alert(JSON.stringify(response.data));
              }
          },
          error: function() {
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج");
          },
          complete: function(){
            submitButton.prop('disabled', false);
          }
        });
        
        return false;
    });

  
    ///////////////////////////////////////////////
    
});

function loading(){
    $('#formContent-login').hide();
    $('#formContent-signup').hide();
    $('#dashboard_premium').hide();
    $('#dashboard_regular').hide();
    $('#loginLoading').hide();
    $('#mainLoading').show();
}
function loginView(){
    $('#formContent-login').show();
    $('#formContent-signup').hide();
    $('#dashboard_premium').hide();
    $('#dashboard_regular').hide();
    $('#mainLoading').hide();
    $('#loginLoading').hide();
}

function SignupView(){
    $('#formContent-signup').show();
    $('#formContent-login').hide();
    $('#dashboard_premium').hide();
    $('#dashboard_regular').hide();
    $('#mainLoading').hide();
    $('#loginLoading').hide();
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
}

async function DashboardViewPremium(){
    $('#formContent-signup').hide();
    $('#formContent-login').hide();
    $('#dashboard_regular').hide();
    $('#mainLoading').hide();
    $('#loginLoading').hide();
    $('#dashboard_premium').show();
    await checkLogin();
    // Update Username
    $('#username_premium').text(first_name+' '+last_name);
    $('#accountType_premium').text('ذهبي');
    $('#accountNumber_premium').text('#'+id);
    $('#account_daysleft').text(daysleft);
    if(isadmin == 1){
        $('#adminPanel').show();
        $.ajax({
            url: HOST+'/users/userscount',
            type: 'POST',
            data : "token="+ token + "&email=" + email,
            success: function(response){
                if(response.error == 0){ // No error
                    $('#premium_count').text(response.premium);
                    $('#regular_count').text(response.regular);
                    $('#admins_count').text(response.admins);
                }else{
                    alert(JSON.stringify(response.data));
                }
            },
            error: function() {
               alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج");
            }
        });
    }else{
        $('#adminPanel').hide();
    }
    // Populate episodes table
    getEpisodes().then(function (data){
        $('#episodesTable').find('tbody').empty();
        for(var i = 0; i < data.length; i++){
           $('#episodesTable').find('tbody')
                .append($('<tr>')
                     .append($('<td>').html($('<a>').attr('href', HOST+'/users/delepisode?token='+token+'&email='+email+'&series='+data[i].series).attr('class', 'delepisode').html('&#10060;')))
                     .append($('<td>').html(new Date(1000 * data[i].currentTime).toISOString().substr(11, 8)))
                     .append($('<td>').html(data[i].episode))
                     .append($('<td>').html(data[i].series))
                     .append($('<td>')
                          .append($('<a>').attr('href', data[i].url).attr('class', 'newtab')
                                .append($('<img>').attr('class', 'poster').attr('src', data[i].poster))))
                          );
        }   
        
    }).catch(function(error){
        $('#episodesTable').find('tbody').empty();
        alert(error);
        alert('خطأ في الإتصال بقاعدة البيانات, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج')
    }).then(function() {
        $(document).on('click', 'a.newtab', function(){
            chrome.tabs.create({url: $(this).attr('href')});
            return false;
        });
        $(document).on('click', 'a.delepisode', function(){
            $.ajax({
                url: $(this).attr('href'),
                type: 'POST',
                data : '',
                success: function(response){
                    if(response.error == 0){ // No error
                        alert(response.data);
                        $('#episodesTable').find('tbody').empty();
                        DashboardViewPremium();
                    }else{
                        alert(JSON.stringify(response.data));
                    }
                },
                error: function(err){
                    alert(err);
                }
            });
            return false;
        });
    });
}

async function DashboardViewRegular(){
    $('#formContent-signup').hide();
    $('#formContent-login').hide();
    $('#dashboard_premium').hide();
    $('#mainLoading').hide();
    $('#loginLoading').hide();
    $('#dashboard_regular').show();
    await checkLogin();
    // Update Username
    $('#username_regular').text(first_name+' '+last_name);
    $('#accountType_regular').text('عادي');
    $('#accountNumber_regular').text('#'+id);
    // Populate episodes table
}

function logout() {
    if(token){
        $('#episodesTable').find('tbody').empty();
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }else{
                chrome.runtime.sendMessage({"type":"logout"});
                token = null;
                first_name = null;
                last_name = null;
                loginView();
            }
            
        });
    }
}


function getEpisodes(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: HOST+'/users/episodes',
            type: 'POST',
            data: JSON.stringify({token: token, email:email}),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                if(response.error == 0){ // No error
                    resolve(response.data);
                }else{
                    resolve(JSON.stringify(response.data));
                }
            },
            error: function(err){
                reject(err);
            }
          });
    });
}


function sendM(msg){
  chrome.runtime.sendMessage(msg);
}








