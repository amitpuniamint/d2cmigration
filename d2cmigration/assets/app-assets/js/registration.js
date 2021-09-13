/*
Manages the validation &  DataTable of FIR Registration
*/

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
}
return true;
}

function firdatecheck(){

var firdatetime = document.getElementById("fir_date").value;
var datepattern = /((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[0-9])|(1[0-2]))-[0-9]{4} (0\d|1\d|2[0-3]):[0-5]\d/;
if (datepattern.test(firdatetime)== true) {
    $("#fir_gddatetime").val(firdatetime);
}
else{
  document.getElementById("fir_date").focus();

}
   }

function compclearFunction() {
  document.getElementById("fir_comp_dob").value = null;
  document.getElementById("fir_comp_yob").value = '';
  document.getElementById("fir_comp_ageyear").value = '';
  document.getElementById("fir_comp_agemonth").value = '';   
  document.getElementById("fir_comp_agefrom").value = '';
  document.getElementById("fir_comp_ageto").value = '';
}

function vicclearFunction() {
  document.getElementById("fir_victimdob").value = null;
  document.getElementById("fir_victimyob").value = '';
  document.getElementById("fir_victimageyear").value = '';
  document.getElementById("fir_victimagemonth").value = '';   
  document.getElementById("fir_victimagefrom").value = '';
  document.getElementById("fir_victimageto").value = '';
}

function accclearFunction() {
  document.getElementById("fir_accdob").value = null;
  document.getElementById("fir_accyob").value = '';
  document.getElementById("fir_accageyear").value = '';
  document.getElementById("fir_accagemonth").value = '';   
  document.getElementById("fir_accagefrom").value = '';
  document.getElementById("fir_accageto").value = '';
}
function gddatecheck(){

var gddatetime = document.getElementById("fir_gddatetime").value;
console.log(gddatetime);
var datepattern = /((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[0-9])|(1[0-2]))-[0-9]{4} (0\d|1\d|2[0-3]):[0-5]\d/;

console.log(datepattern.test(gddatetime));
if (datepattern.test(gddatetime)== true) {
    firdate = $("#fir_date").val();
    firgddate = $("#fir_gddatetime").val();

    var arrfirDate = $("#fir_date").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]
    console.log(arrfirdatetime)

    var arrgdDate = $("#fir_gddatetime").val().split(" ")
    var gddatecomp = arrgdDate[0].split("-")
    var arrgddatetime = gddatecomp[2] + "-" + gddatecomp[1] + "-" + gddatecomp[0] + "T" + arrgdDate[1]
    console.log(arrgddatetime)

    if (arrfirdatetime < arrgddatetime){

    document.getElementById('gd_date_error').innerHTML = 'GD date cannot greater than FIR date';
    document.getElementById("fir_gddatetime").focus();
    return false        
    }
    else{
        document.getElementById('gd_date_error').innerHTML = '';
    }

}
else{
  document.getElementById("fir_gddatetime").focus();

}
   }


function isDecimalKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31 
        && (charCode < 48 || charCode > 57))
    {    
    return false;
    }
    return true;
   }


// Component Setting Throughout the application
function set_time_picker_min_val_today(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
    if (today.getHours() < 10){
        var hours = 'T0'+today.getHours();
    }

    else 
    {
         var hours = 'T'+today.getHours();
    }
    if (today.getMinutes() < 10){
        var minutes = ':0'+today.getMinutes();
    }

    else 
    {
         var minutes = ':'+today.getMinutes();
    }

    return date+hours+minutes;
}

function getYearDropDown(){
    // Return list of year as html <option/>
}

$(document).ready(function() {
    $("#fir_date").attr("max",set_time_picker_min_val_today());
    $("#fir_gddatetime").attr("max",document.getElementById('fir_date'));
    $("#fir_occ_datefrom").attr("max",document.getElementById('fir_date'));
    $("#fir_accdob").attr("max",document.getElementById('fir_date'));
    $("#fir_occ_datefrom").attr("max",set_time_picker_min_val_today());
    $("#fir_occ_dateto").attr("max",set_time_picker_min_val_today());
    $("#fir_occ_info_received_datetime").attr("max",set_time_picker_min_val_today());
    $("#fir_comp_dob").attr("max",set_time_picker_min_val_today());
    $("#fir_victimdob").attr("max",set_time_picker_min_val_today());
    $("#fir_accdob").attr("max",set_time_picker_min_val_today());


});

function timeofocc_func(){

var occdatecheck = document.getElementById("fir_occ_datefrom").value;
var datepattern = /((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[0-9])|(1[0-2]))-[0-9]{4} (0\d|1\d|2[0-3]):[0-5]\d/;
if (datepattern.test(occdatecheck)== true) {

    firdate = $("#fir_date").val();

    firoccdatefrom = $("#fir_occ_datefrom").val();

    var arrfirDate = $("#fir_date").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]
    console.log(arrfirdatetime)

    var firoccdatefrom = $("#fir_occ_datefrom").val().split(" ")
    var firoccdatefromcomp = firoccdatefrom[0].split("-")
    var arroccdatetime = firoccdatefromcomp[2] + "-" + firoccdatefromcomp[1] + "-" + firoccdatefromcomp[0] + "T" + firoccdatefrom[1]
    console.log(arroccdatetime)


    if (arrfirdatetime < arroccdatetime){

    document.getElementById('fir_occ_datefrom_error').innerHTML = 'Occurance date is greater than FIR date';
    document.getElementById("fir_occ_datefrom").focus();
    $("#occ_addRow").attr("disabled", true);
    return false        
    }
    else{
        document.getElementById('fir_occ_datefrom_error').innerHTML = '';
        $("#occ_addRow").attr("disabled", false);
    }
}
else{
  document.getElementById("fir_occ_datefrom").focus();

}
    };    

function timeofocc_fromto_func(){
    firdate = $("#fir_date").val();
    occdatefrom = $("#fir_occ_datefrom").val();
    firoccdateto = $("#fir_occ_dateto").val();

    var arrfirDate = $("#fir_date").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]
    console.log(arrfirdatetime)

    var firoccdatefrom = $("#fir_occ_datefrom").val().split(" ")
    var firoccdatefromcomp = firoccdatefrom[0].split("-")
    var arroccdatetime = firoccdatefromcomp[2] + "-" + firoccdatefromcomp[1] + "-" + firoccdatefromcomp[0] + "T" + firoccdatefrom[1]
    console.log(arroccdatetime)

    var firocctodate = $("#fir_occ_dateto").val().split(" ")
    var firoccdatetocomp = firocctodate[0].split("-")
    var arroccdatetimeto = firoccdatetocomp[2] + "-" + firoccdatetocomp[1] + "-" + firoccdatetocomp[0] + "T" + firocctodate[1]
    console.log(arroccdatetimeto)

    if (arroccdatetimeto < arroccdatetime){

    document.getElementById('fir_occ_dateto_error').innerHTML = 'Occurance Date To is less than Date From';
    document.getElementById("fir_occ_dateto").focus();
    // $("#occ_addRow").attr("disabled", true);
    return false        
    }
    else if (arroccdatetimeto > arrfirdatetime){
    document.getElementById('fir_occ_dateto_error').innerHTML = 'Occurance Date To is greater than FIR Date';
    document.getElementById("fir_occ_dateto").focus();
    // $("#occ_addRow").attr("disabled", true);
    return false        
    }
    else{
        document.getElementById('fir_occ_dateto_error').innerHTML = '';
        $("#occ_addRow").attr("disabled", false);        
    }

    };    


function inforeceived_occ_func(){
    firdate = $("#fir_date").val();
    firoccinforeceived = $("#fir_occ_info_received_datetime").val();

    var arrfirDate = $("#fir_date").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]
    console.log(arrfirdatetime)

    var firoccinforeceivedval = $("#fir_occ_info_received_datetime").val().split(" ")
    var firoccinforeceivedvaldate = firoccinforeceivedval[0].split("-")
    var firoccinforeceivedvaldatetime = firoccinforeceivedvaldate[2] + "-" + firoccinforeceivedvaldate[1] + "-" + firoccinforeceivedvaldate[0] + "T" + firoccinforeceivedval[1]
    console.log(firoccinforeceivedvaldatetime)

    if (arrfirdatetime < firoccinforeceivedvaldatetime){

    document.getElementById('fir_occ_info_received_datetime_error').innerHTML = 'Info Received Date is greater than FIR date';
    document.getElementById("fir_occ_info_received_datetime").focus();
    // $("#occ_addRow").attr("disabled", true);
    return false        
    }
    else{
        document.getElementById('fir_occ_info_received_datetime_error').innerHTML = '';
        $("#occ_addRow").attr("disabled", false);        
    }

    };
/* ----------------------------------------------------------
            FIR Information - All Input number, selectable
------------------------------------------------------------- */
// $('#fir_no').blur(function() {
//         show();
//         fir_no = $("#fir_no").val();
//         switch(fir_no.length) {
//               case 1:
//                 fir_no = '000'+fir_no;
//                 break;
//               case 2:
//                 fir_no = '00'+fir_no;
//                 break;
//               case 3:
//                 fir_no = '0'+fir_no;
//                 break;
//          }
//          // $("#fir_no").val(fir_no);
//          // var firyear = $("#fir_year").val();
//          // var firyear = firyear.substr(firyear.length - 2);
//          // var fir_reg_no = ps_id.concat(firyear, fir_no);

//          // $.ajax({ url: "/validate/fir/"+fir_reg_no,
//          //     success: function(data){
//          //        if(data==true){ 
//          //           $("#fir_no").attr("class", 'form-control is-invalid');
//          //        }else{
//          //            $("#fir_no").attr("class", 'form-control is-valid');
//          //        }
//          //     }
//          //     });
//         hide();
//    });

$('#fir_year').blur(function() {
        show();
        fir_no = $("#fir_no").val();

         $("#fir_no").val(fir_no);
         var firyear = $("#fir_year").val();
         var firyear = firyear.substr(firyear.length - 2);
         var fir_reg_no = ps_id.concat(firyear, fir_no);
         document.getElementById("fir_reg_number").innerHTML = fir_reg_no;
         $.ajax({ url: "/validate/fir/"+fir_reg_no,
             success: function(data){
                if(data==true){ 
                    // $('#fir_year').focus();
        document.getElementById("fir_year_error").innerHTML = "FIR Already Exist!";
                   $("#fir_no").attr("class", 'form-control is-invalid');
                }else{
                    $("#fir_no").attr("class", 'form-control is-valid');
        document.getElementById("fir_year_error").innerHTML = "";
                }
             }
             });
        hide();
   });


$('#fir_gdentry').blur(function() {
        fir_no = $("#fir_gdentry").val();
        switch(fir_no.length) {
              case 1:
                $("#fir_gdentry").val('000'+fir_no);
                break;
              case 2:
                $("#fir_gdentry").val('00'+fir_no);
                break;
              case 3:
                $("#fir_gdentry").val('0'+fir_no);
                break;
         }
   }
);


$('#fir_accusedpolice_name').blur(function() {
        police_accused_name = $("#fir_accusedpolice_name").val();
                $("#fir_accusedname").val(police_accused_name);

}
);

$('#fir_no').blur(function() {
        firno = $("#fir_no").val();
        switch(firno.length) {
              case 1:
                $("#fir_no").val('000'+firno);
                break;
              case 2:
                $("#fir_no").val('00'+firno);
                break;
              case 3:
                $("#fir_no").val('0'+firno);
                break;
         }
   }
);


district_url = "districts"
police_station_url = "police-stations"
section_url = "sections"
property_type_url = "property-types"

// Called when District & PS to be loaded during edit functionality
function load_district_ps(district_id, ps_id, state_val, district_val, ps_val, sameasper_val, sameasper_id){
    data = {"state":state_val};
    reset_select(district_id, "Select District");
    $.ajax({ url: district_url,
             data: data,
             success: function(data){
                     $.each(data, function(key, resource) {
                         if(resource[0] == district_val){
                            $('#'+district_id).append($("<option></option>").attr("value",resource[0]).attr('selected', 'selected').text(resource[1]));
                         }else{
                            $('#'+district_id).append($("<option></option>").attr("value",resource[0]).text(resource[1]));
                         }
                      });

                      //Police Station
                      data = {"state": state_val, "district":district_val };
                      reset_select("fir_victimpolicestation", "Select Police Station");

                      $.ajax({ url: police_station_url,
                             data: data,
                             success: function(data){
                                     $.each(data, function(key, resource) {
                                         if(resource[0] == ps_val){
                                            $('#'+ps_id).append($("<option></option>").attr("value",resource[0]).attr('selected', 'selected').text(resource[1]));
                                         }else{
                                            $('#'+ps_id).append($("<option></option>").attr("value",resource[0]).text(resource[1]));
                                         }
                                      });
                                     if(sameasper_val=="Yes"){
                                        $('#'+sameasper_id).click();
                                     }
                              }});


                      }
           });
}

function set_select(id, val){
    $("#"+id).val(val);
}

function reset_select(id, value){
    val = '<option value="">'+value+'</option>';
    $('#'+id)
    .find('option')
    .remove()
    .end()
    .append(val)
    .val('');
}

function reset_text(id_list){
    id_list.forEach(function(row){
        $("#"+row).val("");
        $("#"+row).text("");
    });
}

function reset_radio(id_list){
    id_list.forEach(function(row){
        $("#"+row).click();
    });
}

function load_resource(url, data, elm_id, val_pos, text_pos, value){
    if(elm_id != 'id_state'){show();};
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    }); if(elm_id != 'id_state'){hide();};
  }, error: function(data){if(elm_id != 'id_state'){hide();};} });
}

function reset_property(){
    set_select("fir_property_category", "");
    reset_select("fir_property_type", "Select Type");
    set_select("fir_property_nature", "");
    // reset_select("fir_property_nature", "Select Nature");
    reset_text(["fir_property_desc", "fir_propertyvalue"]);
    $("#prop_addRow").parent().attr("style", "display:block");
    $("#prop_updateRow").parent().attr("style", "display:none");
    $("#prop_cancelRow").parent().attr("style", "display:none");
}

function load_property(row){
    setTimeout(function(){
        $("#fir_property_category").val(row.category_val).trigger("change").trigger("blur");
    }, 8);
    setTimeout(function(){
        $("#fir_property_type").val(row.type_val).trigger("blur").trigger("change");
    }, 800);

    $("#fir_property_desc").val(row.desc.replace("<td>","").replace("</td>",""));
    $("#fir_propertyvalue").val(row.value.replace("<td>","").replace("</td>",""));
    $("#fir_property_nature").val(row.nature_val);
}

function reset_accused(){
    set_select("fir_accusedpolice_rank", "");
    set_select("fir_accgender", "");
    set_select("fir_accagetype", "");
    set_select("fir_acc_reltype", "0");


    set_select("fir_acccountry", "80");
    set_select("fir_accstate", "");
    reset_select("fir_accdistrict", "Select District")
    reset_select("fir_accpolicestation", "Select Police Station")
    set_select("fir_accsameasnational", "80");

    reset_text(["fir_accusedpolice_name", "fir_accusedname", "fir_acc_relname", "fir_accdob", "fir_accyob", "fir_accageyear", "fir_accagemonth", "fir_accagefrom", "fir_accageto",
    "fir_accaddress", "fir_accsameasaddress"]);
    reset_radio(["accusedtypes1", "accusedpolice2", "accjuvenile2", "accmmedical2", "complsameasper12"]);
    $("#acc_updateRow").parent().attr("style", "display:none");
    $("#acc_cancelRow").parent().attr("style", "display:none");
    $("#acc_addRow").parent().attr("style", "display:block");
}

function load_accused(row){
    show();
    $("#fir_accusedname").val(row.accusedname.replace("<td>","").replace("</td>",""));
    $("#fir_accaddress").val(row.accaddress.replace("<td>","").replace("</td>",""));
    $("#fir_accdob").val(row.acc_dob.replace("<td>","").replace("</td>",""));
    $("#fir_accyob").val(row.acc_yob.replace("<td>","").replace("</td>",""));
    $("#fir_accageyear").val(row.acc_ageyear.replace("<td>","").replace("</td>",""));
    $("#fir_accagemonth").val(row.acc_agemonth.replace("<td>","").replace("</td>",""));
    $("#fir_accagefrom").val(row.acc_agefrom.replace("<td>","").replace("</td>",""));
    $("#fir_accageto").val(row.acc_ageto.replace("<td>","").replace("</td>",""));

    $("#fir_accusedpolice_name").val(row.accusedname.replace("<td>","").replace("</td>",""));
    $("#fir_accusedpolice_rank").val(row.acc_police_rank_val).trigger("change");

    $("#fir_accgender").val(row.acc_gender_val).trigger("change");
    $("#fir_acc_reltype").val(row.acc_rel_type_val).trigger("change");
    $("#fir_acc_relname").val(row.acc_relname.replace("<td>","").replace("</td>",""));

    $("#fir_accagetype").val(row.acc_agetype_val).trigger("change");
    $("#fir_acccountry").val(row.acc_country_val).trigger("change");
    $("#fir_accstate").val(row.acc_state_val).trigger("change");
    // setTimeout(function(){
    //     $("#").val(row.acc_district_val).trigger("change");
    // }, 8);
    // setTimeout(function(){
    //       $("#").val(row.acc_ps_val).trigger("change");
    //     }, 100);
    $("#fir_accsameasnational").val(row.acc_nationality_val).trigger("change");
    load_district_ps("fir_accdistrict", "fir_accpolicestation", row.acc_state_val, row.acc_district_val, row.acc_ps_val, row.acc_sameasper, "complsameasper12");
    if(row.acc_type=="Known"){
        $('#accusedtypes1').click();
    }else{
        $('#accusedtype2').click();
    }

    if(row.is_acc_police=="Y"){
        $('#accusedpolice1').click();
    }else{
        $('#accusedpolice2').click();
    }

    if(row.acc_juvenile=="Yes"){
        $('#accjuvenile1').click();
    }else{
        $('#accjuvenile2').click();
    }
    if(row.acc_medical=="Yes"){
        $('#accmmedical1').click();
    }else{
        $('#accmmedical2').click();
    }
    if(row.acc_sameasper=="No"){
        $('#complsameasper21').click();
        $("#fir_accsameasaddress").val(row.acc_adddr_same.replace("<td>","").replace("</td>",""));
        $("#fir_accsameascountry").val(row.acc_country_same_val).trigger("change");
        $("#fir_accsameasstate").val(row.acc_state_same_val).trigger("change");
         load_district_ps("fir_accsameasdistrict", "fir_accsameaspolicestation", row.acc_state_same_val, row.acc_district_same_val, row.acc_ps_same_val, row.acc_sameasper, "complsameasper12");
    }
    hide();
}

function reset_vic(){
    set_select("fir_victimgender", "");

    set_select("fir_victimreligion", "0");
    set_select("fir_victimcastcat", "0");
    set_select("fir_victiminjury", "0");

    set_select("fir_vic_reltype", "0");
    set_select("fir_vic_relname", "");
    set_select("fir_victimagetype", "");

    set_select("fir_victimcountry", "80");
    set_select("fir_victimstate", "");
    reset_select("fir_victimdistrict", "Select District")
    reset_select("fir_victimpolicestation", "Select Police Station")
    set_select("fir_victimnationality", "80");

    reset_text(["fir_victimname", "fir_victimdob", "fir_victimyob", "fir_victimageyear", "fir_victimagemonth", "fir_victimagefrom", "fir_victimageto",
    "fir_victimaddress", "fir_victimsameasaddress"]);
    reset_radio(["victimtypes1", "victimtype2", "victimmedical2", "complsameasper1"]);
    $("#victim_addRow").parent().attr("style", "display:block");
    $("#victim_updateRow").parent().attr("style", "display:none");
    $("#victim_cancelRow").parent().attr("style", "display:none");
    $("#fir_victimagetype").change();
}

function load_vic(row){
    show();
    $("#fir_victimname").val(row.victimname.replace("<td>","").replace("</td>",""));
    $("#fir_victimaddress").val(row.victimaddress.replace("<td>","").replace("</td>",""));
    $("#fir_victimdob").val(row.vic_dob.replace("<td>","").replace("</td>",""));
    $("#fir_victimyob").val(row.vic_yob.replace("<td>","").replace("</td>",""));
    $("#fir_victimageyear").val(row.vic_ageyear.replace("<td>","").replace("</td>",""));
    $("#fir_victimagemonth").val(row.vic_agemonth.replace("<td>","").replace("</td>",""));
    $("#fir_victimagefrom").val(row.vic_agefrom.replace("<td>","").replace("</td>",""));
    $("#fir_victimageto").val(row.vic_ageto.replace("<td>","").replace("</td>",""));

    $("#fir_victimgender").val(row.vic_gender_val).trigger("change");

    $("#fir_victimreligion").val(row.vic_religion_val).trigger("change");
    $("#fir_victimcastcat").val(row.vic_caste_val).trigger("change");
    $("#fir_victiminjury").val(row.vic_injury_val).trigger("change");

    $("#fir_vic_reltype").val(row.vic_rel_type_val).trigger("change");
    $("#fir_vic_relname").val(row.vic_relativename.replace("<td>","").replace("</td>",""));

    $("#fir_victimagetype").val(row.vic_agetype_val).trigger("change");
    $("#fir_victimcountry").val(row.vic_country_val).trigger("change");
    $("#fir_victimstate").val(row.vic_state_val).trigger("change");

    load_district_ps("fir_victimdistrict", "fir_victimpolicestation", row.vic_state_val, row.vic_district_val, row.vic_ps_val, row.vic_sameasper, "complsameasper1");
    $("#fir_victimnationality").val(row.vic_nationality_val).trigger("change");
    if(row.vic_type=="Known"){
        $('#victimtypes1').click();
    }else{
        $('#victimtypes2').click();
    }
    if(row.vic_type_category=="Adult"){
        $('#victimtype2').click();
    }else{
        $('#victimtype1').click();
    }
    if(row.vic_medical=="Yes"){
        $('#victimmedical1').click();
    }else{
        $('#victimmedical2').click();
    }
    if(row.vic_sameasper=="No"){
        $('#complsameasper2').click();
        $("#fir_victimsameasaddress").val(row.vic_adddr_same.replace("<td>","").replace("</td>",""));
        $("#fir_victimsameascountry").val(row.vic_country_same_val).trigger("change");
        $("#fir_victimsameasstate").val(row.vic_state_same_val).trigger("change");
        load_district_ps("fir_victimsameasdistrict", "fir_victimsameaspolicestation", row.vic_state_same_val, row.vic_district_same_val, row.vic_ps_same_val, row.vic_sameasper, "complsameasper1");
    }
    if(row.vic_sameasper=="Yes"){
        $('#complsameasper1').click();
    }
    $("#fir_victimagetype").change();
    hide();
}

function reset_occ(){
    set_select("fir_occ_directionfromps", "");
    reset_text(["fir_occ_datefrom", "fir_occ_dateto", "fir_occ_info_received_datetime", "fir_occ_distancefromps", "occlongitude", "occlatitude", "fir_occ_village", "fir_occ_forestname"]);
    reset_radio(["fir_occ_istimeofoccur", "fir_occ_isforestplace", "isorgcrime2"]);
    $("#occ_addRow").parent().attr("style", "display:block");
    $("#occ_update").parent().attr("style", "display:none");
    $("#occ_cancel").parent().attr("style", "display:none");
}

function load_occ(row){
    $("#fir_occ_datefrom").val(row.occ_datefrom.replace("<td>","").replace("</td>",""));
    $("#fir_occ_dateto").val(row.occ_dateto.replace("<td>","").replace("</td>",""));
    $("#fir_occ_info_received_datetime").val(row.fir_occ_info_received_datetime.replace("<td>","").replace("</td>",""));
    $("#fir_occ_forestname").val(row.forest_name.replace("<td>","").replace("</td>",""));
    $("#fir_occ_distancefromps").val(row.occ_distancefromps.replace("<td>","").replace("</td>",""));
    $("#fir_occ_village").val(row.address.replace("<td>","").replace("</td>",""));
    if(row.is_time_occurance=="Known"){
        $('#fir_occ_istimeofoccur').click();
    }else{
        $('#istimeofoccur2').click();
    }
    if(row.is_forest_place=="Yes"){
        $('#fir_occ_isforestplace').click();
    }else{
        $('#fir_occ_isforestplace2').click();
    }
    if(row.is_organized=="Yes"){
        $('#isorgcrime1').click();
    }else{
        $('#isorgcrime2').click();
    }
    $("#fir_occ_directionfromps").val(row.occ_directionfromps_val);
}

$(document).ready(function() {

// Set India as default of nationality/Country
$("#complnational").val("80");

$("#fir_victimnationality").val("80");

$("#fir_acccountry").val("80");

$("#fir_accsameascountry").val("80");

$("#fir_accsameasnational").val("80");


    data = {"state": $("#fir_comp_state").val()}
    load_resource(district_url, data, "fir_comp_district", 0, 1, "Select District");

    data = {"state": $("#fir_compl_sameasstate").val()}
    load_resource(district_url, data, "fir_compl_sameasdistrict", 0, 1, "Select District");

    data = {"state": $("#fir_victimstate").val()}
    load_resource(district_url, data, "fir_victimdistrict", 0, 1, "Select District");

    data = {"state": $("#fir_victimsameasstate").val()}
    load_resource(district_url, data, "fir_victimsameasdistrict", 0, 1, "Select District");

    data = {"state": $("#fir_accstate").val()}
    load_resource(district_url, data, "fir_accdistrict", 0, 1, "Select District");

    data = {"state": $("#fir_accsameasstate").val()}
    load_resource(district_url, data, "fir_accsameasdistrict", 0, 1, "Select District");


// Select District
$("#id_state").blur(function() {
    load_resource(district_url, {"state": $("#id_state").val()}, "id_district", 0, 1, '--Select District--');
});
$("#fir_comp_state").blur(function() {
    data = {"state": $("#fir_comp_state").val()}
    load_resource(district_url, data, "fir_comp_district", 0, 1, "Select District");
});
$("#fir_compl_sameasstate").blur(function() {
    data = {"state": $("#fir_compl_sameasstate").val()}
    load_resource(district_url, data, "fir_compl_sameasdistrict", 0, 1, "Select District");
});
$("#fir_victimstate").blur(function() {
    data = {"state": $("#fir_victimstate").val()}
    load_resource(district_url, data, "fir_victimdistrict", 0, 1, "Select District");
});
$("#fir_victimsameasstate").blur(function() {
    data = {"state": $("#fir_victimsameasstate").val()}
    load_resource(district_url, data, "fir_victimsameasdistrict", 0, 1, "Select District");
});
$("#fir_accstate").blur(function() {
    data = {"state": $("#fir_accstate").val()}
    load_resource(district_url, data, "fir_accdistrict", 0, 1, "Select District");
});
$("#fir_accsameasstate").blur(function() {
    data = {"state": $("#fir_accsameasstate").val()}
    load_resource(district_url, data, "fir_accsameasdistrict", 0, 1, "Select District");
});

$("#userauthtstate").blur(function() {
    data = {"state": $("#userauthtstate").val()}
    load_resource(district_url, data, "userauthdistrict", 0, 1, "Select District");
});
$("#statusreportstate").blur(function() {
    data = {"state": $("#statusreportstate").val()}
    load_resource(district_url, data, "statusreportdistrict", 0, 1, "Select District");
});


// Select PoliceStation
$("#id_district").blur(function() {
  data = {"state": $("#id_state").val(), "district": $("#id_district").val()}
  load_resource(police_station_url, data, "id_police_station", 0, 1, '--Select Police Station--');
});
$("#fir_comp_district").blur(function() {
  data = {"state": $("#fir_comp_state").val(), "district": $("#fir_comp_district").val()}
  load_resource(police_station_url, data, "fir_comp_police_station", 0, 1, "Select Police Station");
});
$("#fir_compl_sameasdistrict").blur(function() {
  data = {"state": $("#fir_compl_sameasstate").val(), "district": $("#fir_compl_sameasdistrict").val()}
  load_resource(police_station_url, data, "fir_compl_sameaspolicestation", 0, 1, "Select Police Station");
});
$("#fir_victimdistrict").blur(function() {
  data = {"state": $("#fir_victimstate").val(), "district": $("#fir_victimdistrict").val()}
  load_resource(police_station_url, data, "fir_victimpolicestation", 0, 1, "Select Police Station");
});
$("#fir_accdistrict").blur(function() {
  data = {"state": $("#fir_accstate").val(), "district": $("#fir_accdistrict").val()}
  load_resource(police_station_url, data, "fir_accpolicestation", 0, 1, "Select Police Station");
});
$("#fir_victimsameasdistrict").blur(function() {
  data = {"state": $("#fir_victimsameasstate").val(), "district": $("#fir_victimsameasdistrict").val()}
  load_resource(police_station_url, data, "fir_victimsameaspolicestation", 0, 1, "Select Police Station");
});
$("#fir_accsameasdistrict").blur(function() {
  data = {"state": $("#fir_accsameasstate").val(), "district": $("#fir_accsameasdistrict").val()}
  load_resource(police_station_url, data, "fir_accsameaspolicestation", 0, 1, "Select Police Station");
});
//User Creation Page
$("#userauthdistrict").blur(function() {
  data = {"state": $("#userauthtstate").val(), "district": $("#userauthdistrict").val()}
  load_resource(police_station_url, data, "userauthps", 0, 1, "Select Police Station");
});

$("#statusreportdistrict").blur(function() {
  data = {"state": $("#statusreportstate").val(), "district": $("#statusreportdistrict").val()}
  load_resource(police_station_url, data, "statusreportps", 0, 1, "Select Police Station");
});

// Select Sections
$("#fir_acts").blur(function() {
    data = {"act_id": $("#fir_acts").val()}
    load_resource(section_url, data, "fir_section", 0, 1, "Select Section");
});


// Select Property Type
$("#fir_property_category").blur(function() {
    data = {"parent_code": $("#fir_property_category").val()}
    load_resource(property_type_url, data, "fir_property_type", 0, 1, "Select Type");
});

});

$("#istimeofoccur2").click(function(){
    $("#fir_occ_datefrom").prop("disabled", true);
    $("#fir_occ_dateto").prop("disabled", true);
});
$("#fir_occ_istimeofoccur").click(function(){
    $("#fir_occ_datefrom").prop("disabled", false);
    $("#fir_occ_dateto").prop("disabled", false);
});
$("#fir_occ_isforestplace2").click(function(){
    $("#fir_occ_forestname").prop("disabled", true);
});
$("#fir_occ_isforestplace").click(function(){
    $("#fir_occ_forestname").prop("disabled", false);
});

/* -----------------------------------
            Compliant
-------------------------------------- */

function select_age_type(age_select_id, dob, yob, ageyear, agemonth, agefrom, ageto){
    age_type = $("#"+age_select_id).find(":selected").val();
    a_dob =  $("#"+dob);
    a_yob =  $("#"+yob);
    a_ageyear =  $("#"+ageyear);
    a_agemonth =  $("#"+agemonth);
    a_agefrom =  $("#"+agefrom);
    a_ageto =  $("#"+ageto);
    switch(age_type){
        case "0":
            a_dob.prop("disabled", false);
            a_yob.prop("disabled", true);
            a_ageyear.prop("disabled", true);
            a_agemonth.prop("disabled", true);
            a_agefrom.prop("disabled", true);
            a_ageto.prop("disabled", true);
            break;
        case "1":
            a_dob.prop("disabled", true);
            a_yob.prop("disabled", true);
            a_ageyear.prop("disabled", true);
            a_agemonth.prop("disabled", true);
            a_agefrom.prop("disabled", false);
            a_ageto.prop("disabled", false);
            break;
        case "2":
            a_dob.prop("disabled", true);
            a_yob.prop("disabled", true);
            a_ageyear.prop("disabled", false);
            a_agemonth.prop("disabled", false);
            a_agefrom.prop("disabled", true);
            a_ageto.prop("disabled", true);
            break;
        case "3":
            a_dob.prop("disabled", true);
            a_yob.prop("disabled", false);
            a_ageyear.prop("disabled", true);
            a_agemonth.prop("disabled", true);
            a_agefrom.prop("disabled", true);
            a_ageto.prop("disabled", true);
            break;
        default:
            a_dob.prop("disabled", true);
            a_yob.prop("disabled", true);
            a_ageyear.prop("disabled", true);
            a_agemonth.prop("disabled", true);
            a_agefrom.prop("disabled", true);
            a_ageto.prop("disabled", true);
    }
}

/*
    <option value="0">DOB is Known</option>
    <option value="1">Age Range is Known</option>
    <option value="2">Age is Known</option>
    <option value="3">Year is Known</option>
    */
$("#fir_comp_agetype").change(function(){
    select_age_type("fir_comp_agetype", "fir_comp_dob", "fir_comp_yob", "fir_comp_ageyear", "fir_comp_agemonth", "fir_comp_agefrom", "fir_comp_ageto");
});

$("#fir_victimagetype").change(function(){
    select_age_type("fir_victimagetype", "fir_victimdob", "fir_victimyob", "fir_victimageyear", "fir_victimagemonth", "fir_victimagefrom", "fir_victimageto");
});

$("#fir_accagetype").change(function(){
    select_age_type("fir_accagetype", "fir_accdob", "fir_accyob", "fir_accageyear", "fir_accagemonth", "fir_accagefrom", "fir_accageto");
});

function sameAsYesNo(y_n, addres, country, state, district, ps, c_addres, c_country, c_state, c_distirct, c_ps){
    s_address = $("#"+addres);
    s_country = $("#"+country);
    s_state = $("#"+state);
    s_district = $("#"+district);
    s_ps = $("#"+ps);

    if(y_n=="N"){
        s_address.prop("disabled", false);
        s_address.val("");
        s_country.prop("disabled", false);
        s_country.val("80");
        s_state.prop("disabled", false);
        s_state.val("");
        s_district.prop("disabled", false);
        s_district.val("");
        s_ps.prop("disabled", false);
        s_ps.val("");
    }else{
        s_address.prop("disabled", true);
        s_address.val($("#"+c_addres).val());
        s_country.prop("disabled", true);
        s_country.val($("#"+c_country).find(":selected").val());
        s_state.prop("disabled", true);
        s_state.val($("#"+c_state).find(":selected").val());
        s_district.prop("disabled", true);
        dist_val = $("#"+c_distirct).find(":selected").val();
        dist_txt = $("#"+c_distirct).find(":selected").text()
        s_district.html("<option value='"+dist_val+"'>"+dist_txt+"</option>");
        s_ps.prop("disabled", true);
        ps_val = $("#"+c_ps).find(":selected").val();
        ps_txt = $("#"+c_ps).find(":selected").text();
        s_ps.html("<option value='"+ps_val+"'>"+ps_txt+"</option>");
    }
}

// Compliant Same as Permenant
$("#fir_comp_sameasper2").click(function(){
    sameAsYesNo("N", "fir_comp_samesasaddress", "fir_compl_sameascountry", "fir_compl_sameasstate", "fir_compl_sameasdistrict",
    "fir_compl_sameaspolicestation", "","","","","");
});

$("#fir_comp_sameasper1").click(function(){
    sameAsYesNo("Y", "fir_comp_samesasaddress", "fir_compl_sameascountry", "fir_compl_sameasstate", "fir_compl_sameasdistrict",
    "fir_compl_sameaspolicestation", "fir_comp_address","fir_comp_country","fir_comp_state","fir_comp_district","fir_comp_police_station");
});

$("#fir_comp_police_station").blur(function(){
if ($('#fir_comp_sameasper1').is(':checked')) {
    sameAsYesNo("Y", "fir_comp_samesasaddress", "fir_compl_sameascountry", "fir_compl_sameasstate", "fir_compl_sameasdistrict",
    "fir_compl_sameaspolicestation", "fir_comp_address","fir_comp_country","fir_comp_state","fir_comp_district","fir_comp_police_station");
}
});

// Victim Same as permenant
$("#complsameasper2").click(function(){
    sameAsYesNo("N", "fir_victimsameasaddress", "fir_victimsameascountry", "fir_victimsameasstate", "fir_victimsameasdistrict",
    "fir_victimsameaspolicestation", "","","","","");
});

$("#complsameasper1").click(function(){
    sameAsYesNo("Y", "fir_victimsameasaddress", "fir_victimsameascountry", "fir_victimsameasstate", "fir_victimsameasdistrict",
    "fir_victimsameaspolicestation", "fir_victimaddress","fir_victimcountry","fir_victimstate","fir_victimdistrict","fir_victimpolicestation");
});

$("#fir_victimpolicestation").blur(function(){
if ($('#complsameasper1').is(':checked')) {
    sameAsYesNo("Y", "fir_victimsameasaddress", "fir_victimsameascountry", "fir_victimsameasstate", "fir_victimsameasdistrict",
    "fir_victimsameaspolicestation", "fir_victimaddress","fir_victimcountry","fir_victimstate","fir_victimdistrict","fir_victimpolicestation");
}
});

// Accused Same as permenant
$("#complsameasper21").click(function(){
    sameAsYesNo("N", "fir_accsameasaddress", "fir_accsameascountry", "fir_accsameasstate", "fir_accsameasdistrict",
    "fir_accsameaspolicestation", "","","","","");
});

$("#complsameasper12").click(function(){
    sameAsYesNo("Y", "fir_accsameasaddress", "fir_accsameascountry", "fir_accsameasstate", "fir_accsameasdistrict",
    "fir_accsameaspolicestation", "fir_accaddress","fir_acccountry","fir_accstate","fir_accdistrict","fir_accpolicestation");
});

$("#fir_accpolicestation").blur(function(){
if ($('#complsameasper12').is(':checked')) {
    sameAsYesNo("Y", "fir_accsameasaddress", "fir_accsameascountry", "fir_accsameasstate", "fir_accsameasdistrict",
    "fir_accsameaspolicestation", "fir_accaddress","fir_acccountry","fir_accstate","fir_accdistrict","fir_accpolicestation");
}
});

$("#fir_action_iotype").change(function(){
    /*
    <option value="">Select</option>
    <option value="0">Known</option>
    <option value="1">Unknown</option>
    */
    io_type = $("#fir_action_iotype").find(":selected").val()
    switch(io_type){
        case "0":
            $("#fir_action_ionamerank").prop("disabled", true);
            $("#fir_action_pis_beltno").prop("disabled", true);
            $("#fir_action_iorank").prop("disabled", true);
            $("#fir_action_io").prop("disabled", false);
            break;
        case "1":
            $("#fir_action_ionamerank").prop("disabled", false);
            $("#fir_action_pis_beltno").prop("disabled", false);
            $("#fir_action_iorank").prop("disabled", false);
            $("#fir_action_io").prop("disabled", true);
            break;
    }
});


$("#fir_action_shotype").change(function(){
    /*
    <option value="">Select</option>
    <option value="0">Known</option>
    <option value="1">Unknown</option>
    */
    sho_type = $("#fir_action_shotype").find(":selected").val()
    switch(sho_type){
        case "0":
            $("#fir_action_shorank").prop("disabled", true);
            $("#fir_action_sho").prop("disabled", false);
            $("#fir_action_shonamerank").prop("disabled", true);
            $("#fir_action_shopis_beltno").prop("disabled", true);
            break;
        case "1":
            $("#fir_action_shorank").prop("disabled", false);
            $("#fir_action_sho").prop("disabled", true);
            $("#fir_action_shonamerank").prop("disabled", false);
            $("#fir_action_shopis_beltno").prop("disabled", false);
            break;
    }
});

/*----------------------------------------------------------
                Add & Delete Row - Data Table
------------------------------------------------------------*/

fir_list = []; // Maintains the List global variable of FIR Registration Act & Section
occ_list = []; // Maintains the List global variable of Occurance
victim_list = []; // Maintains the List global variable of Victim
accused_list = []; // Maintains the List  global variable of Accused
property_list = []; // Maintains the List global vairable of Property

// Loads rows in to table
function build_rows(fir_list){
    rows = []
    header = "<thead class='thead-dark'><tr> <th>S.No.</th>  <th>Act CD</th> <th>Acts</th> <th>Section CD</th> <th>Section</th> <th>Delete</th> </tr></thead>"
    fir_list.forEach(function(row, index){
        index += 1;
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_row(\"fir_datatable\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.act_cd+row.act_text+row.sec_cd+row.sec_text+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

$('#act_addRow').click(function(){
    if(($("#fir_acts").find(":selected").text() == 'Acts') || ($("#fir_section").find(":selected").text() == 'Select Sections')){
        return 0;
    }
    if ($("#fir_section").find(":selected").val() == ''){
		return 0;
	}

    fir_act_cd = "<td>"+$("#fir_acts").find(":selected").val()+"</td>";
    fir_act_text = "<td>"+$("#fir_acts").find(":selected").text()+"</td>";
    fir_sec_cd = "<td>"+$("#fir_section").find(":selected").val()+"</td>";
    fir_sec_text = "<td>"+$("#fir_section").find(":selected").text()+"</td>";
    found = fir_list.some(el => el.act_cd == fir_act_cd && el.sec_cd == fir_sec_cd);
    if(found){return 0;}
    fir_list[fir_list.length] = {'act_cd': fir_act_cd, 'act_text': fir_act_text, 'sec_cd': fir_sec_cd, 'sec_text': fir_sec_text};
    html = build_rows(fir_list);
    $("#fir_datatable").html(html);
    // $("#fir_acts").val("");
    document.getElementById("fir_acts").focus();
    $("#fir_section").val("");
});

// Deletes the row from a given data table
function delete_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    fir_list.splice(row_no, 1);
    $("#fir_datatable").html(build_rows(fir_list));
}

// Occurance Add & Delete
// Loads rows in to table
function build_rows_occ(occ_list){
    rows = []
    header = "<thead class='thead-dark'><tr><th>S.No.</th><th>Occurance From</th><th>Occurace To</th><th>Direction From PS</th><th>Distance From PS</th><th>Address</th><th>Edit</th><th>Delete</th></thead>"
    occ_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' data-toggle='tooltip' onclick='edit_occ_row(\"occurance_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_occ_row(\"occurance_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.occ_datefrom+row.occ_dateto+row.occ_directionfromps+row.occ_distancefromps+row.address+edit_button+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

$('#occ_addRow').click(function(){

    if($("#fir_occ_datefrom").val() == "" && $("#fir_occ_datefrom").prop('disabled') == false)
{
    document.getElementById("fir_occ_datefrom_error").innerHTML = "Enter From Date";
    document.getElementById("fir_occ_dateto_error").innerHTML = "";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "";
    document.getElementById("fir_occ_forestname_error").innerHTML = "";
    document.getElementById("fir_occ_village_error").innerHTML = "";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "";

    document.getElementById("fir_occ_datefrom").focus();

    return 0;
}
    else if($("#fir_occ_dateto").val() == ""  && $("#fir_occ_dateto").prop('disabled') == false)
{
    document.getElementById("fir_occ_datefrom_error").innerHTML = "";
    document.getElementById("fir_occ_dateto_error").innerHTML = "Enter To Date";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "";
    document.getElementById("fir_occ_forestname_error").innerHTML = "";
    document.getElementById("fir_occ_village_error").innerHTML = "";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "";

    document.getElementById("fir_occ_datefrom").focus();

    return 0;
}
    else if($("#fir_occ_info_received_datetime").val() == "")
{
    document.getElementById("fir_occ_datefrom_error").innerHTML = "";
    document.getElementById("fir_occ_dateto_error").innerHTML = "";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "Enter Info Received Date";
    document.getElementById("fir_occ_forestname_error").innerHTML = "";
    document.getElementById("fir_occ_village_error").innerHTML = "";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "";

    document.getElementById("fir_occ_datefrom").focus();

    return 0;
}
    else if($("#fir_occ_forestname").val() == "" && $("#fir_occ_forestname").prop('disabled') == false)
{
    document.getElementById("fir_occ_datefrom_error").innerHTML = "";
    document.getElementById("fir_occ_dateto_error").innerHTML = "";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "";
    document.getElementById("fir_occ_forestname_error").innerHTML = "Enter Forest Name";
    document.getElementById("fir_occ_village_error").innerHTML = "";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "";

    document.getElementById("fir_occ_forestname").focus();

    return 0;
}
    else if($("#fir_occ_village").val() == "")
{
    document.getElementById("fir_occ_datefrom_error").innerHTML = "";
    document.getElementById("fir_occ_dateto_error").innerHTML = "";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "";
    document.getElementById("fir_occ_forestname_error").innerHTML = "";
    document.getElementById("fir_occ_village_error").innerHTML = "Enter Village/City";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "";

    document.getElementById("fir_occ_village").focus();

    return 0;
}

    else if($("#fir_occ_directionfromps").find(":selected").val() == "")
    {
    document.getElementById("fir_occ_datefrom_error").innerHTML = "";
    document.getElementById("fir_occ_dateto_error").innerHTML = "";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "";
    document.getElementById("fir_occ_forestname_error").innerHTML = "";
    document.getElementById("fir_occ_village_error").innerHTML = "";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "Select Direction";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "";

    document.getElementById("fir_occ_directionfromps").focus();

    return 0; 
    } 

    else if($("#fir_occ_distancefromps").val() == "")
{
    document.getElementById("fir_occ_datefrom_error").innerHTML = "";
    document.getElementById("fir_occ_dateto_error").innerHTML = "";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "";
    document.getElementById("fir_occ_forestname_error").innerHTML = "";
    document.getElementById("fir_occ_village_error").innerHTML = "";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "Enter Distance in Kms";

    document.getElementById("fir_occ_distancefromps").focus();

    return 0;
}

    else
{
    fir_occ_datefrom = "<td>"+$("#fir_occ_datefrom").val()+"</td>";
    fir_occ_dateto = "<td>"+$("#fir_occ_dateto").val()+"</td>";
    fir_occ_directionfromps = "<td>"+$("#fir_occ_directionfromps").find(":selected").text()+"</td>";
    fir_occ_directionfromps_val = $("#fir_occ_directionfromps").find(":selected").val();
    fir_occ_info_received_datetime = "<td>"+$("#fir_occ_info_received_datetime").val()+"</td>";
    fir_occ_distancefromps = "<td>"+$("#fir_occ_distancefromps").val()+"</td>";
    fir_occ_address = "<td>"+$("#fir_occ_village").val()+"</td>";
    is_time_occurance = $('input[name="fir_occ_istimeofoccur"]:checked').val();
    is_forest_place = $('input[name="fir_occ_isforestplace"]:checked').val();
    is_organized = $('input[name="fir_occ_isorgcrime"]:checked').val();
    forest_name = $('#fir_occ_forestname').val();

    fir_occ_long = $('#occlongitude').val();
    fir_occ_lat = $('#occlatitude').val();

    found = occ_list.some(el => el.occ_datefrom == fir_occ_datefrom && el.occ_dateto == fir_occ_dateto && el.occ_directionfromps == fir_occ_directionfromps && el.occ_distancefromps == fir_occ_distancefromps && el.address== fir_occ_address);
    if(found){return 0;}
    occ_list[occ_list.length] = {'occ_datefrom': fir_occ_datefrom, 'occ_dateto': fir_occ_dateto, 'occ_directionfromps': fir_occ_directionfromps,
    'occ_distancefromps': fir_occ_distancefromps, 'address': fir_occ_address, 'is_time_occurance': is_time_occurance,
    'is_forest_place': is_forest_place, 'forest_name':forest_name, 'fir_occ_info_received_datetime': fir_occ_info_received_datetime,
    'fir_occ_long': fir_occ_long, 'fir_occ_lat': fir_occ_lat, 
    'is_organized': is_organized, 'occ_directionfromps_val': fir_occ_directionfromps_val};
    html = build_rows_occ(occ_list);
    $("#occurance_table").html(html);

    document.getElementById("fir_occ_datefrom_error").innerHTML = "";
    document.getElementById("fir_occ_dateto_error").innerHTML = "";
    document.getElementById("fir_occ_info_received_datetime_error").innerHTML = "";
    document.getElementById("fir_occ_forestname_error").innerHTML = "";
    document.getElementById("fir_occ_village_error").innerHTML = "";
    document.getElementById("fir_occ_directionfromps_error").innerHTML = "";    	
    document.getElementById("fir_occ_distancefromps_error").innerHTML = "";

    reset_occ();

}
});

// Deletes the row from a given data table
function delete_occ_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    occ_list.splice(row_no, 1);
    $("#occurance_table").html(build_rows_occ(occ_list));
}

// Edit the row from a given data table
function edit_occ_row(data_table_id, row_no){
    $("#occ_addRow").parent().attr("style", "display:none");
    $("#occ_update").parent().attr("style", "display:block");
    $("#occ_cancel").parent().attr("style", "display:block");
    row_no -= 1;
    load_occ(occ_list[row_no]);
    $('#occ_update').attr("onclick", "update_occ("+row_no+")");
}

// Update row of occurance
function update_occ(row_id){
    fir_occ_datefrom = "<td>"+$("#fir_occ_datefrom").val()+"</td>";
    fir_occ_dateto = "<td>"+$("#fir_occ_dateto").val()+"</td>";
    fir_occ_directionfromps = "<td>"+$("#fir_occ_directionfromps").find(":selected").text()+"</td>";
    fir_occ_directionfromps_val = $("#fir_occ_directionfromps").find(":selected").val();
    fir_occ_info_received_datetime = "<td>"+$("#fir_occ_info_received_datetime").val()+"</td>";
    fir_occ_distancefromps = "<td>"+$("#fir_occ_distancefromps").val()+"</td>";
    fir_occ_address = "<td>"+$("#fir_occ_village").val()+"</td>";
    is_time_occurance = $('input[name="fir_occ_istimeofoccur"]:checked').val();
    is_forest_place = $('input[name="fir_occ_isforestplace"]:checked').val();
    is_organized = $('input[name="fir_occ_isorgcrime"]:checked').val();
    forest_name = $('#fir_occ_forestname').val();
    fir_occ_long = $('#occlongitude').val();
    fir_occ_lat = $('#occlatitude').val();

    occ_list[row_id] = {'occ_datefrom': fir_occ_datefrom, 'occ_dateto': fir_occ_dateto, 'occ_directionfromps': fir_occ_directionfromps,
    'occ_distancefromps': fir_occ_distancefromps, 'address': fir_occ_address, 'is_time_occurance': is_time_occurance,
    'is_forest_place': is_forest_place, 'forest_name':forest_name, 'fir_occ_info_received_datetime': fir_occ_info_received_datetime,
    'fir_occ_long': fir_occ_long, 'fir_occ_lat': fir_occ_lat,
    'is_organized': is_organized, 'occ_directionfromps_val': fir_occ_directionfromps_val};
    $("#occurance_table").html(build_rows_occ(occ_list));
    reset_occ();
}

// Victim Add & Delete
// Loads rows in to table
function build_rows_vic(victim_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Victim Name</th> <th>Relative Name</th> <th>Address</th><th>Edit</th> <th>Delete</th></thead>"
    victim_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' data-toggle='tooltip' onclick='edit_vic_row(\"victim_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_vic_row(\"victim_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.victimname+row.vic_relativename+row.victimaddress+edit_button+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_victim_list(row_id, from='insert'){
    if($("#fir_victimsameasaddress").val() == '' || $("#fir_victimname").val()=='' ){
        return 0;
    }
    vic_type = $('input[name="fir_comp_victimtypes"]:checked').val();
    vic_type_category = $('input[name="fir_victimtype"]:checked').val();
    vic_medical = $('input[name="fir_victimmedical"]:checked').val();
    vic_sameasper = $('input[name="fir_victimsameasper"]:checked').val();
    fir_victimname = "<td>"+$("#fir_victimname").val()+"</td>";
    fir_victimaddress = "<td>"+$("#fir_victimaddress").val()+"</td>";
    vic_gender = $("#fir_victimgender").find(":selected").text();
    vic_gender_val = $("#fir_victimgender").find(":selected").val();

    vic_religion = $("#fir_victimreligion").find(":selected").text();
    vic_religion_val = $("#fir_victimreligion").find(":selected").val();

    vic_caste = $("#fir_victimcastcat").find(":selected").text();
    vic_caste_val = $("#fir_victimcastcat").find(":selected").val();

    vic_injury = $("#fir_victiminjury").find(":selected").text();
    vic_injury_val = $("#fir_victiminjury").find(":selected").val();

    vic_rel_type = $("#fir_vic_reltype").find(":selected").text();
    vic_rel_type_val = $("#fir_vic_reltype").find(":selected").val();
    vic_relativename = "<td>"+$("#fir_vic_relname").val()+"</td>";

    vic_agetype = $("#fir_victimagetype").find(":selected").text();
    vic_agetype_val = $("#fir_victimagetype").find(":selected").val();
    vic_dob = $('#fir_victimdob').val();
    vic_yob = $('#fir_victimyob').val();
    vic_ageyear = $('#fir_victimageyear').val();
    vic_agemonth = $('#fir_victimagemonth').val();
    vic_agefrom = $('#fir_victimagefrom').val();
    vic_ageto = $('#fir_victimageto').val();
    vic_country = $("#fir_victimcountry").find(":selected").text();
    vic_country_val = $("#fir_victimcountry").find(":selected").val();
    vic_state = $("#fir_victimstate").find(":selected").text();
    vic_state_val = $("#fir_victimstate").find(":selected").val();
    vic_district = $("#fir_victimdistrict").find(":selected").text();
    vic_district_val = $("#fir_victimdistrict").find(":selected").val();
    vic_ps = $("#fir_victimpolicestation").find(":selected").text();
    vic_ps_val = $("#fir_victimpolicestation").find(":selected").val();
    vic_adddr_same = $("#fir_victimsameasaddress").val();
    vic_country_same = $("#fir_victimsameascountry").find(":selected").text();
    vic_country_same_val = $("#fir_victimsameascountry").find(":selected").val();
    vic_state_same = $("#fir_victimsameasstate").find(":selected").text();
    vic_state_same_val = $("#fir_victimsameasstate").find(":selected").val();
    vic_district_same = $("#fir_victimsameasdistrict").find(":selected").text();
    vic_district_same_val = $("#fir_victimsameasdistrict").find(":selected").val();
    vic_ps_same = $("#fir_victimsameaspolicestation").find(":selected").text();
    vic_ps_same_val = $("#fir_victimsameaspolicestation").find(":selected").val();
    vic_nationality = $("#fir_victimnationality").find(":selected").text();
    vic_nationality_val = $("#fir_victimnationality").find(":selected").val();
    from_comp_vic = 'No'
    found = victim_list.some(el => el.victimname == fir_victimname && el.victimaddress == fir_victimaddress )
            // || el.vic_gender == fir_victimgender || el.vic_agetype == fir_victimagetype 
            // || el.vic_yob == fir_victimyob || el.vic_country == fir_victimcountry 
            // || el.vic_state == fir_victimstate || el.vic_district == fir_victimdistrict
            // || el.vic_ps == fir_victimpolicestation || el.vic_country_same == fir_victimsameascountry
            // || el.vic_state_same == fir_victimsameasstate || el.vic_district_same == fir_victimsameasdistrict 
            // || el.vic_ps_same == fir_victimpolicestation)

    if(found && from != 'update'){return 0;}
    victim_list[row_id] = {'victimname': fir_victimname, 'victimaddress': fir_victimaddress, 'vic_type': vic_type,
    'vic_type_category': vic_type_category, 'vic_medical':vic_medical, 'vic_gender': vic_gender, 'vic_gender_val': vic_gender_val, 
    'vic_rel_type': vic_rel_type, 'vic_rel_type_val': vic_rel_type_val, 'vic_relativename': vic_relativename, 
    'vic_agetype': vic_agetype, 'vic_agetype_val': vic_agetype_val, 'vic_dob': vic_dob, 'vic_yob': vic_yob, 'vic_ageyear': vic_ageyear,
    'vic_agemonth': vic_agemonth, 'vic_agefrom': vic_agefrom, 'vic_ageto': vic_ageto, 'vic_country': vic_country, 'vic_country_val': vic_country_val,
    'vic_state': vic_state, 'vic_state_val': vic_state_val, 'vic_district': vic_district, 'vic_district_val': vic_district_val,
    'vic_ps': vic_ps, 'vic_ps_val': vic_ps_val, 'vic_adddr_same': vic_adddr_same, 'vic_country_same': vic_country_same,
    'vic_country_same_val': vic_country_same_val, 'vic_state_same': vic_state_same, 'vic_state_same_val': vic_state_same_val,
    'vic_district_same': vic_district_same, 'vic_district_same_val': vic_district_same_val, 'vic_ps_same': vic_ps_same,
    'vic_ps_same_val': vic_ps_same_val, 'vic_nationality': vic_nationality, 'vic_nationality_val': vic_nationality_val, 'vic_sameasper': vic_sameasper, 'from_complaint': from_comp_vic,
    'vic_religion': vic_religion, 'vic_religion_val': vic_religion_val, 'vic_caste': vic_caste, 'vic_caste_val': vic_caste_val, 'vic_injury': vic_injury, 'vic_injury_val': vic_injury_val}
    html = build_rows_vic(victim_list);
    $("#victim_table").html(html);
    reset_vic();
}

$('#victim_addRow').click(function(){

    if($("#fir_victimname").val() == "")
    {
    document.getElementById("fir_victimname_error").innerHTML = "Enter Victim Name";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimname").focus();

    return 0;
    }
    else if($("#fir_victimgender").find(":selected").val() == "" )
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "Select Victim Gender";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimgender").focus();

    return 0;

    }
    else if($("#fir_victimagetype").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "Select Age Type";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimagetype").focus();

    return 0;

    }
    else if($("#fir_victimyob").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "Enter YOB";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimyob").focus();

    return 0;

    }

// Victim Address Check

    else if($("#fir_victimaddress").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "Select Victim Address";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimaddress").focus();

    return 0;

    }

    else if($("#fir_victimcountry").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "Select Victim Country";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimcountry").focus();

    return 0;

    }

    else if($("#fir_victimstate").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "Select Victim State";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimstate").focus();

    return 0;

    }
    else if($("#fir_victimdistrict").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "Select Address";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimdistrict").focus();

    return 0;

    }
    else if($("#fir_victimpolicestation").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "Select Police Station";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimpolicestation").focus();

    return 0;

    }
// Victim Same Address Check
    else if($("#fir_victimsameasaddress").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "Enter Victim Address";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimsameasaddress").focus();

    return 0;

    }
    else if($("#fir_victimsameascountry").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "Select Victim Country";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimsameascountry").focus();

    return 0;

    }

    else if($("#fir_victimsameasstate").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "Select Victim State";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimsameasstate").focus();

    return 0;

    }
    else if($("#fir_victimsameasdistrict").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "Select District";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimsameasdistrict").focus();

    return 0;

    }
    else if($("#fir_victimsameaspolicestation").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "Select Police Station";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

    document.getElementById("fir_victimsameaspolicestation").focus();

    return 0;

    }
// Victim Nationality Check
    else if($("#fir_victimnationality").find(":selected").val() == "")
{
    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "Select Nationality";

    document.getElementById("fir_victimnationality").focus();

    return 0;

    }

    else{
    create_victim_list(victim_list.length);

    document.getElementById("fir_victimname_error").innerHTML = "";
    document.getElementById("fir_victimgender_error").innerHTML = "";
    document.getElementById("fir_victimagetype_error").innerHTML = "";
    document.getElementById("fir_victimdob_error").innerHTML = "";
    document.getElementById("fir_victimyob_error").innerHTML = "";
    document.getElementById("fir_victimageyear_error").innerHTML = "";
    document.getElementById("fir_victimagemonth_error").innerHTML = "";
    document.getElementById("fir_victimagefrom_error").innerHTML = "";
    document.getElementById("fir_victimageto_error").innerHTML = "";
    document.getElementById("fir_victimaddress_error").innerHTML = "";
    document.getElementById("fir_victimcountry_error").innerHTML = "";
    document.getElementById("fir_victimstate_error").innerHTML = "";
    document.getElementById("fir_victimdistrict_error").innerHTML = "";
    document.getElementById("fir_victimpolicestation_error").innerHTML = "";
    document.getElementById("fir_victimsameasaddress_error").innerHTML = "";
    document.getElementById("fir_victimsameascountry_error").innerHTML = "";
    document.getElementById("fir_victimsameasstate_error").innerHTML = "";    
    document.getElementById("fir_victimsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_victimsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_victimnationality_error").innerHTML = "";

	// $("#victim_addRow").attr("disabled", false);

}
});

// Deletes the row from a given data table
function delete_vic_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    victim_list.splice(row_no, 1);
    $("#victim_table").html(build_rows_vic(victim_list));
}

// Edit the row from a given data table
function edit_vic_row(data_table_id, row_no){
    $("#victim_addRow").parent().attr("style", "display:none");
    $("#victim_updateRow").parent().attr("style", "display:block");
    $("#victim_cancelRow").parent().attr("style", "display:block");
    row_no -= 1;
    load_vic(victim_list[row_no]);
    $('#victim_updateRow').attr("onclick", "update_vic("+row_no+")");
}

// Update row of Victim
function update_vic(row_id){
    create_victim_list(row_id, from='update');
}


// Accused Add & Delete
// Loads rows in to table
function build_rows_acc(accused_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Accused Name</th><th>Relative Name</th> <th>Address</th><th>Edit</th> <th>Delete</th></thead>"
    accused_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' data-toggle='tooltip' onclick='edit_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.accusedname+row.acc_relname+row.accaddress+edit_button+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_accused_list(row_id, from='insert'){
    fir_accusedname = "<td>"+$("#fir_accusedname").val()+"</td>";
    fir_accaddress = "<td>"+$("#fir_accaddress").val()+"</td>";

    acc_type = $('input[name="fir_accusedtypes"]:checked').val();
    is_acc_police = $('input[name="fir_accusedpolice"]:checked').val();
    acc_policerank = $("#fir_accusedpolice_rank").find(":selected").text();
    acc_police_rank_val = $("#fir_accusedpolice_rank").find(":selected").val();
    acc_accusedpolice_name = $('#fir_accusedpolice_name').val();

    acc_juvenile = $('input[name="fir_accjuvenile"]:checked').val();
    acc_medical = $('input[name="fir_accmmedical"]:checked').val();
    acc_sameasper = $('input[name="fir_accsameasper"]:checked').val();
    acc_gender = $("#fir_accgender").find(":selected").text();
    acc_gender_val = $("#fir_accgender").find(":selected").val();
    acc_rel_type = $("#fir_acc_reltype").find(":selected").text();
    acc_rel_type_val = $("#fir_acc_reltype").find(":selected").val();
    acc_relname = "<td>"+$("#fir_acc_relname").val()+"</td>";

    acc_agetype = $("#fir_accagetype").find(":selected").text();
    acc_agetype_val = $("#fir_accagetype").find(":selected").val();
    acc_dob = $('#fir_accdob').val();
    acc_yob = $('#fir_accyob').val();
    acc_ageyear = $('#fir_accageyear').val();
    acc_agemonth = $('#fir_accagemonth').val();
    acc_agefrom = $('#fir_accagefrom').val();
    acc_ageto = $('#fir_accageto').val();
    acc_country = $("#fir_acccountry").find(":selected").text();
    acc_country_val = $("#fir_acccountry").find(":selected").val();
    acc_state = $("#fir_accstate").find(":selected").text();
    acc_state_val = $("#fir_accstate").find(":selected").val();
    acc_district = $("#fir_accdistrict").find(":selected").text();
    acc_district_val = $("#fir_accdistrict").find(":selected").val();
    acc_ps = $("#fir_accpolicestation").find(":selected").text();
    acc_ps_val = $("#fir_accpolicestation").find(":selected").val();
    acc_adddr_same = $("#fir_accsameasaddress").val();
    acc_country_same = $("#fir_accsameascountry").find(":selected").text();
    acc_country_same_val = $("#fir_accsameascountry").find(":selected").val();
    acc_state_same = $("#fir_accsameasstate").find(":selected").text();
    acc_state_same_val = $("#fir_accsameasstate").find(":selected").val();
    acc_district_same = $("#fir_accsameasdistrict").find(":selected").text();
    acc_district_same_val = $("#fir_accsameasdistrict").find(":selected").val();
    acc_ps_same = $("#fir_accsameaspolicestation").find(":selected").text();
    acc_ps_same_val = $("#fir_accsameaspolicestation").find(":selected").val();
    acc_nationality = $("#fir_accsameasnational").find(":selected").text();
    acc_nationality_val = $("#fir_accsameasnational").find(":selected").val();
    found = accused_list.some(el => el.accusedname == fir_accusedname && el.accaddress == fir_accaddress)
    if(found && from != 'update'){return 0;}
    accused_list[row_id] = {'is_acc_police': is_acc_police, 'acc_accusedpolice_name': acc_accusedpolice_name, 'acc_policerank': acc_policerank, 'acc_police_rank_val': acc_police_rank_val, 'accusedname': fir_accusedname, 'accaddress': fir_accaddress, 'acc_type': acc_type,
    'acc_juvenile': acc_juvenile, 'acc_medical':acc_medical, 'acc_gender': acc_gender, 'acc_gender_val': acc_gender_val,
    'acc_rel_type': acc_rel_type, 'acc_rel_type_val': acc_rel_type_val, 'acc_relname': acc_relname, 
    'acc_agetype': acc_agetype, 'acc_agetype_val': acc_agetype_val, 'acc_dob': acc_dob, 'acc_yob': acc_yob, 'acc_ageyear': acc_ageyear,
    'acc_agemonth': acc_agemonth, 'acc_agefrom': acc_agefrom, 'acc_ageto': acc_ageto, 'acc_country': acc_country, 'acc_country_val': acc_country_val,
    'acc_state': acc_state, 'acc_state_val': acc_state_val, 'acc_district': acc_district, 'acc_district_val': acc_district_val,
    'acc_ps': acc_ps, 'acc_ps_val': acc_ps_val, 'acc_adddr_same': acc_adddr_same, 'acc_country_same': acc_country_same,
    'acc_country_same_val': acc_country_same_val, 'acc_state_same': acc_state_same, 'acc_state_same_val': acc_state_same_val,
    'acc_district_same': acc_district_same, 'acc_district_same_val': acc_district_same_val, 'acc_ps_same': acc_ps_same,
    'acc_ps_same_val': acc_ps_same_val, 'acc_nationality': acc_nationality, 'acc_nationality_val': acc_nationality_val, 'acc_sameasper': acc_sameasper}
    html = build_rows_acc(accused_list);
    $("#accused_table").html(html);
    reset_accused();
}
$('#acc_addRow').click(function(){
    if($("#fir_accusedname").val() == "")
    {
    document.getElementById("fir_accusedname_error").innerHTML = "Enter Accused Name";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accusedname").focus();

        return 0;
    }
    else if($("#fir_accgender").find(":selected").val() == "" )
{

    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "Select Gender";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accgender").focus();

       return 0;
    }
    else if($("#fir_accagetype").find(":selected").val() == "")
{

    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "Select Age Type";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accagetype").focus();

       return 0;
    }
    else if($("#fir_accyob").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "Enter DOB/YOB or Age";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accyob").focus();

       return 0;
    }
    else if($("#fir_accyob").val() == "NaN")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "Enter DOB/YOB or Age";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accyob").focus();

       return 0;
    }

    else if($("#fir_accdob").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "Enter DOB/YOB or Age";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accdob").focus();

       return 0;
    }


// Accused Address Check

    else if($("#fir_accaddress").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "Enter Accused Address";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accaddress").focus();

       return 0;
    }
    else if($("#fir_acccountry").find(":selected").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "Select Country";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_acccountry").focus();

       return 0;
    }

    else if($("#fir_accstate").find(":selected").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "Select State";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accstate").focus();

       return 0;
    }
    else if($("#fir_accdistrict").find(":selected").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "Select District";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accdistrict").focus();

       return 0;
    }
    else if($("#fir_accpolicestation").find(":selected").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "Select PS";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accpolicestation").focus();

       return 0;
    }
// Accused Same Address Check
    else if($("#fir_accsameasaddress").val() == "" && $("#fir_accsameasaddress").prop('disabled') == false )
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "Enter Address";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accsameasaddress").focus();

       return 0;
    }
    else if($("#fir_accsameascountry").find(":selected").val() == "" && $("#fir_accsameascountry").prop('disabled') == false)
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "Select Country";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accsameascountry").focus();

       return 0;
    }

    else if($("#fir_accsameasstate").find(":selected").val() == "" && $("#fir_accsameasstate").prop('disabled') == false)
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "Select State";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accsameasstate").focus();

       return 0;
    }
    else if($("#fir_accsameasdistrict").find(":selected").val() == "" && $("#fir_accsameasdistrict").prop('disabled') == false)
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "Select District";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accsameasdistrict").focus();

       return 0;
    }
    else if($("#fir_accsameaspolicestation").find(":selected").val() == "" && $("#fir_accsameaspolicestation").prop('disabled') == false)
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "Select PS";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

    document.getElementById("fir_accsameaspolicestation").focus();

       return 0;
    }
// Accused Nationality Check
    else if($("#fir_accsameasnational").find(":selected").val() == "")
{
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "Select Nationality";

    document.getElementById("fir_accsameasnational").focus();

       return 0;
    }

else
{    
    create_accused_list(accused_list.length);
    document.getElementById("fir_accusedname_error").innerHTML = "";
    document.getElementById("fir_accgender_error").innerHTML = "";
    document.getElementById("fir_accagetype_error").innerHTML = "";
    document.getElementById("fir_accyob_error").innerHTML = "";
    document.getElementById("fir_accaddress_error").innerHTML = "";
    document.getElementById("fir_acccountry_error").innerHTML = "";
    document.getElementById("fir_accstate_error").innerHTML = "";    	
    document.getElementById("fir_accdistrict_error").innerHTML = "";

    document.getElementById("fir_accpolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasaddress_error").innerHTML = "";
    document.getElementById("fir_accsameascountry_error").innerHTML = "";
    document.getElementById("fir_accsameasstate_error").innerHTML = "";
    document.getElementById("fir_accsameasdistrict_error").innerHTML = "";
    document.getElementById("fir_accsameaspolicestation_error").innerHTML = "";
    document.getElementById("fir_accsameasnational_error").innerHTML = "";

}
});

// Deletes the row from a given data table
function delete_acc_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    accused_list.splice(row_no, 1);
    $("#accused_table").html(build_rows_acc(accused_list));
}

// Edit the row from a given data table
function edit_acc_row(data_table_id, row_no){
    $("#acc_addRow").parent().attr("style", "display:none");
    $("#acc_updateRow").parent().attr("style", "display:block");
    $("#acc_cancelRow").parent().attr("style", "display:block");
    row_no -= 1;
    load_accused(accused_list[row_no]);
    $('#acc_updateRow').attr("onclick", "update_accused("+row_no+")");
}

// Update row of Accuesd
function update_accused(row_id){
    create_accused_list(row_id, from='update');
}

// Property Add & Delete
// Loads rows in to table
function build_rows_prop(property_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.<th>Property Category</th> <th>Property Type</th> <th>Property Nature</th> <th>Description</th> <th>Estimated Value</th><th>Edit</th> <th>Delete</th></thead>"
    property_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' data-toggle='tooltip' onclick='edit_prop_row(\"property_datatable\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_prop_row(\"property_datatable\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.category+row.type+row.nature+row.desc+row.value+edit_button+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_property_list(row_no, from="insert"){
    if(($("#fir_property_category").find(":selected").text() == 'Select Category') || ($("#fir_property_type").find(":selected").text() == 'Select Type') || ($("#fir_property_nature").find(":selected").text() == 'Select Nature')){
        return 0;
    }
    fir_property_category = "<td>"+$("#fir_property_category").find(":selected").text()+"</td>";
    fir_property_category_val = $("#fir_property_category").find(":selected").val();
    fir_property_type = "<td>"+$("#fir_property_type").find(":selected").text()+"</td>";
    fir_property_type_val = $("#fir_property_type").find(":selected").val();
    fir_property_nature = "<td>"+$("#fir_property_nature").find(":selected").text()+"</td>";
    fir_property_nature_val = $("#fir_property_nature").find(":selected").val();

    fir_property_desc = "<td>"+$("#fir_property_desc").val()+"</td>";
    fir_propertyvalue = "<td>"+$("#fir_propertyvalue").val()+"</td>";
    found = property_list.some(el => el.category == fir_property_category && el.type == fir_property_type  && el.nature == fir_property_nature && el.desc == fir_property_desc && el.value == fir_propertyvalue)
    if(found && from == "update")
    {
    property_list[row_no] = {'category': fir_property_category, 'type': fir_property_type, 'nature': fir_property_nature, 'desc': fir_property_desc, 'value': fir_propertyvalue,
    'category_val': fir_property_category_val, 'type_val': fir_property_type_val, 'nature_val': fir_property_nature_val}
    html = build_rows_prop(property_list);
    $("#property_datatable").html(html);
    reset_property();
    }
    else if(found && from != "update"){return 0;}
    else
    {
    property_list[row_no] = {'category': fir_property_category, 'type': fir_property_type, 'nature': fir_property_nature, 'desc': fir_property_desc, 'value': fir_propertyvalue,
    'category_val': fir_property_category_val, 'type_val': fir_property_type_val, 'nature_val': fir_property_nature_val}
    html = build_rows_prop(property_list);
    $("#property_datatable").html(html);
    reset_property();
    }

}
$('#prop_addRow').click(function(){
    if($("#fir_property_desc").val() == "")
    {
        $("#fir_property_desc").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>Enter Property Description</div>");
        return 0;
    }
    else if($("#fir_property_category").find(":selected").val() == "" )
    {
        $("#fir_property_category").parent().after("<span style='color:red'>Select Property Category</span>");
        return 0;
    }
    else if($("#fir_property_type").find(":selected").val() == "" )
    {
        $("#fir_property_type").parent().after("<span style='color:red'>Select Property Type</span>");
        return 0;
    }
    else if($("#fir_property_nature").find(":selected").val() == "" )
    {
        $("#fir_property_nature").parent().after("<span style='color:red'>Select Property Nature</span>");
        return 0;
    }
    else if($("#fir_propertyvalue").find(":selected").val() == "" )
    {
        $("#fir_propertyvalue").parent().after("<span style='color:red'>Select Property Value</span>");
        return 0;
    }
    else
    {
    create_property_list(property_list.length);
    $("#fir_property_desc").parent().next(".validation").remove(); // remove it
    $("#fir_property_category").parent().next(".validation").remove(); // remove it
    $("#fir_property_type").parent().next(".validation").remove(); // remove it
    $("#fir_property_nature").parent().next(".validation").remove(); // remove it
    $("#fir_propertyvalue").parent().next(".validation").remove(); // remove it
    }
});

// Deletes the row from a given data table
function delete_prop_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    property_list.splice(row_no, 1);
    $("#property_datatable").html(build_rows_prop(property_list));
}

// Edit the row from a given data table
function edit_prop_row(data_table_id, row_no){
    $("#prop_addRow").parent().attr("style", "display:none");
    $("#prop_updateRow").parent().attr("style", "display:block");
    $("#prop_cancelRow").parent().attr("style", "display:block");
    row_no -= 1;
    load_property(property_list[row_no]);
    $('#prop_updateRow').attr("onclick", "update_property("+row_no+")");
}

// Update row of Property
function update_property(row_id){
    create_property_list(row_id, from='update');
}

/*-------------------------------------------------------------------
                    Victim Same as Complaint
---------------------------------------------------------------------*/
function copy_compliant_to_victim(){

    if($("#fir_comp_name").val()==''){
        return 0;
    }
    can_copy = false;
    if(COPY_COMPLAINT==false){
        can_copy = false;
    }else{
        can_copy=true;
        if(victim_list.length > 0){
            if(victim_list[0].from_complaint="Yes"){
                can_copy=false;
            }
        }
    }
    if(can_copy==false){
        return 0;
    }
    vic_type = "Known";
    vic_type_category = "Adult";
    vic_medical = "No";
    vic_sameasper = $('input[name="fir_comp_sameasper"]:checked').val();
    fir_victimname = "<td>"+$("#fir_comp_name").val()+"</td>";
    fir_victimaddress = "<td>"+$("#fir_comp_address").val()+"</td>";
    vic_gender = $("#fir_comp_gender").find(":selected").text();
    vic_gender_val = $("#fir_comp_gender").find(":selected").val();
    vic_rel_type = $("#fir_comp_reltype").find(":selected").text();
    vic_rel_type_val = $("#fir_comp_reltype").find(":selected").val();
    vic_relativename = "<td>"+$("#fir_comp_relname").val()+"</td>";

    vic_religion = "";
    vic_religion_val = "0";
    vic_caste = "";
    vic_caste_val = "0";
    vic_injury = "";
    vic_injury_val = "0";

    vic_agetype = $("#fir_comp_agetype").find(":selected").text();
    vic_agetype_val = $("#fir_comp_agetype").find(":selected").val();
    vic_dob = $('#fir_comp_dob').val();
    vic_yob = $('#fir_comp_yob').val();
    vic_ageyear = $('#fir_comp_ageyear').val();
    vic_agemonth = $('#fir_comp_agemonth').val();
    vic_agefrom = $('#fir_comp_agefrom').val();
    vic_ageto = $('#fir_comp_ageto').val();
    vic_country = $("#fir_comp_country").find(":selected").text();
    vic_country_val = $("#fir_comp_country").find(":selected").val();
    vic_state = $("#fir_comp_state").find(":selected").text();
    vic_state_val = $("#fir_comp_state").find(":selected").val();
    vic_district = $("#fir_comp_district").find(":selected").text();
    vic_district_val = $("#fir_comp_district").find(":selected").val();
    vic_ps = $("#fir_comp_police_station").find(":selected").text();
    vic_ps_val = $("#fir_comp_police_station").find(":selected").val();
    vic_adddr_same = $("#fir_comp_samesasaddress").val();
    vic_country_same = $("#fir_compl_sameascountry").find(":selected").text();
    vic_country_same_val = $("#fir_compl_sameascountry").find(":selected").val();
    vic_state_same = $("#fir_compl_sameasstate").find(":selected").text();
    vic_state_same_val = $("#fir_compl_sameasstate").find(":selected").val();
    vic_district_same = $("#fir_compl_sameasdistrict").find(":selected").text();
    vic_district_same_val = $("#fir_compl_sameasdistrict").find(":selected").val();
    vic_ps_same = $("#fir_compl_sameaspolicestation").find(":selected").text();
    vic_ps_same_val = $("#fir_compl_sameaspolicestation").find(":selected").val();
    vic_nationality = $("#complnational").find(":selected").text();
    vic_nationality_val = $("#complnational").find(":selected").val();
    found = victim_list.some(el => el.victimname == fir_victimname && el.victimaddress == fir_victimaddress)
    if(found){return 0;}
     victim_list[victim_list.length] = {'victimname': fir_victimname, 'victimaddress': fir_victimaddress, 'vic_type': vic_type, 
    'vic_religion': vic_religion, 'vic_religion_val': vic_religion_val, 'vic_caste': vic_caste, 'vic_caste_val': vic_caste_val, 'vic_injury': vic_injury, 'vic_injury_val': vic_injury_val, 
    'vic_type_category': vic_type_category, 'vic_medical':vic_medical, 'vic_gender': vic_gender, 'vic_gender_val': vic_gender_val,
    'vic_rel_type': vic_rel_type, 'vic_rel_type_val': vic_rel_type_val, 'vic_relativename': vic_relativename, 
    'vic_agetype': vic_agetype, 'vic_agetype_val': vic_agetype_val, 'vic_dob': vic_dob, 'vic_yob': vic_yob, 'vic_ageyear': vic_ageyear,
    'vic_agemonth': vic_agemonth, 'vic_agefrom': vic_agefrom, 'vic_ageto': vic_ageto, 'vic_country': vic_country, 'vic_country_val': vic_country_val,
    'vic_state': vic_state, 'vic_state_val': vic_state_val, 'vic_district': vic_district, 'vic_district_val': vic_district_val,
    'vic_ps': vic_ps, 'vic_ps_val': vic_ps_val, 'vic_adddr_same': vic_adddr_same, 'vic_country_same': vic_country_same,
    'vic_country_same_val': vic_country_same_val, 'vic_state_same': vic_state_same, 'vic_state_same_val': vic_state_same_val,
    'vic_district_same': vic_district_same, 'vic_district_same_val': vic_district_same_val, 'vic_ps_same': vic_ps_same,
    'vic_ps_same_val': vic_ps_same_val, 'vic_nationality': vic_nationality, 'vic_nationality_val': vic_nationality_val, 'vic_sameasper': vic_sameasper, 'from_complaint': "Yes"}
    html = build_rows_vic(victim_list);
    $("#victim_table").html(html);
    COMPLAINT_ALREADY_COPIED=true;
    COPY_COMPLAINT==false;
}

function submitDataTableValues(){
    f_l = {};
    fir_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","");
        }
        f_l[index] = temp;
    });
     $("<input />").attr("type", "hidden")
                  .attr("name", "act_sections_list")
                  .attr("value", JSON.stringify(f_l))
                  .appendTo("#fir_form");
    f_l2 = {};
    occ_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","");
        }
        f_l2[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "occ_list")
                  .attr("value", JSON.stringify(f_l2))
                  .appendTo("#fir_form");
    f_l3 = {};
    victim_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","");
        }
	    f_l3[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "victim_list")
                  .attr("value", JSON.stringify(f_l3))
                  .appendTo("#fir_form");
    f_l4 = {};
    accused_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","");
        }
	    f_l4[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "accused_list")
                  .attr("value", JSON.stringify(f_l4))
                  .appendTo("#fir_form");
    f_l5 = {};
    property_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","");
        }
        f_l5[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "property_list")
                  .attr("value", JSON.stringify(f_l5))
                  .appendTo("#fir_form");
}

function enable_disable_victim(status){

    $('input[name="fir_victimtype"]').prop("disabled", status);
    $('input[name="fir_victimmedical"]').prop("disabled", status);
    $('input[name="fir_victimsameasper"]').prop("disabled", status);
    $('input[name="fir_victimtype"]').prop("disabled", status);

    $("#fir_victimname").prop("disabled", status);
    $("#fir_victimaddress").prop("disabled", status);
    $("#fir_victimgender").prop("disabled", status);
    
    $("#fir_victimreligion").prop("disabled", status);
    $("#fir_victimcastcat").prop("disabled", status);
    $("#fir_victiminjury").prop("disabled", status);

    $("#fir_vic_reltype").prop("disabled", status);
    $("#fir_vic_relname").prop("disabled", status);

    $("#fir_victimagetype").prop("disabled", status);
    $('#fir_victimdob').prop("disabled", status);
    $('#fir_victimyob').prop("disabled", status);
    $('#fir_victimageyear').prop("disabled", status);
    $('#fir_victimagemonth').prop("disabled", status);
    $('#fir_victimagefrom').prop("disabled", status);
    $('#fir_victimcountry').prop("disabled", status);
    $('#fir_victimstate').prop("disabled", status);
    $('#fir_victimdistrict').prop("disabled", status);
    $('#fir_victimpolicestation').prop("disabled", status);
    $('#fir_victimsameasaddress').prop("disabled", status);
    $('#fir_victimsameascountry').prop("disabled", status);
    $('#fir_victimsameasstate').prop("disabled", status);
    $('#fir_victimsameasdistrict').prop("disabled", status);
    $('#fir_victimsameaspolicestation').prop("disabled", status);
    $('#fir_victimnationality').prop("disabled", status);
    $("#victim_addRow").prop("disabled", status);
    if(status == false){
        $("#fir_victimagetype").change();
        $('input[name="fir_victimsameasper"]:checked').click();
    }
}
$('#victimtypes2').click(function(){
    enable_disable_victim(true);
    // victim_list = [];
    // $("#victim_table > tbody").html("");
});
$('#victimtypes1').click(function(){
    enable_disable_victim(false);
});

function enable_disable_accused(status){
    $('input[name="fir_accusedpolice"]').prop("disabled", status);
    $('#fir_accusedname').prop("disabled", status);
    $('#fir_accaddress').prop("disabled", status);
    $('input[name="fir_accjuvenile"]').prop("disabled", status);
    $('input[name="fir_accmmedical"]').prop("disabled", status);
    $('input[name="fir_accsameasper"]').prop("disabled", status);
    $('#fir_accgender').prop("disabled", status);
    $('#fir_accgender').prop("disabled", status);
    $('#fir_acc_reltype').prop("disabled", status);
    $('#fir_acc_relname').prop("disabled", status);

    var isaccpolice = $('input[name=fir_accusedpolice]:checked').val()
    if (status==false)
    {
    if (isaccpolice=='Y')
    {
    $('#fir_accusedpolice_name').prop("disabled", false);
    $('#fir_accusedpolice_rank').prop("disabled", false);
    }
    else
    {
    $('#fir_accusedpolice_name').prop("disabled", true);
    $('#fir_accusedpolice_rank').prop("disabled", true);      
    }
    }
    else
    {
    $('#fir_accusedpolice_name').prop("disabled", status);
    $('#fir_accusedpolice_rank').prop("disabled", status);            
    }

    $('#fir_accagetype').prop("disabled", status);
    $('#fir_accdob').prop("disabled", status);
    $('#fir_accyob').prop("disabled", status);
    $('#fir_accageyear').prop("disabled", status);
    $('#fir_accagemonth').prop("disabled", status);
    $('#fir_accagefrom').prop("disabled", status);
    $('#fir_accageto').prop("disabled", status);
    $('#fir_acccountry').prop("disabled", status);
    $('#fir_accstate').prop("disabled", status);
    $('#fir_accdistrict').prop("disabled", status);
    $('#fir_accpolicestation').prop("disabled", status);
    $('#fir_accsameasaddress').prop("disabled", status);
    $('#fir_accsameascountry').prop("disabled", status);
    $('#fir_accsameasstate').prop("disabled", status);
    $('#fir_accsameasdistrict').prop("disabled", status);
    $('#fir_accsameaspolicestation').prop("disabled", status);
    $('#fir_accsameasnational').prop("disabled", status);
    $('#acc_addRow').prop("disabled", status);
    if(status != true){
        $("#fir_accagetype").change();
        $('input[name="fir_accsameasper"]:checked').click();
    }
}

$('#accusedtype2').click(function(){
    enable_disable_accused(true);
    // accused_list = [];
    // $("#accused_table > tbody").html("");
});
$('#accusedtypes1').click(function(){
    enable_disable_accused(false);
});

$('#accusedpolice2').click(function(){
    enable_disable_police_acc(true);
    $('#fir_accusedname').prop("disabled", false);
    reset_text(["fir_accusedpolice_name"]);

});

$('#accusedpolice1').click(function(){
    enable_disable_police_acc(false);
    $('#fir_accusedname').prop("disabled", true);
    pol_acc_name = $('#fir_accusedname').val();
    $("#fir_accusedpolice_name").val(pol_acc_name);
});


function enable_disable_police_acc(status){
    $('#fir_accusedpolice_name').prop("disabled", status);
    $('#fir_accusedpolice_rank').prop("disabled", status);
}

function compdobFunction() {

  // var now = new Date(); //Todays Date 
  // var now = document.getElementById("fir_date").value

  var dob = document.getElementById("fir_comp_dob").value;
  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];

  var date = today.split("-").reverse().join("-");

  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];
  // var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
  if ( dob > date )
{
    document.getElementById("fir_comp_dob").focus();
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';   
    return false;

}

  else if ( dobyearcheckyear < 1900 )
{
    document.getElementById("fir_comp_dob").focus();
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';   
    return false;

}
else
{
  var now = new Date(); //Todays Date 
  var dob = document.getElementById("fir_comp_dob").value;
  var dobcal = new Date(dob);
  var today = new Date();
  var birthday=dob.split("-");
  var dobYear= birthday[0];
  var dobMonth= birthday[1];
  var dobDay= birthday[2];

  var yob = dobcal.getFullYear(dobcal);
  var age = Math.floor((today-dobcal) / (365.25 * 24 * 60 * 60 * 1000));

// var nowDay= now.getDate();
// var nowMonth = now.getMonth() + 1;  //jan = 0 so month + 1
// var nowYear= now.getFullYear();

var datecheck=date.split("-");
var dobyearcheckyear =  datecheck[0];

var nowDay= datecheck[2];
var nowMonth = datecheck[1];  //jan = 0 so month + 1
var nowYear= datecheck[0];

var ageyear = nowYear - dobYear;

var agemonth = nowMonth - dobMonth;

var ageday = nowDay- dobDay;
if (agemonth <= 0) {
       ageyear--;
       agemonth = (12 + agemonth);
        }
if (agemonth == 12){
    ageyear++;
    agemonth = 0;
    }

  document.getElementById("fir_comp_yob").value = yob;
  document.getElementById("fir_comp_ageyear").value = ageyear;
  document.getElementById("fir_comp_agemonth").value = agemonth;   
  document.getElementById("fir_comp_agefrom").value = ageyear;
  document.getElementById("fir_comp_ageto").value = ageyear;   
}
}

function compyobFunction() {

  var now = new Date(); //Todays Date 

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var dobyearcheckyear =  datecheck[0];


  var yob = document.getElementById("fir_comp_yob").value;
  if (yob < 1900)
  {
    document.getElementById("fir_comp_yob").focus();
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
  }
  else if (yob > dobyearcheckyear)
  {
    document.getElementById("fir_comp_yob").focus();
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
  }
  else
{

  var now = new Date(); //Todays Date 
  var yob = document.getElementById("fir_comp_yob").value;
  var nowYear= dobyearcheckyear;
  var dob = yob + "-01-" + "01"
  var ageyear = nowYear - yob;

  document.getElementById("fir_comp_dob").value = dob;
  document.getElementById("fir_comp_ageyear").value = ageyear;
  document.getElementById("fir_comp_agemonth").value = 0;  
  document.getElementById("fir_comp_agefrom").value = ageyear;
  document.getElementById("fir_comp_ageto").value = ageyear;   

}
}

function compagemonth() {
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_comp_ageyear").value;
  var agemonth = document.getElementById("fir_comp_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_ageyear").focus();
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_ageyear").focus();
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
}
else if (ageyear < 10)
{
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_ageyear").focus();
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
}
else
{

}
}

function compageFunction() {
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_comp_ageyear").value;
  var agemonth = document.getElementById("fir_comp_agemonth").value;

if (ageyear > 120)
{
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_ageyear").focus();
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
}
else if (agemonth > 11)
{
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_dob").value = null;
    // document.getElementById("fir_comp_ageyear").value = ''
    document.getElementById("fir_comp_agemonth").focus();  
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
}

else if (ageyear == '')
{
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_ageyear").focus();
    document.getElementById("fir_comp_agemonth").value = '';   
    document.getElementById("fir_comp_agefrom").value = '';
    document.getElementById("fir_comp_ageto").value = '';
}

else
{
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_comp_ageyear").value;
  var agemonth = document.getElementById("fir_comp_agemonth").value;

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var dobyearcheckyear =  datecheck[0];

  var nowYear= dobyearcheckyear;
  var nowMonth = datecheck[1];  //jan = 0 so month + 1

  var yob = nowYear - ageyear;

// Check If current month is greater than age month
  if (nowMonth > agemonth)
{
  var birthmonth = nowMonth - agemonth;
  var mob = birthmonth;
  if (mob < 10) 
  {
  if (agemonth == '')
  {
    document.getElementById("fir_comp_agemonth").value = '0';  
  }
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("fir_comp_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  document.getElementById("fir_comp_dob").value = dob;
  document.getElementById("fir_comp_yob").value = yob;
  document.getElementById("fir_comp_agefrom").value = ageyear;
  document.getElementById("fir_comp_ageto").value = ageyear;
}
// Current month is less than Age month  
else
{
  var birthmonth = nowMonth - agemonth;
  var mob = 12 + birthmonth
  if (mob > 9)
  {
    if(agemonth=='')
    {
      document.getElementById("fir_comp_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("fir_comp_agemonth").value = 0;
    }    
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  document.getElementById("fir_comp_dob").value = dob;
  document.getElementById("fir_comp_yob").value = yob;
  document.getElementById("fir_comp_agefrom").value = ageyear;
  document.getElementById("fir_comp_ageto").value = ageyear; 
}
}

//end of else

}

function compagerangefromFunction() 
{
  var now = new Date(); //Todays Date 
  var ageyear = Number(document.getElementById("fir_comp_agefrom").value);
  var ageyearto = Number(document.getElementById("fir_comp_ageto").value);

if (ageyear == '')
{
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';
    document.getElementById("fir_comp_agefrom").focus();    
    document.getElementById("fir_comp_ageto").value = '';    
}

else if (ageyear < 10)
{
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';
    document.getElementById("fir_comp_agefrom").focus();    
    document.getElementById("fir_comp_ageto").value = '';    
}

else if (ageyear > 120)
{
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';
    document.getElementById("fir_comp_agefrom").focus();    
    document.getElementById("fir_comp_ageto").value = '';    
}

else if (ageyearto == '')
{
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';
    document.getElementById("fir_comp_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';
    document.getElementById("fir_comp_ageto").focus();    
}

else
{

}
}

function compagerangeFunction() {
  var now = new Date(); //Todays Date 
  var ageyear = Number(document.getElementById("fir_comp_agefrom").value);
  var ageyearto = Number(document.getElementById("fir_comp_ageto").value);

if (ageyearto < ageyear)
{
    document.getElementById("fir_comp_dob").value = null;
    document.getElementById("fir_comp_yob").value = '';
    document.getElementById("fir_comp_ageyear").value = '';
    document.getElementById("fir_comp_agemonth").value = '';
    document.getElementById("fir_comp_ageto").focus();    
}
else
{
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_comp_agefrom").value;

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var dobyearcheckyear =  datecheck[0];

  var nowYear= dobyearcheckyear;

  var yob = nowYear - ageyear;  

  var dob = yob + "-"+ '01' + "-" + "01";

  document.getElementById("fir_comp_dob").value = dob;
  document.getElementById("fir_comp_yob").value = yob;
  document.getElementById("fir_comp_ageyear").value = ageyear;
  document.getElementById("fir_comp_agemonth").value = 0;   

}
}

//!-- Victim Age Panel --

function vicdobFunction() {
  var now = new Date(); //Todays Date 
  var dob = document.getElementById("fir_victimdob").value;

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];


  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];
  // var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
  if ( dob > date )
{
    document.getElementById("fir_victimdob").focus();
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
    return false;

}
  else if ( dobyearcheckyear < 1900 )
{
    document.getElementById("fir_victimdob").focus();
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
    return false;

}
  else if ( dobyearcheckyear > datecheck[0] )
{
    document.getElementById("fir_victimdob").focus();
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
    return false;

}
else
{
  var dobcal = new Date(dob);
  var today = new Date();
  var birthday=dob.split("-");
  var dobYear= birthday[0];
  var dobMonth= birthday[1];
  var dobDay= birthday[2];

  var yob = dobcal.getFullYear(dobcal);
  var age = Math.floor((today-dobcal) / (365.25 * 24 * 60 * 60 * 1000));

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

var nowDay= datecheck[2];
var nowMonth = datecheck[1];  //jan = 0 so month + 1
var nowYear= datecheck[0];

var ageyear = nowYear - dobYear;
var agemonth = nowMonth - dobMonth;
var ageday = nowDay- dobDay;
if (agemonth <= 0) {
       ageyear--;
       agemonth = (12 + agemonth);
        }
if (agemonth == 12){
    ageyear++;
    agemonth = 0;
    }

  document.getElementById("fir_victimyob").value = yob;
  document.getElementById("fir_victimageyear").value = ageyear;
  document.getElementById("fir_victimagemonth").value = agemonth;   
  document.getElementById("fir_victimagefrom").value = ageyear;
  document.getElementById("fir_victimageto").value = ageyear;   
}
}

function vicyobFunction() { 
  var now = new Date(); //Todays Date 
  var yob = document.getElementById("fir_victimyob").value;
  if (yob < 1900)
  {
    document.getElementById("fir_victimyob").focus();
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';

  }
  else if (yob > now.getFullYear())
  {
    document.getElementById("fir_victimyob").focus();
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
  }
  else
{

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var nowYear= datecheck[0];
  var dob = yob + "-01-" + "01"
  var ageyear = nowYear - yob;

  document.getElementById("fir_victimdob").value = dob;
  document.getElementById("fir_victimageyear").value = ageyear;
  document.getElementById("fir_victimagemonth").value = 0;  
  document.getElementById("fir_victimagefrom").value = ageyear;
  document.getElementById("fir_victimageto").value = ageyear;   
}
}

function vicagemonth() {
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_victimageyear").value;
  var agemonth = document.getElementById("fir_victimagemonth").value;
if (ageyear > 120)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").focus();
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").focus();
    document.getElementById("fir_victimagemonth").value = '';
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
}
else if (ageyear < 10)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").focus();
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
}
else
{

}
}

function vicageFunction() {
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_victimageyear").value;
  var agemonth = document.getElementById("fir_victimagemonth").value;
if (ageyear > 120)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").focus();
    document.getElementById("fir_victimagemonth").value = '';   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
}
else if (agemonth > 11)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").focus();   
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").focus();
    document.getElementById("fir_victimagemonth").value = '';
    document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").value = '';
}

else
{
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_victimageyear").value;
  var agemonth = document.getElementById("fir_victimagemonth").value;

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var nowYear= datecheck[0];
  var nowMonth = datecheck[1];  //jan = 0 so month + 1

  var yob = nowYear - ageyear;

// Check If current month is greater than age month
  if (nowMonth > agemonth)
{
  var birthmonth = nowMonth - agemonth;
  var mob = birthmonth;
  if (mob < 10) 
  {
  if (agemonth == '')
  {
    document.getElementById("fir_victimagemonth").value = '0';  
  }
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("fir_victimagemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  document.getElementById("fir_victimdob").value = dob;
  document.getElementById("fir_victimyob").value = yob;
  document.getElementById("fir_victimagefrom").value = ageyear;
  document.getElementById("fir_victimageto").value = ageyear;
}
// Current month is less than Age month  
else
{
  var birthmonth = nowMonth - agemonth;
  var mob = 12 + birthmonth
  if (mob > 9)
  {
    if(agemonth=='')
    {
      document.getElementById("fir_victimagemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("fir_victimagemonth").value = 0;
    }    
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  document.getElementById("fir_victimdob").value = dob;
  document.getElementById("fir_victimyob").value = yob;
  document.getElementById("fir_victimagefrom").value = ageyear;
  document.getElementById("fir_victimageto").value = ageyear; 
}
}

//End of Else
}

function vicagerangefromFunction() 
{
  var now = new Date(); //Todays Date 
  var ageyear = Number(document.getElementById("fir_victimagefrom").value);
  var ageyearto = Number(document.getElementById("fir_victimageto").value);

if (ageyear == '')
{
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    document.getElementById("fir_victimagefrom").focus();
    document.getElementById("fir_victimageto").value = '';
}

else if (ageyear < 10)
{
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    document.getElementById("fir_victimagefrom").focus();
    document.getElementById("fir_victimageto").value = '';
}

else if (ageyear > 120)
{
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    document.getElementById("fir_victimagefrom").focus();
    document.getElementById("fir_victimageto").value = '';
}

else if (ageyearto < ageyear)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    // document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").focus();    
}

if (ageyearto == '')
{
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    // document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").focus();    
}

else
{

}
}

function vicagerangeFunction() {
  var now = new Date(); //Todays Date 
  var ageyear = Number(document.getElementById("fir_victimagefrom").value);
  var ageyearto = Number(document.getElementById("fir_victimageto").value);

if (ageyearto == '')
{
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    // document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").focus();    
}

else if (ageyear == '')
{
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    // document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimagefrom").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    // document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").focus();    
}
else if (ageyearto < 10)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    // document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").focus();    
}
else if (ageyearto > 120)
{
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimdob").value = null;
    document.getElementById("fir_victimyob").value = '';
    document.getElementById("fir_victimageyear").value = '';
    document.getElementById("fir_victimagemonth").value = '';
    // document.getElementById("fir_victimagefrom").value = '';
    document.getElementById("fir_victimageto").focus();    
}

else
{

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var ageyear = document.getElementById("fir_victimagefrom").value;
  var nowYear= datecheck[0];

  var yob = nowYear - ageyear;  

  var dob = yob + "-"+ '01' + "-" + "01";

  document.getElementById("fir_victimdob").value = dob;
  document.getElementById("fir_victimyob").value = yob;
  document.getElementById("fir_victimageyear").value = ageyear;
  document.getElementById("fir_victimagemonth").value = 0;   

}
}

//-- Accused Age Panel --

function accdobFunction() {
  var now = new Date(); //Todays Date 
  var dob = document.getElementById("fir_accdob").value;

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];
  // var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
  if ( dob > date )
{
    document.getElementById("fir_accdob").focus();
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
    return false;

}

  else if ( dobyearcheckyear < 1900 )
{
    document.getElementById("fir_accdob").focus();
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
    return false;

}
  else if ( dobyearcheckyear > datecheck[0] )
{
    document.getElementById("fir_accdob").focus();
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
    return false;

}

else
{

  var now = new Date(); //Todays Date 
  var dob = document.getElementById("fir_accdob").value;
  var dobcal = new Date(dob);
  var today = new Date();
  var birthday=dob.split("-");
  var dobYear= birthday[0];
  var dobMonth= birthday[1];
  var dobDay= birthday[2];

  var yob = dobcal.getFullYear(dobcal);
  var age = Math.floor((today-dobcal) / (365.25 * 24 * 60 * 60 * 1000));

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

var nowDay= datecheck[2];
var nowMonth = datecheck[1];  //jan = 0 so month + 1
var nowYear= datecheck[0];

var ageyear = nowYear - dobYear;
var agemonth = nowMonth - dobMonth;
var ageday = nowDay- dobDay;
if (agemonth <= 0) {
       ageyear--;
       agemonth = (12 + agemonth);
        }
if (agemonth == 12){
    ageyear++;
    agemonth = 0;
    }

  document.getElementById("fir_accyob").value = yob;
  document.getElementById("fir_accageyear").value = ageyear;
  document.getElementById("fir_accagemonth").value = agemonth;   
  document.getElementById("fir_accagefrom").value = ageyear;
  document.getElementById("fir_accageto").value = ageyear;   
}
}

function accyobFunction() {
  var now = new Date(); //Todays Date 

  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var yob = document.getElementById("fir_accyob").value;
  if (yob < 1900)
  {
    document.getElementById("fir_accyob").focus();
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';

  }
  else if (yob > datecheck[0])
  {
    document.getElementById("fir_accyob").focus();
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
  }
  else
{
  var now = new Date(); //Todays Date 
  var yob = document.getElementById("fir_accyob").value;
  var nowYear= datecheck[0];
  var dob = yob + "-01-" + "01"
  var ageyear = nowYear - yob;

  document.getElementById("fir_accdob").value = dob;
  document.getElementById("fir_accageyear").value = ageyear;
  document.getElementById("fir_accagemonth").value = 0;  
  document.getElementById("fir_accagefrom").value = ageyear;
  document.getElementById("fir_accageto").value = ageyear;   

}
}

function accagemonth() {
  var now = new Date(); //Todays Date 
  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var ageyear = document.getElementById("fir_accageyear").value;
  var agemonth = document.getElementById("fir_accagemonth").value;
if (ageyear > 120)
{
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").focus();
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").focus();
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
}
else if (ageyear < 10)
{
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").focus();
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
}
else
{

}
}

function accageFunction() {
  var now = new Date(); //Todays Date 

  var ageyear = document.getElementById("fir_accageyear").value;
  var agemonth = document.getElementById("fir_accagemonth").value;
if (ageyear > 120)
{
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").focus();
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
}
else if (agemonth > 11)
{
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").value = ''
    document.getElementById("fir_accagemonth").focus();  
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accageyear").focus();
    document.getElementById("fir_accagemonth").value = '';   
    document.getElementById("fir_accagefrom").value = '';
    document.getElementById("fir_accageto").value = '';
}

else
{
  var now = new Date(); //Todays Date 
  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var ageyear = document.getElementById("fir_accageyear").value;
  var agemonth = document.getElementById("fir_accagemonth").value;

  var nowYear= datecheck[0];
  var nowMonth = datecheck[1];  //jan = 0 so month + 1

  var yob = nowYear - ageyear;

// Check If current month is greater than age month
  if (nowMonth > agemonth)
{
  var birthmonth = nowMonth - agemonth;
  var mob = birthmonth;
  if (mob < 10) 
  {
  if (agemonth == '')
  {
    document.getElementById("fir_accagemonth").value = '0';  
  }
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("fir_accagemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  document.getElementById("fir_accdob").value = dob;
  document.getElementById("fir_accyob").value = yob;
  document.getElementById("fir_accagefrom").value = ageyear;
  document.getElementById("fir_accageto").value = ageyear;
}
// Current month is less than Age month  
else
{
  var birthmonth = nowMonth - agemonth;
  var mob = 12 + birthmonth
  if (mob > 9)
  {
    if(agemonth=='')
    {
      document.getElementById("fir_accagemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("fir_accagemonth").value = 0;
    }    
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  document.getElementById("fir_accdob").value = dob;
  document.getElementById("fir_accyob").value = yob;
  document.getElementById("fir_accagefrom").value = ageyear;
  document.getElementById("fir_accageto").value = ageyear; 
}
}

//End of Else
}

function accagerangefromFunction() 
{
  var now = new Date(); //Todays Date 

  var ageyear = Number(document.getElementById("fir_accagefrom").value);
  var ageyearto = Number(document.getElementById("fir_accageto").value);

if (ageyear == '')
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accagefrom").focus();    
    document.getElementById("fir_accageto").value = '';    
}

else if (ageyear < 10)
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accagefrom").focus();    
    document.getElementById("fir_accageto").value = '';    
}
else if (ageyear > 120)
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accagefrom").focus();    
    document.getElementById("fir_accageto").value = '';    
}

else if (ageyearto == '')
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accageto").focus();    
}

else
{

}
}
function accagerangeFunction() {
  var now = new Date(); //Todays Date 


  var  today = document.getElementById("fir_date").value;
  today = today.split(' ')[0];
  var date = today.split("-").reverse().join("-");
  var datecheck=date.split("-");
  var datecheckyear =  datecheck[0];

  var ageyear = Number(document.getElementById("fir_accagefrom").value);
  var ageyearto = Number(document.getElementById("fir_accageto").value);

if (ageyearto == '')
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accageto").focus();    
}

else if (ageyear == '')
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accagefrom").focus();    
    document.getElementById("fir_accageto").value = '';    
}

if (ageyearto > 120)
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accageto").focus();    
}

if (ageyearto < 10)
{
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accdob").value = null;
    document.getElementById("fir_accyob").value = '';
    document.getElementById("fir_accageyear").value = '';
    document.getElementById("fir_accagemonth").value = '';
    document.getElementById("fir_accageto").focus();    
}
else
{
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("fir_accagefrom").value;

  var nowYear= datecheck[0];

  var yob = nowYear - ageyear;  

  var dob = yob + "-"+ '01' + "-" + "01";

  document.getElementById("fir_accdob").value = dob;
  document.getElementById("fir_accyob").value = yob;
  document.getElementById("fir_accageyear").value = ageyear;
  document.getElementById("fir_accagemonth").value = 0;   

}
}

COPY_COMPLAINT = false; // Is compliant and victim same, vairable to check they want to copy now or not
$("#fir_comp_sameasvictim").click(function(){
    if($("#fir_comp_sameasvictim").prop("checked")==true){
        COPY_COMPLAINT = true;
    }else{
        COPY_COMPLAINT = false;
    }
});

COMPLAINT_ALREADY_COPIED=false;