/*
Manages the AJAX Load to the Project
*/

district_url = "/districts";
police_station_url = "/police-stations";
section_url = "/sections";

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


// Function To Check Max Date
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

$(document).ready(function() 
{
    $("#arrestdatetime").attr("max",set_time_picker_min_val_today());
    $("#arrest_psinfo_datetime").attr("max",set_time_picker_min_val_today());
    $("#arrest_intimate_datetime").attr("max",set_time_picker_min_val_today());


$("#acc_country").val("80");

$("#acc_sameascountry").val("80");

$("#acc_nationality").val("80");

$("#witness_country").val("80");

$("#witness_nationality").val("80");

$("#witness_samecountry").val("80");

var arrfirDate = $("#firdate").val().split(" ");
var firdatecomp = arrfirDate[0].split("-");
firdatepanel = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0];

});


function set_select(id, val){
    $("#"+id).val(val);
}

function arrestdatecheck(){

var arrestdatetime = document.getElementById("arrestdatetime").value;

// console.log(gddatetime);
var datepattern = /((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[0-9])|(1[0-2]))-[0-9]{4} (0\d|1\d|2[0-3]):[0-5]\d/;
// alert(datepattern.test(gddatetime));
console.log(datepattern.test(arrestdatetime));
if (datepattern.test(arrestdatetime)== true) {
    firdate = $("#firdate").val();

    var arrfirDate = $("#firdate").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]

    var arrarrestDate = $("#arrestdatetime").val().split(" ");
    var arrestdatecomp = arrarrestDate[0].split("-");
    var arrarrestdatetime = arrestdatecomp[2] + "-" + arrestdatecomp[1] + "-" + arrestdatecomp[0] + "T" + arrarrestDate[1]
    console.log(arrarrestdatetime);

    if (arrarrestdatetime < arrfirdatetime){

    // ++++++++++++++++++++++IN MANY CASES ARREST HAPPENS BEFORE FIR

    // document.getElementById('arrestdatetime_error').innerHTML = 'Arrest/Surrender date cannot less than FIR date';
    // document.getElementById("arrestdatetime").focus();
    // return false        
    }
    else{
        document.getElementById('arrestdatetime_error').innerHTML = '';
    }

}
else{
  document.getElementById("arrestdatetime").focus();

}
   }

function arrestpsinfodatecheck(){

var arrestpsinfodatetime = document.getElementById("arrest_psinfo_datetime").value;

// console.log(gddatetime);
var datepattern = /((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[0-9])|(1[0-2]))-[0-9]{4} (0\d|1\d|2[0-3]):[0-5]\d/;
// alert(datepattern.test(gddatetime));
console.log(datepattern.test(arrestpsinfodatetime));
if (datepattern.test(arrestpsinfodatetime)== true) {
    firdate = $("#firdate").val();

    var arrfirDate = $("#firdate").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]

    var arrarrestpsinfoDate = $("#arrest_psinfo_datetime").val().split(" ");
    var arrestpsinfodatecomp = arrarrestpsinfoDate[0].split("-");
    var arrestpsinfodatetime = arrestpsinfodatecomp[2] + "-" + arrestpsinfodatecomp[1] + "-" + arrestpsinfodatecomp[0] + "T" + arrarrestDate[1]
    console.log(arrestpsinfodatetime);

    if (arrestpsinfodatetime < arrfirdatetime){

    // ++++++++++++++++++++++IN MANY CASES ARREST HAPPENS BEFORE FIR

    // document.getElementById('arrestdatetime_error').innerHTML = 'Arrest/Surrender date cannot less than FIR date';
    // document.getElementById("arrestdatetime").focus();
    // return false        
    }
    else{
        document.getElementById('arrest_psinfo_datetime_error').innerHTML = '';
    }

}
else{
  document.getElementById("arrest_psinfo_datetime").focus();

}
   }


function arrestintimatedatecheck(){

var arrestintimatedatetime = document.getElementById("arrest_intimate_datetime").value;

// console.log(gddatetime);
var datepattern = /((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[0-9])|(1[0-2]))-[0-9]{4} (0\d|1\d|2[0-3]):[0-5]\d/;
// alert(datepattern.test(gddatetime));
console.log(datepattern.test(arrestintimatedatetime));
if (datepattern.test(arrestintimatedatetime)== true) {
    firdate = $("#firdate").val();

    var arrfirDate = $("#firdate").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]

    var arrestintimatedatetime = $("#arrest_psinfo_datetime").val().split(" ");
    var arrestintimatedatecomp = arrestintimatedatetime[0].split("-");
    var arrestintimatedatetime = arrestintimatedatecomp[2] + "-" + arrestintimatedatecomp[1] + "-" + arrestintimatedatecomp[0] + "T" + arrestintimatedatecomp[1]
    console.log(arrestintimatedatetime);

    if (arrestintimatedatetime < arrfirdatetime){

    // ++++++++++++++++++++++IN MANY CASES ARREST HAPPENS BEFORE FIR

    // document.getElementById('arrestdatetime_error').innerHTML = 'Arrest/Surrender date cannot less than FIR date';
    // document.getElementById("arrestdatetime").focus();
    // return false        
    }
    else{
        document.getElementById('arrest_intimate_datetime_error').innerHTML = '';
    }

}
else{
  document.getElementById("arrest_intimate_datetime").focus();

}
   }


function checkheight(){

    var heightinfeetlower = parseFloat(document.getElementById('accheightfeetlower').value);
    var heightinincheslower = parseFloat(document.getElementById('accheightinchlower').value);
    var heightinfeetupper = parseFloat(document.getElementById('accheightfeetupper').value);
    var heightininchesupper = parseFloat(document.getElementById('accheightinchupper').value);

// Lower Feet
    if (heightinfeetlower)
    {
        var heightfeettocmlower = heightinfeetlower * 30.48;
    }
    else
    {
        var heightfeettocmlower = 0;
    }
// Lower Inches
    if (heightinincheslower)
    {
        var heightinchestocmlower = 2.54 * heightinincheslower;
    }
    else
    {
        var heightinchestocmlower = 0;
    }
// Upper Feet
    if (heightinfeetupper)
    {
        var heightfeettocmupper = heightinfeetupper * 30.48;
    }
    else
    {
        var heightfeettocmupper = 0;
    }
// Upper inches
    if (heightininchesupper)
    {
        var heightinchestocmupper = 2.54 * heightininchesupper;
    }
    else
    {
        var heightinchestocmupper = 0;
    }

    var heightlower = heightfeettocmlower + heightinchestocmlower
    var heightupper = heightfeettocmupper + heightinchestocmupper
    $("#accheight").val(heightlower);
    $("#accheighttocm").val(heightupper);

}

function heighttofeet(height) {
      var heightinFeet = ((height*0.393700) / 12);
      var feetvalue = Math.floor(heightinFeet);
      var inchesvalue = Math.round((heightinFeet - feetvalue) * 12);
      return feetvalue;
    }

function heighttoinches(height) {
      var heightinFeet = ((height*0.393700) / 12);
      var feetvalue = Math.floor(heightinFeet);
      var inchesvalue = Math.round((heightinFeet - feetvalue) * 12);
      return inchesvalue;
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
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
  }});
}

$(document).ready(function() {

// Select District

$("#witness_state").blur(function() {
    data = {"state": $("#witness_state").val()}
    load_resource(district_url, data, "witness_district", 0, 1, "Select District");
});
$("#witness_samestate").blur(function() {
    data = {"state": $("#witness_samestate").val()}
    load_resource(district_url, data, "witness_samedistrict", 0, 1, "Select District");
});
$("#acc_state").blur(function() {
    data = {"state": $("#acc_state").val()}
    load_resource(district_url, data, "acc_district", 0, 1, "Select District");
});
$("#acc_sameasstate").blur(function() {
    data = {"state": $("#acc_sameasstate").val()}
    load_resource(district_url, data, "acc_sameasdistrict", 0, 1, "Select District");
});
$("#arrstate").blur(function() {
    data = {"state": $("#arrstate").val()}
    load_resource(district_url, data, "arrdistrict", 0, 1, "Select District");
});


// Select PoliceStation
$("#witness_district").blur(function() {
  data = {"state": $("#witness_state").val(), "district": $("#witness_district").val()}
  load_resource(police_station_url, data, "witness_ps", 0, 1, "Select Police Station");
});
$("#witness_samedistrict").blur(function() {
  data = {"state": $("#witness_samestate").val(), "district": $("#witness_samedistrict").val()}
  load_resource(police_station_url, data, "witness_sameps", 0, 1, "Select Police Station");
});
$("#acc_district").blur(function() {
  data = {"state": $("#acc_state").val(), "district": $("#acc_district").val()}
  load_resource(police_station_url, data, "acc_ps", 0, 1, "Select Police Station");
});
$("#acc_sameasdistrict").blur(function() {
  data = {"state": $("#acc_sameasstate").val(), "district": $("#acc_sameasdistrict").val()}
  load_resource(police_station_url, data, "acc_sameasps", 0, 1, "Select Police Station");
});
$("#arrdistrict").blur(function() {
  data = {"state": $("#arrstate").val(), "district": $("#arrdistrict").val()}
  load_resource(police_station_url, data, "arrps", 0, 1, "Select Police Station");
});

// Select Sections
$("#acts").blur(function() {
    data = {"act_id": $("#acts").val()}
    load_resource(section_url, data, "sections", 0, 1, 'Select Section');
});


});


// Component Setting Throughout the application
function set_time_picker_min_val_today(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
    return date+"T00:00";
}

function getYearDropDown(){
    // Return list of year as html <option/>
}

/**--------------------------------------------------------
                Age Type - Select
---------------------------------------------------------**/
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
$("#accagetype").change(function(){
    select_age_type("accagetype", "acc_dob", "acc_yob", "acc_ageyear", "acc_agemonth", "acc_agefrom", "acc_ageto");
});

$("#witnes_agetype").change(function(){
    select_age_type("witnes_agetype", "witnes_dob", "witnes_yob", "witnes_ageyear", "witnes_agemonth", "witnes_agefrom", "witnes_ageto");
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
        reset_select(district, "Select District");
        s_district.val("");
        s_ps.prop("disabled", false);
        reset_select(ps, "Select Police Station");
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


// Accused Same as permenant
$("#acccomplsameasper2").click(function(){
    sameAsYesNo("N", "acc_sameasaddress", "acc_sameascountry", "acc_sameasstate", "acc_sameasdistrict",
    "acc_sameasps", "","","","","");
});

$("#acccomplsameasper1").click(function(){
    sameAsYesNo("Y", "acc_sameasaddress", "acc_sameascountry", "acc_sameasstate", "acc_sameasdistrict",
    "acc_sameasps", "acc_address","acc_country","acc_state","acc_district","acc_ps");
});

$("#acc_ps").blur(function(){
if ($('#acccomplsameasper1').is(':checked')) {        
    sameAsYesNo("Y", "acc_sameasaddress", "acc_sameascountry", "acc_sameasstate", "acc_sameasdistrict",
    "acc_sameasps", "acc_address","acc_country","acc_state","acc_district","acc_ps");
}
});

// Witness Same as permenant
$("#witnesssameasper2").click(function(){
    sameAsYesNo("N", "witness_sameaddress", "witness_samecountry", "witness_samestate", "witness_samedistrict",
    "witness_sameps", "","","","","");
});

$("#witnesssameasper1").click(function(){
    sameAsYesNo("Y", "witness_sameaddress", "witness_samecountry", "witness_samestate", "witness_samedistrict",
    "witness_sameps", "compladdress","witness_country","witness_state","witness_district","witness_ps");
});

$("#witness_ps").blur(function(){
if ($('#witnesssameasper1').is(':checked')) {        
    sameAsYesNo("Y", "witness_sameaddress", "witness_samecountry", "witness_samestate", "witness_samedistrict",
    "witness_sameps", "compladdress","witness_country","witness_state","witness_district","witness_ps");
}
});


/*----------------------------------------------------------
              Data Table -  Add & Delete Row
------------------------------------------------------------*/


// Loads rows in to table
function build_rows_act(act_sec_list){
    rows = []
    header = "<thead class='thead-dark'><tr> <th>S.No.</th>  <th>Act CD</th> <th>Acts</th> <th>Section CD</th> <th>Section</th> <th>Action</th> </tr></thead>"
    i = 1;
    act_sec_list.forEach(function(row, index){
        if(row['soft_delete'] == "Yes"){
            return true;
        }
        index += 1;
        delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' role='button' aria-pressed='true' onclick='delete_row_act(\"arrest_act_sec\",\""+index+"\");'><i class='feather icon-menu' tooltip='Delete'></i>&nbsp;Delete</a></td>";
        no = '<th>'+i+'</th>'
        html = '<tr id="'+index+'">'+no+row.act_cd+row.act_text+row.sec_cd+row.sec_text+delete_button+'</tr>';
        rows.push(html)
        i += 1;
    });
    return header+"<tbody>"+rows+"</tbody>";
}

$('#add_act_sect').click(function(){
    if(($("#acts").find(":selected").text() == 'Acts') || ($("#sections").find(":selected").text() == 'Select Sections')){
        return 0;
    }
    act_cd = "<th>"+$("#acts").find(":selected").val()+"</th>";
    act_text = "<th>"+$("#acts").find(":selected").text()+"</th>";
    sec_cd = "<th>"+$("#sections").find(":selected").val()+"</th>";
    sec_text = "<th>"+$("#sections").find(":selected").text()+"</th>";
    found = act_sec_list.some(el => el.act_cd == act_cd && el.sec_cd == sec_cd);
    if(found){return 0;}
    act_sec_list[act_sec_list.length] = {'act_srno': '', 'act_cd': act_cd, 'act_text': act_text, 'sec_cd': sec_cd, 'sec_text': sec_text,  'from_db': "No",  'soft_delete': "No"};
    html = build_rows_act(act_sec_list);
    $("#arrest_act_sec").html(html);
    $("#acts").val("");
    $("#sections").val("");

});

// Deletes the row from a given data table
function delete_row_act(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
     if(act_sec_list[row_no]['from_db'] == 'Yes'){
        act_sec_list[row_no]['soft_delete'] = "Yes";
    }else{
        act_sec_list.splice(row_no, 1);
    }
    $("#arrest_act_sec").html(build_rows_act(act_sec_list));
}

// Accused Add & Delete --------------------------//
// Loads rows in to table ------------------------//
function reset_accused(){
    set_select("accgender", "");
    set_select("accagetype", "");
    set_select("acc_reltype", "0");

    set_select("acc_country", "80");
    set_select("acc_state", "");
    reset_select("acc_district", "Select District")
    reset_select("acc_ps", "Select Police Station")
    set_select("acc_nationality", "80");

    reset_text(["accusedname", "acc_relname", "acc_dob", "acc_yob", "acc_ageyear", "acc_agemonth", "acc_agefrom", "acc_ageto",
    "acc_address", "acc_sameasaddress"]);
    reset_radio(["accusedtypes1", "accjuvenile2", "accmmedical2", "acccomplsameasper1"]);
    $("#accagetype").change();
    $("#acc_updateRow").parent().attr("style", "display:none");
    $("#acc_cancelRow").parent().attr("style", "display:none");
    $("#acc_addRow").parent().attr("style", "display:block");
}

function reset_arrest_details(){
    set_select("arrstate", "");
    reset_select("arrdistrict", "Select District")
    reset_select("arrps", "Select Police Station")
    set_select("accusedtypeofcourt", "");
    set_select("accusedactiontaken", "");
    set_select("arrinformedrelationtype", "");
    set_select("arrinformationmode", "");
    set_select("arrincomegroup", "");
    set_select("arrlivingstatus", "");
    set_select("arreducational_qual", "");
    set_select("arr_arrestedby", "");
    
    reset_radio(["isfingerprinttaken1"]);
    reset_radio(["isdangerous1"]);
    reset_radio(["isgenerallyarmed1"]);
    reset_radio(["isknowncriminal2"]);
    reset_text(["isknowncriminaldetails"]);    
    reset_radio(["isjumpbail1"]);
    reset_radio(["iswantedcriminal2"]);
    reset_text(["iswanteddetails"]);    
    reset_radio(["isbailjumpprevious2"]);
    reset_text(["isbailjumppreviousdetail"]);    
    reset_radio(["operateswithaccomp1"]);
    reset_radio(["isrecidivist1"]);
    reset_radio(["islikelycriminal1"]);
    reset_radio(["isclothmalefemale1"]);

    reset_text(["arrestdatetime", "arrest_psinfo_datetime", "arrest_intimate_datetime", "arrestgdnumber", "arrestrelativename", "accusedmegistrate"]);
    reset_radio(["isarrestorsurrender1"]);
    reset_text(["accname", "accheight", "accheighttocm", "acctattoodesc", "accheightfeetlower", "accheightinchlower", "accheightfeetupper", "accheightinchupper"]);
    set_select("accbuildtype", "0");
    set_select("acccomplexion", "0");
    set_select("accearmissing", "0");
    set_select("acceardeform", "0");
    set_select("acceardeaf", "0");
    set_select("accarmmissing", "0");
    set_select("accfingermissing", "0");
    set_select("acclegmissing", "0");
    set_select("acchunchback", "0");
    set_select("acctoeextra", "0");
    set_select("acctoemissing", "0");
    set_select("acclimping", "0");
    set_select("accbowleg", "0");
    set_select("accknockknee", "0");
    set_select("accearlobs", "0");
    set_select("accgoitre", "0");
    set_select("accteethtype", "0");
    set_select("acchairtype", "0");
    set_select("accwigtype", "0");
    set_select("acchairstrt", "0");
    set_select("acchaircolor", "0");
    set_select("acchaircut", "0");
    set_select("acchairstyle", "0");
    set_select("acchairlength", "0");
    set_select("acchairdye", "0");
    set_select("acchaircolor", "0");
    set_select("acceyetype", "0");
    set_select("acceyeblind", "0");
    set_select("acceyecolor", "0");
    set_select("acceyespec", "0");
    set_select("acceyesquint", "0");
    set_select("acceyebrow", "0");
    set_select("acceyebrowshade", "0");
    set_select("acceyeblink", "0");
    set_select("acchabits", "0");
    set_select("acchabitsdress", "0");
    set_select("accdialect", "0");

    set_select("accoutertop", "0");
    set_select("accouterbottom", "0");
    set_select("accinnertop", "0");
    set_select("accinnerbottom", "0");
    set_select("accseasonaltop", "0");
    set_select("accseasonalbottom", "0");

    set_select("accplaceburnmark", "0");
    set_select("accplaceleukoderma", "0");
    set_select("accplacemole", "0");
    set_select("accplacescar", "0");
    set_select("accplacetattoo", "0");
    set_select("accbloodgroup", "0");
    set_select("accfacetype", "0");
    set_select("acccheektype", "0");
    set_select("accforheadtype", "0");
    set_select("accchintype", "0");
    set_select("accmustachetype", "0");
    set_select("accbearedtype", "0");
    set_select("accnosetype", "0");
    set_select("acclipstype", "0");
    set_select("accpoxpitted", "0");
}

function reset_acc_info(){

}

function build_existing_acc(existing_accused){
    rows_e = [];
    index_no = accused_list.length
    existing_accused.forEach(function(row_e, index){
        index_no += 1;
        add_button_e = "<td>Surrender</td>";
        if(row_e.arr_surr == "A"){
            add_button_e = "<td>Arrest</td>";
        }
        edit_button_e = "<td><i class='feather icon-slash' title='Existing Accused'></i></td>";
        delete_button_e = "<td><i class='feather icon-slash' title='Existing Accused'></i></td>";
        no_e = '<td>'+index_no+'</td>'
        html = '<tr id="'+index_no+'">'+no_e+row_e.accusedname+row_e.acc_relname+row_e.acc_ps+add_button_e+edit_button_e+'</tr>';
        rows_e.push(html)
    });
    return rows_e;
}

function build_rows_acc(accused_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Name</th> <th>Relative Name</th> <th>PS</th><th>Arrest Or Surrender Details</th><th>Arrest Personal Details</th></thead>"
    accused_list.forEach(function(row, index){
        index += 1;
        if(row['soft_delete'] == "Yes"){
            return true;
        }
        add_button = "<td><a class='btn btn-icon btn-warning center mr-1 mb-1' title='Edit' data-toggle='modal' data-target='#inlineForm' onclick='cur_acc_index ="+ index+";reset_arrest_details();load_arrest_details();'><i class='step-icon feather icon-edit'></i>&nbsp;Edit</a></td>";
        edit_button = "<td><a class='btn btn-icon btn-warning center mr-1 mb-1' title='Edit' data-toggle='modal' data-target='#addaccusedmodal' onclick='edit_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i>&nbsp;Edit</a></td>";
        // delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' title='Delete' data-toggle='tooltip' onclick='delete_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i>&nbsp;Delete</a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.accusedname+row.acc_relname+row.acc_ps+add_button+edit_button+'</tr>';
        rows.push(html)
    });
//    existing_accused_list_row = build_existing_acc(existing_accused);
    return header+"<tbody>"+rows+"</tbody>";
//    return header+"<tbody>"+rows+"</tbody>";
}

function create_accused_list(row_id, from='insert'){
    fir_accusedname = "<td>"+$("#accusedname").val()+"</td>";
    fir_accaddress = $("#acc_address").val();
    acc_type = $('input[name="accusedtypes"]:checked').val();
    acc_juvenile = $('input[name="accjuvenile"]:checked').val();
    acc_medical = $('input[name="accmmedical"]:checked').val();
    acc_sameasper = $('input[name="acc_sameasper"]:checked').val();
    acc_gender = $("#accgender").find(":selected").text();
    acc_gender_val = $("#accgender").find(":selected").val();


    acc_religion = $("#accreligion").find(":selected").text();
    acc_religion_val = $("#accreligion").find(":selected").val();

    acc_caste = $("#acccastecat").find(":selected").text();
    acc_caste_val = $("#acccastecat").find(":selected").val();

    acc_rel_type = $("#acc_reltype").find(":selected").text();
    acc_rel_type_val = $("#acc_reltype").find(":selected").val();
    acc_relname = "<td>"+$("#acc_relname").val()+"</td>";

    acc_agetype = $("#accagetype").find(":selected").text();
    acc_agetype_val = $("#accagetype").find(":selected").val();
    acc_dob = $('#acc_dob').val();
    acc_yob = $('#acc_yob').val();
    acc_ageyear = $('#acc_ageyear').val();
    acc_agemonth = $('#acc_agemonth').val();
    acc_agefrom = $('#acc_agefrom').val();
    acc_ageto = $('#acc_ageto').val();
    acc_country = $("#acc_country").find(":selected").text();
    acc_country_val = $("#acc_country").find(":selected").val();
    acc_state = $("#acc_state").find(":selected").text();
    acc_state_val = $("#acc_state").find(":selected").val();
    acc_district = $("#acc_district").find(":selected").text();
    acc_district_val = $("#acc_district").find(":selected").val();
    acc_ps = "<td>"+$("#acc_ps").find(":selected").text()+"</td>";
    acc_ps_val = $("#acc_ps").find(":selected").val();
    acc_adddr_same = $("#acc_sameasaddress").val();
    acc_country_same = $("#acc_sameascountry").find(":selected").text();
    acc_country_same_val = $("#acc_sameascountry").find(":selected").val();
    acc_state_same = $("#acc_sameasstate").find(":selected").text();
    acc_state_same_val = $("#acc_sameasstate").find(":selected").val();
    acc_district_same = $("#acc_sameasdistrict").find(":selected").text();
    acc_district_same_val = $("#acc_sameasdistrict").find(":selected").val();
    acc_ps_same = $("#acc_sameasps").find(":selected").text();
    acc_ps_same_val = $("#acc_sameasps").find(":selected").val();
    acc_nationality = $("#acc_nationality").find(":selected").text();
    acc_nationality_val = $("#acc_nationality").find(":selected").val();
    from_db = "No";
    soft_delete = "No";
    accused_srno = "";
    arrestgdnumber = '';
    arrestdatetime = '';
    arrestpsinfodatetime = '';
    isarrestorsurrender = '';
    arrstate_val = '';
    arrdistrict_val = '';
    arrps_val = '';
    accusedtypeofcourt_val = '';
    accusedmegistrate = '';
    accusedactiontaken_val = '';
    accusedactiontakenarr_val = '';
    arr_intimate_rel = '';
    arr_intimate_rel_name = '';
    arr_intimate_mode_cd = '';
    income_group_cd = '';
    living_status_cd = 'None';
    edu_qual_cd = '';

    if(from == 'update'){
        arrestgdnumber = accused_list[row_id]['arrestgdnumber'];
        arrestdatetime = accused_list[row_id]['arrestdatetime'];
        arrestpsinfodatetime = accused_list[row_id]['arrestpsinfodatetime'];

        arr_intimate_dt = accused_list[row_id]['arr_intimate_dt'];
        arr_intimate_rel = accused_list[row_id]['arr_intimate_rel'];
        arr_intimate_rel_name = accused_list[row_id]['arr_intimate_rel_name'];
        arr_intimate_mode_cd = accused_list[row_id]['arr_intimate_mode_cd'];
        income_group_cd = accused_list[row_id]['income_group_cd'];
        living_status_cd = accused_list[row_id]['living_status_cd'];
        edu_qual_cd = accused_list[row_id]['edu_qual_cd'];
        arrested_by_pis_cd = accused_list[row_id]['arrested_by_pis_cd'];

        isarrestorsurrender = accused_list[row_id]['isarrestorsurrender'];
        arrstate_val = accused_list[row_id]['arrstate_val'];
        arrdistrict_val = accused_list[row_id]['arrdistrict_val'];
        arrps_val = accused_list[row_id]['arrps_val'];
        accusedtypeofcourt_val = accused_list[row_id]['accusedtypeofcourt_val'];
        accusedmegistrate = accused_list[row_id]['accusedmegistrate'];
        accusedactiontaken_val = accused_list[row_id]['accusedactiontaken_val'];
        accusedactiontakenarr_val = accused_list[row_id]['accusedactiontakenarr_val'];

        isfingerprinttaken = accused_list[row_id]['isfingerprinttaken'];
        accheight = accused_list[row_id]['accheight'];
        isdangerous = accused_list[row_id]['isdangerous'];
        isclothmalefemale = accused_list[row_id]['isclothmalefemale'];
        isgenerallyarmed = accused_list[row_id]['isgenerallyarmed'];
        isbailjumpprevious = accused_list[row_id]['isbailjumpprevious'];
        isbailjumppreviousdetail = accused_list[row_id]['isbailjumppreviousdetail'];

        isgenerallyarmed = accused_list[row_id]['isgenerallyarmed'];
        isknowncriminal = accused_list[row_id]['isknowncriminal'];
        isknowncriminaldetails = accused_list[row_id]['isknowncriminaldetails'];
        isrecidivist = accused_list[row_id]['isrecidivist'];

        isjumpbail = accused_list[row_id]['isjumpbail'];
        islikelycriminal = accused_list[row_id]['islikelycriminal'];
        iswantedcriminal = accused_list[row_id]['iswantedcriminal'];
        iswanteddetails = accused_list[row_id]['iswanteddetails'];

        accheighttocm = accused_list[row_id]['accheighttocm'];
        acctattoodesc = accused_list[row_id]['acctattoodesc'];
        accbuildtype = accused_list[row_id]['accbuildtype'];
        acccomplexion = accused_list[row_id]['acccomplexion'];
        accearmissing = accused_list[row_id]['accearmissing'];
        acceardeform = accused_list[row_id]['acceardeform'];
        acceardeaf = accused_list[row_id]['acceardeaf'];
        accarmmissing = accused_list[row_id]['accarmmissing'];
        accfingermissing = accused_list[row_id]['accfingermissing'];
        acclegmissing = accused_list[row_id]['acclegmissing'];
        acchunchback = accused_list[row_id]['acchunchback'];
        acctoeextra = accused_list[row_id]['acctoeextra'];
        acctoemissing = accused_list[row_id]['acctoemissing'];
        acclimping = accused_list[row_id]['acclimping'];
        accbowleg = accused_list[row_id]['accbowleg'];
        accknockknee = accused_list[row_id]['accknockknee'];
        accearlobs = accused_list[row_id]['accearlobs'];
        accgoitre = accused_list[row_id]['accgoitre'];
        accteethtype = accused_list[row_id]['accteethtype'];
        acchairtype = accused_list[row_id]['acchairtype'];

        accwigtype = accused_list[row_id]['accwigtype'];
        acchairstrt = accused_list[row_id]['acchairstrt'];
        acchaircolor = accused_list[row_id]['acchaircolor'];
        acchaircut = accused_list[row_id]['acchaircut'];
        acchairstyle = accused_list[row_id]['acchairstyle'];
        acchairlength = accused_list[row_id]['acchairlength'];
        acchairdye = accused_list[row_id]['acchairdye'];
        acceyetype = accused_list[row_id]['acceyetype'];

        acceyeblind = accused_list[row_id]['acceyeblind'];
        acceyecolor = accused_list[row_id]['acceyecolor'];
        acceyespec = accused_list[row_id]['acceyespec'];
        acceyesquint = accused_list[row_id]['acceyesquint'];
        acceyebrow = accused_list[row_id]['acceyebrow'];
        acceyebrowshade = accused_list[row_id]['acceyebrowshade'];

        acceyeblink = accused_list[row_id]['acceyeblink'];
        acchabits = accused_list[row_id]['acchabits'];
        acchabitsdress = accused_list[row_id]['acchabitsdress'];
        accdialect = accused_list[row_id]['accdialect'];

        accoutertop = accused_list[row_id]['accoutertop'];
        accouterbottom = accused_list[row_id]['accouterbottom'];
        accinnertop = accused_list[row_id]['accinnertop'];
        accinnerbottom = accused_list[row_id]['accinnerbottom'];
        accseasonaltop = accused_list[row_id]['accseasonaltop'];
        accseasonalbottom = accused_list[row_id]['accseasonalbottom'];

        accplaceburnmark = accused_list[row_id]['accplaceburnmark'];
        accplaceleukoderma = accused_list[row_id]['accplaceleukoderma'];
        accplacemole = accused_list[row_id]['accplacemole'];
        accplacescar = accused_list[row_id]['accplacescar'];

        accplacetattoo = accused_list[row_id]['accplacetattoo'];
        accbloodgroup = accused_list[row_id]['accbloodgroup'];
        accfacetype = accused_list[row_id]['accfacetype'];
        acccheektype = accused_list[row_id]['acccheektype'];
        accforheadtype = accused_list[row_id]['accforheadtype'];
        accchintype = accused_list[row_id]['accchintype'];
        accmustachetype = accused_list[row_id]['accmustachetype'];
        accbearedtype = accused_list[row_id]['accbearedtype'];
        accnosetype = accused_list[row_id]['accnosetype'];
        acclipstype = accused_list[row_id]['acclipstype'];
        accpoxpitted = accused_list[row_id]['accpoxpitted'];

        if(accused_list[row_id]['from_db'] == "Yes"){
            from_db = "Yes";
            accused_srno = accused_list[row_id]['accused_srno']
        }else{
            from_db = "No";
        }
    }
    found = accused_list.some(el => el.accusedname == fir_accusedname && el.accaddress == fir_accaddress);
    if(found && from != 'update'){return 0;}
    accused_list[row_id] = {'accusedname': fir_accusedname, 'accaddress': fir_accaddress, 'acc_type': acc_type, 'acc_religion': acc_religion, 'acc_religion_val': acc_religion_val, 'acc_caste': acc_caste, 'acc_caste_val': acc_caste_val, 
    'acc_rel_type': acc_rel_type, 'acc_rel_type_val': acc_rel_type_val, 'acc_relname': acc_relname,
    'acc_juvenile': acc_juvenile, 'acc_medical':acc_medical, 'acc_gender': acc_gender, 'acc_gender_val': acc_gender_val,
    'acc_agetype': acc_agetype, 'acc_agetype_val': acc_agetype_val, 'acc_dob': acc_dob, 'acc_yob': acc_yob, 'acc_ageyear': acc_ageyear,
    'acc_agemonth': acc_agemonth, 'acc_agefrom': acc_agefrom, 'acc_ageto': acc_ageto, 'acc_country': acc_country, 'acc_country_val': acc_country_val,
    'acc_state': acc_state, 'acc_state_val': acc_state_val, 'acc_district': acc_district, 'acc_district_val': acc_district_val,
    'acc_ps': acc_ps, 'acc_ps_val': acc_ps_val, 'acc_adddr_same': acc_adddr_same, 'acc_country_same': acc_country_same,
    'acc_country_same_val': acc_country_same_val, 'acc_state_same': acc_state_same, 'acc_state_same_val': acc_state_same_val,
    'acc_district_same': acc_district_same, 'acc_district_same_val': acc_district_same_val, 'acc_ps_same': acc_ps_same,
    'acc_ps_same_val': acc_ps_same_val, 'acc_nationality': acc_nationality, 'acc_nationality_val': acc_nationality_val, 'acc_sameasper': acc_sameasper,
    'isarrestorsurrender': isarrestorsurrender, 'isfingerprinttaken': isfingerprinttaken, 'arrestdatetime': arrestdatetime, 'arrestpsinfodatetime': arrestpsinfodatetime, 'arrestgdnumber': arrestgdnumber, 'arrstate_val': arrstate, 'arrdistrict_val': arrdistrict_val, 'arrps': '', 'arrps_val': arrps_val,
    'isdangerous': isdangerous, 'isclothmalefemale': isclothmalefemale, 'isgenerallyarmed': isgenerallyarmed, 'isbailjumpprevious': isbailjumpprevious, 'isbailjumppreviousdetail': isbailjumppreviousdetail,
    'isknowncriminal': isknowncriminal, 'isknowncriminaldetails': isknowncriminaldetails, 'isrecidivist': isrecidivist, 'isjumpbail': isjumpbail, 'islikelycriminal': islikelycriminal, 'iswantedcriminal': iswantedcriminal, 'iswanteddetails': iswanteddetails,
    'accusedtypeofcourt_val': accusedtypeofcourt_val, 'accusedmegistrate': accusedmegistrate, 'accusedactiontaken_val': accusedactiontaken_val, 'accusedactiontakenarr_val': accusedactiontakenarr_val, 
    'arr_intimate_dt': arr_intimate_dt, 'arr_intimate_rel': arr_intimate_rel, 'arr_intimate_rel_name': arr_intimate_rel_name, 'arr_intimate_mode_cd': arr_intimate_mode_cd, 'income_group_cd': income_group_cd, 'living_status_cd': living_status_cd, 'edu_qual_cd': edu_qual_cd, 'arrested_by_pis_cd': arrested_by_pis_cd,
    'accheight': accheight, 'accheighttocm': accheighttocm,     
    'acctattoodesc': acctattoodesc, "accbuildtype": accbuildtype, "acccomplexion": acccomplexion, "accearmissing": accearmissing, "acceardeform": acceardeform, "acceardeaf": acceardeaf, 
    "accarmmissing": accarmmissing, "accfingermissing": accfingermissing, "acclegmissing": acclegmissing, "acchunchback": acchunchback, "acctoeextra": acctoeextra, "acctoemissing": acctoemissing, 
    "acclimping": acclimping, "accbowleg": accbowleg, "accknockknee": accknockknee, "accearlobs": accearlobs, "accgoitre": accgoitre, "accteethtype": accteethtype, "acchairtype": acchairtype, 
    "accwigtype": accwigtype, "acchairstrt": acchairstrt, "acchaircolor": acchaircolor, "acchaircut": acchaircut, "acchairstyle": acchairstyle, "acchairlength": acchairlength, "acchairdye": acchairdye, 
    "acchaircolor": acchaircolor, "acceyetype": acceyetype, "acceyeblind": acceyeblind, "acceyecolor": acceyecolor, "acceyespec": acceyespec, "acceyesquint": acceyesquint, "acceyebrow": acceyebrow, 
    "acceyebrowshade": acceyebrowshade, "acceyeblink": acceyeblink, "acchabits": acchabits, "acchabitsdress": acchabitsdress, "accdialect": accdialect,  
    "accoutertop": accoutertop, "accouterbottom": accouterbottom, "accinnertop": accinnertop, "accinnerbottom": accinnerbottom, "accseasonaltop": accseasonaltop, "accseasonalbottom": accseasonalbottom, 
    "accplaceburnmark": accplaceburnmark, "accplaceleukoderma": accplaceleukoderma, 
    "accplacemole": accplacemole, "accplacescar": accplacescar, "accplacetattoo": accplacetattoo, "accbloodgroup": accbloodgroup, "accfacetype": accfacetype, "acccheektype": acccheektype, "accforheadtype": accforheadtype, "accchintype": accchintype, 
    "accmustachetype": accmustachetype, "accbearedtype": accbearedtype, "accnosetype": accnosetype, "acclipstype": acclipstype, "accpoxpitted": accpoxpitted, "from_db": from_db, "soft_delete": soft_delete,"accused_srno":accused_srno, 'module': '2' }
    html = build_rows_acc(accused_list);
    console.log(accused_list)
    $("#accused_table").html(html);
    reset_accused();
}

// $('#acc_addRow').click(function(){

//     create_accused_list(accused_list.length);
// });


$('#acc_addRow').click(function(){

    if($("#accusedname").val() == "")
    {
        $('#accusedname').css('border-color', 'red');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = " Enter Accuesd Name";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#accgender").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', 'red');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "Select Gender";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#accagetype").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', 'red');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "Select Age Type";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_dob").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', 'red');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "Enter DOB";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_yob").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', 'red');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "Enter Year Of Birth";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_ageyear").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', 'red');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "Enter Age In Years";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_agemonth").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', 'red');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "Enter Age Month";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_agefrom").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', 'red');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "Enter Age Range";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_ageto").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', 'red');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "Enter Age Range";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_address").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', 'red');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "Enter Address";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_country").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', 'red');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "Select Country";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_state").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', 'red');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "Select State";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_district").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', 'red');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "Select District";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_ps").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', 'red');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "Select PS";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasaddress").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', 'red');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "Enter Address";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameascountry").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', 'red');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "Select Country";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasstate").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', 'red');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "Select State";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasdistrict").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', 'red');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "Select District";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasps").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', 'red');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "Select PS";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_nationality").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', 'red');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "Select Nationality";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else
{
    create_accused_list(accused_list.length);
    $('#addaccusedmodal').modal('hide');

        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

    var rowCount = $('#accused_table tbody tr').length;
    console.log(rowCount)
    if(rowCount > 0){
        $('#addaccused').attr('disabled','disabled');
    } else {
        $('#addaccused').removeAttr('disabled');
    }
       
}

});


// Deletes the row from a given data table
function delete_acc_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    if(accused_list[row_no]['from_db'] == 'Yes'){
        accused_list[row_no]['soft_delete'] = "Yes";
    }else{
        accused_list.splice(row_no, 1);
    }

    $("#accused_table").html(build_rows_acc(accused_list));

    var rowCount = $('#accused_table tbody tr').length;
    console.log(rowCount)
    if(rowCount > 0){
        $('#addaccused').attr('disabled','disabled');
    } else {
        $('#addaccused').removeAttr('disabled');
    }


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

    if($("#accusedname").val() == "")
    {
        $('#accusedname').css('border-color', 'red');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = " Enter Accuesd Name";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#accgender").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', 'red');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "Select Gender";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#accagetype").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', 'red');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "Select Age Type";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_dob").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', 'red');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "Enter DOB";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_yob").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', 'red');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "Enter Year Of Birth";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_ageyear").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', 'red');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "Enter Age In Years";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_agemonth").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', 'red');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "Enter Age Month";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_agefrom").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', 'red');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "Enter Age Range";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_ageto").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', 'red');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "Enter Age Range";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_address").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', 'red');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "Enter Address";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_country").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', 'red');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "Select Country";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_state").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', 'red');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "Select State";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_district").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', 'red');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "Select District";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_ps").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', 'red');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "Select PS";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasaddress").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', 'red');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "Enter Address";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameascountry").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', 'red');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "Select Country";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasstate").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', 'red');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "Select State";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasdistrict").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', 'red');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "Select District";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_sameasps").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', 'red');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "Select PS";
    document.getElementById("acc_nationality_error").innerHTML = "";

        $('#addaccusedmodal').modal('show');
        return 0;

}

    else if($("#acc_nationality").val() == "")
    {
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', 'red');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "Select Nationality";

        $('#addaccusedmodal').modal('show');
        return 0;

}

else
{
    create_accused_list(row_id, from='update');
        $('#addaccusedmodal').modal('hide');
        
        $('#accusedname').css('border-color', '');
        $('#accgender').css('border-color', '');
        $('#accagetype').css('border-color', '');
        $('#acc_dob').css('border-color', '');
        $('#acc_yob').css('border-color', '');
        $('#acc_ageyear').css('border-color', '');
        $('#acc_agemonth').css('border-color', '');
        $('#acc_agefrom').css('border-color', '');
        $('#acc_ageto').css('border-color', '');
        $('#acc_address').css('border-color', '');
        $('#acc_country').css('border-color', '');
        $('#acc_state').css('border-color', '');
        $('#acc_district').css('border-color', '');
        $('#acc_ps').css('border-color', '');
        $('#acc_sameasaddress').css('border-color', '');
        $('#acc_sameascountry').css('border-color', '');
        $('#acc_sameasstate').css('border-color', '');
        $('#acc_sameasdistrict').css('border-color', '');
        $('#acc_sameasps').css('border-color', '');
        $('#acc_nationality').css('border-color', '');

    document.getElementById("accusedname_error").innerHTML = "";
    document.getElementById("accgender_error").innerHTML = "";
    document.getElementById("accagetype_error").innerHTML = "";
    document.getElementById("acc_dob_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_ageyear_error").innerHTML = "";        
    document.getElementById("acc_agemonth_error").innerHTML = "";
    document.getElementById("acc_agefrom_error").innerHTML = "";
    document.getElementById("acc_ageto_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

}

}

function load_accused(row){
    show();
    $("#accusedname").val(row.accusedname.replace("<td>","").replace("</td>",""));
    $("#acc_address").val(row.accaddress.replace("<td>","").replace("</td>",""));
    $("#acc_dob").val(row.acc_dob.replace("<td>","").replace("</td>",""));
    $("#acc_yob").val(row.acc_yob.replace("<td>","").replace("</td>",""));
    $("#acc_ageyear").val(row.acc_ageyear.replace("<td>","").replace("</td>",""));
    $("#acc_agemonth").val(row.acc_agemonth.replace("<td>","").replace("</td>",""));
    $("#acc_agefrom").val(row.acc_agefrom.replace("<td>","").replace("</td>",""));
    $("#acc_ageto").val(row.acc_ageto.replace("<td>","").replace("</td>",""));

    $("#acc_reltype").val(row.acc_rel_type_val).trigger("change");
    $("#acc_relname").val(row.acc_relname.replace("<td>","").replace("</td>",""));

    $("#accreligion").val(row.acc_religion_val).trigger("change");
    $("#acccastecat").val(row.acc_caste_val.replace("<td>","").replace("</td>",""));

    $("#accgender").val(row.acc_gender_val).trigger("change");
    $("#accagetype").val(row.acc_agetype_val).trigger("change");
    $("#acc_country").val(row.acc_country_val).trigger("blur");
    $("#acc_state").val(row.acc_state_val).trigger("blur");
    load_district_ps("acc_district", "acc_ps", row.acc_state_val, row.acc_district_val, row.acc_ps_val, row.acc_sameasper, "acccomplsameasper1");
    $("#acc_nationality").val(row.acc_nationality_val).trigger("change");
    if(row.acc_type=="Known"){
        $('#accusedtypes1').click();
    }else{
        $('#accusedtype2').click();
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
        $('#acccomplsameasper2').click();
        $("#acc_sameasaddress").val(row.acc_adddr_same.replace("<td>","").replace("</td>",""));
        $("#acc_sameascountry").val(row.acc_country_same_val).trigger("change");
        $("#acc_sameasstate").val(row.acc_state_same_val).trigger("change");
        load_district_ps("acc_sameasdistrict", "acc_sameasps", row.acc_state_same_val, row.acc_district_same_val, row.acc_ps_same_val, row.acc_sameasper, "acccomplsameasper1");
    }
    $("#accagetype").change();
    hide();
}

function load_acc_info(){
    show();
    cur_acc_index -= 1;
    $("#accname").val(accused_list[cur_acc_index].accusedname.replace("<td>","").replace("</td>",''))
    $("#accheight").val(accused_list[cur_acc_index].accheight);
    $("#accheighttocm").val(accused_list[cur_acc_index].accheighttocm);

    $("#accheightfeetlower").val(heighttofeet(accused_list[cur_acc_index].accheight));
    $("#accheightinchlower").val(heighttoinches(accused_list[cur_acc_index].accheight));

    $("#accheightfeetupper").val(heighttofeet(accused_list[cur_acc_index].accheighttocm));
    $("#accheightinchupper").val(heighttoinches(accused_list[cur_acc_index].accheighttocm));

    $("#acctattoodesc").val(accused_list[cur_acc_index].acctattoodesc);
    $("#accbuildtype").val(accused_list[cur_acc_index].accbuildtype).trigger('change');
    $("#acccomplexion").val(accused_list[cur_acc_index].acccomplexion).trigger('change');
    $("#accearmissing").val(accused_list[cur_acc_index].accearmissing).trigger('change');
    $("#acceardeform").val(accused_list[cur_acc_index].acceardeform).trigger('change');
    $("#acceardeaf").val(accused_list[cur_acc_index].acceardeaf).trigger('change');
    $("#accarmmissing").val(accused_list[cur_acc_index].accarmmissing).trigger('change');
    $("#accfingermissing").val(accused_list[cur_acc_index].accfingermissing).trigger('change');
    $("#acclegmissing").val(accused_list[cur_acc_index].acclegmissing).trigger('change');
    $("#acchunchback").val(accused_list[cur_acc_index].acchunchback).trigger('change');
    $("#acctoeextra").val(accused_list[cur_acc_index].acctoeextra).trigger('change');
    $("#acctoemissing").val(accused_list[cur_acc_index].acctoemissing).trigger('change');
    $("#acclimping").val(accused_list[cur_acc_index].acclimping).trigger('change');
    $("#accbowleg").val(accused_list[cur_acc_index].accbowleg).trigger('change');
    $("#accknockknee").val(accused_list[cur_acc_index].accknockknee).trigger('change');
    $("#accearlobs").val(accused_list[cur_acc_index].accearlobs).trigger('change');
    $("#accgoitre").val(accused_list[cur_acc_index].accgoitre).trigger('change');
    $("#accteethtype").val(accused_list[cur_acc_index].accteethtype).trigger('change');
    $("#acchairtype").val(accused_list[cur_acc_index].acchairtype).trigger('change');
    $("#accwigtype").val(accused_list[cur_acc_index].accwigtype).trigger('change');
    $("#acchairstrt").val(accused_list[cur_acc_index].acchairstrt).trigger('change');
    $("#acchaircolor").val(accused_list[cur_acc_index].acchaircolor).trigger('change');
    $("#acchaircut").val(accused_list[cur_acc_index].acchaircut).trigger('change');
    $("#acchairstyle").val(accused_list[cur_acc_index].acchairstyle).trigger('change');
    $("#acchairlength").val(accused_list[cur_acc_index].acchairlength).trigger('change');
    $("#acchairdye").val(accused_list[cur_acc_index].acchairdye).trigger('change');
    $("#acchaircolor").val(accused_list[cur_acc_index].acchaircolor).trigger('change');
    $("#acceyetype").val(accused_list[cur_acc_index].acceyetype).trigger('change');
    $("#acceyeblind").val(accused_list[cur_acc_index].acceyeblind).trigger('change');
    $("#acceyecolor").val(accused_list[cur_acc_index].acceyecolor).trigger('change');
    $("#acceyespec").val(accused_list[cur_acc_index].acceyespec).trigger('change');
    $("#acceyesquint").val(accused_list[cur_acc_index].acceyesquint).trigger('change');
    $("#acceyebrow").val(accused_list[cur_acc_index].acceyebrow).trigger('change');
    $("#acceyebrowshade").val(accused_list[cur_acc_index].acceyebrowshade).trigger('change');
    $("#acceyeblink").val(accused_list[cur_acc_index].acceyeblink).trigger('change');
    $("#acchabits").val(accused_list[cur_acc_index].acchabits).trigger('change');
    $("#acchabitsdress").val(accused_list[cur_acc_index].acchabitsdress).trigger('change');
    $("#accdialect").val(accused_list[cur_acc_index].accdialect).trigger('change');

    $("#accoutertop").val(accused_list[cur_acc_index].accoutertop).trigger('change');
    $("#accouterbottom").val(accused_list[cur_acc_index].accouterbottom).trigger('change');
    $("#accinnertop").val(accused_list[cur_acc_index].accinnertop).trigger('change');
    $("#accinnerbottom").val(accused_list[cur_acc_index].accinnerbottom).trigger('change');
    $("#accseasonaltop").val(accused_list[cur_acc_index].accseasonaltop).trigger('change');
    $("#accseasonalbottom").val(accused_list[cur_acc_index].accseasonalbottom).trigger('change');


    $("#accplaceburnmark").val(accused_list[cur_acc_index].accplaceburnmark).trigger('change');
    $("#accplaceleukoderma").val(accused_list[cur_acc_index].accplaceleukoderma).trigger('change');
    $("#accplacemole").val(accused_list[cur_acc_index].accplacemole).trigger('change');
    $("#accplacescar").val(accused_list[cur_acc_index].accplacescar).trigger('change');
    $("#accplacetattoo").val(accused_list[cur_acc_index].accplacetattoo).trigger('change');
    $("#accbloodgroup").val(accused_list[cur_acc_index].accbloodgroup).trigger('change');
    $("#accfacetype").val(accused_list[cur_acc_index].accfacetype).trigger('change');
    $("#acccheektype").val(accused_list[cur_acc_index].acccheektype).trigger('change');
    $("#accforheadtype").val(accused_list[cur_acc_index].accforheadtype).trigger('change');
    $("#accchintype").val(accused_list[cur_acc_index].accchintype).trigger('change');
    $("#accmustachetype").val(accused_list[cur_acc_index].accmustachetype).trigger('change');
    $("#accbearedtype").val(accused_list[cur_acc_index].accbearedtype).trigger('change');
    $("#accnosetype").val(accused_list[cur_acc_index].accnosetype).trigger('change');
    $("#acclipstype").val(accused_list[cur_acc_index].acclipstype).trigger('change');
    $("#accpoxpitted").val(accused_list[cur_acc_index].accpoxpitted).trigger('change');
    cur_acc_index += 1; // Reset
    hide();
}


function update_acc_info(){

    show();
    cur_acc_index -= 1;
    accused_list[cur_acc_index].accheight=$("#accheight").val();
    accused_list[cur_acc_index].accheighttocm=$("#accheighttocm").val();
    accused_list[cur_acc_index].acctattoodesc=$("#acctattoodesc").val();
    accused_list[cur_acc_index].accbuildtype=$("#accbuildtype").find(":selected").val();
    accused_list[cur_acc_index].acceyespectype=$("#acceyespectype").find(":selected").val();
    accused_list[cur_acc_index].acccomplexion=$("#acccomplexion").find(":selected").val();
    accused_list[cur_acc_index].accearmissing=$("#accearmissing").find(":selected").val();
    accused_list[cur_acc_index].acceardeform=$("#acceardeform").find(":selected").val();
    accused_list[cur_acc_index].acceardeaf=$("#acceardeaf").find(":selected").val();
    accused_list[cur_acc_index].accarmmissing=$("#accarmmissing").find(":selected").val();
    accused_list[cur_acc_index].accfingermissing=$("#accfingermissing").find(":selected").val();
    accused_list[cur_acc_index].acclegmissing=$("#acclegmissing").find(":selected").val();
    accused_list[cur_acc_index].acchunchback=$("#acchunchback").find(":selected").val();
    accused_list[cur_acc_index].acctoeextra=$("#acctoeextra").find(":selected").val();
    accused_list[cur_acc_index].acctoemissing=$("#acctoemissing").find(":selected").val();
    accused_list[cur_acc_index].acclimping=$("#acclimping").find(":selected").val();
    accused_list[cur_acc_index].accbowleg=$("#accbowleg").find(":selected").val();
    accused_list[cur_acc_index].accknockknee=$("#accknockknee").find(":selected").val();
    accused_list[cur_acc_index].accearlobs=$("#accearlobs").find(":selected").val();
    accused_list[cur_acc_index].accgoitre=$("#accgoitre").find(":selected").val();
    accused_list[cur_acc_index].accteethtype=$("#accteethtype").find(":selected").val();
    accused_list[cur_acc_index].acchairtype=$("#acchairtype").find(":selected").val();
    accused_list[cur_acc_index].accwigtype=$("#accwigtype").find(":selected").val();
    accused_list[cur_acc_index].acchairstrt=$("#acchairstrt").find(":selected").val();
    accused_list[cur_acc_index].acchaircolor=$("#acchaircolor").find(":selected").val();
    accused_list[cur_acc_index].acchaircut=$("#acchaircut").find(":selected").val();
    accused_list[cur_acc_index].acchairstyle=$("#acchairstyle").find(":selected").val();
    accused_list[cur_acc_index].acchairlength=$("#acchairlength").find(":selected").val();
    accused_list[cur_acc_index].acchairdye=$("#acchairdye").find(":selected").val();
    accused_list[cur_acc_index].acchaircolor=$("#acchaircolor").find(":selected").val();
    accused_list[cur_acc_index].acceyetype=$("#acceyetype").find(":selected").val();
    accused_list[cur_acc_index].acceyeblind=$("#acceyeblind").find(":selected").val();
    accused_list[cur_acc_index].acceyecolor=$("#acceyecolor").find(":selected").val();
    accused_list[cur_acc_index].acceyespec=$("#acceyespec").find(":selected").val();
    accused_list[cur_acc_index].acceyesquint=$("#acceyesquint").find(":selected").val();
    accused_list[cur_acc_index].acceyebrow=$("#acceyebrow").find(":selected").val();
    accused_list[cur_acc_index].acceyebrowshade=$("#acceyebrowshade").find(":selected").val();
    accused_list[cur_acc_index].acceyeblink=$("#acceyeblink").find(":selected").val();
    accused_list[cur_acc_index].acchabits=$("#acchabits").find(":selected").val();
    accused_list[cur_acc_index].acchabitsdress=$("#acchabitsdress").find(":selected").val();
    accused_list[cur_acc_index].accdialect=$("#accdialect").find(":selected").val();

    accused_list[cur_acc_index].accoutertop=$("#accoutertop").find(":selected").val();
    accused_list[cur_acc_index].accouterbottom=$("#accouterbottom").find(":selected").val();
    accused_list[cur_acc_index].accinnertop=$("#accinnertop").find(":selected").val();
    accused_list[cur_acc_index].accinnerbottom=$("#accinnerbottom").find(":selected").val();
    accused_list[cur_acc_index].accseasonaltop=$("#accseasonaltop").find(":selected").val();
    accused_list[cur_acc_index].accseasonalbottom=$("#accseasonalbottom").find(":selected").val();

    accused_list[cur_acc_index].accplaceburnmark=$("#accplaceburnmark").find(":selected").val();
    accused_list[cur_acc_index].accplaceleukoderma=$("#accplaceleukoderma").find(":selected").val();
    accused_list[cur_acc_index].accplacemole=$("#accplacemole").find(":selected").val();
    accused_list[cur_acc_index].accplacescar=$("#accplacescar").find(":selected").val();
    accused_list[cur_acc_index].accplacetattoo=$("#accplacetattoo").find(":selected").val();
    accused_list[cur_acc_index].accbloodgroup=$("#accbloodgroup").find(":selected").val();
    accused_list[cur_acc_index].accfacetype=$("#accfacetype").find(":selected").val();
    accused_list[cur_acc_index].acccheektype=$("#acccheektype").find(":selected").val();
    accused_list[cur_acc_index].accforheadtype=$("#accforheadtype").find(":selected").val();
    accused_list[cur_acc_index].accchintype=$("#accchintype").find(":selected").val();
    accused_list[cur_acc_index].accmustachetype=$("#accmustachetype").find(":selected").val();
    accused_list[cur_acc_index].accbearedtype=$("#accbearedtype").find(":selected").val();
    accused_list[cur_acc_index].accnosetype=$("#accnosetype").find(":selected").val();
    accused_list[cur_acc_index].acclipstype=$("#acclipstype").find(":selected").val();
    accused_list[cur_acc_index].accpoxpitted=$("#accpoxpitted").find(":selected").val();
    cur_acc_index += 1; // Reset
    hide();

}


function load_arrest_details(){
    show();
    cur_acc_index -= 1;
    if(accused_list[cur_acc_index].isarrestorsurrender == "No"){
        $("#isarrestorsurrender2").click();
    }else{
        $("#isarrestorsurrender1").click();
    }
    $("#arrestdatetime").val(accused_list[cur_acc_index].arrestdatetime);
    $("#arrest_psinfo_datetime").val(accused_list[cur_acc_index].arrestpsinfodatetime);
    $("#arrest_intimate_datetime").val(accused_list[cur_acc_index].arr_intimate_dt);
    $("#arrestrelativename").val(accused_list[cur_acc_index].arr_intimate_rel_name);

    $("#arrinformedrelationtype").val(accused_list[cur_acc_index].arr_intimate_rel).trigger("change");
    $("#arrinformationmode").val(accused_list[cur_acc_index].arr_intimate_mode_cd).trigger("change");
    $("#arrincomegroup").val(accused_list[cur_acc_index].income_group_cd).trigger("change");

    $("#arrlivingstatus").val(accused_list[cur_acc_index].living_status_cd).trigger("change");

    $("#arreducational_qual").val(accused_list[cur_acc_index].edu_qual_cd).trigger("change");
    $("#arr_arrestedby").val(accused_list[cur_acc_index].arrested_by_pis_cd).trigger("change");

    $("#arrestgdnumber").val(accused_list[cur_acc_index].arrestgdnumber);
    $("#arrstate").val(accused_list[cur_acc_index].arrstate_val).trigger("change");

    load_district_ps("arrdistrict", "arrps", accused_list[cur_acc_index].arrstate_val, accused_list[cur_acc_index].arrdistrict_val, accused_list[cur_acc_index].arrps_val, '', "");

    $("#accusedtypeofcourt").val(accused_list[cur_acc_index].accusedtypeofcourt_val).trigger("change");
    $("#accusedmegistrate").val(accused_list[cur_acc_index].accusedmegistrate);
    $("#accusedactiontaken").val(accused_list[cur_acc_index].accusedactiontaken_val).trigger("change");
    $("#accusedactiontakenarr").val(accused_list[cur_acc_index].accusedactiontakenarr_val).trigger("change");

    if(accused_list[cur_acc_index].isfingerprinttaken == "Yes"){
        $("#isfingerprinttaken1").click();
    }else{
        $("#isfingerprinttaken2").click();
    }

    if(accused_list[cur_acc_index].isdangerous == "Yes"){
        $("#isdangerous1").click();
    }else{
        $("#isdangerous2").click();
    }

    if(accused_list[cur_acc_index].isclothmalefemale == "M"){
        $("#isclothmalefemale1").click();
    }else{
        $("#isclothmalefemale2").click();
    }

    if(accused_list[cur_acc_index].isgenerallyarmed == "Yes"){
        $("#isgenerallyarmed1").click();
    }else{
        $("#isgenerallyarmed2").click();
    }

    if(accused_list[cur_acc_index].isknowncriminal == "Yes"){
        $("#isknowncriminal1").click();
    }else{
        $("#isknowncriminal2").click();
    }
    $("#isknowncriminaldetails").val(accused_list[cur_acc_index].isknowncriminaldetails);

    if(accused_list[cur_acc_index].isjumpbail == "Yes"){
        $("#isjumpbail1").click();
    }else{
        $("#isjumpbail2").click();
    }

    if(accused_list[cur_acc_index].iswantedcriminal == "Yes"){
        $("#iswantedcriminal1").click();
    }else{
        $("#iswantedcriminal2").click();
    }

    $("#iswanteddetails").val(accused_list[cur_acc_index].iswanteddetails);

    if(accused_list[cur_acc_index].isbailjumpprevious == "Yes"){
        $("#isbailjumpprevious1").click();
    }else{
        $("#isbailjumpprevious2").click();
    }

    $("#isbailjumppreviousdetail").val(accused_list[cur_acc_index].isbailjumppreviousdetail);

    if(accused_list[cur_acc_index].operateswithaccomp == "Yes"){
        $("#operateswithaccomp1").click();
    }else{
        $("#operateswithaccomp2").click();
    }

    if(accused_list[cur_acc_index].isrecidivist == "Yes"){
        $("#isrecidivist1").click();
    }else{
        $("#isrecidivist2").click();
    }

    if(accused_list[cur_acc_index].islikelycriminal == "Yes"){
        $("#islikelycriminal1").click();
    }else{
        $("#islikelycriminal2").click();
    }

    $("#accname").val(accused_list[cur_acc_index].accusedname.replace("<td>","").replace("</td>",''))
    $("#accheight").val(accused_list[cur_acc_index].accheight);
    $("#accheighttocm").val(accused_list[cur_acc_index].accheighttocm);

    $("#accheightfeetlower").val(heighttofeet(accused_list[cur_acc_index].accheight));
    $("#accheightinchlower").val(heighttoinches(accused_list[cur_acc_index].accheight));

    $("#accheightfeetupper").val(heighttofeet(accused_list[cur_acc_index].accheighttocm));
    $("#accheightinchupper").val(heighttoinches(accused_list[cur_acc_index].accheighttocm));


    $("#acctattoodesc").val(accused_list[cur_acc_index].acctattoodesc);
    $("#accbuildtype").val(accused_list[cur_acc_index].accbuildtype).trigger('change');
    $("#acccomplexion").val(accused_list[cur_acc_index].acccomplexion).trigger('change');
    $("#accearmissing").val(accused_list[cur_acc_index].accearmissing).trigger('change');
    $("#acceardeform").val(accused_list[cur_acc_index].acceardeform).trigger('change');
    $("#acceardeaf").val(accused_list[cur_acc_index].acceardeaf).trigger('change');
    $("#accarmmissing").val(accused_list[cur_acc_index].accarmmissing).trigger('change');
    $("#accfingermissing").val(accused_list[cur_acc_index].accfingermissing).trigger('change');
    $("#acclegmissing").val(accused_list[cur_acc_index].acclegmissing).trigger('change');
    $("#acchunchback").val(accused_list[cur_acc_index].acchunchback).trigger('change');
    $("#acctoeextra").val(accused_list[cur_acc_index].acctoeextra).trigger('change');
    $("#acctoemissing").val(accused_list[cur_acc_index].acctoemissing).trigger('change');
    $("#acclimping").val(accused_list[cur_acc_index].acclimping).trigger('change');
    $("#accbowleg").val(accused_list[cur_acc_index].accbowleg).trigger('change');
    $("#accknockknee").val(accused_list[cur_acc_index].accknockknee).trigger('change');
    $("#accearlobs").val(accused_list[cur_acc_index].accearlobs).trigger('change');
    $("#accgoitre").val(accused_list[cur_acc_index].accgoitre).trigger('change');
    $("#accteethtype").val(accused_list[cur_acc_index].accteethtype).trigger('change');
    $("#acchairtype").val(accused_list[cur_acc_index].acchairtype).trigger('change');
    $("#accwigtype").val(accused_list[cur_acc_index].accwigtype).trigger('change');
    $("#acchairstrt").val(accused_list[cur_acc_index].acchairstrt).trigger('change');
    $("#acchaircolor").val(accused_list[cur_acc_index].acchaircolor).trigger('change');
    $("#acchaircut").val(accused_list[cur_acc_index].acchaircut).trigger('change');
    $("#acchairstyle").val(accused_list[cur_acc_index].acchairstyle).trigger('change');
    $("#acchairlength").val(accused_list[cur_acc_index].acchairlength).trigger('change');
    $("#acchairdye").val(accused_list[cur_acc_index].acchairdye).trigger('change');
    $("#acchaircolor").val(accused_list[cur_acc_index].acchaircolor).trigger('change');
    $("#acceyetype").val(accused_list[cur_acc_index].acceyetype).trigger('change');
    $("#acceyeblind").val(accused_list[cur_acc_index].acceyeblind).trigger('change');
    $("#acceyecolor").val(accused_list[cur_acc_index].acceyecolor).trigger('change');
    $("#acceyespec").val(accused_list[cur_acc_index].acceyespec).trigger('change');
    $("#acceyesquint").val(accused_list[cur_acc_index].acceyesquint).trigger('change');
    $("#acceyebrow").val(accused_list[cur_acc_index].acceyebrow).trigger('change');
    $("#acceyebrowshade").val(accused_list[cur_acc_index].acceyebrowshade).trigger('change');
    $("#acceyeblink").val(accused_list[cur_acc_index].acceyeblink).trigger('change');
    $("#acchabits").val(accused_list[cur_acc_index].acchabits).trigger('change');
    $("#acchabitsdress").val(accused_list[cur_acc_index].acchabitsdress).trigger('change');
    $("#accdialect").val(accused_list[cur_acc_index].accdialect).trigger('change');

    $("#accoutertop").val(accused_list[cur_acc_index].accoutertop).trigger('change');
    $("#accouterbottom").val(accused_list[cur_acc_index].accouterbottom).trigger('change');
    $("#accinnertop").val(accused_list[cur_acc_index].accinnertop).trigger('change');
    $("#accinnerbottom").val(accused_list[cur_acc_index].accinnerbottom).trigger('change');
    $("#accseasonaltop").val(accused_list[cur_acc_index].accseasonaltop).trigger('change');
    $("#accseasonalbottom").val(accused_list[cur_acc_index].accseasonalbottom).trigger('change');

    $("#accplaceburnmark").val(accused_list[cur_acc_index].accplaceburnmark).trigger('change');
    $("#accplaceleukoderma").val(accused_list[cur_acc_index].accplaceleukoderma).trigger('change');
    $("#accplacemole").val(accused_list[cur_acc_index].accplacemole).trigger('change');
    $("#accplacescar").val(accused_list[cur_acc_index].accplacescar).trigger('change');
    $("#accplacetattoo").val(accused_list[cur_acc_index].accplacetattoo).trigger('change');
    $("#accbloodgroup").val(accused_list[cur_acc_index].accbloodgroup).trigger('change');
    $("#accfacetype").val(accused_list[cur_acc_index].accfacetype).trigger('change');
    $("#acccheektype").val(accused_list[cur_acc_index].acccheektype).trigger('change');
    $("#accforheadtype").val(accused_list[cur_acc_index].accforheadtype).trigger('change');
    $("#accchintype").val(accused_list[cur_acc_index].accchintype).trigger('change');
    $("#accmustachetype").val(accused_list[cur_acc_index].accmustachetype).trigger('change');
    $("#accbearedtype").val(accused_list[cur_acc_index].accbearedtype).trigger('change');
    $("#accnosetype").val(accused_list[cur_acc_index].accnosetype).trigger('change');
    $("#acclipstype").val(accused_list[cur_acc_index].acclipstype).trigger('change');
    $("#accpoxpitted").val(accused_list[cur_acc_index].accpoxpitted).trigger('change');
    cur_acc_index += 1; // Reset
    hide();
}

// Add Arrest Details
function add_arrest_details(){

    if($("#arrestdatetime").val() == "")
{
    document.getElementById("arrestdatetime").focus();

    $('#arrestdatetime').css('border-color', 'red');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}

//     else if($("#arrest_psinfo_datetime").val() == "")
// {
//     document.getElementById("arrest_psinfo_datetime").focus();

//     $('#arrestdatetime').css('border-color', '');
//     $('#arrest_psinfo_datetime').css('border-color', 'red');
//     $('#arrest_intimate_datetime').css('border-color', '');
//     $('#arrestgdnumber').css('border-color', '');
//     $('#arrstate').css('border-color', '');
//     $('#arrdistrict').css('border-color', '');
//     $('#arrps').css('border-color', '');
//     $('#accusedtypeofcourt').css('border-color', '');
//     $('#accusedmegistrate').css('border-color', '');
//     $('#accusedactiontaken').css('border-color', '');
//     $('#accusedactiontakenarr').css('border-color', '');

//     $('#inlineForm').modal('show');
// }

//     else if($("#arrest_intimate_datetime").val() == "")
// {
//     document.getElementById("arrest_intimate_datetime").focus();

//     $('#arrestdatetime').css('border-color', '');
//     $('#arrest_psinfo_datetime').css('border-color', '');
//     $('#arrest_intimate_datetime').css('border-color', 'red');
//     $('#arrestgdnumber').css('border-color', '');
//     $('#arrstate').css('border-color', '');
//     $('#arrdistrict').css('border-color', '');
//     $('#arrps').css('border-color', '');
//     $('#accusedtypeofcourt').css('border-color', '');
//     $('#accusedmegistrate').css('border-color', '');
//     $('#accusedactiontaken').css('border-color', '');
//     $('#accusedactiontakenarr').css('border-color', '');

//     $('#inlineForm').modal('show');
// }

    else if($("#arrestgdnumber").val() == "")
{
    document.getElementById("arrestgdnumber").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', 'red');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}
 
    else if($("#arrstate").find(":selected").val() == "" && $("#arrstate").prop('disabled') == false)
{
    document.getElementById("arrstate").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', 'red');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}

    else if($("#arrdistrict").find(":selected").val() == "" && $("#arrdistrict").prop('disabled') == false )
{
    document.getElementById("arrdistrict").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', 'red');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}

    else if($("#arrps").find(":selected").val() == "" && $("#arrps").prop('disabled') == false)
{
    document.getElementById("arrps").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', 'red');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}

    else if($("#accusedtypeofcourt").find(":selected").val() == "" && $("#accusedtypeofcourt").prop('disabled') == false)
{
    document.getElementById("accusedtypeofcourt").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', 'red');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}

    else if($("#accusedmegistrate").val() == "" && $("#accusedmegistrate").prop('disabled') == false)
{
    document.getElementById("accusedmegistrate").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', 'red');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}
    else if($("#accusedactiontaken").find(":selected").val() == "None" && $("#accusedactiontaken").prop('disabled') == false)
{
    document.getElementById("accusedactiontaken").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', 'red');
    $('#accusedactiontakenarr').css('border-color', '');

    $('#inlineForm').modal('show');
}

    else if($("#accusedactiontakenarr").find(":selected").val() == "None" && $("#accusedactiontakenarr").prop('disabled') == false)
{
    document.getElementById("accusedactiontakenarr").focus();

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');
    $('#accusedactiontakenarr').css('border-color', 'red');

    $('#inlineForm').modal('show');
}


    else
{

    $('#arrestdatetime').css('border-color', '');
    $('#arrest_psinfo_datetime').css('border-color', '');
    $('#arrest_intimate_datetime').css('border-color', '');
    $('#arrestgdnumber').css('border-color', '');
    $('#arrstate').css('border-color', '');
    $('#arrdistrict').css('border-color', '');
    $('#arrps').css('border-color', '');
    $('#accusedtypeofcourt').css('border-color', '');
    $('#accusedmegistrate').css('border-color', '');
    $('#accusedactiontaken').css('border-color', '');

    show();
    cur_acc_index -= 1;
    isarrestorsurrender = $('input[name="isarrestorsurrender"]:checked').val();
    arrestdatetime = $("#arrestdatetime").val();
    arrestpsinfodatetime = $("#arrest_psinfo_datetime").val();
    arr_intimate_dt = $("#arrest_intimate_datetime").val();
    arr_intimate_rel_name = $("#arrestrelativename").val();

    arrestgdnumber = $("#arrestgdnumber").val();
    arrstate_val = $("#arrstate").find(":selected").val();
    arrdistrict_val = $("#arrdistrict").find(":selected").val();
    arrps_val = $("#arrps").find(":selected").val();
    accusedtypeofcourt_val = $("#accusedtypeofcourt").find(":selected").val();
    accusedmegistrate = $("#accusedmegistrate").val();
    accusedactiontaken_val = $("#accusedactiontaken").find(":selected").val();
    accusedactiontakenarr_val = $("#accusedactiontakenarr").find(":selected").val();

    arr_intimate_rel = $("#arrinformedrelationtype").find(":selected").val();
    arr_intimate_mode_cd = $("#arrinformationmode").find(":selected").val();
    income_group_cd = $("#arrincomegroup").find(":selected").val();
    living_status_cd = $("#arrlivingstatus").find(":selected").val();

    edu_qual_cd = $("#arreducational_qual").find(":selected").val();
    arrested_by_pis_cd = $("#arr_arrestedby").find(":selected").val();

    accbuildtype = $("#arrstate").find(":selected").val();

    accused_list[cur_acc_index].isarrestorsurrender = isarrestorsurrender;
    accused_list[cur_acc_index].arrestdatetime = arrestdatetime;
    accused_list[cur_acc_index].arrestpsinfodatetime = arrestpsinfodatetime;
    accused_list[cur_acc_index].arr_intimate_dt = arr_intimate_dt;
    accused_list[cur_acc_index].arr_intimate_rel_name = arr_intimate_rel_name;
    accused_list[cur_acc_index].arr_intimate_rel = arr_intimate_rel;
    accused_list[cur_acc_index].arr_intimate_mode_cd = arr_intimate_mode_cd;
    accused_list[cur_acc_index].income_group_cd = income_group_cd;
    accused_list[cur_acc_index].living_status_cd = living_status_cd;
    accused_list[cur_acc_index].edu_qual_cd = edu_qual_cd;
    accused_list[cur_acc_index].arrested_by_pis_cd = arrested_by_pis_cd;

    accused_list[cur_acc_index].arrestgdnumber = arrestgdnumber;
    accused_list[cur_acc_index].arrstate_val = arrstate_val;
    accused_list[cur_acc_index].arrdistrict_val = arrdistrict_val;
    accused_list[cur_acc_index].arrps_val = arrps_val;
    accused_list[cur_acc_index].accusedtypeofcourt_val = accusedtypeofcourt_val;
    accused_list[cur_acc_index].accusedmegistrate = accusedmegistrate;
    accused_list[cur_acc_index].accusedactiontaken_val = accusedactiontaken_val;
    accused_list[cur_acc_index].accusedactiontakenarr_val = accusedactiontakenarr_val;
    
    accused_list[cur_acc_index].isfingerprinttaken = $('input[name="isfingerprinttaken"]:checked').val();

    accused_list[cur_acc_index].isdangerous = $('input[name="isdangerous"]:checked').val();
    accused_list[cur_acc_index].isclothmalefemale = $('input[name="isclothmalefemale"]:checked').val();

    accused_list[cur_acc_index].isgenerallyarmed = $('input[name="isgenerallyarmed"]:checked').val();
    accused_list[cur_acc_index].isknowncriminal = $('input[name="isknowncriminal"]:checked').val();
    accused_list[cur_acc_index].isknowncriminaldetails=$("#isknowncriminaldetails").val();
    accused_list[cur_acc_index].isjumpbail = $('input[name="isjumpbail"]:checked').val();
    accused_list[cur_acc_index].iswantedcriminal = $('input[name="iswantedcriminal"]:checked').val();
    accused_list[cur_acc_index].iswanteddetails=$("#iswanteddetails").val();
    accused_list[cur_acc_index].isbailjumpprevious = $('input[name="isbailjumpprevious"]:checked').val();
    accused_list[cur_acc_index].isbailjumppreviousdetail=$("#isbailjumppreviousdetail").val();
    accused_list[cur_acc_index].operateswithaccomp = $('input[name="operateswithaccomp"]:checked').val();
    accused_list[cur_acc_index].isrecidivist = $('input[name="isrecidivist"]:checked').val();
    accused_list[cur_acc_index].islikelycriminal = $('input[name="islikelycriminal"]:checked').val();

    accused_list[cur_acc_index].accheight=$("#accheight").val();
    accused_list[cur_acc_index].accheighttocm=$("#accheighttocm").val();
    accused_list[cur_acc_index].acctattoodesc=$("#acctattoodesc").val();
    accused_list[cur_acc_index].accbuildtype=$("#accbuildtype").find(":selected").val();
    accused_list[cur_acc_index].acceyespectype=$("#acceyespectype").find(":selected").val();
    accused_list[cur_acc_index].acccomplexion=$("#acccomplexion").find(":selected").val();
    accused_list[cur_acc_index].accearmissing=$("#accearmissing").find(":selected").val();
    accused_list[cur_acc_index].acceardeform=$("#acceardeform").find(":selected").val();
    accused_list[cur_acc_index].acceardeaf=$("#acceardeaf").find(":selected").val();
    accused_list[cur_acc_index].accarmmissing=$("#accarmmissing").find(":selected").val();
    accused_list[cur_acc_index].accfingermissing=$("#accfingermissing").find(":selected").val();
    accused_list[cur_acc_index].acclegmissing=$("#acclegmissing").find(":selected").val();
    accused_list[cur_acc_index].acchunchback=$("#acchunchback").find(":selected").val();
    accused_list[cur_acc_index].acctoeextra=$("#acctoeextra").find(":selected").val();
    accused_list[cur_acc_index].acctoemissing=$("#acctoemissing").find(":selected").val();
    accused_list[cur_acc_index].acclimping=$("#acclimping").find(":selected").val();
    accused_list[cur_acc_index].accbowleg=$("#accbowleg").find(":selected").val();
    accused_list[cur_acc_index].accknockknee=$("#accknockknee").find(":selected").val();
    accused_list[cur_acc_index].accearlobs=$("#accearlobs").find(":selected").val();
    accused_list[cur_acc_index].accgoitre=$("#accgoitre").find(":selected").val();
    accused_list[cur_acc_index].accteethtype=$("#accteethtype").find(":selected").val();
    accused_list[cur_acc_index].acchairtype=$("#acchairtype").find(":selected").val();
    accused_list[cur_acc_index].accwigtype=$("#accwigtype").find(":selected").val();
    accused_list[cur_acc_index].acchairstrt=$("#acchairstrt").find(":selected").val();
    accused_list[cur_acc_index].acchaircolor=$("#acchaircolor").find(":selected").val();
    accused_list[cur_acc_index].acchaircut=$("#acchaircut").find(":selected").val();
    accused_list[cur_acc_index].acchairstyle=$("#acchairstyle").find(":selected").val();
    accused_list[cur_acc_index].acchairlength=$("#acchairlength").find(":selected").val();
    accused_list[cur_acc_index].acchairdye=$("#acchairdye").find(":selected").val();
    accused_list[cur_acc_index].acchaircolor=$("#acchaircolor").find(":selected").val();
    accused_list[cur_acc_index].acceyetype=$("#acceyetype").find(":selected").val();
    accused_list[cur_acc_index].acceyeblind=$("#acceyeblind").find(":selected").val();
    accused_list[cur_acc_index].acceyecolor=$("#acceyecolor").find(":selected").val();
    accused_list[cur_acc_index].acceyespec=$("#acceyespec").find(":selected").val();
    accused_list[cur_acc_index].acceyesquint=$("#acceyesquint").find(":selected").val();
    accused_list[cur_acc_index].acceyebrow=$("#acceyebrow").find(":selected").val();
    accused_list[cur_acc_index].acceyebrowshade=$("#acceyebrowshade").find(":selected").val();
    accused_list[cur_acc_index].acceyeblink=$("#acceyeblink").find(":selected").val();
    accused_list[cur_acc_index].acchabits=$("#acchabits").find(":selected").val();
    accused_list[cur_acc_index].acchabitsdress=$("#acchabitsdress").find(":selected").val();
    accused_list[cur_acc_index].accdialect=$("#accdialect").find(":selected").val();

    accused_list[cur_acc_index].accoutertop=$("#accoutertop").find(":selected").val();
    accused_list[cur_acc_index].accouterbottom=$("#accouterbottom").find(":selected").val();
    accused_list[cur_acc_index].accinnertop=$("#accinnertop").find(":selected").val();
    accused_list[cur_acc_index].accinnerbottom=$("#accinnerbottom").find(":selected").val();
    accused_list[cur_acc_index].accseasonaltop=$("#accseasonaltop").find(":selected").val();
    accused_list[cur_acc_index].accseasonalbottom=$("#accseasonalbottom").find(":selected").val();

    accused_list[cur_acc_index].accplaceburnmark=$("#accplaceburnmark").find(":selected").val();
    accused_list[cur_acc_index].accplaceleukoderma=$("#accplaceleukoderma").find(":selected").val();
    accused_list[cur_acc_index].accplacemole=$("#accplacemole").find(":selected").val();
    accused_list[cur_acc_index].accplacescar=$("#accplacescar").find(":selected").val();
    accused_list[cur_acc_index].accplacetattoo=$("#accplacetattoo").find(":selected").val();
    accused_list[cur_acc_index].accbloodgroup=$("#accbloodgroup").find(":selected").val();
    accused_list[cur_acc_index].accfacetype=$("#accfacetype").find(":selected").val();
    accused_list[cur_acc_index].acccheektype=$("#acccheektype").find(":selected").val();
    accused_list[cur_acc_index].accforheadtype=$("#accforheadtype").find(":selected").val();
    accused_list[cur_acc_index].accchintype=$("#accchintype").find(":selected").val();
    accused_list[cur_acc_index].accmustachetype=$("#accmustachetype").find(":selected").val();
    accused_list[cur_acc_index].accbearedtype=$("#accbearedtype").find(":selected").val();
    accused_list[cur_acc_index].accnosetype=$("#accnosetype").find(":selected").val();
    accused_list[cur_acc_index].acclipstype=$("#acclipstype").find(":selected").val();
    accused_list[cur_acc_index].accpoxpitted=$("#accpoxpitted").find(":selected").val();

    $("#accused_table").html(build_rows_acc(accused_list));
    cur_acc_index += 1; // Reset
    reset_arrest_details();
    hide();
    $('#inlineForm').modal('hide');    
}
}

// Witness Add & Delete
// Loads rows in to table
function build_rows_witness(witness_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Witness Name</th> <th>Relative Name</th> <th>PS</th><th>Edit</th> <th>Delete</th></thead>";
    i = 1;
    witness_list.forEach(function(row, index){
        index += 1;
        if(row['soft_delete'] == "Yes"){
            return true;
        }
        edit_button = "<td><a class='delete' title='Edit' onclick='edit_witness_row(\"witness_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_witness_row(\"witness_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+i+'</td>'
        html = '<tr id="'+index+'">'+no+row.witness_name+row.witness_relativename+row.witness_ps+edit_button+delete_button+'</tr>';
        rows.push(html)
        i += 1;
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_witness_list(row_id, from='insert'){
    witness_name = "<td>"+$("#witnessaname").val()+"</td>";
    witness_address = "<td>"+$("#compladdress").val()+"</td>";
    witness_evidence_val = $("#witnessevidencetender").find(":selected").val();

    witness_rel_type = $("#witness_reltype").find(":selected").text();
    witness_rel_type_val = $("#witness_reltype").find(":selected").val();
    witness_relativename = "<td>"+$("#witness_relname").val()+"</td>";

    witness_country_val = $("#witness_country").find(":selected").val();
    witness_nationality_val = $("#witness_nationality").find(":selected").val();
    witness_state_val = $("#witness_state").find(":selected").val();
    witness_district_val = $("#witness_district").find(":selected").val();
    witness_ps_val = $("#witness_ps").find(":selected").val();
    witness_ps = "<td>"+$("#witness_ps").find(":selected").text()+"</td>";
    witness_statement = $('#witnessstatement').val();
    witness_sameaddress = $("#witness_sameaddress").val();
    witness_samecountry_val = $("#witness_samecountry").find(":selected").val();
    witness_samestate_val = $("#witness_samestate").find(":selected").val();
    witness_samedistrict_val = $("#witness_samedistrict").find(":selected").val();
    witness_sameps_val = $("#witness_sameps").find(":selected").val();

    same_as_per = $('input[name="witnesssameasper"]:checked').val();

    witness_agetype = $("#witnes_agetype").find(":selected").text();
    witness_agetype_val = $("#witnes_agetype").find(":selected").val();
    witness_dob = $('#witnes_dob').val();
    witness_yob = $('#witnes_yob').val();
    witness_ageyear = $('#witnes_ageyear').val();
    witness_agemonth = $('#witnes_agemonth').val();
    witness_agefrom = $('#witnes_agefrom').val();
    witness_ageto = $('#witnes_ageto').val();

    found = witness_list.some(el => el.witness_name == witness_name && el.witness_address == witness_address)
    if(found && from != 'update'){return 0;}
    from_db = "No";
    witness_srno = "";
    soft_delete = "No";
    person_code = "";
    if(from == 'update'){
        if(witness_list[row_id]['from_db'] == "Yes"){
            from_db = "Yes";
            witness_srno = witness_list[row_id]['witness_srno']
            person_code = witness_list[row_id]['person_code']
        }else{
            from_db = "No";
        }
    }
    witness_list[row_id] = {'person_code': person_code,'witness_name': witness_name, 'witness_address': witness_address, 'witness_evidence_val':witness_evidence_val, 'witness_country_val': witness_country_val, 
    'witness_state_val': witness_state_val, 'witness_nationality_val': witness_nationality_val, 
    'witness_rel_type': witness_rel_type, 'witness_rel_type_val': witness_rel_type_val, 'witness_relativename': witness_relativename, 
    'witness_statement': witness_statement, 'witness_district_val': witness_district_val, 'witness_ps_val': witness_ps_val, 'witness_sameaddress': witness_sameaddress,'witness_ps': witness_ps,
    'witness_samecountry_val': witness_samecountry_val, 'witness_samestate_val': witness_samestate_val, 'witness_sameps_val': witness_sameps_val,  'same_as_per': same_as_per,
    'witness_samedistrict_val': witness_samedistrict_val, 'witness_agetype': witness_agetype, 'witness_dob': witness_dob, 'witness_yob': witness_yob, 'witness_ageyear': witness_ageyear,
    'witness_agemonth': witness_agemonth, 'witness_agefrom': witness_agefrom, 'witness_ageto': witness_ageto, 'witness_agetype_val': witness_agetype_val, 'from_db': from_db,
    'witness_srno': witness_srno, 'soft_delete': soft_delete};
    html = build_rows_witness(witness_list);
    $("#witness_table").html(html);
    reset_witness();
}

$('#add_witness').click(function(){
    if($("#witnessaname").val() == "")
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "Enter Witness Name";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnessaname").focus();
        return 0;
    }
    else if($("#witnessevidencetender").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "Select Evidence Type";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnessevidencetender").focus();
        return 0;
    }

    else if($("#witnessstatement").val() == "")
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "Enter Witness Statement";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnessevidencetender").focus();
        return 0;
    }

    else if($("#compladdress").val() == "")
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "Enter Witness Address";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("compladdress").focus();
        return 0;
    }

    else if($("#witness_country").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "Select Country";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_country").focus();
        return 0;
    }


    else if($("#witness_state").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "Select State";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_state").focus();
        return 0;
    }


    else if($("#witness_district").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "Select District";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_district").focus();
        return 0;
    }


    else if($("#witness_ps").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "Select PS";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_ps").focus();
        return 0;
    }


    else if($("#witnes_agetype").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "Select PS";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnes_agetype").focus();
        return 0;
    }

    else
    {
    create_witness_list(witness_list.length);
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";
    }
});

// Deletes the row from a given data table
function delete_witness_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    if(witness_list[row_no]['from_db'] == 'Yes'){
        witness_list[row_no]['soft_delete'] = "Yes";
    }else{
        witness_list.splice(row_no, 1);
    }
    $("#witness_table").html(build_rows_witness(witness_list));
}

// Edit the row from a given data table
function edit_witness_row(data_table_id, row_no){
    $("#add_witness").parent().attr("style", "display:none");
    $("#update_witness").parent().attr("style", "display:block");
    $("#cancel_witness").parent().attr("style", "display:block");
    row_no -= 1;
    load_witness(witness_list[row_no]);
    $('#update_witness').attr("onclick", "update_witness_row("+row_no+");");
}

// Update row of Witness
function update_witness_row(row_id){

    if($("#witnessaname").val() == "")
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "Enter Witness Name";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnessaname").focus();
        return 0;
    }
    else if($("#witnessevidencetender").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "Select Evidence Type";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnessevidencetender").focus();
        return 0;
    }

    else if($("#witnessstatement").val() == "")
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "Enter Witness Statement";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnessevidencetender").focus();
        return 0;
    }

    else if($("#compladdress").val() == "")
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "Enter Witness Address";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("compladdress").focus();
        return 0;
    }

    else if($("#witness_country").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "Select Country";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_country").focus();
        return 0;
    }


    else if($("#witness_state").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "Select State";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_state").focus();
        return 0;
    }


    else if($("#witness_district").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "Select District";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_district").focus();
        return 0;
    }


    else if($("#witness_ps").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "Select PS";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witness_ps").focus();
        return 0;
    }


    else if($("#witnes_agetype").find(":selected").val() == "" )
    {
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "Select PS";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";

        document.getElementById("witnes_agetype").focus();
        return 0;
    }

    else
    {
    create_witness_list(row_id, from='update');
        document.getElementById("arr_witnessaname_error").innerHTML = "";
        document.getElementById("arr_witnessevidencetender_error").innerHTML = "";
        document.getElementById("arr_witnessstatement_error").innerHTML = "";
        document.getElementById("arr_compladdress_error").innerHTML = "";
        document.getElementById("arr_witness_country_error").innerHTML = "";

        document.getElementById("arr_witness_state_error").innerHTML = "";
        document.getElementById("arr_witness_district_error").innerHTML = "";
        document.getElementById("arr_witness_ps_error").innerHTML = "";
        document.getElementById("arr_witness_sameaddress_error").innerHTML = "";
        document.getElementById("arr_witness_samecountry_error").innerHTML = "";
        document.getElementById("arr_witness_samestate_error").innerHTML = "";
        document.getElementById("arr_witness_samedistrict_error").innerHTML = "";
        document.getElementById("arr_witness_sameps_error").innerHTML = "";
        document.getElementById("arr_witnes_agetype_error").innerHTML = "";
        document.getElementById("arr_witnes_dob_error").innerHTML = "";

        document.getElementById("arr_witnes_yob_error").innerHTML = "";
        document.getElementById("arr_witnes_ageyear_error").innerHTML = "";
        document.getElementById("arr_witnes_agemonth_error").innerHTML = "";
        document.getElementById("arr_witnes_agefrom_error").innerHTML = "";
        document.getElementById("arr_witnes_ageto_error").innerHTML = "";
    }

}

function reset_witness(){
    set_select("witnessevidencetender", "");
    set_select("witness_reltype", "0");    
    set_select("witnes_agetype", ""); $("#witnes_agetype").click();
    set_select("witness_country", "80");
    set_select("witness_state", "");
    reset_select("witness_district", "Select District")
    reset_select("witness_ps", "Select Police Station")
    set_select("witness_samecountry", "");
    set_select("witness_samestate", "");
    reset_select("witness_samedistrict", "Select District")
    reset_select("witness_sameps", "Select Police Station")

    reset_text(["witnessaname", "witness_relname", "compladdress", "witnessstatement", "witness_sameaddress", "witnes_dob", "witnes_yob", "witnes_ageyear", "witnes_agemonth", "witnes_agefrom", "witnes_ageto",]);
    reset_radio(["witnesssameasper1"]);
    $("#add_witness").parent().attr("style", "display:block");
    $("#update_witness").parent().attr("style", "display:none");
    $("#cancel_witness").parent().attr("style", "display:none");
}


function load_witness(row){

    $("#witnessaname").val(row.witness_name.replace("<td>","").replace("</td>",""));
    $("#compladdress").val(row.witness_address.replace("<td>","").replace("</td>",""));
    $("#witnessstatement").val(row.witness_statement.replace("<td>","").replace("</td>",""));

    $("#witnes_dob").val(row.witness_dob.replace("<td>","").replace("</td>",""));
    $("#witnes_yob").val(row.witness_yob.replace("<td>","").replace("</td>",""));
    $("#witnes_ageyear").val(row.witness_ageyear.replace("<td>","").replace("</td>",""));
    $("#witnes_agemonth").val(row.witness_agemonth.replace("<td>","").replace("</td>",""));
    $("#witnes_agefrom").val(row.witness_agefrom.replace("<td>","").replace("</td>",""));
    $("#witnes_ageto").val(row.witness_ageto.replace("<td>","").replace("</td>",""));
    $("#witnes_agetype").val(row.witness_agetype_val).trigger("change");$("#witnes_agetype").click();

    $("#witness_reltype").val(row.witness_rel_type_val).trigger("change");
    $("#witness_relname").val(row.witness_relativename.replace("<td>","").replace("</td>",""));

    $("#witnessevidencetender").val(row.witness_evidence_val).trigger("change");
    $("#witness_country").val(row.witness_country_val).trigger("change");
    $("#witness_nationality").val(row.witness_nationality_val).trigger("change");
    $("#witness_state").val(row.witness_state_val).trigger("change");

    load_district_ps("witness_district", "witness_ps", row.witness_state_val, row.witness_district_val, row.witness_ps_val, row.same_as_per, "witnesssameasper1");
    if(row.same_as_per=="No"){
        $('#witnesssameasper2').click();
        $("#witness_sameaddress").val(row.witness_sameaddress);
        $("#witness_samecountry").val(row.witness_samecountry_val).trigger("change");
        $("#witness_samestate").val(row.witness_samestate_val).trigger("change");
        load_district_ps("witness_samedistrict", "witness_sameps", row.witness_samestate_val, row.witness_samedistrict_val, row.witness_sameps_val, row.same_as_per, "witnesssameasper1");
    }
}

//         END of Data table functions //
//--------------------------------------/
// Enable disable form fields Accused
function enable_disable_accused(status){
    $('#accusedname').prop("disabled", status);
    $('#acc_address').prop("disabled", status);
    $('input[name="accjuvenile"]').prop("disabled", status);
    $('input[name="accmmedical"]').prop("disabled", status);
    $('input[name="acc_sameasper"]').prop("disabled", status);
    $('#accgender').prop("disabled", status);
    $('#accagetype').prop("disabled", status);
    $('#acc_yob').prop("disabled", status);
    $('#acc_dob').prop("disabled", status);
    $('#acc_ageyear').prop("disabled", status);
    $('#acc_agemonth').prop("disabled", status);
    $('#acc_agefrom').prop("disabled", status);
    $('#acc_ageto').prop("disabled", status);
    $('#acc_country').prop("disabled", status);
    $('#acc_state').prop("disabled", status);
    $('#acc_district').prop("disabled", status);
    $('#acc_ps').prop("disabled", status);
    $('#acc_sameasaddress').prop("disabled", status);
    $('#acc_sameascountry').prop("disabled", status);
    $('#acc_sameasstate').prop("disabled", status);
    $('#acc_sameasdistrict').prop("disabled", status);
    $('#acc_sameasps').prop("disabled", status);
    $('#acc_nationality').prop("disabled", status);
    $('#acc_addRow').prop("disabled", status);
    if(status != true){
        $("#accagetype").change();
        $('input[name="acc_sameasper"]:checked').click();
    }
}

$('#accusedtypes2').click(function(){
    enable_disable_accused(true);
    accused_list = [];
    $("#accused_table > tbody").html("");
});
$('#accusedtypes1').click(function(){
    enable_disable_accused(false);
});

$("#isarrestorsurrender1").click(function(){
//Enable Arrest Options
    $("#arrstate").prop("disabled", false)
    $("#arrdistrict").prop("disabled", false)
    $("#arrps").prop("disabled", false)
    $("#accusedactiontakenarr").prop("disabled", false)
//Diable Surrender Options
    $("#accusedtypeofcourt").prop("disabled", true)
    $("#accusedmegistrate").prop("disabled", true)
    $("#accusedactiontaken").prop("disabled", true)
});

$("#isarrestorsurrender2").click(function(){
//Enable Arrest Options
    $("#arrstate").prop("disabled", true)
    $("#arrdistrict").prop("disabled", true)
    $("#arrps").prop("disabled", true)
    $("#accusedactiontakenarr").prop("disabled", true)
//Diable Surrender Options
    $("#accusedtypeofcourt").prop("disabled", false)
    $("#accusedmegistrate").prop("disabled", false)
    $("#accusedactiontaken").prop("disabled", false)
});

$("#isknowncriminal2").click(function(){
    $("#isknowncriminaldetails").prop("disabled", true)
});
$("#isknowncriminal1").click(function(){
    $("#isknowncriminaldetails").prop("disabled", false)
});

$("#iswantedcriminal2").click(function(){
    $("#iswanteddetails").prop("disabled", true)
});
$("#iswantedcriminal1").click(function(){
    $("#iswanteddetails").prop("disabled", false)
});

$("#isbailjumpprevious2").click(function(){
    $("#isbailjumppreviousdetail").prop("disabled", true)
});
$("#isbailjumpprevious1").click(function(){
    $("#isbailjumppreviousdetail").prop("disabled", false)
});

function submitDataTableValues(){
    f_l = {};
    act_sec_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l[index] = temp;
    });
     $("<input />").attr("type", "hidden")
                  .attr("name", "act_sections_list")
                  .attr("value", JSON.stringify(f_l))
                  .appendTo("#arrest_add_form");
    f_l2 = {};
    witness_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l2[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "witness_list")
                  .attr("value", JSON.stringify(f_l2))
                  .appendTo("#arrest_add_form");
    f_l3 = {};
    accused_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
	    f_l3[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "accused_list")
                  .attr("value", JSON.stringify(f_l3))
                  .appendTo("#arrest_add_form");
}



//-- Witness Age Panel --

function witnesclearFunction() {
  document.getElementById("witnes_dob").value = null;
  document.getElementById("witnes_yob").value = '';
  document.getElementById("witnes_ageyear").value = '';
  document.getElementById("witnes_agemonth").value = '';
  document.getElementById("witnes_agefrom").value = '';
  document.getElementById("witnes_ageto").value = '';
}


function witnesdobFunction() {

  var now = firdatepanel; //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witnes_dob").value;
  var  today = firdatepanel;
  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];

  if ( dob > firdatepanel )
{

    document.getElementById("witnes_dob").focus();
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
    return false;

}
  else if ( dobyearcheckyear < 1900 )
{
    document.getElementById("witnes_dob").focus();
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
    return false;

}
  else if ( dobyearcheckyear > firdateyearcheck )
{

    document.getElementById("witnes_dob").focus();
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
    return false;

}

else
{

  var now = new Date(); //Todays Date
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witnes_dob").value;
  var dobcal = new Date(dob);
  var today = firdatepanel;
  var birthday=dob.split("-");
  var dobYear= birthday[0];
  var dobMonth= birthday[1];
  var dobDay= birthday[2];

  var yob = dobcal.getFullYear(dobcal);
  var age = Math.floor((today-dobcal) / (365.25 * 24 * 60 * 60 * 1000));

var nowDay= firdatedaycheck;
var nowMonth = firdatemonthcheck;  //jan = 0 so month + 1
var nowYear= firdateyearcheck;

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

  document.getElementById("witnes_yob").value = yob;
  document.getElementById("witnes_ageyear").value = ageyear;
  document.getElementById("witnes_agemonth").value = agemonth;
  document.getElementById("witnes_agefrom").value = ageyear;
  document.getElementById("witnes_ageto").value = ageyear;
}
}

function witnesyobFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var yob = document.getElementById("witnes_yob").value;
  if (yob < 1900)
  {
    document.getElementById("witnes_yob").focus();
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';

  }
  else if (yob > firdateyearcheck)
  {
    document.getElementById("witnes_yob").focus();
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
  }
  else
{
  var now = new Date(); //Todays Date
  var yob = document.getElementById("witnes_yob").value;
  var nowYear= firdateyearcheck;
  var dob = yob + "-01-" + "01";
  var ageyear = nowYear - yob;

  document.getElementById("witnes_dob").value = dob;
  document.getElementById("witnes_ageyear").value = ageyear;
  document.getElementById("witnes_agemonth").value = 0;
  document.getElementById("witnes_agefrom").value = ageyear;
  document.getElementById("witnes_ageto").value = ageyear;

}
}

function witnessagemonth() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("witnes_ageyear").value;
  var agemonth = document.getElementById("witnes_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").focus();
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").focus();
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
}
else if (ageyear < 10)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").focus();
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
}
else
{

}
}

function witnesageFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("witnes_ageyear").value;
  var agemonth = document.getElementById("witnes_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").focus();
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
}
else if (agemonth > 11)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").focus();  
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';

}
else if (ageyear == '')
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").focus();
    document.getElementById("witnes_agemonth").value = '';   
    document.getElementById("witnes_agefrom").value = '';
    document.getElementById("witnes_ageto").value = '';
}

else
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("witnes_ageyear").value;
  var agemonth = document.getElementById("witnes_agemonth").value;

  var nowYear= firdateyearcheck;
  var nowMonth = firdatemonthcheck;  //jan = 0 so month + 1

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
    document.getElementById("witnes_agemonth").value = '0';  
  }
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("witnes_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  document.getElementById("witnes_dob").value = dob;
  document.getElementById("witnes_yob").value = yob;
  document.getElementById("witnes_agefrom").value = ageyear;
  document.getElementById("witnes_ageto").value = ageyear;
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
      document.getElementById("witnes_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("witnes_agemonth").value = 0;
    }    
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  document.getElementById("witnes_dob").value = dob;
  document.getElementById("witnes_yob").value = yob;
  document.getElementById("witnes_agefrom").value = ageyear;
  document.getElementById("witnes_ageto").value = ageyear;
}
}

//End of Else
}

function witnesagerangefromFunction() 
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = Number(document.getElementById("witnes_agefrom").value);
  var ageyearto = Number(document.getElementById("witnes_ageto").value);

if (ageyear > 120)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_agefrom").focus();    
    document.getElementById("witnes_ageto").value = ''; 
}

else if (ageyear < 10)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_agefrom").focus();
    document.getElementById("witnes_ageto").value = '';  
}

else if (ageyearto == '')
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_ageto").focus();    
}

else
{

}
}

function witnesagerangeFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = Number(document.getElementById("witnes_agefrom").value);
  var ageyearto = Number(document.getElementById("witnes_ageto").value);

if (ageyear > 120)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_agefrom").focus();    
    document.getElementById("witnes_ageto").value = ''; 
}

else if (ageyear < 10)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_agefrom").focus();
    document.getElementById("witnes_ageto").value = '';  
}

else if (ageyearto > 120)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_ageto").focus();    
}

else if (ageyearto == '')
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("witnes_dob").value = null;
    document.getElementById("witnes_yob").value = '';
    document.getElementById("witnes_ageyear").value = '';
    document.getElementById("witnes_agemonth").value = '';
    document.getElementById("witnes_ageto").focus();    
}
else
{

  var now = new Date(); //Todays Date
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("witnes_agefrom").value;

  var nowYear= firdateyearcheck;

  var yob = nowYear - ageyear;

  var dob = yob + "-"+ '01' + "-" + "01";

  document.getElementById("witnes_dob").value = dob;
  document.getElementById("witnes_yob").value = yob;
  document.getElementById("witnes_ageyear").value = ageyear;
  document.getElementById("witnes_agemonth").value = 0;

}
}


//-- Accused Age Panel --

function accclearFunction() {
  document.getElementById("acc_dob").value = null;
  document.getElementById("acc_yob").value = '';
  document.getElementById("acc_ageyear").value = '';
  document.getElementById("acc_agemonth").value = '';
  document.getElementById("acc_agefrom").value = '';
  document.getElementById("acc_ageto").value = '';
}


function accdobFunction() {

  var now = new Date(); //Todays Date 
  var dob = document.getElementById("acc_dob").value;
  var  today = firdatepanel
  var startyearcheck=dob.split("-");

  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = firdatepanel[0];
  var firdatemonthcheck = firdatepanel[1];
  var firdatedaycheck = firdatepanel[2];

  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];

  if ( dob > firdatepanel )
{
    document.getElementById("acc_dob").focus();
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
    return false;

}

  else if ( dobyearcheckyear < 1900 )
{
    document.getElementById("acc_dob").focus();
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
    return false;
}

  else if ( dobyearcheckyear > firdateyearcheck )
{
    document.getElementById("acc_dob").focus();
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
    return false;
}

else
{

  var now = firdatepanel; //Todays Date
  var dob = document.getElementById("acc_dob").value;
  var dobcal = new Date(dob);
  var today = firdatepanel;
  var birthday=dob.split("-");
  var dobYear= birthday[0];
  var dobMonth= birthday[1];
  var dobDay= birthday[2];

  var fircaldate=firdatepanel.split("-");

  var yob = dobcal.getFullYear(dobcal);
  var age = Math.floor((today-dobcal) / (365.25 * 24 * 60 * 60 * 1000));

  var nowYear= fircaldate[0];
  var nowMonth= fircaldate[1];
  var nowDay= fircaldate[2];

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

  document.getElementById("acc_yob").value = yob;
  document.getElementById("acc_ageyear").value = ageyear;
  document.getElementById("acc_agemonth").value = agemonth;
  document.getElementById("acc_agefrom").value = ageyear;
  document.getElementById("acc_ageto").value = ageyear;
}
}

function accyobFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var yob = document.getElementById("acc_yob").value;
  if (yob < 1900)
  {
    document.getElementById("acc_yob").focus();
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';

  }
  else if (yob > firdateyearcheck)
  {
    document.getElementById("acc_yob").focus();
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
  }
  else
{

  var now = new Date(); //Todays Date
  var yob = document.getElementById("acc_yob").value;
  var nowYear= firdateyearcheck;
  var dob = yob + "-01-" + "01";
  // var dob = yob + "-01-" + "01"
  var ageyear = nowYear - yob;

  document.getElementById("acc_dob").value = dob;
  document.getElementById("acc_ageyear").value = ageyear;
  document.getElementById("acc_agemonth").value = 0;
  document.getElementById("acc_agefrom").value = ageyear;
  document.getElementById("acc_ageto").value = ageyear;

}
}

function accagemonth() {
  var now = new Date(); //Todays Date 

  var ageyear = document.getElementById("acc_ageyear").value;
  var agemonth = document.getElementById("acc_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").focus();
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").focus();
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
}
else if (ageyear < 10)
{
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").focus();
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
}
else
{

}
}

function accageFunction() {

  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("acc_ageyear").value;
  var agemonth = document.getElementById("acc_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").focus();
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
}
else if (agemonth > 11)
{
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").value = ''
    document.getElementById("acc_agemonth").focus();  
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_ageyear").focus();
    document.getElementById("acc_agemonth").value = '';   
    document.getElementById("acc_agefrom").value = '';
    document.getElementById("acc_ageto").value = '';
}

else
{
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("acc_ageyear").value;
  var agemonth = document.getElementById("acc_agemonth").value;

  var nowYear= firdateyearcheck;
  var nowMonth = firdatemonthcheck; 

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
    document.getElementById("acc_agemonth").value = '0';  
  }
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("acc_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  document.getElementById("acc_dob").value = dob;
  document.getElementById("acc_yob").value = yob;
  document.getElementById("acc_agefrom").value = ageyear;
  document.getElementById("acc_ageto").value = ageyear;
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
      document.getElementById("acc_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("acc_agemonth").value = 0;
    }    
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  document.getElementById("acc_dob").value = dob;
  document.getElementById("acc_yob").value = yob;
  document.getElementById("acc_agefrom").value = ageyear;
  document.getElementById("acc_ageto").value = ageyear;
}
}

//End of Else
}

function accagerangefromFunction() 
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = Number(document.getElementById("acc_agefrom").value);
  var ageyearto = Number(document.getElementById("acc_ageto").value);

if (ageyear == '')
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_agefrom").focus();    
    document.getElementById("acc_ageto").value = ''; 
}

else if (ageyear < 10)
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_agefrom").focus();    
    document.getElementById("acc_ageto").value = ''; 
}

else if (ageyear > 120)
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_agefrom").focus();    
    document.getElementById("acc_ageto").value = ''; 
}

else if (ageyearto > 120)
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_ageto").focus();    
}

else if (ageyearto == '')
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_ageto").focus();    
}

else
{

}
}

function accagerangeFunction() {

  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = Number(document.getElementById("acc_agefrom").value);
  var ageyearto = Number(document.getElementById("acc_ageto").value);

if (ageyear == '')
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_agefrom").focus();    
    document.getElementById("acc_ageto").value = ''; 
}

else if (ageyear > 120)
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_agefrom").focus();    
    document.getElementById("acc_ageto").value = ''; 
}

else if (ageyearto < 10)
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_ageto").focus();    
}

else if (ageyearto > 120)
{
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_dob").value = null;
    document.getElementById("acc_yob").value = '';
    document.getElementById("acc_ageyear").value = '';
    document.getElementById("acc_agemonth").value = '';
    document.getElementById("acc_ageto").focus();    
}
else
{

  var now = new Date(); //Todays Date
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("acc_agefrom").value;

  var nowYear= firdateyearcheck;

  var yob = nowYear - ageyear;

  var dob = yob + "-"+ '01' + "-" + "01";

  document.getElementById("acc_dob").value = dob;
  document.getElementById("acc_yob").value = yob;
  document.getElementById("acc_ageyear").value = ageyear;
  document.getElementById("acc_agemonth").value = 0;

}
}

// End of Age Panel
