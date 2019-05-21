window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
window.chartColorsFaded = {
	red: 'rgba(255, 99, 132, .2)',
	orange: 'rgba(255, 159, 64, .2)',
	yellow: 'rgba(255, 205, 86, .2)',
	green: 'rgba(75, 192, 192, .2)',
	blue: 'rgba(54, 162, 235, .2)',
	purple: 'rgba(153, 102, 255, .2)',
	grey: 'rgba(201, 203, 207, .2)'
};
 $(document).ready(function () {

     $.ajax({
         url: './users/getserverstatistics',
         type: 'GET',
         contentType: 'application/json; charset=utf-8',
         success: function (response) {
             if (response.error == 0) {
                 var time = [], totalUsers = [], registeredToday = [], todayActiveUsers = [];
                 response.data.forEach(function(val){
                    time.push(val.time.substring(0, 10));
                    totalUsers.push(val.totalUsers);
                    registeredToday.push(val.registeredToday);
                    todayActiveUsers.push(val.todayActiveUsers);
                 });
                 time.reverse();
                 totalUsers.reverse();
                 registeredToday.reverse();
                 todayActiveUsers.reverse();
                 
                 var totalUsersCtx = document.getElementById('totalUsers').getContext('2d');
                 var totalUsersChart = new Chart(totalUsersCtx, {
                     type: 'bar',
                     data: {
                         labels: time,
                         datasets: 
                         [  {
                                 label: 'Total Users',
                                 data: totalUsers,
                                 backgroundColor: window.chartColorsFaded.red,
                                 borderColor: window.chartColors.red,
                                 borderWidth: 3,
                                 fill: false
                             }
                         ]
                     },
                     options: {
                         responsive: true,
                         maintainAspectRatio: false,
                         scales: {
                            xAxes: [{
                                ticks: {
                                    autoSkip: false,
                                    maxRotation: 90,
                                    minRotation: 0
                                }
                            }]
                        }
                     }
                 });

                 var registeredTodayCtx = document.getElementById('registeredToday').getContext('2d');
                 var registeredTodayChart = new Chart(registeredTodayCtx, {
                     type: 'bar',
                     data: {
                         labels: time,
                         datasets: 
                         [  
                             {
                                 label: 'Registered Today',
                                 data: registeredToday,
                                 backgroundColor: window.chartColorsFaded.blue,
                                 borderColor: window.chartColors.blue,
                                 borderWidth: 3,
                                 fill: false
                             }
                         ]
                     },
                     options: {
                         responsive: true,
                         maintainAspectRatio: false,
                         scales: {
                            xAxes: [{
                                ticks: {
                                    autoSkip: false,
                                    maxRotation: 90,
                                    minRotation: 0
                                }
                            }]
                        }
                     }
                 });

                 var todayActiveUsersCtx = document.getElementById('todayActiveUsers').getContext('2d');
                 var todayActiveUsersChart = new Chart(todayActiveUsersCtx, {
                     type: 'bar',
                     data: {
                         labels: time,
                         datasets: 
                         [  
                             {
                                 label: 'Today Active Users',
                                 data: todayActiveUsers,
                                 backgroundColor: window.chartColorsFaded.green,
                                 borderColor: window.chartColors.green,
                                 borderWidth: 3,
                                 fill: false
                             }
                         ]
                     },
                     options: {
                         responsive: true,
                         maintainAspectRatio: false,
                         scales: {
                            xAxes: [{
                                ticks: {
                                    autoSkip: false,
                                    maxRotation: 90,
                                    minRotation: 0
                                }
                            }]
                        }
                     }
                 });
             } else {
                 console.log(JSON.stringify(response));
             }
         },
         error: function (err) {
             console.log(JSON.stringify(err));
         }
     });

     $.ajax({
        url: './users/getcurrentserverstatistics',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (response.error == 0) {
                var time = [];
                    time.push(response.data.time.substring(0, 10));
                var totalUsers = [];
                    totalUsers.push(response.data.totalUsers); 
                var registeredToday = [];
                    registeredToday.push(response.data.registeredToday);
                var todayActiveUsers = [];
                    todayActiveUsers.push(response.data.todayActiveUsers);
                
                 var totalUsersCtx = document.getElementById('totalUsers_today').getContext('2d');
                var totalUsersChart = new Chart(totalUsersCtx, {
                    type: 'bar',
                    data: {
                        labels: time,
                        datasets: 
                        [  {
                                label: 'Total Users',
                                data: [totalUsers],
                                backgroundColor: window.chartColorsFaded.red,
                                borderColor: window.chartColors.red,
                                borderWidth: 3,
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                           xAxes: [{
                               ticks: {
                                   autoSkip: false,
                                   maxRotation: 90,
                                   minRotation: 0
                               }
                           }]
                       }
                    }
                }); 
                
                var registeredTodayCtx = document.getElementById('registeredToday_today').getContext('2d');
                var registeredTodayChart = new Chart(registeredTodayCtx, {
                    type: 'bar',
                    data: {
                        labels: time,
                        datasets: 
                        [  
                            {
                                label: 'Registered Today',
                                data: [registeredToday],
                                backgroundColor: window.chartColorsFaded.blue,
                                borderColor: window.chartColors.blue,
                                borderWidth: 3,
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                           xAxes: [{
                               ticks: {
                                   autoSkip: false,
                                   maxRotation: 90,
                                   minRotation: 0
                               }
                           }]
                       }
                    }
                });

                var todayActiveUsersCtx = document.getElementById('todayActiveUsers_today').getContext('2d');
                var todayActiveUsersChart = new Chart(todayActiveUsersCtx, {
                    type: 'bar',
                    data: {
                        labels: time,
                        datasets: 
                        [  
                            {
                                label: 'Today Active Users',
                                data: todayActiveUsers,
                                backgroundColor: window.chartColorsFaded.green,
                                borderColor: window.chartColors.green,
                                borderWidth: 3,
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                           xAxes: [{
                               ticks: {
                                   autoSkip: false,
                                   maxRotation: 90,
                                   minRotation: 0
                               }
                           }]
                       }
                    }
                });
                
            } else {
                console.log(JSON.stringify(response));
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });

    
 });