    $(document).ready(function() {
//Arrest/Surrender Date Masking
        (function($){
        $('#seizedatetime').inputmask("datetime",{
            mask: "1-2-y h:s", 
            placeholder: "DD-MM-YYYY HH:MM", 
            leapday: "-02-29", 
            separator: "-", 
            alias: "dd-mm-yyyy hh:mm"
        });
        })(jQuery)
        $('#seizedatetime').blur(function(event){
            var dtVal=$('#seizedatetime').val();
            if(ValidateSeizeDate(dtVal)) {

            }
            else{
                // $('.error').show();
                event.preventDefault();
            }
        });

    });


function ValidateSeizeDate(date){
    
    var year = parseInt(date.split(" ")[0].split("-")[2])
    var months = parseInt(date.split(" ")[0].split("-")[1])
    var day = parseInt(date.split(" ")[0].split("-")[0])
    console.log("year", year, "months", months, "day", day)

    // before 1980
    if(year < 1980){
        // $('.error').text('Please enter year greather then 1980)')
        $('#seizedatetime').focus();
        return false
    }

    //leap year
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
       console.log("Leap year")
    }else{
        if(day >= 29 && months == 2){
            // $('.error').text(`${year}- Months 0${months} doesnot have 29 days`)
            $('#seizedatetime').focus();
            return false
        }
    }
  
    var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");
    if (date.search(pattern)===0){
       // return true;
    } else {
       // $('.error').text('Invalid Date.(mm-dd-yyyy hh:mm)')
       $('#seizedatetime').focus();
        return false; 
    } 
    
    var date = moment(`${year}-${months}-${day}`)
    var now = moment();
    if (date > now) {
        $('#seizedatetime').focus();
        return false
    }

}
