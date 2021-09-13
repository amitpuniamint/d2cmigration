/*=========================================================================================
    File Name: wizard-steps.js
    Description: wizard steps page specific js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Version: 2.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Wizard tabs with numbers setup
$(".number-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function (event, currentIndex) {
        alert("Form submitted.1");
    }
});

// Wizard tabs with icons setup
$(".icons-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function (event, currentIndex) {
        alert("Form submitted.2");
    }
});

// Validate steps wizard

// Show form
var form = $(".steps-validation").show();

$(".steps-validation").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex) {
            return true;
        }

        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex) {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }

        // Fir Registration Page
        if(form.attr("id") == "fir_form"){
            if(newIndex == 1)
            {
            if(document.getElementById("fir_year_error").innerHTML == '')
            {
            }
            else
            {
                $('#fir_no_alert').modal('show');
                return false;
            }
              if(fir_list.length > 0)
              {

              } 
              else
              {
                $('#fir_act_sec_alert').modal('show');
                return false;
              } 
            }
            if(newIndex == 2){
                if(occ_list.length > 0){
                    return true;
                }else{
                    return false;
                }
            }else if(newIndex == 3){
                if($("#fir_comp_sameasvictim").prop("checked") == true){
                        copy_compliant_to_victim();
                }
            }
            else if(newIndex == 4){

                if(!isValid($("#fir_content").val()))
                {
                $('#fir_content_alert').modal('show');
                return false;
                }
                else
                {
                    return true;
                }
                function isValid(str)
                {
                return !/[~`!#$\^&+=[\]';{}|<>]/g.test(str);
                }
            }
            else if(newIndex == 6){
                if(victim_list.length > 0){
                    return true;
                }else{
                    if($('input[name="fir_comp_victimtypes"]:checked').val() == "Unknown"){
                        return true
                    }
                    return false;
                }
            }else if(newIndex == 7){
                if(accused_list.length > 0){
                    return true;
                }else{
                    if($('input[name="fir_accusedtypes"]:checked').val() == "Unknown"){
                        return true
                    }
                    return false;
                }
            }
        }else if(form.attr("id") == "crime_add_form"){
             // Custom check and validate form

             if(newIndex == 2)
             {
                if(major_minor_list.length > 0)
                {
                    return true;
                }
                else
                {
                    $('#crime_maj_min_alert').modal('show');
                    return false
                }
             }
             if(newIndex == 6)
             {
                if(property_list.length > 0)
                {
                    return true;
                }
                else
                {
                $('#crime_prop_alert').modal('show');
                return false                    
                }
             }

        }else if(form.attr("id") == "arrest_add_form"){
             // Custom check and validate form
             if(newIndex == 2){
                var gdnum = 0;
                accused_list.forEach(function(row, index){
                    if (accused_list[index].arrestgdnumber != "" )
                    {
                            gdnum = gdnum + 1;

                    }
                    else
                    {


                    }
                });

                if (gdnum == 0)
                {    
                $('#arrest_danger_message').modal('show');
                return false;
                }
                else
                {
                return true;
                }
            }
        }else if(form.attr("id") == "seizure_add_form"){
            if(newIndex == 2){
                if(witness_list.length > 0){
                    var i;
                    if(witness_list.length >= 1){
                        for (i = 0; i < witness_list.length; i++) 
                        {
                            var rowCount = $('#witness_table tbody tr').length;
                            if (rowCount < 1)
                            {
                                return false;
                            }
                            else
                            {
                                return true;
                            }
                        }

                    }
                    return true;
                }else{
                    return false;
                }
            }
        }
        else if(form.attr("id") == "charge_sheet_form"){
            if(newIndex == 1){
                if(accused_list.length > 0)
                {
                    // return true;
                }
                else
                {
                    // if($("#chstypefrorch").find("option:selected").val() == "1")
                    // {
                    // $('#accused_prop_alert').modal('show');
                    // return false;
                    // }
                    // else{
                    //     // return true;
                    // }
                }
            }


        }

        else if(form.attr("id") == "court_disposal_form"){

            if(newIndex == 2){

                if($("#cdaccuseddisposaltype").find("option:selected").text() == "Select"){
                $('#chs_acc_disp_alert').modal('show');
                    return false;
                }else{
                    return true;
                }
            }
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function (event, currentIndex) {
        if(form.attr("id") == "arrest_add_form"){
             // Custom check and validate form
             return true;
        }
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex) {
        if(form.attr("id") == "fir_form"){
           // if(property_list.length <= 0){
           //      e.preventDefault();
           //      return false;
           // }
           submitDataTableValues();
           form.submit(function(e) {
                $(':disabled').each(function(e) {
                    $(this).removeAttr('disabled');
                $("a[href$='finish']").hide(); 
                })
            });
            form.submit();
        }else if(form.attr("id") == "approval_form"){
            submitDataTableValues();

            form.submit(function(e) 
            {
                $("a[href$='finish']").hide(); 
            });
            form.submit();
        }else if(form.attr("id") == "crime_add_form"){
            submitDataTableValues();

            form.submit(function(e) 
            {
                $("a[href$='finish']").hide(); 
            });
            form.submit();

        }else if(form.attr("id") == "arrest_add_form"){
            submitDataTableValues();
            form.submit(function(e) 
            {
                $("a[href$='finish']").hide(); 
            });
            form.submit();
        }else if(form.attr('id') == 'seizure_add_form'){
            submitDataTableValues();
            form.submit(function(e) 
            {
                if (property_list.length > 0)
                {
                    return true;
                }
                else
                {
                    alert('Please add Property Information')
                    return false;
                }


                $("a[href$='finish']").hide(); 
            });
            form.submit();

        }else if(form.attr('id') == 'charge_sheet_form'){
            submitDataTableValues();
            form.submit(function(e) 
            {

var table = document.getElementById("accused_table");

for (var i = 0, row; row = table.rows[i]; i++) 
{
var brow = i + 1;
var accrow = i;
var chadd = '#chargeadd';
var res = chadd.concat(brow);
var nonchadd = '#nonchargeadd';
var nonres =  nonchadd.concat(brow);

var res_enabled = $(res).is(":disabled");

var nonres_enabled = $(nonres).is(":disabled");

if(document.getElementById('chstypefrorch').value=='1')
{

if ($("#accused_table tbody").is(":empty") == true)
{
    $('#chs_acc_not_found').modal('show');
    return false;
}
}

if (i >= accused_list.length)
{

}
else
{
    var softdelete = accused_list[i]['soft_delete'];

if (softdelete == 'No')
{


if(res_enabled == 'false' ||  nonres_enabled == 'false' )
{
    $('#chs_datacheck_message').modal('show');
    return false;
}

else if(res_enabled == 'true' ||  nonres_enabled == 'true' )
{
    $('#chs_datacheck_message').modal('show');
    return false;
}

else if(res_enabled == 'true' ||  nonres_enabled == 'false' )
{
    if (softdelete == 'No')
    {
    if (accused_list[i]['accusedaddverified'] == '')
    {
        $('#chs_datacheck_message').modal('show');
        return false;
    }
    }
    else
    {

    }

}

else if(res_enabled == 'false' ||  nonres_enabled == 'true' )
{
    if (softdelete == 'No')
    {
    if (accused_list[i]['accusedaddverified'] == '')
    {
        $('#chs_datacheck_message').modal('show');
        return false;
    }
    }
    else
    {

    }

}
}
}
}            
                $("a[href$='finish']").hide(); 
            });

            form.submit();

        }else if(form.attr('id') == 'court_disposal_form'){
            submitDataTableValues();
            form.submit(function(e) 
            {
                $("a[href$='finish']").hide(); 
            });
            form.submit();
        }else if(form.attr('id') == 'result_appeal_form'){
            submitDataTableValues();
            form.submit(function(e) 
            {
                $("a[href$='finish']").hide(); 
            });
            form.submit();
        }else if(form.attr('id') == 'fir_reject_form'){
            submitDataTableValues();
            form.submit(function(e) 
            {
                $("a[href$='finish']").hide(); 
            });
            form.submit();
        }
    }
});

// Initialize validation
$(".steps-validation").validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    rules: {
        email: {
            email: true
        }
    }
});