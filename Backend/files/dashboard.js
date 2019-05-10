var token = window.localStorage.getItem('token');
var isadmin;
function checkLogin() {
    return new Promise((resolve, reject) => {
       window.localStorage.getItem('PharmacyToken');

                            id = data.egybest_id;
                            token = data.egybest_token;
                            first_name = data.egybest_first_name;
                            last_name = data.egybest_last_name;
                            email = data.egybest_email;
    });
}


$(document).ready(function (){

    loading();
    checkLogin().then(function(isLoggedIn){
        if(isLoggedIn == false){ // Not Logged in
            loginView();
        }else{ // Already logged in
            isPremium().then(function(premium){
                if(premium == 1){ // premium
                    DashboardViewPremium();
                }else{
                    DashboardViewRegular();
                }
            }).catch(function (error){
                alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");    
                window.close();
            });
        }   
    }).then(function (){
    ///////////////// Click and Submit Events //////////////////
    $(document).on('click', '#buyButton', function (e) {
        /*
        $.ajax({
            url: HOST+'/users/getpaymentimg',
            type: 'POST',
            data: JSON.stringify({token: token,email: email}),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                $('#premiumAdvTable').hide();
                $('#buyTable').show();
                if(response.error == 0){
                    $('#paymentSlipImg').attr('src', HOST+'/'+response.img);
                    $('#paymentSlip').show();
                    $('#formPaymentSlip').hide(); // hide upload form
                }else{
                    $('#paymentSlip').hide();
                    $('#formPaymentSlip').show(); 
                }
            },
            error : function(err){
                alert(err);
            }
        });
        */
       alert('سيتم إطلاق النسخة المدفوعة قريبا, سيكون ثمن الإشتراك 500دج فقط لمدة ستة أشهر!');
        
       
        
   });
   
   $(document).on('click', '#login', function() {
        chrome.tabs.create({ url: HOST+'/login' }, function(tab) {
            chrome.tabs.update(tab.id, {active: true});
            window.close();
        });
    });
    $(document).on('click', '#register', function() {
        chrome.tabs.create({ url: HOST+'/register' }, function(tab) {
            chrome.tabs.update(tab.id, {active: true});
            window.close();
        });
    });
    $(document).on('click', '#logout', function() {
        logout();
    });
    $(document).on('click', '#delPayment', function() {
        delPayment();
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
                            $('#paymentSlipImg').attr('src', HOST+'/'+response.img);
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
              if(response.error == 0){ // No error
                  alert(response.data);
                  $('#ordersTable > tbody > tr').filter(function(){
                    return $(this).find('td:nth-child(5)').text() === $("#userid_setpremium").val();
                  }).remove();
              }else{
                  alert(JSON.stringify(response.data));
              }
              $("#formSetPremium")[0].reset(); 
          },
          error: function() {
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
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
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
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
             alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
          },
          complete: function(){
            submitButton.prop('disabled', false);
          }
        });
        
        return false;
    });

  
    ///////////////////////////////////////////////
    }).catch(function(e){
        alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
        window.close();
    });
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
    $('#dashboard_premium').hide();
    $('#dashboard_regular').hide();
    $('#mainLoading').hide();
    $('#loginLoading').hide();
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
                if(response.error == 0){ 
                    $('#premium_count').text(response.premium);
                    $('#regular_count').text(response.regular);
                    $('#admins_count').text(response.admins);
                }else{
                    alert(JSON.stringify(response.data));
                }
            },
            error: function() {
               alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
            }
        }); 
        $.ajax({
            url: HOST+'/users/getpaymentinfo',
            type: 'POST',
            data : "token="+ token + "&email=" + email,
            success: function(response){
                if(response.error == 0){ 
                    for(var i = 0; i < response.data.length; i++){
                        $('#ordersTable').find('tbody')
                             .append($('<tr>')
                                  .append($('<td>')
                                  .append($('<a>').attr('href', HOST+"/"+response.data[i].paymentslip).attr('target', '_blank') //class newtab
                                        .append($('<img>').attr('class', 'poster').attr('src', HOST+"/"+response.data[i].paymentslip))))
                                  .append($('<td>').html(response.data[i].tel))
                                  .append($('<td>').html(response.data[i].last_name))
                                  .append($('<td>').html(response.data[i].first_name))
                                  .append($('<td>').html(response.data[i].id))
                              );
                    }  
                }else{
                    console.log(JSON.stringify(response.data));
                }
            },
            error: function() {
               alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
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
                          .append($('<a>').attr('href', data[i].url).attr('target', '_blank')
                                .append($('<img>').attr('class', 'poster').attr('src', data[i].poster))))
                          );
        }   
        
    }).catch(function(error){
        $('#episodesTable').find('tbody').empty();
        alert('خطأ في الإتصال بقاعدة البيانات, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج')
    }).then(function() {
        $(document).on('click', 'a.delepisode', function(e){
            e.preventDefault();
            var tableRow = $(this).parent().parent();
            $.ajax({
                url: $(this).attr('href'),
                type: 'POST',
                data : '',
                success: function(response){
                    if(response.error == 0){ // No error
                        alert(response.data);
                        tableRow.remove();
                    }else{
                        alert(JSON.stringify(response.data));
                    }
                },
                error: function(err){
                    alert(err);
                }
            });
        });
    }).then(function(){
        // Populate favorites table
        getFavorites().then(function (data){
            $('#favoritesTable').find('tbody').empty();
            for(var i = 0; i < data.length; i++){
            $('#favoritesTable').find('tbody')
                    .append($('<tr>')
                        .append($('<td>').html($('<a>').attr('href', HOST+'/users/delfavorite?token='+token+'&email='+email+'&title='+data[i].title).attr('class', 'delfavorite').html('&#10060;')))
                        .append($('<td>').html(data[i].title))
                        .append($('<td>')
                            .append($('<a>').attr('href', data[i].url).attr('target', '_blank')
                                    .append($('<img>').attr('class', 'poster').attr('src', data[i].poster))))
                            );
            }   
            
        }).catch(function(error){
            $('#favoritesTable').find('tbody').empty();
            alert('خطأ في الإتصال بقاعدة البيانات, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج')
        }).then(function() {
            $(document).on('click', 'a.delfavorite', function(e){
                e.preventDefault();
                var tableRow = $(this).parent().parent();
                $.ajax({
                    url: $(this).attr('href'),
                    type: 'POST',
                    data : '',
                    success: function(response){
                        if(response.error == 0){ // No error
                            alert(response.data);
                            tableRow.remove();
                        }else{
                            alert(JSON.stringify(response.data));
                        }
                    },
                    error: function(err){
                        alert(JSON.stringify(err));
                    }
                });
                return false;
            });
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
        $.ajax({
            url: HOST+'/users/logout',
            type: 'POST',
            data: JSON.stringify({token: token, email:email}),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                if(response.error == 0){ // No error
                    $('#episodesTable').find('tbody').empty();
                    $('#favoritesTable').find('tbody').empty();
                    chrome.storage.local.clear(function() {
                        var error = chrome.runtime.lastError;
                        if (error) {
                            alert(error);
                        }else{
                            chrome.runtime.sendMessage({"type":"logout"});
                            token = null;
                            first_name = null;
                            last_name = null;
                            loginView();
                        }
                    });
                }else{
                    alert(JSON.stringify(response.data));
                }
            },
            error: function(err){
                alert(JSON.stringify(err));
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
                    reject(JSON.stringify(response.data));
                }
            },
            error: function(err){
                reject(err);
            }
          });
    });
}

function getMovies(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: HOST+'/users/movies',
            type: 'POST',
            data: JSON.stringify({token: token, email:email}),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                if(response.error == 0){ // No error
                    resolve(response.data);
                }else{
                    reject(JSON.stringify(response.data));
                }
            },
            error: function(err){
                reject(err);
            }
          });
    });
}

function getFavorites(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: HOST+'/users/favorites',
            type: 'POST',
            data: JSON.stringify({
                token: token,
                email:email
            }),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                if(response.error == 0){ // No error
                    resolve(response.data);
                }else{
                    reject(JSON.stringify(response.data));
                }
            },
            error: function(err){
                reject(err);
            }
          });
    });
}


function delPayment(){
    if(confirm('هل أنت متأكد من أنك تريد حذف وصل الدفع؟ هذه العملية لا يمكن الرجوع فيها')){
        $.ajax({
            url: HOST+'/users/delpayment',
            type: 'POST',
            data : "token="+ token + "&email=" + email,
            success: function(response){
                if(response.error == 0){ // No error
                    alert(response.data);
                    $('#formPaymentSlip').show();
                    $('#paymentSlip').hide();
                }else{
                    alert(JSON.stringify(response.data));
                }
            },
            error: function(err){
                alert(err);
            }
        });
    }
}

function sendM(msg){
  chrome.runtime.sendMessage(msg);
}









