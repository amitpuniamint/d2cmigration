    $(document).ready(function() {
//FIR Date Masking
        (function($){
        $('#fir_date').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#fir_date').blur(function(event){
            var dtVal=$('#fir_date').val();
            if(ValidateFirDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });

//GD Date Masking

        (function($){
        $('#fir_gddatetime').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#fir_gddatetime').blur(function(event){
            var dtVal=$('#fir_gddatetime').val();
            if(ValidateGDDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });

//Occurrence Date From Masking

        (function($){
        $('#fir_occ_datefrom').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#fir_occ_datefrom').blur(function(event){
            var dtVal=$('#fir_occ_datefrom').val();
            if(ValidateOccFromDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });

//Occurrence Date To Masking

        (function($){
        $('#fir_occ_dateto').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#fir_occ_dateto').blur(function(event){
            var dtVal=$('#fir_occ_dateto').val();
            if(ValidateOccToDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });

//Occurrence Info Rcvd At PS Masking

        (function($){
        $('#fir_occ_info_received_datetime').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#fir_occ_info_received_datetime').blur(function(event){
            var dtVal=$('#fir_occ_info_received_datetime').val();
            if(ValidateOccPSInfoDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });


//Chargesheet Date Masking
        (function($){
        $('#cdchargesheetdate').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "DD-MM-YYYY HH:MM"
        });
        })(jQuery)
        $('#cdchargesheetdate').blur(function(event){
            var dtVal=$('#cdchargesheetdate').val();
            if(ValidateChargesheetDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });

    });


function ValidateFirDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])
    console.log("year", year, "months", months, "day", day)

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#fir_date').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#fir_date').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#fir_date').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#fir_date').focus();
        return false
    }

}


function ValidateGDDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])
    console.log("year", year, "months", months, "day", day)

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#fir_gddatetime').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#fir_gddatetime').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#fir_gddatetime').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#fir_gddatetime').focus();
        return false
    }

}


function ValidateOccFromDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#fir_occ_datefrom').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#fir_occ_datefrom').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#fir_occ_datefrom').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#fir_occ_datefrom').focus();
        return false
    }

}

function ValidateOccToDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#fir_occ_dateto').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#fir_occ_dateto').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#fir_occ_dateto').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#fir_occ_dateto').focus();
        return false
    }

}

function ValidateOccPSInfoDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#fir_occ_info_received_datetime').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#fir_occ_info_received_datetime').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#fir_occ_info_received_datetime').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#fir_occ_info_received_datetime').focus();
        return false
    }

}

function ValidateChargesheetDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])
    console.log("year", year, "months", months, "day", day)

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#cdchargesheetdate').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#cdchargesheetdate').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#cdchargesheetdate').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#cdchargesheetdate').focus();
        return false
    }

}
