function checkLogin() {
    return new Promise((resolve, reject) => {
        var token = window.localStorage.getItem('PharmacyToken');
        if (token) {
            var tokenDecoded = JSON.parse(atob(token.split('.')[1]));
            resolve(tokenDecoded);
        } else {
            reject();
        }


    });
}
window.addEventListener('load', function () {
    const preloader = document.querySelector('#preloader');
    preloader.classList.add('preload-finish');
});

$(document).ready(function () {
    $('.datepicker').datepicker({
        daysOfWeekHighlighted: '5,6',
        language: 'fr',
        weekStart: 0
    });
    ///////////////// Click and Submit Events //////////////////
    $(document).on('click', '#login', function () {
        window.location.replace('./login');
    });
    $(document).on('click', '#register', function () {
        window.location.replace('./register');
    });
    $(document).on('click', '#logout', function () {
        logout();
    });
    checkLogin().then(function (tokenDecoded) {
        DashboardView(tokenDecoded);
        $(document).on('submit', '#formSetPremium', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var submitButton = $(this).find(':submit');
            submitButton.prop('disabled', true);

            $.ajax({
                url: HOST + '/users/setpremium',
                type: 'POST',
                data: $('#formSetPremium').serialize() + "&token=" + token + "&email=" + email,
                success: function (response) {
                    if (response.error == 0) { // No error
                        alert(response.data);
                        $('#ordersTable > tbody > tr').filter(function () {
                            return $(this).find('td:nth-child(5)').text() === $("#userid_setpremium").val();
                        }).remove();
                    } else {
                        alert(JSON.stringify(response.data));
                    }
                    $("#formSetPremium")[0].reset();
                },
                error: function () {
                    alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
                },
                complete: function () {
                    submitButton.prop('disabled', false);
                }
            });

            return false;
        });

        $(document).on('submit', '#formGetPremium', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var submitButton = $(this).find(':submit');
            submitButton.prop('disabled', true);

            $.ajax({
                url: HOST + '/users/getpremium',
                type: 'POST',
                data: $('#formGetPremium').serialize() + "&token=" + token + "&email=" + email,
                success: function (response) {
                    if (response.error == 0) { // No error
                        alert("First Name: " + response.first_name + "\n" +
                            "Last Name: " + response.last_name + "\n" +
                            "Email: " + response.email + "\n" +
                            "Premium: " + response.ispremium + "\n" +
                            "Premium End: " + response.premiumend + "\n" +
                            "Days Left: " + response.daysleft);
                    } else {
                        alert(JSON.stringify(response.data));
                    }
                    $("#formGetPremium")[0].reset();
                },
                error: function () {
                    alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
                },
                complete: function () {
                    submitButton.prop('disabled', false);
                }
            });

            return false;
        });

        $(document).on('submit', '#formSetRegular', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var submitButton = $(this).find(':submit');
            submitButton.prop('disabled', true);

            $.ajax({
                url: HOST + '/users/setregular',
                type: 'POST',
                data: $('#formSetRegular').serialize() + "&token=" + token + "&email=" + email,
                success: function (response) {
                    $("#formSetRegular")[0].reset();
                    if (response.error == 0) { // No error
                        alert(response.data);
                    } else {
                        alert(JSON.stringify(response.data));
                    }
                },
                error: function () {
                    alert("خطأ في الإتصال بالسيرفر, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج, إذا إستمر الوضع هكذا قم بتحديث الإضافة");
                },
                complete: function () {
                    submitButton.prop('disabled', false);
                }
            });

            return false;
        });
        ///////////////////////////////////////////////
    }).catch(function () { // not logged in
        loginView();
    });
});

function loginView() {
    $('#dashboard').hide();
    $('#loginLoading').hide();
    $('#formContent').show();
}

async function DashboardView(tokenDecoded) {
    $('#formContent').hide();
    $('#dashboard').show();
    await checkLogin();
    // Update Username
    $('#username').text(tokenDecoded.first_name + ' ' + tokenDecoded.last_name);
    $('#accountType').text('');
    $('#accountNumber').text('#' + tokenDecoded.id);
    $('#account_daysleft').text('');
    /* 
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
     */


}


function logout() {
    window.localStorage.removeItem('PharmacyToken');
    window.location.reload();
}


function getEpisodes() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: HOST + '/users/episodes',
            type: 'POST',
            data: JSON.stringify({
                token: token,
                email: email
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.error == 0) { // No error
                    resolve(response.data);
                } else {
                    reject(JSON.stringify(response.data));
                }
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}

function getMovies() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: HOST + '/users/movies',
            type: 'POST',
            data: JSON.stringify({
                token: token,
                email: email
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.error == 0) { // No error
                    resolve(response.data);
                } else {
                    reject(JSON.stringify(response.data));
                }
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}

function getFavorites() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: HOST + '/users/favorites',
            type: 'POST',
            data: JSON.stringify({
                token: token,
                email: email
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.error == 0) { // No error
                    resolve(response.data);
                } else {
                    reject(JSON.stringify(response.data));
                }
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}


function delPayment() {
    if (confirm('هل أنت متأكد من أنك تريد حذف وصل الدفع؟ هذه العملية لا يمكن الرجوع فيها')) {
        $.ajax({
            url: HOST + '/users/delpayment',
            type: 'POST',
            data: "token=" + token + "&email=" + email,
            success: function (response) {
                if (response.error == 0) { // No error
                    alert(response.data);
                    $('#formPaymentSlip').show();
                    $('#paymentSlip').hide();
                } else {
                    alert(JSON.stringify(response.data));
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    }
}

function sendM(msg) {
    chrome.runtime.sendMessage(msg);
}