    $(document).ready(function() {
//Arrest/Surrender Date Masking
        (function($){
        $('#arrestdatetime').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#arrestdatetime').blur(function(event){
            var dtVal=$('#arrestdatetime').val();
            if(ValidateArrestDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });

//Arrest/Surrender Info Received At PS Date Masking
        (function($){
        $('#arrest_psinfo_datetime').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#arrest_psinfo_datetime').blur(function(event){
            var dtVal=$('#arrest_psinfo_datetime').val();
            if(ValidateArrestPSInfoDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });


//Arrest/Surrender Intimation Relative Date Masking
        (function($){
        $('#arrest_intimate_datetime').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#arrest_intimate_datetime').blur(function(event){
            var dtVal=$('#arrest_intimate_datetime').val();
            if(ValidateArrestIntimationDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });


    });


function ValidateArrestDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])
    console.log("year", year, "months", months, "day", day)

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#arrestdatetime').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#arrestdatetime').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#arrestdatetime').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#arrestdatetime').focus();
        return false
    }

}

function ValidateArrestPSInfoDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])
    console.log("year", year, "months", months, "day", day)

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#arrest_psinfo_datetime').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#arrest_psinfo_datetime').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#arrest_psinfo_datetime').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#arrest_psinfo_datetime').focus();
        return false
    }

}



function ValidateArrestIntimationDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])
    console.log("year", year, "months", months, "day", day)

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#arrest_intimate_datetime').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#arrest_intimate_datetime').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#arrest_intimate_datetime').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#arrest_intimate_datetime').focus();
        return false
    }

}