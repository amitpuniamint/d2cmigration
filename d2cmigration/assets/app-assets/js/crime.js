/*
Manages the AJAX Load to the Project
*/


district_url = "/districts";
police_station_url = "/police-stations";
section_url = "/sections";
property_type_url = "/property-types";
minor_head_url = '/minor-head';
weapon_subtype_url = "/weapon-subtype";
make_url = "/mv-make";
model_url = "/mv-model";
majorhead_url = "/majorhead";
species_subtype_url = "/species-subtype";
species_bodypart_url = "/species-bodyparts"


function isDecimalKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    {    
    return false;
    }
    return true;
   }

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
}
return true;
}

// End Of Same Address Logic Witness

function accclearFunction() {
  document.getElementById("acc_dob").value = null;
  document.getElementById("acc_yob").value = '';
  document.getElementById("acc_ageyear").value = '';
  document.getElementById("acc_agemonth").value = '';   
  document.getElementById("acc_agefrom").value = '';
  document.getElementById("acc_ageto").value = '';
}

function crimeprep_date_func(){

var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
    crimeprepdatecheck = $("#crimeprepdate").val();
    // if (firdate > crimeprepdatecheck){
    // // document.getElementById('crimeprepdate_error').innerHTML = 'Crime Preparation Date is less than FIR date';
    // // document.getElementById("crimeprepdate").focus();
    // // // $("#occ_addRow").attr("disabled", true);
    // // return false;      
    // }

    if  (currentdate<crimeprepdatecheck)
    {
    document.getElementById('crimeprepdate_error').innerHTML = 'Crime Preparation Date is greater than Todays date';
    document.getElementById("crimeprepdate").focus();
    }
    else{
        document.getElementById('crimeprepdate_error').innerHTML = '';
    }

    }

function auto_registration_date_check()
{
var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
autoregistrationdate = $("#autoregistrationdate").val();

if(currentdate<autoregistrationdate)
{
document.getElementById("autoregistrationdate").focus();
}
else
{    
}
}

function crimevisit_date_func(){
var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);

    var crimeprepdatecheck = $("#crimeprepdate").val();
    var crimeplacedatecheck = $("#occvisitdate").val();

    if (crimeprepdatecheck < crimeplacedatecheck){
    document.getElementById('date_error').innerHTML = 'Crime Place Visit Date cannot be greater than Crime Prep Date';
    document.getElementById("occvisitdate").focus();
    // $("#occ_addRow").attr("disabled", true);
    return false;        
    }
    // else if (firdate > crimeplacedatecheck){
    // document.getElementById('date_error').innerHTML = 'Crime Place Visit Date cannot be less than FIR Date';
    // document.getElementById("occvisitdate").focus();
    // // $("#occ_addRow").attr("disabled", true);
    // return false;       
    // }

    else if (currentdate < crimeplacedatecheck){
    document.getElementById('date_error').innerHTML = 'Crime Place Visit Date cannot be greater than Todays Date';
    document.getElementById("occvisitdate").focus();
    // $("#occ_addRow").attr("disabled", true);
    return false;       
    }

    else{
        document.getElementById('date_error').innerHTML = '';
    }

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


$(document).ready(function() {
    $("#crimeprepdate").attr("max",set_time_picker_min_val_today());
    $("#occvisitdate").attr("max",set_time_picker_min_val_today());
    $("#autoregistrationdate").attr("max",set_time_picker_min_val_today());
    // $("#fir_gddatetime").attr("max",document.getElementById('fir_date'));

// Set India as default of nationality/Country
$("#crime_country").val("80");

$("#acc_country").val("80");

$("#acc_sameascountry").val("80");

$("#acc_nationality").val("80");

$("#victim_country").val("80");

$("#victim_sameascountry").val("80");

$("#victim_nationality").val("80");

$("#witness_country").val("80");

$("#witnes_samecountry").val("80");

$("#witnes_nationality").val("80");

var rowCount = $('#crime_table tr').length;

var checkaccjson = Object.keys(accused_list).length
if (checkaccjson == 0) {
document.getElementById("accusedtype2").checked = true;
enable_disable_accused(true);
}

checkspeciestype();
checkspciesbodyparts();
});

function checkspeciestype(){
    if(document.getElementById('speciestype').value=='1')
    {
    document.getElementById('abcspeciestype').disabled=false;
    }
    else
    {
    document.getElementById('abcspeciestype').disabled=true;    
    }
}

function checkspciesbodyparts(){
    if(document.getElementById('wildbodyrecovered').value=='9' || document.getElementById('wildbodyrecovered').value=='15' || document.getElementById('wildbodyrecovered').value=='17' || document.getElementById('wildbodyrecovered').value=='19' || document.getElementById('wildbodyrecovered').value=='29')
    {
    document.getElementById('wildotherdesc').disabled=false;
    }
    else
    {
    document.getElementById('wildotherdesc').disabled=true;    
    }
}

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
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
        $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
  }});
}

$(document).ready(function() {


$("#acc_ps").blur(function(){
if ($('#acccomplsameasper1').is(':checked')) {    
    sameAsYesNo("Y", "acc_sameasaddress", "acc_sameascountry", "acc_sameasstate", "acc_sameasdistrict",
    "acc_sameasps", "acc_address","acc_country","acc_state","acc_district","acc_ps");
}
});

$("#crime_ps").blur(function(){
if ($('#occpersameasper1').is(':checked')) {    
    sameAsYesNo("Y", "occ_sameasaddress", "occ_sameascountry", "occ_sameasstate", "occ_sameasdistrict",
    "occ_sameasps", "compladdress","crime_country","crime_state","crime_district","crime_ps");
}
});


$("#victim_ps").blur(function(){
if ($('#victimsameasper1').is(':checked')) {    
    sameAsYesNo("Y", "victim_sameasaddress", "victim_sameascountry", "victim_sameasstate", "victim_sameasdistrict",
    "victim_sameasps", "victim_address","victim_country","victim_state","victim_district","victim_ps");
}
});


$("#witnes_ps").blur(function(){
if ($('#witnesssameasper1').is(':checked')) {    
    sameAsYesNo("Y", "witnessaddress2", "witnes_samecountry", "witnes_samestate", "witnes_samedistrict",
    "witnes_sameps", "witnes_address","witness_country","witnes_state","witnes_district","witnes_ps");
}
});


// Select District
$("#crime_state").blur(function() {
    load_resource(district_url, {"state": $("#crime_state").val()}, "crime_district", 0, 1, "Select District");
});
$("#crime_plstate").blur(function() {
    data = {"state": $("#crime_plstate").val()}
    load_resource(district_url, data, "crime_pldistrict", 0, 1, "Select District");
});
$("#witnes_state").blur(function() {
    data = {"state": $("#witnes_state").val()}
    load_resource(district_url, data, "witnes_district", 0, 1, "Select District");
});
$("#witnes_samestate").blur(function() {
    data = {"state": $("#witnes_samestate").val()}
    load_resource(district_url, data, "witnes_samedistrict", 0, 1, "Select District");
});
$("#victim_state").blur(function() {
    data = {"state": $("#victim_state").val()}
    load_resource(district_url, data, "victim_district", 0, 1, "Select District");
});
$("#victim_sameasstate").blur(function() {
    data = {"state": $("#victim_sameasstate").val()}
    load_resource(district_url, data, "victim_sameasdistrict", 0, 1, "Select District");
});
$("#acc_state").blur(function() {
    data = {"state": $("#acc_state").val()}
    load_resource(district_url, data, "acc_district", 0, 1, "Select District");
});
$("#acc_sameasstate").blur(function() {
    data = {"state": $("#acc_sameasstate").val()}
    load_resource(district_url, data, "acc_sameasdistrict", 0, 1, "Select District");
});




// Select PoliceStation
$("#crime_district").blur(function() {
  data = {"state": $("#crime_state").val(), "district": $("#crime_district").val()}
  load_resource(police_station_url, data, "crime_ps", 0, 1, "Select Police Station");
});
$("#crime_pldistrict").blur(function() {
  data = {"state": $("#crime_plstate").val(), "district": $("#crime_pldistrict").val()}
  load_resource(police_station_url, data, "crime_plps", 0, 1, "Select Police Station");
});
$("#witnes_district").blur(function() {
  data = {"state": $("#witnes_state").val(), "district": $("#witnes_district").val()}
  load_resource(police_station_url, data, "witnes_ps", 0, 1, "Select Police Station");
});
$("#witnes_samedistrict").blur(function() {
  data = {"state": $("#witnes_samestate").val(), "district": $("#witnes_samedistrict").val()}
  load_resource(police_station_url, data, "witnes_sameps", 0, 1, "Select Police Station");
});
$("#victim_district").blur(function() {
  data = {"state": $("#victim_state").val(), "district": $("#victim_district").val()}
  load_resource(police_station_url, data, "victim_ps", 0, 1, "Select Police Station");
});
$("#acc_district").blur(function() {
  data = {"state": $("#acc_state").val(), "district": $("#acc_district").val()}
  load_resource(police_station_url, data, "acc_ps", 0, 1, "Select Police Station");
});
$("#victim_sameasdistrict").blur(function() {
  data = {"state": $("#victim_sameasstate").val(), "district": $("#victim_sameasdistrict").val()}
  load_resource(police_station_url, data, "victim_sameasps", 0, 1, "Select Police Station");
});
$("#acc_sameasdistrict").blur(function() {
  data = {"state": $("#acc_sameasstate").val(), "district": $("#acc_sameasdistrict").val()}
  load_resource(police_station_url, data, "acc_sameasps", 0, 1, "Select Police Station");
});




// Select Sections
$("#crime_acts").blur(function() {
    data = {"act_id": $("#crime_acts").val()}
    load_resource(section_url, data, "crime_sections", 0, 1, 'Select Section');
});


// Select Minor Head
$("#crime_majorhead").blur(function() {
    data = {"major_head_code": $("#crime_majorhead").val()}
    load_resource(minor_head_url, data, "crime_minorhead", 0, 1, "Select Minor Head");
});

// Select Weapon Subtype
$("#armscat").blur(function() {
    data = {"weapon_type_cd": $("#armscat").val()}
    load_resource(weapon_subtype_url, data, "armssubtype", 0, 1, "Select Arms SubType");
});

// Select Make by automobiles
$("#autotype").blur(function() {
    data = {"mv_type_cd": $("#autotype").val()}
    load_resource(make_url, data, "automake", 0, 1, "Select Make");
});

// Select Make by WildLife
$("#speciestype").blur(function() {
    data = {"species_type_cd": $("#speciestype").val()}
    load_resource(species_subtype_url, data, "abcspeciestype", 0, 1, "Select");
});

// Select Make by WildLife
$("#speciestype").blur(function() {
    data = {"species_type_cd": $("#speciestype").val()}
    load_resource(species_bodypart_url, data, "wildbodyrecovered", 0, 1, "Select");
});

// Select Model by make
$("#automake").blur(function() {
    data = {"mv_make_cd": $("#automake").val()}
    load_resource(model_url, data, "automodel", 0, 1, "Select Model");
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
$("#acc_agetype").change(function(){
    select_age_type("acc_agetype", "acc_dob", "acc_yob", "acc_ageyear", "acc_agemonth", "acc_agefrom", "acc_ageto");
});

$("#victim_agetype").change(function(){
    select_age_type("victim_agetype", "victim_dob", "victim_yob", "victim_ageyear", "victim_agemonth", "victim_agefrom", "victim_ageto");
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

// Occurrence Person Same as permenant
$("#occpersameasper2").click(function(){
    sameAsYesNo("N", "occ_sameasaddress", "occ_sameascountry", "occ_sameasstate", "occ_sameasdistrict",
    "occ_sameasps", "","","","","");
});

$("#occpersameasper1").click(function(){
    sameAsYesNo("Y", "occ_sameasaddress", "occ_sameascountry", "occ_sameasstate", "occ_sameasdistrict",
    "occ_sameasps", "compladdress","crime_country","crime_state","crime_district","crime_ps");
});

// Accused Same as permenant
$("#acccomplsameasper2").click(function(){
    sameAsYesNo("N", "acc_sameasaddress", "acc_sameascountry", "acc_sameasstate", "acc_sameasdistrict",
    "acc_sameasps", "","","","","");
});

$("#acccomplsameasper1").click(function(){
    sameAsYesNo("Y", "acc_sameasaddress", "acc_sameascountry", "acc_sameasstate", "acc_sameasdistrict",
    "acc_sameasps", "acc_address","acc_country","acc_state","acc_district","acc_ps");
});

// Victim Same as permenant
$("#victimsameasper2").click(function(){
    sameAsYesNo("N", "victim_sameasaddress", "victim_sameascountry", "victim_sameasstate", "victim_sameasdistrict",
    "victim_sameasps", "","","","","");
});

$("#victimsameasper1").click(function(){
    sameAsYesNo("Y", "victim_sameasaddress", "victim_sameascountry", "victim_sameasstate", "victim_sameasdistrict",
    "victim_sameasps", "victim_address","victim_country","victim_state","victim_district","victim_ps");
});


// Witness Same as permenant
$("#witnesssameasper1").click(function(){
    sameAsYesNo("Y", "witnessaddress2", "witnes_samecountry", "witnes_samestate", "witnes_samedistrict",
    "witnes_sameps", "witnes_address","witness_country","witnes_state","witnes_district","witnes_ps");
});

$("#witnesssameasper2").click(function(){
    sameAsYesNo("N", "witnessaddress2", "witnes_samecountry", "witnes_samestate", "witnes_samedistrict",
    "witnes_sameps", "","","","","");
});

/*----------------------------------------------------------
              Data Table -  Add & Delete Row
------------------------------------------------------------*/

major_minor_list = [];
witness_list = [];
property_list = [];

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
        delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' role='button' aria-pressed='true' onclick='delete_row_act(\"crime_table\",\""+index+"\");'><i class='feather icon-menu' tooltip='Delete'></i>Delete</a></td>";
        no = '<th>'+i+'</th>'
        html = '<tr id="'+index+'">'+no+row.act_cd+row.act_text+row.sec_cd+row.sec_text+delete_button+'</tr>';
        rows.push(html)
        i += 1;
    });
    return header+"<tbody>"+rows+"</tbody>";
}

$('#add_act_sect').click(function(){
    if(($("#crime_acts").find(":selected").text() == 'Acts') || ($("#crime_sections").find(":selected").text() == 'Select Sections')){
        return 0;
    }
    if ($("#crime_sections").find(":selected").val() == ''){
    return 0;
    }
    act_srno = "";
    act_cd = "<th>"+$("#crime_acts").find(":selected").val()+"</th>";
    act_text = "<th>"+$("#crime_acts").find(":selected").text()+"</th>";
    sec_cd = "<th>"+$("#crime_sections").find(":selected").val()+"</th>";
    sec_text = "<th>"+$("#crime_sections").find(":selected").text()+"</th>";
    found = act_sec_list.some(el => el.act_cd == act_cd && el.sec_cd == sec_cd);
    if(found){return 0;}
    act_sec_list[act_sec_list.length] = {'act_cd': act_cd, 'act_text': act_text, 'sec_cd': sec_cd, 'sec_text': sec_text,
    'from_db': "No",'soft_delete': "No", "act_srno": ""};
    html = build_rows_act(act_sec_list);
    $("#crime_table").html(html);

    document.getElementById("crime_acts").focus();
    $("#crime_sections").val("");

});

// Deletes the row from a given data table
function delete_row_act(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    if(act_sec_list[row_no]['from_db'] == 'Yes'){
        act_sec_list[row_no]['soft_delete'] = "Yes";
    }
    else{
        act_sec_list.splice(row_no, 1);
    }
    if(act_sec_list[row_no]['from_db'] == 'No'){
        act_sec_list[row_no]['soft_delete'] = "No";
    }
    else
    {

    }
    $("#crime_table").html(build_rows_act(act_sec_list));
}

// Loads rows in to table
function build_rows_major_minor(major_minor_list){
    rows = []
    header = "<thead class='thead-dark'><tr> <th>S.No.</th>  <th>Major Head</th> <th>Minor Head</th> <th>Action</th> </tr></thead>"
    major_minor_list.forEach(function(row, index){
        index += 1;
        delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' role='button' aria-pressed='true' onclick='delete_row_major_minor(\"major_minor_table\",\""+index+"\");'><i class='feather icon-menu' tooltip='Delete'></i>Delete</a></td>";
        no = '<th>'+index+'</th>'
        html = '<tr id="'+index+'">'+no+row.major_text+row.minor_text+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

$('#ma_mi_addRow').click(function(){
    if(($("#crime_majorhead").find(":selected").text() == 'Select Major Head') || ($("#crime_minorhead").find(":selected").text() == 'Select Minor Head')){
        return 0;
    }
    type_of_crime = $("#crime_type").val();
    major_val = "<th>"+$("#crime_majorhead").find(":selected").val()+"</th>";
    major_text = "<th>"+$("#crime_majorhead").find(":selected").text()+"</th>";
    minor_val = "<th>"+$("#crime_minorhead").find(":selected").val()+"</th>";
    minor_text = "<th>"+$("#crime_minorhead").find(":selected").text()+"</th>";
    found = major_minor_list.some(el => el.major_val == major_val && el.minor_val == minor_val);
    if(found){return 0;}
    major_minor_list[major_minor_list.length] = {'major_val': major_val, 'major_text': major_text, 'minor_val': minor_val, 'minor_text': minor_text,
    'type_of_crime': type_of_crime, 'soft_delete': ''};
    html = build_rows_major_minor(major_minor_list);
    $("#major_minor_table").html(html);
    $("#crime_majorhead").val("");
    $("#crime_minorhead").val("");
    $("#crime_type").val("");
});

// Deletes the row from a given data table
function delete_row_major_minor(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    major_minor_list.splice(row_no, 1);
    $("#major_minor_table").html(build_rows_major_minor(major_minor_list));
}

// Accused Add & Delete --------------------------//
// Loads rows in to table ------------------------//
function reset_accused(){
    set_select("acc_gender", "");
    set_select("acc_agetype", "");
    set_select("acc_reltype", "0");

    set_select("acc_country", "80");
    set_select("acc_state", "");
    reset_select("acc_district", "Select District")
    reset_select("acc_ps", "Select Police Station")
    set_select("acc_nationality", "80");

    reset_text(["acc_name", "acc_relname", "acc_dob", "acc_yob", "acc_ageyear", "acc_agemonth", "acc_agefrom", "acc_ageto",
    "acc_address", "acc_sameasaddress"]);
    reset_radio(["accusedtypes1", "accjuvenile2", "accmmedical2", "acccomplsameasper1"]);
    $("#acc_updateRow").parent().attr("style", "display:none");
    $("#acc_cancelRow").parent().attr("style", "display:none");
    $("#acc_addRow").parent().attr("style", "display:block");
}

function build_rows_acc(accused_list){
    rows = [];
    header = "<thead class='thead-dark'><th>S.No.</th><th>Accused Name</th> <th>Relative Name</th> <th>Address</th><th>Edit</th> <th>Delete</th></thead>";
    i = 1;
    accused_list.forEach(function(row, index){
        if(row['soft_delete'] == "Yes"){
                return true;
        }
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' data-toggle='tooltip' onclick='edit_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+i+'</td>'
        html = '<tr id="'+index+'">'+no+row.accusedname+row.acc_relname+row.accaddress+edit_button+delete_button+'</tr>';
//        console.log(html);
        rows.push(html)
        i += 1;
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_accused_list(row_id, from='insert'){
    fir_accusedname = "<td>"+$("#acc_name").val()+"</td>";
    fir_accaddress = "<td>"+$("#acc_address").val()+"</td>";

    acc_type = $('input[name="crime_accusedtypes"]:checked').val();
    acc_juvenile = $('input[name="acc_juvenile"]:checked').val();
    acc_medical = $('input[name="acc_medical"]:checked').val();
    acc_sameasper = $('input[name="acc_sameasper"]:checked').val();
    acc_gender = $("#acc_gender").find(":selected").text();
    acc_gender_val = $("#acc_gender").find(":selected").val();

    acc_rel_type = $("#acc_reltype").find(":selected").text();
    acc_rel_type_val = $("#acc_reltype").find(":selected").val();
    acc_relname = "<td>"+$("#acc_relname").val()+"</td>";

    acc_agetype = $("#acc_agetype").find(":selected").text();
    acc_agetype_val = $("#acc_agetype").find(":selected").val();
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
    acc_ps = $("#acc_ps").find(":selected").text();
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
    found = accused_list.some(el => el.accusedname == fir_accusedname && el.accaddress == fir_accaddress)
    if(found && from != 'update'){return 0;}
    from_db = "No";
    if(from == 'update'){
        if(accused_list[row_id]['from_db'] == "Yes"){
            from_db = "Yes";
        }else{
            from_db = "No";
        }
    }
    accused_list[row_id] = {'accusedname': fir_accusedname, 'accaddress': fir_accaddress, 'acc_type': acc_type,
    'acc_juvenile': acc_juvenile, 'acc_medical':acc_medical, 'acc_gender': acc_gender, 'acc_gender_val': acc_gender_val,
    'acc_rel_type': acc_rel_type, 'acc_rel_type_val': acc_rel_type_val, 'acc_relname': acc_relname,
    'acc_agetype': acc_agetype, 'acc_agetype_val': acc_agetype_val, 'acc_dob': acc_dob, 'acc_yob': acc_yob, 'acc_ageyear': acc_ageyear,
    'acc_agemonth': acc_agemonth, 'acc_agefrom': acc_agefrom, 'acc_ageto': acc_ageto, 'acc_country': acc_country, 'acc_country_val': acc_country_val,
    'acc_state': acc_state, 'acc_state_val': acc_state_val, 'acc_district': acc_district, 'acc_district_val': acc_district_val,
    'acc_ps': acc_ps, 'acc_ps_val': acc_ps_val, 'acc_adddr_same': acc_adddr_same, 'acc_country_same': acc_country_same,
    'acc_country_same_val': acc_country_same_val, 'acc_state_same': acc_state_same, 'acc_state_same_val': acc_state_same_val,
    'acc_district_same': acc_district_same, 'acc_district_same_val': acc_district_same_val, 'acc_ps_same': acc_ps_same,
    'acc_ps_same_val': acc_ps_same_val, 'acc_nationality': acc_nationality, 'acc_nationality_val': acc_nationality_val, 'acc_sameasper': acc_sameasper,
    'from_db': from_db,'soft_delete': 'No', "acc_srno": ''}

    html = build_rows_acc(accused_list);
    $("#accused_table").html(html);
    reset_accused();
}

$('#acc_addRow').click(function(){

    if($("#acc_name").val() == "")
    {
    document.getElementById("acc_name_error").innerHTML = "Enter Accused Name";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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

        return 0;
    }
    else if($("#acc_gender").find(":selected").val() == "" )
{
    document.getElementById("acc_gender_error").innerHTML = "Select Accused Gender";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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

        return 0;
    }
    else if($("#acc_agetype").find(":selected").val() == "")
{
        document.getElementById("acc_agetype_error").innerHTML = "Select Accused Age Type";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";

    document.getElementById("acc_yob_error").innerHTML = "";
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

        return 0;
    }
    else if($("#acc_yob").val() == "")
{
        document.getElementById("acc_yob_error").innerHTML = "Enter Accused DOB, YOB or Age";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";

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

        return 0;
    }
// Accused Address Check

    else if($("#acc_address").val() == "")
{
        document.getElementById("acc_address_error").innerHTML = "Enter Accused Address";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";

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

        return 0;
    }
    else if($("#acc_country").find(":selected").val() == "")
{
        document.getElementById("acc_country_error").innerHTML = "Select Accused Country";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";

    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }

    else if($("#acc_state").find(":selected").val() == "")
{
        document.getElementById("acc_state_error").innerHTML = "Select Accused State";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        

    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_district").find(":selected").val() == "")
{
        document.getElementById("acc_district_error").innerHTML = "Select Accused District";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";

    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_ps").find(":selected").val() == "")
{
        document.getElementById("acc_ps_error").innerHTML = "Select Accused PS";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";

    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
// Accused Same Address Check

    else if($("#acc_sameasaddress").val() == "")
{
        document.getElementById("acc_sameasaddress_error").innerHTML = "Select Accused Country";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";

    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_sameascountry").find(":selected").val() == "")
{
        document.getElementById("acc_sameascountry_error").innerHTML = "Select Accused Country";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";

    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }

    else if($("#acc_sameasstate").find(":selected").val() == "")
{
        document.getElementById("acc_sameasstate_error").innerHTML = "Select Accused State";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";

    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_sameasdistrict").find(":selected").val() == "")
{
        document.getElementById("acc_sameasdistrict_error").innerHTML = "Select Accused District";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";

    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_sameasps").find(":selected").val() == "")
{
        document.getElementById("acc_sameasps_error").innerHTML = "Select Accused PS";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";

    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
// Accused Nationality Check
    else if($("#acc_nationality").find(":selected").val() == "")
{
        document.getElementById("acc_nationality_error").innerHTML = "Select Accused Nationality";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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


        return 0;
    }

else
{    
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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

    create_accused_list(accused_list.length);
}

});

// Deletes the row from a given data table
function delete_acc_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    if(accused_list[row_no]['from_db'] == 'Yes'){
        accused_list[row_no]['soft_delete'] = "Yes";
    }
    else{
        accused_list.splice(row_no, 1);
    }
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


    if($("#acc_name").val() == "")
    {
    document.getElementById("acc_name_error").innerHTML = "Enter Accused Name";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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

        return 0;
    }
    else if($("#acc_gender").find(":selected").val() == "" )
{
    document.getElementById("acc_gender_error").innerHTML = "Select Accused Gender";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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

        return 0;
    }
    else if($("#acc_agetype").find(":selected").val() == "")
{
        document.getElementById("acc_agetype_error").innerHTML = "Select Accused Age Type";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";

    document.getElementById("acc_yob_error").innerHTML = "";
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

        return 0;
    }
    else if($("#acc_yob").val() == "")
{
        document.getElementById("acc_yob_error").innerHTML = "Enter Accused DOB, YOB or Age";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";

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

        return 0;
    }
// Accused Address Check

    else if($("#acc_address").val() == "")
{
        document.getElementById("acc_address_error").innerHTML = "Enter Accused Address";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";

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

        return 0;
    }
    else if($("#acc_country").find(":selected").val() == "")
{
        document.getElementById("acc_country_error").innerHTML = "Select Accused Country";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";

    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }

    else if($("#acc_state").find(":selected").val() == "")
{
        document.getElementById("acc_state_error").innerHTML = "Select Accused State";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        

    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_district").find(":selected").val() == "")
{
        document.getElementById("acc_district_error").innerHTML = "Select Accused District";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";

    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_ps").find(":selected").val() == "")
{
        document.getElementById("acc_ps_error").innerHTML = "Select Accused PS";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";

    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
// Accused Same Address Check

    else if($("#acc_sameasaddress").val() == "")
{
        document.getElementById("acc_sameasaddress_error").innerHTML = "Select Accused Country";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";

    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_sameascountry").find(":selected").val() == "")
{
        document.getElementById("acc_sameascountry_error").innerHTML = "Select Accused Country";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";

    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }

    else if($("#acc_sameasstate").find(":selected").val() == "")
{
        document.getElementById("acc_sameasstate_error").innerHTML = "Select Accused State";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";

    document.getElementById("acc_sameasdistrict_error").innerHTML = "";
    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_sameasdistrict").find(":selected").val() == "")
{
        document.getElementById("acc_sameasdistrict_error").innerHTML = "Select Accused District";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";

    document.getElementById("acc_sameasps_error").innerHTML = "";
    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#acc_sameasps").find(":selected").val() == "")
{
        document.getElementById("acc_sameasps_error").innerHTML = "Select Accused PS";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
    document.getElementById("acc_address_error").innerHTML = "";
    document.getElementById("acc_country_error").innerHTML = "";        
    document.getElementById("acc_state_error").innerHTML = "";
    document.getElementById("acc_district_error").innerHTML = "";
    document.getElementById("acc_ps_error").innerHTML = "";
    document.getElementById("acc_sameasaddress_error").innerHTML = "";
    document.getElementById("acc_sameascountry_error").innerHTML = "";
    document.getElementById("acc_sameasstate_error").innerHTML = "";
    document.getElementById("acc_sameasdistrict_error").innerHTML = "";

    document.getElementById("acc_nationality_error").innerHTML = "";

        return 0;
    }
// Accused Nationality Check
    else if($("#acc_nationality").find(":selected").val() == "")
{
        document.getElementById("acc_nationality_error").innerHTML = "Select Accused Nationality";
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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


        return 0;
    }

else
{    
    document.getElementById("acc_name_error").innerHTML = "";
    document.getElementById("acc_gender_error").innerHTML = "";
    document.getElementById("acc_agetype_error").innerHTML = "";
    document.getElementById("acc_yob_error").innerHTML = "";
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

    create_accused_list(row_id, from='update');

}

}

function load_accused(row){
    show();
    $("#acc_name").val(row.accusedname.replace("<td>","").replace("</td>",""));
    $("#acc_address").val(row.accaddress.replace("<td>","").replace("</td>",""));
    $("#acc_dob").val(row.acc_dob.replace("<td>","").replace("</td>",""));
    $("#acc_yob").val(row.acc_yob.replace("<td>","").replace("</td>",""));
    $("#acc_ageyear").val(row.acc_ageyear.replace("<td>","").replace("</td>",""));
    $("#acc_agemonth").val(row.acc_agemonth.replace("<td>","").replace("</td>",""));
    $("#acc_agefrom").val(row.acc_agefrom.replace("<td>","").replace("</td>",""));
    $("#acc_ageto").val(row.acc_ageto.replace("<td>","").replace("</td>",""));

    $("#acc_reltype").val(row.acc_rel_type_val).trigger("change");
    $("#acc_relname").val(row.acc_relname.replace("<td>","").replace("</td>",""));

    $("#acc_gender").val(row.acc_gender_val).trigger("change");
    $("#acc_agetype").val(row.acc_agetype_val).trigger("change");
    $("#acc_country").val(row.acc_country_val).trigger("change");
    $("#acc_state").val(row.acc_state_val).trigger("change");

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
    hide();
}


// Victim Add & Delete
// Loads rows in to table
function build_rows_vic(victim_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Victim Name</th> <th>Relative Name</th> <th>Address</th><th>Victim Statement</th><th>Add Statement</th> <th>Edit</th> <th>Delete</th></thead>"
    i = 1;
    victim_list.forEach(function(row, index){
    if(row['soft_delete'] == "Yes"){
                return true;
        }
        index += 1;
        add_button = "<td><a class='delete' title='AddStatement' data-toggle='modal' data-target='#VictimStatementForm' onclick='cur_vic_index ="+ index+";'><i class='step-icon feather icon-plus-square'></i></a></td>";
        edit_button = "<td><a class='delete' title='Edit' data-toggle='modal' data-target='#AddVictimForm' onclick='edit_vic_row(\"victim_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_vic_row(\"victim_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+i+'</td>'
        html = '<tr id="'+index+'">'+no+row.victimname+row.vic_relativename+row.victimaddress+row.victim_statement+add_button+edit_button+delete_button+'</tr>';
        rows.push(html)
        i += 1;
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_victim_list(row_id, from='insert'){
    vic_type = $('input[name="victim_type"]:checked').val();
    vic_type_category = $('input[name="victim_category"]:checked').val();

    vic_age_proof_val = $("#victim_ageproof").find(":selected").val();
    vic_age_details = $("#victim_agedetails").val();

    vic_medical = $('input[name="victim_medical"]:checked').val();
    vic_roadacc = $('input[name="victimroadacc"]:checked').val();
    vic_sameasper = $('input[name="victim_sameasper"]:checked').val();
    victim_name = "<td>"+$("#victim_name").val()+"</td>";
    victim_address = "<td>"+$("#victim_address").val()+"</td>";
    vic_occupation = $("#victim_occupation").find(":selected").text();
    vic_occupation_val = $("#victim_occupation").find(":selected").val();

    vic_gender = $("#victim_gender").find(":selected").text();
    vic_gender_val = $("#victim_gender").find(":selected").val();

    vic_religion = $("#victim_religion").find(":selected").text();
    vic_religion_val = $("#victim_religion").find(":selected").val();

    vic_caste = $("#victim_castecat").find(":selected").text();
    vic_caste_val = $("#victim_castecat").find(":selected").val();

    vic_injury = $("#victim_injury").find(":selected").text();
    vic_injury_val = $("#victim_injury").find(":selected").val();

    vic_recovery_val = $("#victim_reco").find(":selected").val();

    vic_rel_type = $("#victim_reltype").find(":selected").text();
    vic_rel_type_val = $("#victim_reltype").find(":selected").val();
    vic_relativename = "<td>"+$("#victim_relname").val()+"</td>";

    vic_agetype = $("#victim_agetype").find(":selected").text();
    vic_agetype_val = $("#victim_agetype").find(":selected").val();
    vic_dob = $('#victim_dob').val();
    vic_yob = $('#victim_yob').val();
    vic_ageyear = $('#victim_ageyear').val();
    vic_agemonth = $('#victim_agemonth').val();
    vic_agefrom = $('#victim_agefrom').val();
    vic_ageto = $('#victim_ageto').val();
    vic_country = $("#victim_country").find(":selected").text();
    vic_country_val = $("#victim_country").find(":selected").val();
    vic_state = $("#victim_state").find(":selected").text();
    vic_state_val = $("#victim_state").find(":selected").val();
    vic_district = $("#victim_district").find(":selected").text();
    vic_district_val = $("#victim_district").find(":selected").val();
    vic_ps = $("#victim_ps").find(":selected").text();
    vic_ps_val = $("#victim_ps").find(":selected").val();
    vic_adddr_same = $("#victim_sameasaddress").val();
    vic_country_same = $("#victim_sameascountry").find(":selected").text();
    vic_country_same_val = $("#victim_sameascountry").find(":selected").val();
    vic_state_same = $("#victim_sameasstate").find(":selected").text();
    vic_state_same_val = $("#victim_sameasstate").find(":selected").val();
    vic_district_same = $("#victim_sameasdistrict").find(":selected").text();
    vic_district_same_val = $("#victim_sameasdistrict").find(":selected").val();
    vic_ps_same = $("#victim_sameasps").find(":selected").text();
    vic_ps_same_val = $("#victim_sameasps").find(":selected").val();
    vic_nationality = $("#victim_nationality").find(":selected").text();
    vic_nationality_val = $("#victim_nationality").find(":selected").val();
    vic_statement = "<td> </td>";
    if(from == 'update'){
        vic_statement = victim_list[row_id].victim_statement;
    }
    from_db = "No";
    soft_delete = "No";
    if(from == 'update'){
        if(victim_list[row_id]['from_db'] == "Yes"){
            from_db = "Yes";
        }else{
            from_db = "No";
        }
    }
    found = victim_list.some(el => el.victimname == victim_name && el.victimaddress == victim_address)
    if(found && from != 'update'){return 0;}
    victim_list[row_id] = {'victim_statement': vic_statement, 'victimname': victim_name, 'victimaddress': victim_address, 'vic_type': vic_type,
    'vic_type_category': vic_type_category, 'vic_medical':vic_medical, 'vic_gender': vic_gender, 'vic_gender_val': vic_gender_val, 'vic_age_proof_val': vic_age_proof_val, 'vic_age_details': vic_age_details,
    'vic_rel_type': vic_rel_type, 'vic_rel_type_val': vic_rel_type_val, 'vic_relativename': vic_relativename, 
    'vic_occupation': vic_occupation, 'vic_occupation_val': vic_occupation_val, 'vic_roadacc': vic_roadacc, 
    'vic_agetype': vic_agetype, 'vic_agetype_val': vic_agetype_val, 'vic_dob': vic_dob, 'vic_yob': vic_yob, 'vic_ageyear': vic_ageyear,
    'vic_agemonth': vic_agemonth, 'vic_agefrom': vic_agefrom, 'vic_ageto': vic_ageto, 'vic_country': vic_country, 'vic_country_val': vic_country_val,
    'vic_state': vic_state, 'vic_state_val': vic_state_val, 'vic_district': vic_district, 'vic_district_val': vic_district_val,
    'vic_ps': vic_ps, 'vic_ps_val': vic_ps_val, 'vic_adddr_same': vic_adddr_same, 'vic_country_same': vic_country_same,
    'vic_country_same_val': vic_country_same_val, 'vic_state_same': vic_state_same, 'vic_state_same_val': vic_state_same_val,
    'vic_district_same': vic_district_same, 'vic_district_same_val': vic_district_same_val, 'vic_ps_same': vic_ps_same,
    'vic_ps_same_val': vic_ps_same_val, 'vic_nationality': vic_nationality, 'vic_nationality_val': vic_nationality_val, 'vic_sameasper': vic_sameasper,
    'from_db': from_db, 'soft_delete': soft_delete, 'fir_victim_srno': '', 
    'vic_religion': vic_religion, 'vic_religion_val': vic_religion_val, 'vic_caste': vic_caste, 'vic_caste_val': vic_caste_val, 'vic_injury': vic_injury, 'vic_injury_val': vic_injury_val, 'vic_recovery_val': vic_recovery_val }
    html = build_rows_vic(victim_list);
    $("#victim_table").html(html);
    reset_vic();
}

$('#victim_addRow').click(function(){

    if($("#victim_name").val() == "")
    {
        $('#victim_name').css('border-color', 'red');
        $('#victim_occupation').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = " Enter Victim Name";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        $('#AddVictimForm').modal('show');
        return 0;

    }

    else if($("#victim_gender").find(":selected").val() == "" )
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', 'red');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "Select Victim Gender";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#victim_agetype").find(":selected").val() == "")
{

        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', 'red');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "Select Victim Age Type";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }

    else if($("#victim_yob").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', 'red');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "Select Victim Age/YOB";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }
// Accused Address Check

    else if($("#victim_address").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', 'red');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "Enter Victim Address";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#victim_country").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', 'red');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "Select Victim Country";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";


        return 0;
    }

    else if($("#victim_state").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', 'red');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "Select Victim State";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#victim_district").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', 'red');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "Select Victim District";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#victim_ps").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', 'red');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "Select Victim PS";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";
        return 0;
    }
// Accused Same Address Check
    else if($("#victim_sameasaddress").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', 'red');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "Enter Victim Address";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }
    else if($("#victim_sameascountry").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', 'red');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "Select Victim Country";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }

    else if($("#victim_sameasstate").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', 'red');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "Select Victim State";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";
        return 0;
    }
    else if($("#victim_sameasdistrict").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', 'red');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "Select Victim District";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";
        return 0;
    }
    else if($("#victim_sameasps").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', 'red');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "Select Victim PS";
    document.getElementById("victim_nationality_error").innerHTML = "";

        return 0;
    }
// Accused Nationality Check
    else if($("#victim_nationality").find(":selected").val() == "")
{
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', 'red');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "Select Victim Nationality";

        return 0;
    }

else
{    
        $('#victim_name').css('border-color', '');
        $('#victim_gender').css('border-color', '');
        $('#victim_agetype').css('border-color', '');
        $('#victim_yob').css('border-color', '');
        $('#victim_address').css('border-color', '');
        $('#victim_country').css('border-color', '');
        $('#victim_state').css('border-color', '');
        $('#victim_district').css('border-color', '');
        $('#victim_ps').css('border-color', '');
        $('#victim_sameasaddress').css('border-color', '');
        $('#victim_sameascountry').css('border-color', '');
        $('#victim_sameasstate').css('border-color', '');
        $('#victim_sameasdistrict').css('border-color', '');
        $('#victim_sameasps').css('border-color', '');
        $('#victim_nationality').css('border-color', '');

    document.getElementById("victim_name_error").innerHTML = "";
    document.getElementById("victim_gender_error").innerHTML = "";
    document.getElementById("victim_agetype_error").innerHTML = "";
    document.getElementById("victim_yob_error").innerHTML = "";
    document.getElementById("victim_address_error").innerHTML = "";
    document.getElementById("victim_country_error").innerHTML = "";        
    document.getElementById("victim_state_error").innerHTML = "";
    document.getElementById("victim_district_error").innerHTML = "";
    document.getElementById("victim_ps_error").innerHTML = "";
    document.getElementById("victim_sameasaddress_error").innerHTML = "";
    document.getElementById("victim_sameascountry_error").innerHTML = "";
    document.getElementById("victim_sameasstate_error").innerHTML = "";
    document.getElementById("victim_sameasdistrict_error").innerHTML = "";
    document.getElementById("victim_sameasps_error").innerHTML = "";
    document.getElementById("victim_nationality_error").innerHTML = "";

    create_victim_list(victim_list.length);
    $("#victim_addRow").attr("data-dismiss", "modal");
}


});

// Deletes the row from a given data table
function delete_vic_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    if(victim_list[row_no]['from_db'] == 'Yes'){
        victim_list[row_no]['soft_delete'] = "Yes";
    }else{
        victim_list.splice(row_no, 1);
    }
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

// Add Victim Statement
function add_vic_statement(){
    cur_vic_index -= 1;
    victim_list[cur_vic_index].victim_statement = "<td>"+ $("#victimstatement").val() +"</td>";
    $("#victim_table").html(build_rows_vic(victim_list));
    $("#victimstatement").val("");
}

function reset_vic(){
    set_select("victim_gender", "");
    set_select("victim_agetype", "");
    set_select("victim_reltype", "0");

    set_select("victim_country", "80");
    set_select("victim_state", "");
    reset_select("victim_district", "Select District")
    reset_select("victim_ps", "Select Police Station")
    set_select("victim_nationality", "80");

    reset_text(["victim_name", "victim_relname", "victim_dob", "victim_yob", "victim_ageyear", "victim_agemonth", "victim_agefrom", "victim_ageto",
    "victim_address", "victim_sameasaddress"]);
    reset_radio(["addvictimtype1", "victimtype2", "victimmedical2", "victimsameasper1"]);
    $("#victim_agetype").change();
    $("#victim_addRow").parent().attr("style", "display:block");
    $("#victim_updateRow").parent().attr("style", "display:none");
    $("#victim_cancelRow").parent().attr("style", "display:none");
}


function load_vic(row){
    show();
    $("#victim_name").val(row.victimname.replace("<td>","").replace("</td>",""));
    $("#victim_address").val(row.victimaddress.replace("<td>","").replace("</td>",""));
    $("#victim_dob").val(row.vic_dob.replace("<td>","").replace("</td>",""));
    $("#victim_yob").val(row.vic_yob.replace("<td>","").replace("</td>",""));
    $("#victim_ageyear").val(row.vic_ageyear.replace("<td>","").replace("</td>",""));
    $("#victim_agemonth").val(row.vic_agemonth.replace("<td>","").replace("</td>",""));
    $("#victim_agefrom").val(row.vic_agefrom.replace("<td>","").replace("</td>",""));
    $("#victim_ageto").val(row.vic_ageto.replace("<td>","").replace("</td>",""));

    $("#victim_relname").val(row.vic_relativename.replace("<td>","").replace("</td>",""));

    $("#victim_gender").val(row.vic_gender_val).trigger("change");
    $("#victim_occupation").val(row.vic_occupation_val).trigger("change");

    $("#victim_religion").val(row.vic_religion_val).trigger("change");
    $("#victim_castecat").val(row.vic_caste_val).trigger("change");
    $("#victim_injury").val(row.vic_injury_val).trigger("change");
    $("#victim_reco").val(row.vic_recovery_val).trigger("change");

    $("#victim_reltype").val(row.vic_rel_type_val).trigger("change");

    $("#victim_agetype").val(row.vic_agetype_val).trigger("change");$("#victim_agetype").click();
    $("#victim_ageproof").val(row.vic_age_proof_val).trigger("change");
    $("#victim_agedetails").val(row.vic_age_details);

    $("#victim_country").val(row.vic_country_val).trigger("change");
    $("#victim_state").val(row.vic_state_val).trigger("change");
    load_district_ps("victim_district", "victim_ps", row.vic_state_val, row.vic_district_val, row.vic_ps_val, row.vic_sameasper, "victimsameasper1");
    $("#victim_nationality").val(row.vic_nationality_val).trigger("change");
    if(row.vic_type=="Known"){
        $('#addvictimtype1').click();
    }else{
        $('#addvictimtype2').click();
    }
    if(row.vic_type_category=="Adult"){
        $('#victimtype2').click();
        enable_disable_juvage(true);
    }else{
        $('#victimtype1').click();
        enable_disable_juvage(false);
    }

    if(row.vic_medical=="Yes"){
        $('#victimmedical1').click();
    }else{
        $('#victimmedical2').click();
    }
    if(row.vic_sameasper=="No"){
        $('#victimsameasper2').click();
        $("#victim_sameasaddress").val(row.victimaddress.replace("<td>","").replace("</td>",""));
        $("#victim_sameascountry").val(row.vic_country_same_val).trigger("change");
        $("#victim_sameasstate").val(row.vic_state_same_val).trigger("change");
        load_district_ps("victim_sameasdistrict", "victim_sameasps", row.vic_state_same_val, row.vic_district_same_val, row.vic_ps_same_val, row.vic_sameasper, "victimsameasper1");
    }
    hide();
}

// Witness Add & Delete
// Loads rows in to table
function build_rows_witness(witness_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Witness Name</th> <th>Relative Name</th> <th>PS</th><th>Edit</th> <th>Delete</th></thead>"
    witness_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' onclick='edit_witness_row(\"witness_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_witness_row(\"witness_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.witness_name+row.witness_relativename+row.witness_ps+edit_button+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_witness_list(row_id, from='insert'){
    witness_name = "<td>"+$("#witnes_name").val()+"</td>";
    witness_address = "<td>"+$("#witnes_address").val()+"</td>";
    witness_type = $("#witnes_type").find(":selected").text();
    witn_evid_tender_cd = $("#witnes_type").find(":selected").val();

    witness_rel_type = $("#witness_reltype").find(":selected").text();
    witness_rel_type_val = $("#witness_reltype").find(":selected").val();
    witness_relativename = "<td>"+$("#witness_relname").val()+"</td>";

    witness_evidence = $("#witnes_evidence").find(":selected").text();
    witness_evidence_val = $("#witnes_evidence").find(":selected").val();
    witness_country = $("#witness_country").find(":selected").text();
    witness_country_val = $("#witness_country").find(":selected").val();
    witness_state = $("#witnes_state").find(":selected").text();
    witness_state_val = $("#witnes_state").find(":selected").val();
    witness_district = $("#witnes_district").find(":selected").text();
    witness_district_val = $("#witnes_district").find(":selected").val();
    witness_ps_val = $("#witnes_ps").find(":selected").val();
    witness_ps = "<td>"+$("#witnes_ps").find(":selected").text()+"</td>";
    witness_samecountry_val = $("#witnes_samecountry").find(":selected").val();
    witness_samestate_val = $("#witnes_samestate").find(":selected").val();
    witness_samedistrict_val = $("#witnes_samedistrict").find(":selected").val();
    witness_sameps_val = $("#witnes_sameps").find(":selected").val();
    witness_nationality = $("#witnes_nationality").find(":selected").text();
    witness_nationality_val = $("#witnes_nationality").find(":selected").val();
    witness_statement = $('#witnes_statement').val();
    witness_agetype = $("#witnes_agetype").find(":selected").text();
    witness_agetype_val = $("#witnes_agetype").find(":selected").val();
    witness_dob = $('#witnes_dob').val();
    witness_yob = $('#witnes_yob').val();
    witness_ageyear = $('#witnes_ageyear').val();
    witness_agemonth = $('#witnes_agemonth').val();
    witness_agefrom = $('#witnes_agefrom').val();
    witness_ageto = $('#witnes_ageto').val();
    witness_sameaddress = $('#witnessaddress2').val();
    witness_sameasper = $('input[name="witnesssameasper"]:checked').val();
    found = witness_list.some(el => el.witness_name == witness_name && el.witness_address == witness_address)
    if(found && from != 'update'){return 0;}
    witness_list[row_id] = {'witness_name': witness_name, 'witness_address': witness_address, 'witness_type': witness_type, 'witness_evidence': witness_evidence,
    'witness_rel_type': witness_rel_type, 'witness_rel_type_val': witness_rel_type_val, 'witness_relativename': witness_relativename, 
    'witn_evid_tender_cd': witn_evid_tender_cd, 'witness_evidence_val':witness_evidence_val, 'witness_country_val': witness_country_val, 'witness_state_val': witness_state_val,
    'witness_country': witness_country, 'witness_state': witness_state, 'witness_district': witness_district, 'witness_ps': witness_ps, 'witness_nationality': witness_nationality,
    'witness_statement': witness_statement, 'witness_agetype': witness_agetype, 'witness_dob': witness_dob, 'witness_yob': witness_yob, 'witness_ageyear': witness_ageyear,
    'witness_agemonth': witness_agemonth, 'witness_agefrom': witness_agefrom, 'witness_ageto': witness_ageto, 'witness_agetype_val': witness_agetype_val,
    'witness_district_val': witness_district_val, 'witness_nationality_val': witness_nationality_val, 'witness_ps_val': witness_ps_val, 'witness_samecountry_val':witness_samecountry_val,
    'witness_samestate_val': witness_samestate_val, 'witness_samedistrict_val': witness_samedistrict_val, 'witness_sameps_val': witness_sameps_val,
    'witness_sameaddress': witness_sameaddress, 'witness_sameasper': witness_sameasper}
    html = build_rows_witness(witness_list);
    $("#witness_table").html(html);
    reset_witness();
}

$('#add_witness').click(function(){

    if($("#witnes_name").val() == "")
    {
        $('#witnes_name').css('border-color', 'red');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = " Enter Witness Name";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }

    else if($("#witnes_type").find(":selected").val() == "" )
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', 'red');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "Select Witness Type";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witnes_evidence").find(":selected").val() == "")
{

        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', 'red');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "Select Evidence Type";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witnes_agetype").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', 'red');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "Enter Witness YOB";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }

    else if($("#witnes_yob").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', 'red');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "Enter Witness Address";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
// Accused Address Check

    else if($("#witnes_address").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', 'red');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "Select Witness Country";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witness_country").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', 'red');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "Select Witness State";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }

    else if($("#witnes_state").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', 'red');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = " Select Witness District";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witnes_district").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', 'red');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "Select Witness PS";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witnes_ps").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', 'red');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "Select Witness Address";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
// Accused Same Address Check
    else if($("#witnessaddress2").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', 'red');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "Select Witness Country";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witnes_samecountry").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', 'red');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "Select Witness District";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }

    else if($("#witnes_samestate").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', 'red');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "Select Witness District";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witnes_samedistrict").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', 'red');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "Select Witness District";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
    else if($("#witnes_sameps").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', 'red');
        $('#witnes_nationality').css('border-color', '');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "Select Witness PS";
    document.getElementById("witnes_nationality_error").innerHTML = "";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }
// Accused Nationality Check
    else if($("#witnes_nationality").find(":selected").val() == "")
{
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', 'red');

    document.getElementById("witnes_name_error").innerHTML = "";
    document.getElementById("witnes_type_error").innerHTML = "";
    document.getElementById("witnes_evidence_error").innerHTML = "";
    document.getElementById("witnes_yob_error").innerHTML = "";
    document.getElementById("witnes_address_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";        
    document.getElementById("witnes_state_error").innerHTML = "";
    document.getElementById("witnes_district_error").innerHTML = "";
    document.getElementById("witnes_ps_error").innerHTML = "";
    document.getElementById("witnessaddress2_error").innerHTML = "";
    document.getElementById("witnes_samecountry_error").innerHTML = "";
    document.getElementById("witnes_samestate_error").innerHTML = "";
    document.getElementById("witnes_samedistrict_error").innerHTML = "";
    document.getElementById("witnes_sameps_error").innerHTML = "";
    document.getElementById("witnes_nationality_error").innerHTML = "Select Witness Nationality";
    document.getElementById("witnes_statement_error").innerHTML = "";

        return 0;
    }

else
{    
        $('#witnes_name').css('border-color', '');
        $('#witnes_type').css('border-color', '');
        $('#witnes_evidence').css('border-color', '');
        $('#witnes_agetype').css('border-color', '');
        $('#witnes_yob').css('border-color', '');
        $('#witnes_address').css('border-color', '');
        $('#witness_country').css('border-color', '');
        $('#witnes_state').css('border-color', '');
        $('#witnes_district').css('border-color', '');
        $('#witnes_ps').css('border-color', '');
        $('#witnessaddress2').css('border-color', '');
        $('#witnes_samecountry').css('border-color', '');
        $('#witnes_samestate').css('border-color', '');
        $('#witnes_samedistrict').css('border-color', '');
        $('#witnes_sameps').css('border-color', '');
        $('#witnes_nationality').css('border-color', '');

    create_witness_list(witness_list.length);
}

});

// Deletes the row from a given data table
function delete_witness_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    witness_list.splice(row_no, 1);
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
    create_witness_list(row_id, from='update');
}

function reset_witness(){
    set_select("witnes_type", "");
    set_select("witnes_evidence", "");
    set_select("witness_reltype", "0");
    set_select("witnes_agetype", ""); $("#witnes_agetype").click();

    set_select("witness_country", "80");
    set_select("witnes_state", "");
    reset_select("witnes_district", "Select District");
    reset_select("witnes_ps", "Select Police Station");
    reset_select("witnes_samedistrict", "Select District");
    reset_select("witnes_sameps", "Select Police Station");
    set_select("witnes_nationality", "80");
    set_select("witnes_samecountry", "");
    set_select("witnes_samestate", "");
    reset_radio(["witnesssameasper1"]);
    reset_text(["witnes_name", "witnes_dob", "witness_relname", "witnes_yob", "witnes_ageyear", "witnes_agemonth", "witnes_agefrom", "witnes_ageto",
    "witnes_address", "witnes_statement", "witnessaddress2"]);
    $("#add_witness").parent().attr("style", "display:block");
    $("#update_witness").parent().attr("style", "display:none");
    $("#cancel_witness").parent().attr("style", "display:none");
}


function load_witness(row){

    $("#witnes_name").val(row.witness_name.replace("<td>","").replace("</td>",""));
    $("#witnes_address").val(row.witness_address.replace("<td>","").replace("</td>",""));
    $("#witnes_dob").val(row.witness_dob.replace("<td>","").replace("</td>",""));
    $("#witnes_yob").val(row.witness_yob.replace("<td>","").replace("</td>",""));
    $("#witnes_ageyear").val(row.witness_ageyear.replace("<td>","").replace("</td>",""));
    $("#witnes_agemonth").val(row.witness_agemonth.replace("<td>","").replace("</td>",""));
    $("#witnes_agefrom").val(row.witness_agefrom.replace("<td>","").replace("</td>",""));
    $("#witnes_ageto").val(row.witness_ageto.replace("<td>","").replace("</td>",""));
    $("#witnes_statement").val(row.witness_statement.replace("<td>","").replace("</td>",""));
    $('#witnessaddress2').val(row.witness_sameaddress);
    $("#witnes_type").val(row.witn_evid_tender_cd).trigger("change");

    $("#witness_reltype").val(row.witness_rel_type_val).trigger("change");
    $("#witness_relname").val(row.witness_relativename.replace("<td>","").replace("</td>",""));

    $("#witnes_evidence").val(row.witness_evidence_val).trigger("change");
    $("#witnes_agetype").val(row.witness_agetype_val).trigger("change");$("#witnes_agetype").click();
    $("#witness_country").val(row.witness_country_val).trigger("change");
    $("#witnes_state").val(row.witness_state_val).trigger("blur");
    load_district_ps("witnes_district", "witnes_ps", row.witness_state_val, row.witness_district_val, row.witness_ps_val, row.witness_sameasper, "witnesssameasper1");
    $("#witnes_nationality").val(row.witness_nationality_val).trigger("change");
    if(row.witness_sameasper=="No"){
        $('#witnesssameasper2').click();
        $("#witnessaddress2").val(row.witness_sameaddress.replace("<td>","").replace("</td>",""));
        $("#witnes_samecountry").val(row.witness_samecountry_val).trigger("change");
        $("#witnes_samestate").val(row.witness_samestate_val).trigger("blur");
        load_district_ps("witnes_samedistrict", "witnes_sameps", row.witness_samestate_val, row.witness_samedistrict_val, row.witness_sameps_val, row.witness_sameasper, "witnesssameasper1");
    }
}


// Property Add & Delete
// Loads rows in to table
function build_rows_property(property_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Stolen Property</th> <th>Value</th><th>Qty</th><th>Edit</th> <th>Delete</th></thead>"
    property_list.forEach(function(row, index){
        index += 1;
        edit_button = "<th><a class='delete' title='Edit' onclick='edit_property_row(\"property_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></th>";
        delete_button = "<th><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_property_row(\"property_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></th>";
        no = '<th>'+index+'</th>'
        html = '<tr id="'+index+'">'+no+row.category+row.value+row.qty+edit_button+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_property_list(row_id, from='insert'){
    property = {};
    category_case = $("#stolenproperty").find(":selected").text();
    category = "<td>"+$("#stolenproperty").find(":selected").text()+"</td>";
    category_val = $("#stolenproperty").find(":selected").val();
    switch(category_case){
        case "ARMS AND AMMUNITION":
            arms_category_val = $("#armscat").find(":selected").val();
            arms_type_val = $("#armstype").find(":selected").val();
            arms_subtype_val = $("#armssubtype").find(":selected").val();
            arms_made = $("#armsmade").find(":selected").val();
            arms_bore = $("#armsbore").find(":selected").val();
            qty = "<td>"+$("#armsqty").val()+"</td>";
            value = "<td>"+$("#armsestimate").val()+"</td>";
            arms_identity = $("#armsidentity").val();
            arms_insurance = $("#armsinsurance").val();
            arms_model = $("#armsmodel").val();
            arms_country_val = $("#armscountry").find(":selected").val();
            arms_manufacture_val = $("#armsmfd").find(":selected").val();
            arms_propertybelong_val = $("#armspropbelong").find(":selected").val();
            property = {'category': category, 'category_val': category_val, 'arms_type_val': arms_type_val, 'arms_subtype_val': arms_subtype_val,
            'arms_made': arms_made, 'arms_bore': arms_bore, 'qty': qty, 'value': value, 'arms_identity': arms_identity, 'arms_insurance': arms_insurance,
            'arms_model': arms_model, 'arms_country_val': arms_country_val, 'arms_manufacture_val': arms_manufacture_val, 'arms_propertybelong_val': arms_propertybelong_val,
            'arms_category_val': arms_category_val};
            break;
        case "AUTOMOBILES AND OTHERS":
            auto_type = $("#autotype").find(":selected").val();
            auto_make = $("#automake").find(":selected").val();
            auto_model = $("#automodel").find(":selected").val();
            value = "<td>"+$("#autoestimate").val()+"</td>";
            auto_regdt = $("#autoregistrationdate").val();
            qty = "<td>"+$("#autochasisno").val()+"</td>";
            autoenginenumber = $("#autoenginenumber").val();
            autoregnumber = $("#autoregnumber").val();
            is_auto_regnum = $('input[name="isregnoknown"]:checked').val();
            is_auto_chasisnum = $('input[name="ischasisnoknown"]:checked').val();
            is_auto_enginenum = $('input[name="isenginenoknown"]:checked').val();

            property = {'category': category, 'category_val': category_val, 'auto_type': auto_type, 'auto_make': auto_make,
            'auto_model': auto_model, 'value': value, 'auto_regdt': auto_regdt, 'qty': qty, 'autoregnumber': autoregnumber, 
            'autoenginenumber': autoenginenumber, 'is_auto_regnum': is_auto_regnum, 'is_auto_chasisnum': is_auto_chasisnum, 'is_auto_enginenum': is_auto_enginenum};
            break;
        case "COIN AND CURRENCY":
            currency_type = $("#cointype").find(":selected").val();
            country = $("#coincountry").find(":selected").val();
            qty = "<td>"+$("#coinpieces").val()+"</td>";
            series = $("#coinseries").val();
            serial_from = $("#coinserialnofrom").val();
            serial_to = $("#coinserialnoto").val();
            denomination = $("#coindenomination").val();
            value = "<td>"+$("#coinestimate").val()+"</td>";
            watermark = $('input[name="coinwatermark"]:checked').val();
            ashokpilar = $('input[name="coinashokpiller"]:checked').val();
            mgmark = $('input[name="coinmgmark"]:checked').val();
            flour = $('input[name="coinflouroscent"]:checked').val();
            sec_thread = $('input[name="coinsecuritythread"]:checked').val();
            crak_sound = $('input[name="coincrackingsound"]:checked').val();
            property = {'category': category, 'category_val': category_val, 'currency_type': currency_type, 'country': country,
            'series': series, 'value': value, 'serial_from': serial_from, 'qty': qty, 'denomination':denomination, 'watermark': watermark,
            'ashokpilar': ashokpilar, 'mgmark': mgmark, 'flour': flour, 'sec_thread': sec_thread, 'crak_sound': crak_sound, 'serial_to': serial_to};
            break;
        case "CULTURAL PROPERTY":
            cultural_type = $("#culturaltype").find(":selected").val();
            value = "<td>"+$("#culturalestimate").val()+"</td>";
            qty = "<td></td>";
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'cultural_type': cultural_type};
            break;
        case "DOCUMENTS AND VALUABLE SECURITIES":
            doc_type = $("#documenttype").find(":selected").val();
            value = "<td>"+$("#documentestimate").val()+"</td>";
            qty = "<td></td>";
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'doc_type': doc_type}
            break;
        case "DRUGS/NARCOTIC DRUGS":
            drug_name = $("#drugname").find(":selected").val();
            concealment = $("#drugconcealment").find(":selected").val();
            value = "<td>"+$("#drugestimate").val()+"</td>";
            qty = "<td>"+$("#drugnoofpacket").val()+"</td>";
            weight = $("#drugweight").val();
            druginterogationdetail = $("#druginterogationdetail").val();
            drugnotice = $('input[name="drugnotice"]:checked').val();
            druglabanalysis = $('input[name="druglabanalysis"]:checked').val();
            drugcarrier = $('input[name="drugcarrier"]:checked').val();
            drugaccusedmember = $('input[name="drugaccusedmember"]:checked').val();
            drugdetained = $('input[name="drugdetained"]:checked').val();
            drugemergency = $('input[name="drugemergency"]:checked').val();
            drugjointinterrogation = $('input[name="drugjointinterrogation"]:checked').val();
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'drug_name': drug_name,
            'concealment': concealment, 'weight': weight, 'druginterogationdetail': druginterogationdetail, 'drugnotice': drugnotice,
            'druglabanalysis': druglabanalysis, 'drugcarrier': drugcarrier, 'drugaccusedmember': drugaccusedmember, 'drugdetained':drugdetained,
            'drugemergency': drugemergency, 'drugjointinterrogation': drugjointinterrogation};
            break;
        case "ELECTRICAL AND ELECTRONIC GOODS":
            electronicitemname = $("#electronicitemname").find(":selected").val();
            value = "<td>"+$("#electronicestimate").val()+"</td>";
            qty = "<td>"+$("#electronicqty").val()+"</td>";
            electronicmake = $("#electronicmake").val();
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'electronicitemname': electronicitemname,
            'electronicmake': electronicmake};
            break;
        case "EXPLOSIVES":
            explosivetype = $("#explosivetype").find(":selected").val();
            explosivechemical = $("#explosivechemical").find(":selected").val();
            value = "<td>"+$("#explosiveestimate").val()+"</td>";
            qty = "<td>"+$("#explosiveqtyingms").val()+"</td>";
            explosivesource = $("#explosivesource").val();
            explosivesenttofsl = $('input[name="explosivesenttofsl"]:checked').val();
            explosivedestroyed = $('input[name="explosivedestroyed"]:checked').val();
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'explosivetype': explosivetype,
            'explosivechemical': explosivechemical, 'explosivesource': explosivesource, 'explosivesenttofsl': explosivesenttofsl,
            'explosivedestroyed': explosivedestroyed};
            break;
        case "JEWELLERY":
            jewellerytype = $("#jewellerytype").find(":selected").val();
            value = "<td>"+$("#jewelleryestimate").val()+"</td>";
            qty = "<td>"+$("#jewelleryqty").val()+"</td>";
            jewellerydescription = $("#jewellerydescription").val();
            jewelleryweightingms = $("#jewelleryweightingms").val();
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'jewellerytype': jewellerytype,
            'jewellerydescription': jewellerydescription, 'jewelleryweightingms': jewelleryweightingms};
            break;
        case "WILD LIFE":
            speciestype = $("#speciestype").find(":selected").val();
            value = "<td>0</td>";
            qty = "<td>0</td>";
            if (speciestype == '1')
            {
              abcspeciestype = $("#abcspeciestype").find(":selected").val();
            }
            else{
              abcspeciestype = ''
            }
            wildbodyrecovered_text = $("#wildbodyrecovered").find(":selected").text();
            wildbodyrecovered = $("#wildbodyrecovered").find(":selected").val();

            if (wildbodyrecovered_text == 'Others')
            {
              wildotherdesc = $("#wildotherdesc").val();
            }
            else{
              wildotherdesc = ''
            }
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'speciestype': speciestype,
            'abcspeciestype': abcspeciestype, 'wildbodyrecovered': wildbodyrecovered, 'wildotherdesc': wildotherdesc};
            break;
        case "CYBER CRIME":
            istengible = $('input[name="istengible"]:checked').val();
            cybercontent = $("#cybercontent").find(":selected").val();
            value = "<td>0</td>";
            qty = "<td>0</td>";

            cybersysinfo = $('input[name="cybersysinfo"]:checked').val();
            if (cybersysinfo == 'Y') {
              cyberdigitalmedia = $('input[name="cyberdigitalmedia"]:checked').val();
            }
            else{
              cyberdigitalmedia = ''
            }

            cyberevidencedrive = $('input[name="cyberevidencedrive"]:checked').val();

            if (cyberevidencedrive == 'Y') {
              cybermediatype = $("#cybermediatype").find(":selected").val();
              cyberhddtype = $("#cyberhddtype").find(":selected").val();
              ifdriveimaged = $('input[name="ifdriveimaged"]:checked').val();
            }
            else{
              cybermediatype = ''
              cyberhddtype = ''
              ifdriveimaged = ''
            }

            cyberaquisitiondetail = $('input[name="cyberaquisitiondetail"]:checked').val();
            
            if (cyberaquisitiondetail == 'Y')
            {
              cyberforensicaquisition = $("#cyberforensicaquisition").find(":selected").val();
              cyberaquiredby = $("#cyberaquiredby").val();
              cyberprotdevicetype = $("#cyberprotdevicetype").val();
              cyberaquisitiondate = $("#cyberaquisitiondate").val();
              cybernetworkaquisition = $('input[name="cybernetworkaquisition"]:checked').val();
            }
            else{
              cyberforensicaquisition = ''
              cyberaquiredby = ''
              cyberprotdevicetype = ''
              cyberaquisitiondate = ''
              cybernetworkaquisition = ''
            }
            cyberismobiledevice = $('input[name="cyberismobiledevice"]:checked').val();

            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'istengible': istengible,
            'cybercontent': cybercontent, 'cybersysinfo': cybersysinfo, 'cyberdigitalmedia': cyberdigitalmedia,
            'cyberevidencedrive': cyberevidencedrive, 'cybermediatype': cybermediatype, 'cyberhddtype': cyberhddtype,
            'ifdriveimaged': ifdriveimaged, 'cyberaquisitiondetail': cyberaquisitiondetail, 'cyberforensicaquisition': cyberforensicaquisition,
            'cyberaquiredby': cyberaquiredby, 'cyberprotdevicetype': cyberprotdevicetype, 'cyberaquisitiondate': cyberaquisitiondate, 
            'cybernetworkaquisition': cybernetworkaquisition, 'cyberismobiledevice': cyberismobiledevice};
            break;
        case "OTHERS":
            value = "<td>"+$("#otherslostvalue").val()+"</td>";
            qty = "<td></td>";
            othersdescription = $("#othersdescription").val();
            property = {'category': category, 'category_val': category_val, 'value': value, 'qty': qty, 'othersdescription': othersdescription};
            break;
    }
//    found = property_list.some(el => el.witness_name == witness_name && el.witness_address == witness_address)
//    if(found && from != 'update'){return 0;}
    property_list[row_id] = property;
    html = build_rows_property(property_list);
    $("#property_table").html(html);
    reset_property();
}

$('#add_property').click(function(){
    if($("#stolenproperty").val() == 4)
    {
    if($("#armscat").val() == "")
    {
        $('#armscat').css('border-color', 'red');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "Select Arms Category";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armstype").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', 'red');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "Select Arms Type";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armssubtype").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', 'red');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "Select Arms SubType";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armsmade").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', 'red');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "Select Arms Make";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armsbore").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', 'red');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "Select Arms SubType";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }

    else if($("#armsqty").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', 'red');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "Enter Quantity";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armsidentity").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', 'red');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "Enter Identity Marks";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armsinsurance").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', 'red');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "Enter Insurance No.";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armscountry").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', 'red');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "Select Country";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armsestimate").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', 'red');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "Enter Estimated Value";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armsmfd").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', 'red');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "Select Arms Manufacturer";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armsmodel").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', 'red');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "Enter Model";
        document.getElementById("armspropbelong_error").innerHTML = "";
        return 0;
    }
    else if($("#armspropbelong").val() == "")
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', 'red');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "Select Arms Belongs To";
        return 0;
    }
    else
    {
        $('#armscat').css('border-color', '');
        $('#armstype').css('border-color', '');
        $('#armssubtype').css('border-color', '');
        $('#armsmade').css('border-color', '');
        $('#armsbore').css('border-color', '');
        $('#armsqty').css('border-color', '');
        $('#armsidentity').css('border-color', '');
        $('#armsinsurance').css('border-color', '');
        $('#armscountry').css('border-color', '');
        $('#armsestimate').css('border-color', '');
        $('#armsmfd').css('border-color', '');
        $('#armsmodel').css('border-color', '');
        $('#armspropbelong').css('border-color', '');

        document.getElementById("armscat_error").innerHTML = "";
        document.getElementById("armstype_error").innerHTML = "";
        document.getElementById("armssubtype_error").innerHTML = "";
        document.getElementById("armsmade_error").innerHTML = "";
        document.getElementById("armsbore_error").innerHTML = "";
        document.getElementById("armsqty_error").innerHTML = "";
        document.getElementById("armsidentity_error").innerHTML = "";
        document.getElementById("armsinsurance_error").innerHTML = "";
        document.getElementById("armscountry_error").innerHTML = "";
        document.getElementById("armsestimate_error").innerHTML = "";
        document.getElementById("armsmfd_error").innerHTML = "";
        document.getElementById("armsmodel_error").innerHTML = "";
        document.getElementById("armspropbelong_error").innerHTML = "";
        create_property_list(property_list.length);

    }
}

if($("#stolenproperty").val() == 9)
{
    if($("#autotype").val() == "")
    {
        $('#autotype').css('border-color', 'red');
        $('#autoestimate').css('border-color', '');
        $('#automake').css('border-color', '');
        $('#automodel').css('border-color', '');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', '');
        $('#autochasisno').css('border-color', '');
        $('#autoenginenumber').css('border-color', '');        

        document.getElementById("autotype_error").innerHTML = "Select Auto Type";
        document.getElementById("autoestimate_error").innerHTML = "";
        document.getElementById("automake_error").innerHTML = "";
        document.getElementById("automodel_error").innerHTML = "";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "";
        document.getElementById("autoenginenumber_error").innerHTML = "";
        document.getElementById("autochasisno_error").innerHTML = "";
        return 0;
    }

    else if($("#autoestimate").val() == "")
    {
        $('#autotype').css('border-color', '');
        $('#autoestimate').css('border-color', 'red');
        $('#automake').css('border-color', '');
        $('#automodel').css('border-color', '');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', '');
        $('#autochasisno').css('border-color', '');
        $('#autoenginenumber').css('border-color', '');        

        document.getElementById("autotype_error").innerHTML = "";
        document.getElementById("autoestimate_error").innerHTML = "Enter Estimated Value";
        document.getElementById("automake_error").innerHTML = "";
        document.getElementById("automodel_error").innerHTML = "";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "";
        document.getElementById("autoenginenumber_error").innerHTML = "";
        document.getElementById("autochasisno_error").innerHTML = "";
        return 0;
    }
    else if($("#automake").val() == "")
    {
        $('#autotype').css('border-color', '');
        $('#autoestimate').css('border-color', '');
        $('#automake').css('border-color', 'red');
        $('#automodel').css('border-color', '');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', '');
        $('#autochasisno').css('border-color', '');
        $('#autoenginenumber').css('border-color', '');

        document.getElementById("autotype_error").innerHTML = "";
        document.getElementById("autoestimate_error").innerHTML = "";
        document.getElementById("automake_error").innerHTML = "Select Auto Make";
        document.getElementById("automodel_error").innerHTML = "";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "";
        document.getElementById("autoenginenumber_error").innerHTML = "";
        document.getElementById("autochasisno_error").innerHTML = "";
        return 0;
    }

    else if($("#automodel").val() == "")
    {
        $('#autotype').css('border-color', '');
        $('#autoestimate').css('border-color', '');
        $('#automake').css('border-color', '');
        $('#automodel').css('border-color', 'red');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', '');
        $('#autochasisno').css('border-color', '');
        $('#autoenginenumber').css('border-color', '');

        document.getElementById("autotype_error").innerHTML = "";
        document.getElementById("autoestimate_error").innerHTML = "";
        document.getElementById("automake_error").innerHTML = "";
        document.getElementById("automodel_error").innerHTML = "Select Model";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "";
        document.getElementById("autoenginenumber_error").innerHTML = "";
        document.getElementById("autochasisno_error").innerHTML = "";
        return 0;
    }


    else if($('input[name="isregnoknown"]:checked').val() == 'Y' &&  $("#autoregnumber").val() == "")
    {
        $('#autotype').css('border-color', '');
        $('#autoestimate').css('border-color', '');
        $('#automake').css('border-color', '');
        $('#automodel').css('border-color', '');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', 'red');
        $('#autochasisno').css('border-color', '');
        $('#autoenginenumber').css('border-color', '');        

        document.getElementById("autotype_error").innerHTML = "";
        document.getElementById("autoestimate_error").innerHTML = "";
        document.getElementById("automake_error").innerHTML = "";
        document.getElementById("automodel_error").innerHTML = "";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "Enter Registration No";
        document.getElementById("autoenginenumber_error").innerHTML = "";
        document.getElementById("autochasisno_error").innerHTML = "";
        return 0;
    }

    else if($('input[name="ischasisnoknown"]:checked').val() == 'Y' &&  $("#autochasisno").val() == "")
    {
        $('#autotype').css('border-color', '');
        $('#autoestimate').css('border-color', '');
        $('#automake').css('border-color', '');
        $('#automodel').css('border-color', '');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', '');
        $('#autochasisno').css('border-color', 'red');
        $('#autoenginenumber').css('border-color', '');

        document.getElementById("autotype_error").innerHTML = "";
        document.getElementById("autoestimate_error").innerHTML = "";
        document.getElementById("automake_error").innerHTML = "";
        document.getElementById("automodel_error").innerHTML = "";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "";
        document.getElementById("autoenginenumber_error").innerHTML = "";
        document.getElementById("autochasisno_error").innerHTML = "Enter Chasis No";
        return 0;
    }

    else if($('input[name="isenginenoknown"]:checked').val() == 'Y' &&  $("#autoenginenumber").val() == "")
    {
        $('#autotype').css('border-color', '');
        $('#autoestimate').css('border-color', '');
        $('#automake').css('border-color', '');
        $('#automodel').css('border-color', '');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', '');
        $('#autochasisno').css('border-color', '');
        $('#autoenginenumber').css('border-color', 'red');

        document.getElementById("autotype_error").innerHTML = "";
        document.getElementById("autoestimate_error").innerHTML = "";
        document.getElementById("automake_error").innerHTML = "";
        document.getElementById("automodel_error").innerHTML = "";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "";
        document.getElementById("autoenginenumber_error").innerHTML = "Enter Engine No";
        document.getElementById("autochasisno_error").innerHTML = "";
        return 0;
    }

    else
    {
        $('#autotype').css('border-color', '');
        $('#autoestimate').css('border-color', '');
        $('#automake').css('border-color', '');
        $('#automodel').css('border-color', '');
        $('#autoregistrationdate').css('border-color', '');
        $('#autoregnumber').css('border-color', '');
        $('#autochasisno').css('border-color', '');
        $('#autoenginenumber').css('border-color', '');

        document.getElementById("autotype_error").innerHTML = "";
        document.getElementById("autoestimate_error").innerHTML = "";
        document.getElementById("automake_error").innerHTML = "";
        document.getElementById("automodel_error").innerHTML = "";
        document.getElementById("autoregistrationdate_error").innerHTML = "";
        document.getElementById("autoregnumber_error").innerHTML = "";
        document.getElementById("autoenginenumber_error").innerHTML = "";
        document.getElementById("autochasisno_error").innerHTML = "";
        create_property_list(property_list.length);
    }

}

else if($("#stolenproperty").val() == 8)
{
    if($("#cointype").val() == "")
    {
        $('#cointype').css('border-color', 'red');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "Select Currency Type";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "";
    }
    else if($("#coincountry").val() == "")
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', 'red');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "Select Country";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "";
    }
    else if($("#coinpieces").val() == "")
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', 'red');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "Enter Pieces";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "";
    }
    else if($("#coinseries").val() == "")
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', 'red');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "Enter Series";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "";
    }
    else if($("#coinserialnofrom").val() == "")
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', 'red');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "Enter Serial No.";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "";
    }
    else if($("#coinserialnoto").val() == "")
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', 'red');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "Enter Serial No.";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "";
    }
    else if($("#coindenomination").val() == "")
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', 'red');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "Enter Denomination";
        document.getElementById("coinestimate_error").innerHTML = "";
    }
    else if($("#coinestimate").val() == "")
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', 'red');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "Enter Estimated Value";
    }
    else
    {
        $('#cointype').css('border-color', '');
        $('#coincountry').css('border-color', '');
        $('#coinpieces').css('border-color', '');
        $('#coinseries').css('border-color', '');
        $('#coinserialnofrom').css('border-color', '');
        $('#coinserialnoto').css('border-color', '');
        $('#coindenomination').css('border-color', '');
        $('#coinestimate').css('border-color', '');

        document.getElementById("cointype_error").innerHTML = "";
        document.getElementById("coincountry_error").innerHTML = "";
        document.getElementById("coinpieces_error").innerHTML = "";
        document.getElementById("coinseries_error").innerHTML = "";
        document.getElementById("coinserialnofrom_error").innerHTML = "";
        document.getElementById("coinserialnoto_error").innerHTML = "";
        document.getElementById("coindenomination_error").innerHTML = "";
        document.getElementById("coinestimate_error").innerHTML = "";
        create_property_list(property_list.length);
    }

}

else if($("#stolenproperty").val() == 10)
{
    if($("#culturaltype").val() == "")
    {
        $('#culturaltype').css('border-color', 'red');
        $('#culturalestimate').css('border-color', '');

        document.getElementById("culturaltype_error").innerHTML = "Select Cultural Type";
        document.getElementById("culturalestimate_error").innerHTML = "";
    }
    else if($("#culturalestimate").val() == "")
    {
        $('#culturaltype').css('border-color', '');
        $('#culturalestimate').css('border-color', 'red');

        document.getElementById("culturaltype_error").innerHTML = "";
        document.getElementById("culturalestimate_error").innerHTML = "Enter Estimated Value";
    }

    else
    {
        $('#culturaltype').css('border-color', '');
        $('#culturalestimate').css('border-color', '');
        document.getElementById("culturaltype_error").innerHTML = "";
        document.getElementById("culturalestimate_error").innerHTML = "";

        create_property_list(property_list.length);
    }
}

else if($("#stolenproperty").val() == 11)
{
    if($("#documenttype").val() == "")
    {
        $('#documenttype').css('border-color', 'red');
        $('#documentestimate').css('border-color', '');

        document.getElementById("documenttype_error").innerHTML = "Select Document Type";
        document.getElementById("documentestimate_error").innerHTML = "";
    }
    else if($("#documentestimate").val() == "")
    {
        $('#documenttype').css('border-color', '');
        $('#documentestimate').css('border-color', 'red');

        document.getElementById("documenttype_error").innerHTML = "";
        document.getElementById("documentestimate_error").innerHTML = "Enter Estimated Value";
    }

    else
    {
        $('#documenttype').css('border-color', '');
        $('#documentestimate').css('border-color', '');
        document.getElementById("documenttype_error").innerHTML = "";
        document.getElementById("documentestimate_error").innerHTML = "";

        create_property_list(property_list.length);
    }
}

else if($("#stolenproperty").val() == 12)
{
    if($("#drugname").val() == "")
    {
        $('#drugname').css('border-color', 'red');
        $('#drugconcealment').css('border-color', '');
        $('#drugnoofpacket').css('border-color', '');
        $('#drugweight').css('border-color', '');
        $('#drugestimate').css('border-color', '');

        document.getElementById("drugname_error").innerHTML = "Select Drug Name";
        document.getElementById("drugconcealment_error").innerHTML = "";
        document.getElementById("drugnoofpacket_error").innerHTML = "";
        document.getElementById("drugweight_error").innerHTML = "";
        document.getElementById("drugestimate_error").innerHTML = "";
    }

    else if($("#drugconcealment").val() == "")
    {
        $('#drugname').css('border-color', '');
        $('#drugconcealment').css('border-color', 'red');
        $('#drugnoofpacket').css('border-color', '');
        $('#drugweight').css('border-color', '');
        $('#drugestimate').css('border-color', '');

        document.getElementById("drugname_error").innerHTML = "";
        document.getElementById("drugconcealment_error").innerHTML = "Select Concealment";
        document.getElementById("drugnoofpacket_error").innerHTML = "";
        document.getElementById("drugweight_error").innerHTML = "";
        document.getElementById("drugestimate_error").innerHTML = "";
    }

    else if($("#drugnoofpacket").val() == "")
    {
        $('#drugname').css('border-color', '');
        $('#drugconcealment').css('border-color', '');
        $('#drugnoofpacket').css('border-color', 'red');
        $('#drugweight').css('border-color', '');
        $('#drugestimate').css('border-color', '');

        document.getElementById("drugname_error").innerHTML = "";
        document.getElementById("drugconcealment_error").innerHTML = "";
        document.getElementById("drugnoofpacket_error").innerHTML = "Enter Pack";
        document.getElementById("drugweight_error").innerHTML = "";
        document.getElementById("drugestimate_error").innerHTML = "";
    }

    else if($("#drugweight").val() == "")
    {
        $('#drugname').css('border-color', '');
        $('#drugconcealment').css('border-color', '');
        $('#drugnoofpacket').css('border-color', '');
        $('#drugweight').css('border-color', 'red');
        $('#drugestimate').css('border-color', '');

        document.getElementById("drugname_error").innerHTML = "";
        document.getElementById("drugconcealment_error").innerHTML = "";
        document.getElementById("drugnoofpacket_error").innerHTML = "";
        document.getElementById("drugweight_error").innerHTML = "Enter Weight";
        document.getElementById("drugestimate_error").innerHTML = "";
    }

    else if($("#drugestimate").val() == "")
    {
        $('#drugname').css('border-color', '');
        $('#drugconcealment').css('border-color', '');
        $('#drugnoofpacket').css('border-color', '');
        $('#drugweight').css('border-color', '');
        $('#drugestimate').css('border-color', 'red');

        document.getElementById("drugname_error").innerHTML = "";
        document.getElementById("drugconcealment_error").innerHTML = "";
        document.getElementById("drugnoofpacket_error").innerHTML = "";
        document.getElementById("drugweight_error").innerHTML = "";
        document.getElementById("drugestimate_error").innerHTML = "Enter Estimated Value";
    }

    else
    {
        $('#drugname').css('border-color', '');
        $('#drugconcealment').css('border-color', '');
        $('#drugnoofpacket').css('border-color', '');
        $('#drugweight').css('border-color', '');
        $('#drugestimate').css('border-color', '');
        document.getElementById("drugname_error").innerHTML = "";
        document.getElementById("drugconcealment_error").innerHTML = "";
        document.getElementById("drugnoofpacket_error").innerHTML = "";
        document.getElementById("drugweight_error").innerHTML = "";
        document.getElementById("drugestimate_error").innerHTML = "";

        create_property_list(property_list.length);
    }

}

else if($("#stolenproperty").val() == 13)
{
    if($("#electronicitemname").val() == "")
    {

        $('#electronicitemname').css('border-color', 'red');
        $('#electronicqty').css('border-color', '');
        $('#electronicmake').css('border-color', '');
        $('#electronicestimate').css('border-color', '');
        document.getElementById("electronicitemname_error").innerHTML = "Select Item Name";
        document.getElementById("electronicqty_error").innerHTML = "";
        document.getElementById("electronicmake_error").innerHTML = "";
        document.getElementById("electronicestimate_error").innerHTML = "";

    }

    else if($("#electronicqty").val() == "")
    {

        $('#electronicitemname').css('border-color', '');
        $('#electronicqty').css('border-color', 'red');
        $('#electronicmake').css('border-color', '');
        $('#electronicestimate').css('border-color', '');
        document.getElementById("electronicitemname_error").innerHTML = "";
        document.getElementById("electronicqty_error").innerHTML = "Enter Qty";
        document.getElementById("electronicmake_error").innerHTML = "";
        document.getElementById("electronicestimate_error").innerHTML = "";

    }
    else if($("#electronicmake").val() == "")
    {

        $('#electronicitemname').css('border-color', '');
        $('#electronicqty').css('border-color', '');
        $('#electronicmake').css('border-color', 'red');
        $('#electronicestimate').css('border-color', '');
        document.getElementById("electronicitemname_error").innerHTML = "";
        document.getElementById("electronicqty_error").innerHTML = "";
        document.getElementById("electronicmake_error").innerHTML = "Enter Make";
        document.getElementById("electronicestimate_error").innerHTML = "";

    }

    else if($("#electronicestimate").val() == "")
    {

        $('#electronicitemname').css('border-color', '');
        $('#electronicqty').css('border-color', '');
        $('#electronicmake').css('border-color', '');
        $('#electronicestimate').css('border-color', 'red');
        document.getElementById("electronicitemname_error").innerHTML = "";
        document.getElementById("electronicqty_error").innerHTML = "";
        document.getElementById("electronicmake_error").innerHTML = "";
        document.getElementById("electronicestimate_error").innerHTML = "Enter Estimated Value";

    }

    else
    {
        $('#electronicitemname').css('border-color', '');
        $('#electronicqty').css('border-color', '');
        $('#electronicmake').css('border-color', '');
        $('#electronicestimate').css('border-color', '');
        document.getElementById("electronicitemname_error").innerHTML = "";
        document.getElementById("electronicqty_error").innerHTML = "";
        document.getElementById("electronicmake_error").innerHTML = "";
        document.getElementById("electronicestimate_error").innerHTML = "";
        create_property_list(property_list.length);
    }
}

else if($("#stolenproperty").val() == 14)
{
    if($("#explosivetype").val() == "")
    {
        $('#explosivetype').css('border-color', 'red');
        $('#explosivechemical').css('border-color', '');
        $('#explosiveqtyingms').css('border-color', '');
        $('#explosiveestimate').css('border-color', '');
        $('#explosivesource').css('border-color', '');
        document.getElementById("explosivetype_error").innerHTML = "Select Explosive Type";
        document.getElementById("explosivechemical_error").innerHTML = "";
        document.getElementById("explosiveqtyingms_error").innerHTML = "";
        document.getElementById("explosiveestimate_error").innerHTML = "";
        document.getElementById("explosivesource_error").innerHTML = "";

    }

    else if($("#explosivechemical").val() == "")
    {
        $('#explosivetype').css('border-color', '');
        $('#explosivechemical').css('border-color', 'red');
        $('#explosiveqtyingms').css('border-color', '');
        $('#explosiveestimate').css('border-color', '');
        $('#explosivesource').css('border-color', '');
        document.getElementById("explosivetype_error").innerHTML = "";
        document.getElementById("explosivechemical_error").innerHTML = "Select Chemical Type";
        document.getElementById("explosiveqtyingms_error").innerHTML = "";
        document.getElementById("explosiveestimate_error").innerHTML = "";
        document.getElementById("explosivesource_error").innerHTML = "";

    }

    else if($("#explosiveqtyingms").val() == "")
    {
        $('#explosivetype').css('border-color', '');
        $('#explosivechemical').css('border-color', '');
        $('#explosiveqtyingms').css('border-color', 'red');
        $('#explosiveestimate').css('border-color', '');
        $('#explosivesource').css('border-color', '');
        document.getElementById("explosivetype_error").innerHTML = "";
        document.getElementById("explosivechemical_error").innerHTML = "";
        document.getElementById("explosiveqtyingms_error").innerHTML = "Enter gms";
        document.getElementById("explosiveestimate_error").innerHTML = "";
        document.getElementById("explosivesource_error").innerHTML = "";

    }
    else if($("#explosiveestimate").val() == "")
    {
        $('#explosivetype').css('border-color', '');
        $('#explosivechemical').css('border-color', '');
        $('#explosiveqtyingms').css('border-color', '');
        $('#explosiveestimate').css('border-color', 'red');
        $('#explosivesource').css('border-color', '');
        document.getElementById("explosivetype_error").innerHTML = "";
        document.getElementById("explosivechemical_error").innerHTML = "e";
        document.getElementById("explosiveqtyingms_error").innerHTML = "";
        document.getElementById("explosiveestimate_error").innerHTML = "Enter Estimated Value";
        document.getElementById("explosivesource_error").innerHTML = "";

    }
    else if($("#explosivesource").val() == "")
    {
        $('#explosivetype').css('border-color', '');
        $('#explosivechemical').css('border-color', '');
        $('#explosiveqtyingms').css('border-color', '');
        $('#explosiveestimate').css('border-color', '');
        $('#explosivesource').css('border-color', 'red');
        document.getElementById("explosivetype_error").innerHTML = "";
        document.getElementById("explosivechemical_error").innerHTML = "";
        document.getElementById("explosiveqtyingms_error").innerHTML = "";
        document.getElementById("explosiveestimate_error").innerHTML = "";
        document.getElementById("explosivesource_error").innerHTML = "Enter Source";

    }

    else
    {
        $('#explosivetype').css('border-color', '');
        $('#explosivechemical').css('border-color', '');
        $('#explosiveqtyingms').css('border-color', '');
        $('#explosiveestimate').css('border-color', '');
        $('#explosivesource').css('border-color', '');
        document.getElementById("explosivetype_error").innerHTML = "";
        document.getElementById("explosivechemical_error").innerHTML = "";
        document.getElementById("explosiveqtyingms_error").innerHTML = "";
        document.getElementById("explosiveestimate_error").innerHTML = "";
        document.getElementById("explosivesource_error").innerHTML = "";

        create_property_list(property_list.length);
    }
}

else if($("#stolenproperty").val() == 17)
{
    if($("#jewellerytype").val() == "")
    {
        $('#jewellerytype').css('border-color', 'red');
        $('#jewelleryqty').css('border-color', '');
        $('#jewelleryweightingms').css('border-color', '');
        $('#jewelleryestimate').css('border-color', '');
        document.getElementById("jewellerytype_error").innerHTML = "Select Jewellery Type";
        document.getElementById("jewelleryqty_error").innerHTML = "";
        document.getElementById("jewelleryweightingms_error").innerHTML = "";
        document.getElementById("jewelleryestimate_error").innerHTML = "";

    }

    else if($("#jewelleryqty").val() == "")
    {
        $('#jewellerytype').css('border-color', '');
        $('#jewelleryqty').css('border-color', 'red');
        $('#jewelleryweightingms').css('border-color', '');
        $('#jewelleryestimate').css('border-color', '');
        document.getElementById("jewellerytype_error").innerHTML = "";
        document.getElementById("jewelleryqty_error").innerHTML = "Enter Qty";
        document.getElementById("jewelleryweightingms_error").innerHTML = "";
        document.getElementById("jewelleryestimate_error").innerHTML = "";

    }

    else if($("#jewelleryweightingms").val() == "")
    {
        $('#jewellerytype').css('border-color', '');
        $('#jewelleryqty').css('border-color', '');
        $('#jewelleryweightingms').css('border-color', 'red');
        $('#jewelleryestimate').css('border-color', '');
        document.getElementById("jewellerytype_error").innerHTML = "";
        document.getElementById("jewelleryqty_error").innerHTML = "";
        document.getElementById("jewelleryweightingms_error").innerHTML = "Enter Weight";
        document.getElementById("jewelleryestimate_error").innerHTML = "";

    }

    else if($("#jewelleryestimate").val() == "")
    {
        $('#jewellerytype').css('border-color', '');
        $('#jewelleryqty').css('border-color', '');
        $('#jewelleryweightingms').css('border-color', '');
        $('#jewelleryestimate').css('border-color', 'red');
        document.getElementById("jewellerytype_error").innerHTML = "";
        document.getElementById("jewelleryqty_error").innerHTML = "";
        document.getElementById("jewelleryweightingms_error").innerHTML = "";
        document.getElementById("jewelleryestimate_error").innerHTML = "Enter Estimated Value";

    }
    else
    {
        $('#jewellerytype').css('border-color', '');
        $('#jewelleryqty').css('border-color', '');
        $('#jewelleryweightingms').css('border-color', '');
        $('#jewelleryestimate').css('border-color', '');
        document.getElementById("jewellerytype_error").innerHTML = "";
        document.getElementById("jewelleryqty_error").innerHTML = "";
        document.getElementById("jewelleryweightingms_error").innerHTML = "";
        document.getElementById("jewelleryestimate_error").innerHTML = "";

        create_property_list(property_list.length);
    }
}

else if($("#stolenproperty").val() == 26)
{
    if($("#speciestype").val() == "")
    {
        $('#speciestype').css('border-color', 'red');
        $('#abcspeciestype').css('border-color', '');
        $('#wildbodyrecovered').css('border-color', '');
        $('#wildotherdesc').css('border-color', '');
        document.getElementById("speciestype_error").innerHTML = "Select Species Type";
        document.getElementById("abcspeciestype_error").innerHTML = "";
        document.getElementById("wildbodyrecovered_error").innerHTML = "";
        document.getElementById("wildotherdesc_error").innerHTML = "";

    }

    else if($("#speciestype").val() == "1" && $("#abcspeciestype").val() == "")
    {
        $('#speciestype').css('border-color', '');
        $('#abcspeciestype').css('border-color', 'red');
        $('#wildbodyrecovered').css('border-color', '');
        $('#wildotherdesc').css('border-color', '');
        document.getElementById("speciestype_error").innerHTML = "";
        document.getElementById("abcspeciestype_error").innerHTML = "Select ABC Type";
        document.getElementById("wildbodyrecovered_error").innerHTML = "";
        document.getElementById("wildotherdesc_error").innerHTML = "";
    }

    else if($("#wildbodyrecovered").val() == "")
    {
        $('#speciestype').css('border-color', '');
        $('#abcspeciestype').css('border-color', '');
        $('#wildbodyrecovered').css('border-color', 'red');
        $('#wildotherdesc').css('border-color', '');
        document.getElementById("speciestype_error").innerHTML = "";
        document.getElementById("abcspeciestype_error").innerHTML = "";
        document.getElementById("wildbodyrecovered_error").innerHTML = "Select Body Parts";
        document.getElementById("wildotherdesc_error").innerHTML = "";
    }

    else if($("#wildbodyrecovered").val() == "" && $("#wildotherdesc").val() == "")
    {
        $('#speciestype').css('border-color', '');
        $('#abcspeciestype').css('border-color', '');
        $('#wildbodyrecovered').css('border-color', '');
        $('#wildotherdesc').css('border-color', 'red');
        document.getElementById("speciestype_error").innerHTML = "";
        document.getElementById("abcspeciestype_error").innerHTML = "";
        document.getElementById("wildbodyrecovered_error").innerHTML = "";
        document.getElementById("wildotherdesc_error").innerHTML = "Enter Others Description";

    }
    else
    {
        $('#speciestype').css('border-color', '');
        $('#abcspeciestype').css('border-color', '');
        $('#wildbodyrecovered').css('border-color', '');
        $('#wildotherdesc').css('border-color', '');
        document.getElementById("speciestype_error").innerHTML = "";
        document.getElementById("abcspeciestype_error").innerHTML = "";
        document.getElementById("wildbodyrecovered_error").innerHTML = "";
        document.getElementById("wildotherdesc_error").innerHTML = "";

        create_property_list(property_list.length);
    }
}

else if($("#stolenproperty").val() == 27)
{
    if($("#cybercontent").val() == "")
    {
        $('#cybercontent').css('border-color', 'red');
        $('#cybermediatype').css('border-color', '');
        $('#cyberhddtype').css('border-color', '');
        $('#cyberforensicaquisition').css('border-color', '');
        $('#cyberaquiredby').css('border-color', '');
        $('#cyberprotdevicetype').css('border-color', '');
        $('#cyberaquisitiondate').css('border-color', '');

    }
    else if($('input[name="cyberevidencedrive"]:checked').val() == 'Y' && $("#cybermediatype").val() == "")
    {
        $('#cybercontent').css('border-color', '');
        $('#cybermediatype').css('border-color', 'red');
        $('#cyberhddtype').css('border-color', '');
        $('#cyberforensicaquisition').css('border-color', '');
        $('#cyberaquiredby').css('border-color', '');
        $('#cyberprotdevicetype').css('border-color', '');
        $('#cyberaquisitiondate').css('border-color', '');
    }

    else if($('input[name="cyberevidencedrive"]:checked').val() == 'Y' && $("#cyberhddtype").val() == "")
    {
        $('#cybercontent').css('border-color', '');
        $('#cybermediatype').css('border-color', '');
        $('#cyberhddtype').css('border-color', 'red');
        $('#cyberforensicaquisition').css('border-color', '');
        $('#cyberaquiredby').css('border-color', '');
        $('#cyberprotdevicetype').css('border-color', '');
        $('#cyberaquisitiondate').css('border-color', '');
    }

    else if($('input[name="cyberaquisitiondetail"]:checked').val() == 'Y' && $("#cyberforensicaquisition").val() == "")
    {
        $('#cybercontent').css('border-color', '');
        $('#cybermediatype').css('border-color', '');
        $('#cyberhddtype').css('border-color', '');
        $('#cyberforensicaquisition').css('border-color', 'red');
        $('#cyberaquiredby').css('border-color', '');
        $('#cyberprotdevicetype').css('border-color', '');
        $('#cyberaquisitiondate').css('border-color', '');

    }

    else if($('input[name="cyberaquisitiondetail"]:checked').val() == 'Y' && $("#cyberaquiredby").val() == "")
    {
        $('#cybercontent').css('border-color', '');
        $('#cybermediatype').css('border-color', '');
        $('#cyberhddtype').css('border-color', '');
        $('#cyberforensicaquisition').css('border-color', '');
        $('#cyberaquiredby').css('border-color', 'red');
        $('#cyberprotdevicetype').css('border-color', '');
        $('#cyberaquisitiondate').css('border-color', '');

    }

    else if($('input[name="cyberaquisitiondetail"]:checked').val() == 'Y' && $("#cyberprotdevicetype").val() == "")
    {
        $('#cybercontent').css('border-color', '');
        $('#cybermediatype').css('border-color', '');
        $('#cyberhddtype').css('border-color', '');
        $('#cyberforensicaquisition').css('border-color', '');
        $('#cyberaquiredby').css('border-color', '');
        $('#cyberprotdevicetype').css('border-color', 'red');
        $('#cyberaquisitiondate').css('border-color', '');

    }

    else if($('input[name="cyberaquisitiondetail"]:checked').val() == 'Y' && $("#cyberaquisitiondate").val() == "")
    {
        $('#cybercontent').css('border-color', '');
        $('#cybermediatype').css('border-color', '');
        $('#cyberhddtype').css('border-color', '');
        $('#cyberforensicaquisition').css('border-color', '');
        $('#cyberaquiredby').css('border-color', '');
        $('#cyberprotdevicetype').css('border-color', '');
        $('#cyberaquisitiondate').css('border-color', 'red');

    }


    else
    {
        $('#cybercontent').css('border-color', '');
        $('#cybermediatype').css('border-color', '');
        $('#cyberhddtype').css('border-color', '');
        $('#cyberforensicaquisition').css('border-color', '');
        $('#cyberaquiredby').css('border-color', '');
        $('#cyberprotdevicetype').css('border-color', '');
        $('#cyberaquisitiondate').css('border-color', '');

        create_property_list(property_list.length);
    }
}

else if($("#stolenproperty").val() == 0)
{
    if($("#otherslostvalue").val() == "")
    {
        $('#otherslostvalue').css('border-color', 'red');
        $('#othersdescription').css('border-color', '');
        document.getElementById("otherslostvalue_error").innerHTML = "Enter Lost Value";
        document.getElementById("othersdescription_error").innerHTML = "";

    }

    else if($("#othersdescription").val() == "")
    {
        $('#otherslostvalue').css('border-color', '');
        $('#othersdescription').css('border-color', 'red');
        document.getElementById("otherslostvalue_error").innerHTML = "";
        document.getElementById("othersdescription_error").innerHTML = "Enter Description";

    }

    else
    {
        $('#otherslostvalue').css('border-color', '');
        $('#othersdescription').css('border-color', '');
        document.getElementById("otherslostvalue_error").innerHTML = "";
        document.getElementById("othersdescription_error").innerHTML = "";

        create_property_list(property_list.length);
    }
}

else
{
        create_property_list(property_list.length);

}
});

// Deletes the row from a given data table
function delete_property_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    property_list.splice(row_no, 1);
    $("#property_table").html(build_rows_property(property_list));
    reset_property();
}

// Edit the row from a given data table
function edit_property_row(data_table_id, row_no){
    $("#add_property").parent().attr("style", "display:none");
    $("#update_property").parent().attr("style", "display:block");
    $("#cancel_property").parent().attr("style", "display:block");
    row_no -= 1;
    load_property(property_list[row_no]);
    $('#update_property').attr("onclick", "update_property_row("+row_no+");");
    $("#stolenproperty").prop('disabled', true);
}

// Update row of Property
function update_property_row(row_id){
    create_property_list(row_id, from='update');
}

function reset_property(){
    $("#stolenproperty").prop('disabled', false);
    set_select("stolenproperty", "");

    set_select("armscat", "");
    set_select("armstype", "");
    set_select("armsmade", "");
    set_select("armscountry", "");
    set_select("armsbore", "");
    reset_select("armssubtype", "Select Arms SubType");
    set_select("armsmfd", "");
    set_select("armspropbelong", "");
    set_select("autotype", "");
    reset_select("automake", "Select Make");
    reset_select("automodel", "Select Model");
    set_select("culturaltype", "");
    set_select("cointype", "");
    set_select("coincountry", "");
    set_select("documenttype", "");
    set_select("drugname", "");
    set_select("drugconcealment", "");
    set_select("electronicitemname", "");
    set_select("explosivetype", "");
    set_select("explosivechemical", "");
    set_select("jewellerytype", "");
    set_select("speciestype", "");
    set_select("abcspeciestype", "");
    set_select("wildbodyrecovered", "");
    set_select("cybercontent", "");
    set_select("cybermediatype", "");
    set_select("cyberhddtype", "");
    set_select("cyberforensicaquisition", "");

    reset_text(["armsqty", "armsidentity", "armsinsurance", "armsestimate", "armsmodel", "autoestimate", "autoregistrationdate","autochasisno", "autoregnumber", "autoenginenumber", 
    "coinpieces", "coinseries", "coinserialnofrom", "coinserialnoto", "coindenomination", "coinestimate", "culturalestimate", "documentestimate",
    "drugnoofpacket", "drugestimate", "drugweight", "druginterogationdetail", "electronicqty", "electronicestimate", "electronicmake",
    "explosiveestimate", "explosiveqtyingms", "explosivesource", "jewelleryestimate", "jewelleryqty", "jewellerydescription",
    "jewelleryweightingms", "otherslostvalue", "othersdescription", "wildotherdesc", "cyberaquiredby", "cyberprotdevicetype", "cyberaquisitiondate"]);
    reset_radio(["coinwatermark2", "coinashokpiller2", "coinmgmark2", "coinflouroscent2", "coinsecuritythread2", "coincrackingsound2",
    "drugnotice2", "druglabanalysis2", "drugcarrier2", "drugaccusedmember2", "drugdetained2", "drugemergency2", "drugjointinterrogation2",
    "explosivesenttofsl2", "explosivedestroyed2", "istengible2", "cybersysinfo2", "cyberdigitalmedia2", "cyberevidencedrive2", "ifdriveimaged2", 
    "cyberaquisitiondetail2", "cybernetworkaquisition2", "cyberismobiledevice2", "isregnoknown2", "ischasisnoknown2", "isenginenoknown2"]);
    $("#add_property").parent().attr("style", "display:block");
    $("#update_property").parent().attr("style", "display:none");
    $("#cancel_property").parent().attr("style", "display:none");
    $("#stolenproperty").change();
    $("#abcspeciestype").prop('disabled', true);
    $("#wildotherdesc").prop('disabled', true);
    $("#autoenginenumber").prop('disabled', true);
    $("#autochasisno").prop('disabled', true);
    $("#autoregnumber").prop('disabled', true);

}


function load_property(row){
    category_case = row.category.replace("<td>","").replace("</td>","");
    $("#stolenproperty").val(row.category_val).trigger("change");
    switch(category_case){
        case "ARMS AND AMMUNITION":
            $("#armscat").val(row.arms_category_val).trigger("change");
            $("#armsmade").val(row.arms_made);
            $("#armsbore").val(row.arms_bore);
            $("#armsqty").val(row.qty.replace("<td>","").replace("</td>",""));
            $("#armsidentity").val(row.arms_identity);
            $("#armsinsurance").val(row.arms_insurance);
            $("#armscountry").val(row.arms_country_val).trigger("change");
            $("#armsestimate").val(row.value.replace("<td>","").replace("</td>",""));
            $("#armsmodel").val(row.arms_model);
            $("#armsmfd").val(row.arms_manufacture_val).trigger("change");
            $("#armspropbelong").val(row.arms_propertybelong_val).trigger("change");
            setTimeout(function(){
                     $("#armstype").val(row.arms_type_val).trigger("change");
                $("#armssubtype").val(row.arms_subtype_val).trigger("change");
            }, 100);
            break;
        case "AUTOMOBILES AND OTHERS":
            $("#autoestimate").val(row.value.replace("<td>","").replace("</td>",""));
            $("#autotype").val(row.auto_type).trigger("change");
            setTimeout(function(){
                $("#automake").val(row.auto_make).trigger("change");
                $("#automodel").val(row.auto_model).trigger("change");
            }, 100);
            $("#autoregistrationdate").val(row.auto_regdt);

            if (row.is_auto_chasisnum === 'Y')
            {
                $("#ischasisnoknown1").click();
                $("#autochasisno").val(row.qty.replace("<td>","").replace("</td>",""));    
            }
            if (row.is_auto_enginenum === 'Y')
            {
                $("#isenginenoknown1").click();
                $("#autoenginenumber").val(row.autoenginenumber);    
            }
            if (row.is_auto_regnum === 'Y')
            {
                $("#isregnoknown1").click();
                $("#autoregnumber").val(row.autoregnumber);
            }
            break;
        case "COIN AND CURRENCY":
            $("#cointype").val(row.currency_type).trigger("change");
            $("#coincountry").val(row.country).trigger("change");
            $("#coinseries").val(row.series);
            $("#coinserialnofrom").val(row.serial_from);
            $("#coinserialnoto").val(row.serial_to);
            $("#coindenomination").val(row.denomination);
            $("#coinestimate").val(row.value.replace("<td>","").replace("</td>",""));
            $("#coinpieces").val(row.qty.replace("<td>","").replace("</td>",""));
            if(row.watermark == "Yes"){
                $("#coinwatermark1").click();
            }else{
                $("#coinwatermark2").click();
            }
            if(row.ashokpilar == "Yes"){
                $("#coinashokpiller1").click();
            }else{
                $("#coinashokpiller2").click();
            }
            if(row.mgmark == "Yes"){
                $("#coinmgmark1").click();
            }else{
                $("#coinmgmark2").click();
            }
            if(row.flour == "Yes"){
                $("#coinflouroscent1").click();
            }else{
                $("#coinflouroscent2").click();
            }
            if(row.sec_thread == "Yes"){
                $("#coinsecuritythread1").click();
            }else{
                $("#coinsecuritythread2").click();
            }
            if(row.crak_sound == "Yes"){
                $("#coincrackingsound1").click();
            }else{
                $("#coincrackingsound2").click();
            }

            break;
        case "CULTURAL PROPERTY":
            $("#culturaltype").val(row.cultural_type).trigger("change");
            $("#culturalestimate").val(row.value.replace("<td>","").replace("</td>",""));
            break;
        case "DOCUMENTS AND VALUABLE SECURITIES":
            $("#documenttype").val(row.doc_type).trigger("change");
            $("#documentestimate").val(row.value.replace("<td>","").replace("</td>",""));
            break;
        case "DRUGS/NARCOTIC DRUGS":
            $("#drugname").val(row.drug_name).trigger("change");
            $("#drugconcealment").val(row.concealment).trigger("change");
            $("#drugnoofpacket").val(row.qty.replace("<td>","").replace("</td>",""));
            $("#drugestimate").val(row.value.replace("<td>","").replace("</td>",""));
            $("#drugweight").val(row.weight);
            $("#druginterogationdetail").val(row.druginterogationdetail);
            if(row.drugnotice == "Yes"){
                $("#drugnotice1").click();
            }else{
                $("#drugnotice2").click();
            }
            if(row.druglabanalysis == "Yes"){
                $("#druglabanalysis1").click();
            }else{
                $("#druglabanalysis2").click();
            }
            if(row.drugcarrier == "Yes"){
                $("#drugcarrier1").click();
            }else{
                $("#drugcarrier2").click();
            }
            if(row.drugaccusedmember == "Yes"){
                $("#drugaccusedmember1").click();
            }else{
                $("#drugaccusedmember2").click();
            }
            if(row.drugdetained == "Yes"){
                $("#drugdetained1").click();
            }else{
                $("#drugdetained2").click();
            }
            if(row.drugemergency == "Yes"){
                $("#drugemergency1").click();
            }else{
                $("#drugemergency2").click();
            }
            if(row.drugjointinterrogation == "Yes"){
                $("#drugjointinterrogation1").click();
            }else{
                $("#drugjointinterrogation2").click();
            }
            break;
        case "ELECTRICAL AND ELECTRONIC GOODS":
            $("#electronicitemname").val(row.electronicitemname).trigger("change");
            $("#electronicqty").val(row.qty.replace("<td>","").replace("</td>",""));
            $("#electronicestimate").val(row.value.replace("<td>","").replace("</td>",""));
            $("#electronicmake").val(row.electronicmake);
            break;
        case "EXPLOSIVES":
            $("#explosivetype").val(row.explosivetype).trigger("change");
            $("#explosivechemical").val(row.explosivechemical).trigger("change");
            $("#explosiveestimate").val(row.value.replace("<td>","").replace("</td>",""));
            $("#explosiveqtyingms").val(row.qty.replace("<td>","").replace("</td>",""));
            $("#explosivesource").val(row.explosivesource);
            if(row.explosivesenttofsl == "Yes"){
                $("#explosivesenttofsl1").click();
            }else{
                $("#explosivesenttofsl2").click();
            }
            if(row.explosivedestroyed == "Yes"){
                $("#explosivedestroyed1").click();
            }else{
                $("#explosivedestroyed2").click();
            }
            break;
        case "JEWELLERY":
            $("#jewellerytype").val(row.jewellerytype).trigger("change");
            $("#jewelleryestimate").val(row.value.replace("<td>","").replace("</td>",""));
            $("#jewelleryqty").val(row.qty.replace("<td>","").replace("</td>",""));
            $("#jewellerydescription").val(row.explosivesource);
            $("#jewelleryweightingms").val(row.jewelleryweightingms);
            break;
        case "WILD LIFE":
            $("#speciestype").val(row.speciestype).trigger("blur").trigger("change");
            if (row.speciestype == '1')
            {
              setTimeout(function(){
                     $("#abcspeciestype").val(row.abcspeciestype).trigger("change");
            }, 1000);
            }
              setTimeout(function(){
                     $("#wildbodyrecovered").val(row.wildbodyrecovered).trigger("change");
            }, 1200);

            if (row.wildbodyrecovered == '9' || row.wildbodyrecovered == '15' || row.wildbodyrecovered == '17' || row.wildbodyrecovered == '19' || row.wildbodyrecovered == '29')
            {
              $("#wildotherdesc").val(row.wildotherdesc);
            }
            else
            {
              reset_text(["wildotherdesc"]);
              $("#wildotherdesc").val();
            }
            break;
        case "CYBER CRIME":
            if (row.istengible == 'Y')
              $("#istengible1").click();
            if (row.istengible == 'N')
              $("#istengible2").click();
            $("#cybercontent").val(row.cybercontent).trigger("change");
            
            if (row.cybersysinfo == 'Y')
            {
              $("#cybersysinfo1").click();
              enable_disable_cyberprop(false);
              if (row.cyberdigitalmedia == 'Y')
              {
                $("#cyberdigitalmedia1").click();
              }
              if (row.cyberdigitalmedia == 'N')
              {
                $("#cyberdigitalmedia2").click();
              }
            }
            if (row.cybersysinfo == 'N')
            {
              $("#cybersysinfo2").click();
              enable_disable_cyberprop(true);
            }

            if (row.cyberevidencedrive == 'Y')
            {
              $("#cyberevidencedrive1").click();
              enable_disable_cyberevidence(false);
              $("#cybermediatype").val(row.cybermediatype).trigger("change");
              $("#cyberhddtype").val(row.cyberhddtype).trigger("change");
              if (row.ifdriveimaged == 'Y')
              {
                $("#ifdriveimaged1").click();
              }
              if (row.ifdriveimaged == 'N')
              {
                $("#ifdriveimaged2").click();
              }
            }
            if (row.cyberevidencedrive=='N')
            {
              $("#cyberevidencedrive2").click();
            }

            if (row.cyberaquisitiondetail == 'Y')
            {
             $("#cyberaquisitiondetail1").click();
             enable_disable_cyberaquisition(false);
             $("#cyberforensicaquisition").val(row.cyberforensicaquisition).trigger("change");
             $("#cyberaquiredby").val(row.cyberaquiredby);
             $("#cyberprotdevicetype").val(row.cyberprotdevicetype);
             $("#cyberaquisitiondate").val(row.cyberaquisitiondate);

             if (row.cybernetworkaquisition == 'Y')
              {
                $("#cybernetworkaquisition1").click();
              }
              if (row.cybernetworkaquisition == 'N')
              {
                $("#cybernetworkaquisition2").click();
              }

            }
            if (row.cyberaquisitiondetail == 'N')
            {
              $("#cyberaquisitiondetail2").click();
            }
            if (row.cyberismobiledevice == 'Y')
            {
              $("#cyberismobiledevice1").click();
            }
            if (row.cyberismobiledevice == 'N')
            {
              $("#cyberismobiledevice2").click();
            }
            
            break;

        case "OTHERS":
            $("#otherslostvalue").val(row.value.replace("<td>","").replace("</td>",""));
            $("#othersdescription").val(row.othersdescription);
            break;
    }
}


$('#ischasisnoknown2').click(function(){
    enable_disable_autochasis(true);
});

$('#ischasisnoknown1').click(function(){
    enable_disable_autochasis(false);
});

////////////////////////////////////////
$('#isenginenoknown2').click(function(){
    enable_disable_autoengine(true);
});

$('#isenginenoknown1').click(function(){
    enable_disable_autoengine(false);
});

////////////////////////////////////////
$('#isregnoknown2').click(function(){
    enable_disable_autoregno(true);
});

$('#isregnoknown1').click(function(){
    enable_disable_autoregno(false);
});


$('#cybersysinfo2').click(function(){
    enable_disable_cyberprop(true);
});

$('#cybersysinfo1').click(function(){
    enable_disable_cyberprop(false);
});

$('#cyberevidencedrive2').click(function(){
    enable_disable_cyberevidence(true);
});

$('#cyberevidencedrive1').click(function(){
    enable_disable_cyberevidence(false);
});

$('#cyberaquisitiondetail2').click(function(){
    enable_disable_cyberaquisition(true);
});

$('#cyberaquisitiondetail1').click(function(){
    enable_disable_cyberaquisition(false);
});

$('#victimtype2').click(function(){
    enable_disable_juvage(true);
    reset_text(["victim_agedetails"]);
    set_select("victim_ageproof", "0");
});

$('#victimtype1').click(function(){
    
    enable_disable_juvage(false);
});


function enable_disable_autochasis(status)
{
  $('#autochasisno').prop("disabled", status);
  reset_text(["autochasisno"])
}

function enable_disable_autoengine(status)
{
  $('#autoenginenumber').prop("disabled", status);
  reset_text(["autoenginenumber"])
}

function enable_disable_autoregno(status)
{
  $('#autoregnumber').prop("disabled", status);
  reset_text(["autoregnumber"])
}


function enable_disable_cyberprop(status)
{
  $('input[name="cyberdigitalmedia"]').prop("disabled", status);
}

function enable_disable_cyberevidence(status)
{
  $('#cybermediatype').prop("disabled", status);
  $('#cyberhddtype').prop("disabled", status);
  $('input[name="ifdriveimaged"]').prop("disabled", status);
}

function enable_disable_cyberaquisition(status)
{
  $('#cyberforensicaquisition').prop("disabled", status);
  $('#cyberaquiredby').prop("disabled", status);
  $('input[name="cybernetworkaquisition"]').prop("disabled", status);
  $('#cyberprotdevicetype').prop("disabled", status);
  $('#cyberaquisitiondate').prop("disabled", status);
}

function enable_disable_juvage(status)
{
  $('#victim_ageproof').prop("disabled", status);
  $('#victim_agedetails').prop("disabled", status);

}


//         END of Data table functions //
//--------------------------------------/
// Enable disable form fields Accused
function enable_disable_accused(status){
    $('#acc_name').prop("disabled", status);
    $('#acc_address').prop("disabled", status);
    $('input[name="acc_juvenile"]').prop("disabled", status);
    $('input[name="acc_medical"]').prop("disabled", status);
    $('input[name="acc_sameasper"]').prop("disabled", status);
    $('#acc_gender').prop("disabled", status);
    $('#acc_reltype').prop("disabled", status);
    $('#acc_relname').prop("disabled", status);

    $('#acc_agetype').prop("disabled", status);
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
    if(status == false){
        $("#acc_agetype").val($("#acc_agetype").find(":selected").val()).trigger("change");
        $('input[name="acc_sameasper"]:checked').click();
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

$('#istimeknown1').click(function(){
$('#crimepreptime').prop("disabled", false);

});
$('#istimeknown2').click(function(){
$('#crimepreptime').prop("disabled", true);
});

// Enable Disable Victim
function enable_disable_victim(status){

    $('input[name="victim_medical"]').prop("disabled", status);
    $('input[name="victim_sameasper"]').prop("disabled", status);
    $('input[name="victim_category"]').prop("disabled", status);
    $('input[name="victim_relname"]').prop("disabled", status);

    $("#victim_name").prop("disabled", status);
    $("#victim_address").prop("disabled", status);
    $("#victim_gender").prop("disabled", status);
    $("#victim_reltype").prop("disabled", status);
    
    $("#victim_agetype").prop("disabled", status);
    $('#victim_dob').prop("disabled", status);
    $('#victim_yob').prop("disabled", status);
    $('#victim_ageyear').prop("disabled", status);
    $('#victim_agemonth').prop("disabled", status);
    $('#victim_agefrom').prop("disabled", status);
    $('#victim_country').prop("disabled", status);
    $('#victim_state').prop("disabled", status);
    $('#victim_district').prop("disabled", status);
    $('#victim_ps').prop("disabled", status);
    $('#victim_sameasaddress').prop("disabled", status);
    $('#victim_sameascountry').prop("disabled", status);
    $('#victim_sameasstate').prop("disabled", status);
    $('#victim_sameasdistrict').prop("disabled", status);
    $('#victim_sameasps').prop("disabled", status);
    $('#victim_nationality').prop("disabled", status);
    $("#victim_addRow").prop("disabled", status);
    if(status == false){
        $("#victim_agetype").val($("#victim_agetype").find(":selected").val()).trigger("change");
        $('input[name="victim_sameasper"]:checked').click();
    }
}
$('#addvictimtype2').click(function(){
    enable_disable_victim(true);
    victim_list = [];
    $("#victim_table > tbody").html("");
});
$('#addvictimtype1').click(function(){
    enable_disable_victim(false);
});



$("#stolenproperty").change(function(){
    if($(this).val() == "4" )
    {
    // alert($(this).val());
        $('.armsmenu').slideDown();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();        
        data = {"parent_code": $("#stolenproperty").val()};
        load_resource(property_type_url, data, "armstype", 0, 1, 'Select Arms Type');

    }

    else if($(this).val() == "9" )
    {

        $('.armsmenu').slideUp();
        $('.automenu').slideDown();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }

    else if($(this).val() == "8" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideDown();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "10" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideDown();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "11" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideDown();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "12" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideDown();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "13" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideDown();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "14" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideDown();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "17" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideDown();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "26" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideDown();
        $('.cybermenu').slideUp();
    }
    else if($(this).val() == "27" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideDown();
    }

    else if($(this).val() == "0" )
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideDown();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }


    else
    {
        $('.armsmenu').slideUp();
        $('.automenu').slideUp();
        $('.currencymenu').slideUp();
        $('.culturalmenu').slideUp();
        $('.documentsmenu').slideUp();
        $('.drugsmenu').slideUp();
        $('.electronicmenu').slideUp();
        $('.explosivemenu').slideUp();
        $('.jewellarymenu').slideUp();
        $('.othersmenu').slideUp();
        $('.wildlifemenu').slideUp();
        $('.cybermenu').slideUp();
    }
});

function submitDataTableValues(){
    f_l = {};
    act_sec_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=row[key].replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l[index] = temp;
    });
     $("<input />").attr("type", "hidden")
                  .attr("name", "act_sections_list")
                  .attr("value", JSON.stringify(f_l))
                  .appendTo("#crime_add_form");
    f_l2 = {};
    major_minor_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=row[key].replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l2[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "major_minor_list")
                  .attr("value", JSON.stringify(f_l2))
                  .appendTo("#crime_add_form");
    f_l3 = {};
    accused_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=row[key].replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
	    f_l3[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "accused_list")
                  .attr("value", JSON.stringify(f_l3))
                  .appendTo("#crime_add_form");
    f_l4 = {};
    victim_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=row[key].replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
	    f_l4[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "victim_list")
                  .attr("value", JSON.stringify(f_l4))
                  .appendTo("#crime_add_form");
    f_l5 = {};
    witness_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=row[key].replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l5[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "witness_list")
                  .attr("value", JSON.stringify(f_l5))
                  .appendTo("#crime_add_form");
    f_l6 = {};
    property_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           row[key] = row[key]+"";
           temp[key]=row[key].replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l6[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "property_list")
                  .attr("value", JSON.stringify(f_l6))
                  .appendTo("#crime_add_form");
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

  var now = firdate; //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witnes_dob").value;
  var  today = firdate;
  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];

  if ( dob > firdate )
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
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witnes_dob").value;
  var dobcal = new Date(dob);
  var today = firdate;
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var  today = firdate
  var startyearcheck=firdate.split("-");

  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];


  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];

  if ( dob > firdate )
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

  var now = firdate; //Todays Date
  var dob = document.getElementById("acc_dob").value;
  var dobcal = new Date(dob);
  var today = firdate;
  var birthday=dob.split("-");
  var dobYear= birthday[0];
  var dobMonth= birthday[1];
  var dobDay= birthday[2];

  var fircaldate=firdate.split("-");

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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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

//!-- Victim Age Panel --

function vicclearFunction() {
  document.getElementById("victim_dob").value = null;
  document.getElementById("victim_yob").value = '';
  document.getElementById("victim_ageyear").value = '';
  document.getElementById("victim_agemonth").value = '';
  document.getElementById("victim_agefrom").value = '';
  document.getElementById("victim_ageto").value = '';
}

function vicdobFunction() {
  var now = firdate; //Todays Date 
  var dob = document.getElementById("victim_dob").value;
  var  today = firdate;

  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];

  if ( dob > firdate )
{
    document.getElementById("victim_dob").focus();
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
    return false;

}
  else if ( dobyearcheckyear < 1900 )
{
    document.getElementById("victim_dob").focus();
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
    return false;

}

  else if ( dobyearcheckyear > firdateyearcheck )
{
    document.getElementById("victim_dob").focus();
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
    return false;

}

else
{
  var now = new Date(); //Todays Date
  var dob = document.getElementById("victim_dob").value;
  var dobcal = new Date(dob);
  var today = new Date();
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

  document.getElementById("victim_yob").value = yob;
  document.getElementById("victim_ageyear").value = ageyear;
  document.getElementById("victim_agemonth").value = agemonth;
  document.getElementById("victim_agefrom").value = ageyear;
  document.getElementById("victim_ageto").value = ageyear;
}
}

function vicyobFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var yob = document.getElementById("victim_yob").value;
  if (yob < 1900)
  {
    document.getElementById("victim_yob").focus();
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';

  }
  else if (yob > firdateyearcheck)
  {
    document.getElementById("victim_yob").focus();
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
  }
  else
{
  var now = new Date(); //Todays Date
  var yob = document.getElementById("victim_yob").value;
  var nowYear= firdateyearcheck;
  var dob = yob + "-01-" + "01";
  var ageyear = nowYear - yob;

  document.getElementById("victim_dob").value = dob;
  document.getElementById("victim_ageyear").value = ageyear;
  document.getElementById("victim_agemonth").value = 0;
  document.getElementById("victim_agefrom").value = ageyear;
  document.getElementById("victim_ageto").value = ageyear;
}
}

function vicagemonth() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("victim_ageyear").value;
  var agemonth = document.getElementById("victim_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").focus();
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").focus();
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
}
else if (ageyear < 10)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").focus();
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
}
else
{

}
}

function vicageFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("victim_ageyear").value;
  var agemonth = document.getElementById("victim_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").focus();
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
}
else if (agemonth > 11)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").focus();   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").focus();
    document.getElementById("victim_agemonth").value = '';   
    document.getElementById("victim_agefrom").value = '';
    document.getElementById("victim_ageto").value = '';
}

else
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("victim_ageyear").value;
  var agemonth = document.getElementById("victim_agemonth").value;

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
    document.getElementById("victim_agemonth").value = '0';  
  }
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("victim_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  document.getElementById("victim_dob").value = dob;
  document.getElementById("victim_yob").value = yob;
  document.getElementById("victim_agefrom").value = ageyear;
  document.getElementById("victim_ageto").value = ageyear;
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
      document.getElementById("victim_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("victim_agemonth").value = 0;
    }    
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  document.getElementById("victim_dob").value = dob;
  document.getElementById("victim_yob").value = yob;
  document.getElementById("victim_agefrom").value = ageyear;
  document.getElementById("victim_ageto").value = ageyear;
}
}

//End of Else
}

function vicagerangefromFunction() 
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = Number(document.getElementById("victim_agefrom").value);
  var ageyearto = Number(document.getElementById("victim_ageto").value);

if (ageyear > 120)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_agefrom").focus();    
}

else if (ageyear < 10)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_agefrom").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_ageto").focus();    
}

else if (ageyearto == '')
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_ageto").focus();    
}

else
{

}
}

function vicagerangeFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = Number(document.getElementById("victim_agefrom").value);
  var ageyearto = Number(document.getElementById("victim_ageto").value);

if (ageyear == '')
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_agefrom").focus();    
    // document.getElementById("victim_ageto").value = '';   
}

else if (ageyearto == '')
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_ageto").focus();    
}

else if (ageyearto > 120)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_ageto").focus();    
}
else if (ageyearto < 10)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("victim_dob").value = null;
    document.getElementById("victim_yob").value = '';
    document.getElementById("victim_ageyear").value = '';
    document.getElementById("victim_agemonth").value = '';
    document.getElementById("victim_ageto").focus();    
}

else
{
  var now = new Date(); //Todays Date
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("victim_agefrom").value;

  var nowYear= firdateyearcheck;

  var yob = nowYear - ageyear;

  var dob = yob + "-"+ '01' + "-" + "01";

  document.getElementById("victim_dob").value = dob;
  document.getElementById("victim_yob").value = yob;
  document.getElementById("victim_ageyear").value = ageyear;
  document.getElementById("victim_agemonth").value = 0;

}
}

function coinserialFunction() 
{
  var coinsnofrom = Number(document.getElementById("coinserialnofrom").value);
  var coinsnoto = Number(document.getElementById("coinserialnoto").value);

if (coinsnofrom == '')
{
    document.getElementById("coinsnofrom").focus();    
}

else if (coinsnoto == '')
{
    document.getElementById("coinsnoto").focus();    
}

else if (coinsnoto < coinsnofrom)
{
    document.getElementById("coinserialnoto").focus();    
}
else
{

}
}
