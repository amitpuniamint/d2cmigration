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


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
}
return true;
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

function seizuredatecheck(){

var arrestdatetime = document.getElementById("seizedatetime").value;

// console.log(gddatetime);
var datepattern = /((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[0-9])|(1[0-2]))-[0-9]{4} (0\d|1\d|2[0-3]):[0-5]\d/;
// alert(datepattern.test(gddatetime));
console.log(datepattern.test(arrestdatetime));
if (datepattern.test(arrestdatetime)== true) {
    firdate = $("#firdate").val();

    var arrfirDate = $("#firdate").val().split(" ")
    var firdatecomp = arrfirDate[0].split("-")
    var arrfirdatetime = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0] + "T" + arrfirDate[1]

    var arrarrestDate = $("#seizedatetime").val().split(" ");
    var arrestdatecomp = arrarrestDate[0].split("-");
    var arrarrestdatetime = arrestdatecomp[2] + "-" + arrestdatecomp[1] + "-" + arrestdatecomp[0] + "T" + arrarrestDate[1]
    console.log(arrarrestdatetime);

    if (arrarrestdatetime < arrfirdatetime){

    // +++++++++++++++IN MANY CASES SEIZURE HAPPENS BEFORE FIR

    // document.getElementById('seizedatetime_error').innerHTML = 'Seizure date cannot less than FIR date';
    // document.getElementById("seizedatetime").focus();
    // return false        
    }
    else{
        document.getElementById('seizedatetime_error').innerHTML = '';
    }

}
else{
  document.getElementById("seizedatetime").focus();

}
   }


function auto_registration_date_check()
{
var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
autoregistrationdate = $("#autoregistrationdate").val();

if (autoregistrationdate == '')
{

}
else if(currentdate<autoregistrationdate)
{
document.getElementById("autoregistrationdate").focus();
}
else
{    
}
}


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
    $("#seizedatetime").attr("max",set_time_picker_min_val_today());
    // $("#fir_gddatetime").attr("max",document.getElementById('fir_date'));

$("#witness_country").val("80");

$("#witness_nationality").val("80");

$("#witness_samecountry").val("80");

$("#sei_country").val("80");

$("#person_country").val("80");

firdate = $("#firdate").val();

var arrfirDate = $("#firdate").val().split(" ");
var firdatecomp = arrfirDate[0].split("-");
firdatepanel = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0];

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

function load_resource_autotype(url, data, elm_id, val_pos, text_pos, value){
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
  }});
}

function load_resource_automake(url, data, elm_id, val_pos, text_pos, value){
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
$("#sei_state").blur(function() {
    data = {"state": $("#sei_state").val()}
    load_resource(district_url, data, "sei_district", 0, 1, "Select District");
});
$("#person_state").blur(function() {
    data = {"state": $("#person_state").val()}
    load_resource(district_url, data, "person_district", 0, 1, "Select District");
});


// Select PoliceStation
$("#sei_district").blur(function() {
  data = {"state": $("#sei_state").val(), "district": $("#sei_district").val()}
  load_resource(police_station_url, data, "sei_ps", 0, 1, "Select Police Station");
});

$("#witness_district").blur(function() {
  data = {"state": $("#witness_state").val(), "district": $("#witness_district").val()}
  load_resource(police_station_url, data, "witness_ps", 0, 1, "Select Police Station");
});
$("#witness_samedistrict").blur(function() {
  data = {"state": $("#witness_samestate").val(), "district": $("#witness_samedistrict").val()}
  load_resource(police_station_url, data, "witness_sameps", 0, 1, "Select Police Station");
});
$("#person_district").blur(function() {
  data = {"state": $("#person_state").val(), "district": $("#person_district").val()}
  load_resource(police_station_url, data, "person_ps", 0, 1, "Select Police Station");
});


// Select Sections
$("#acts").blur(function() {
    data = {"act_id": $("#acts").val()}
    load_resource(section_url, data, "sections", 0, 1, 'Select Section');
});

// Select Weapon Subtype
$("#armscat").blur(function() {
    data = {"weapon_type_cd": $("#armscat").val()}
    load_resource(weapon_subtype_url, data, "armssubtype", 0, 1, "Select Arms SubType");
});

function load_resource_autotype(url, data, elm_id, val_pos, text_pos, value){
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
  }});
}

// Select Make by automobiles
$("#autotype").blur(function() {
    data = {"mv_type_cd": $("#autotype").val()}
    load_resource_autotype(make_url, data, "automake", 0, 1, "Select Make");
});

function load_resource_automake(url, data, elm_id, val_pos, text_pos, value){
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
  }});
}

// Select Model by make
$("#automake").blur(function() {
    data = {"mv_make_cd": $("#automake").val()}
    load_resource_automake(model_url, data, "automodel", 0, 1, "Select Model");
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

$("#witness_agetype").change(function(){
    select_age_type("witness_agetype", "witness_dob", "witness_yob", "witness_ageyear", "witness_agemonth", "witness_agefrom", "witness_ageto");
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


// Witness Same as permenant
$("#witnesssameasper2").click(function(){
    sameAsYesNo("N", "witness_sameaddress", "witness_samecountry", "witness_samestate", "witness_samedistrict",
    "witness_sameps", "","","","","");
});

$("#witnesssameasper1").click(function(){
    sameAsYesNo("Y", "witness_sameaddress", "witness_samecountry", "witness_samestate", "witness_samedistrict",
    "witness_sameps", "witnessaddress","witness_country","witness_state","witness_district","witness_ps");
});

$("#witness_ps").blur(function(){
if ($('#witnesssameasper1').is(':checked')) {    
    sameAsYesNo("Y", "witness_sameaddress", "witness_samecountry", "witness_samestate", "witness_samedistrict",
    "witness_sameps", "witnessaddress","witness_country","witness_state","witness_district","witness_ps");
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
        delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' role='button' aria-pressed='true' onclick='delete_row_act(\"seizure_act_sec\",\""+index+"\");'><i class='feather icon-menu' tooltip='Delete'></i>&nbsp;Delete</a></td>";
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
    act_sec_list[act_sec_list.length] = {'act_cd': act_cd, 'act_text': act_text, 'sec_cd': sec_cd, 'sec_text': sec_text, 'from_db': "No", 'soft_delete': "No"};
    html = build_rows_act(act_sec_list);
    $("#seizure_act_sec").html(html);
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
    $("#seizure_act_sec").html(build_rows_act(act_sec_list));
}

// Witness Add & Delete
// Loads rows in to table
function build_rows_witness(witness_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Witness Name</th><th>Relative Name</th><th>PS</th><th>Edit</th> <th>Delete</th></thead>"
    i = 1;
    witness_list.forEach(function(row, index){
        if(row['soft_delete'] == "Yes"){
            return true;
        }
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' onclick='edit_witness_row(\"witness_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_witness_row(\"witness_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+i+'</td>'
        html = '<tr id="'+index+'">'+no+row.witness_name+row.witness_relativename+row.witness_ps+edit_button+delete_button+'</tr>';
        rows.push(html);
        i += 1;
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function create_witness_list(row_id, from='insert'){
    witness_name = "<td>"+$("#witnessname").val()+"</td>";
    witness_address = "<td>"+$("#witnessaddress").val()+"</td>";

    witness_rel_type = $("#witness_reltype").find(":selected").text();
    witness_rel_type_val = $("#witness_reltype").find(":selected").val();
    witness_relativename = "<td>"+$("#witness_relname").val()+"</td>";

    witness_country_val = $("#witness_country").find(":selected").val();
    witness_state_val = $("#witness_state").find(":selected").val();
    witness_district_val = $("#witness_district").find(":selected").val();
    witness_ps_val = $("#witness_ps").find(":selected").val();
    witness_ps = "<td>"+$("#witness_ps").find(":selected").text()+"</td>";
    witness_statement = $('#witness_statement').val();
    witness_sameaddress = $("#witness_sameaddress").val();
    witness_samecountry_val = $("#witness_samecountry").find(":selected").val();
    witness_samestate_val = $("#witness_samestate").find(":selected").val();
    witness_samedistrict_val = $("#witness_samedistrict").find(":selected").val();
    witness_sameps_val = $("#witness_sameps").find(":selected").val();

    same_as_per = $('input[name="witnesssameasper"]:checked').val();

    witness_agetype = $("#witness_agetype").find(":selected").text();
    witness_agetype_val = $("#witness_agetype").find(":selected").val();
    witness_dob = $('#witness_dob').val();
    witness_yob = $('#witness_yob').val();
    witness_ageyear = $('#witness_ageyear').val();
    witness_agemonth = $('#witness_agemonth').val();
    witness_agefrom = $('#witness_agefrom').val();
    witness_ageto = $('#witness_ageto').val();
    witness_nationality_val = $('#witness_nationality').val();
    witness_occupation = $("#witnessoccupation").find(":selected").val();
    witness_evidence_val = $("#witnessevidencetender").find(":selected").val();

    found = witness_list.some(el => el.witness_name == witness_name && el.witness_address == witness_address)
    if(found && from != 'update'){return 0;};
    from_db = "No";
    soft_delete = "No"
    if(from == 'update'){
        if(witness_list[row_id]['from_db'] == "Yes"){
            from_db = "Yes";
        }else{
            from_db = "No";
        }
    }
    witness_list[row_id] = {'witness_name': witness_name, 'witness_address': witness_address, 'witness_occupation':witness_occupation, 'witness_country_val': witness_country_val, 'witness_state_val': witness_state_val,
    'witness_rel_type': witness_rel_type, 'witness_rel_type_val': witness_rel_type_val, 'witness_relativename': witness_relativename, 
    'witness_statement': witness_statement, 'witness_district_val': witness_district_val, 'witness_ps_val': witness_ps_val, 'witness_sameaddress': witness_sameaddress,'witness_ps': witness_ps,
    'witness_samecountry_val': witness_samecountry_val, 'witness_samestate_val': witness_samestate_val, 'witness_sameps_val': witness_sameps_val,  'same_as_per': same_as_per,
    'witness_samedistrict_val': witness_samedistrict_val, 'witness_agetype': witness_agetype, 'witness_dob': witness_dob, 'witness_yob': witness_yob, 'witness_ageyear': witness_ageyear,
    'witness_agemonth': witness_agemonth, 'witness_agefrom': witness_agefrom, 'witness_ageto': witness_ageto, 'witness_agetype_val': witness_agetype_val, 'from_db': from_db,
    'witness_nationality_val': witness_nationality_val, 'witness_evidence_val': witness_evidence_val, 'soft_delete': soft_delete};
    html = build_rows_witness(witness_list);
    $("#witness_table").html(html);
    reset_witness();
}

$('#add_witness').click(function(){

    if($("#witnessname").val() == "")
    {
    document.getElementById("witnessname_error").innerHTML = "Enter Witness Name";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    document.getElementById("witnessname").focus();
    return 0;
    
    }

// Accused Nationality Check
    else if($("#witnessoccupation").find(":selected").val() == "")
{
    document.getElementById("witnessoccupation").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "Select Occupation";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }

    else if($("#witnessaddress").val() == "")
{
    document.getElementById("witnessaddress").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "Enter Witness Address";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_country").find(":selected").val() == "")
{
    document.getElementById("witness_country").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "Select Country";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_state").find(":selected").val() == "")
{
    document.getElementById("witness_state").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "Select State";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_district").find(":selected").val() == "")
{
    document.getElementById("witness_district").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "Select District";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_ps").find(":selected").val() == "")
{
    document.getElementById("witness_ps").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "Select PS";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_nationality").find(":selected").val() == "")
{
    document.getElementById("witness_nationality").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "Select Nationality";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_statement").val() == "")
{
    document.getElementById("witness_statement").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "Enter Witness Statement";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_sameaddress").val() == "")
{
    document.getElementById("witness_sameaddress").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "Enter Witness Address";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_samecountry").find(":selected").val() == "")
{
    document.getElementById("witness_samecountry").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "Select Country";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_samestate").find(":selected").val() == "")
{
    document.getElementById("witness_samestate").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "Select State";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_samedistrict").find(":selected").val() == "")
{
    document.getElementById("witness_samedistrict").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "Select District";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_sameps").find(":selected").val() == "")
{
    document.getElementById("witness_sameps").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "Select PS";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_agetype").find(":selected").val() == "")
{
    document.getElementById("witness_agetype").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "Select Age Type";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_dob").val() == "")
{
    document.getElementById("witness_agetype").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "Enter DOB";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_yob").val() == "")
{
    document.getElementById("witness_yob").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "Enter YOB";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_ageyear").val() == "")
{
    document.getElementById("witness_ageyear").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "Enter Age (In Years)";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }
    else if($("#witness_agefrom").val() == "")
{
    document.getElementById("witness_agefrom").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "Enter Age From";
    document.getElementById("witness_ageto_error").innerHTML = "";

    return 0;

    }

    else if($("#witness_ageto").val() == "")
{
    document.getElementById("witness_ageto").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "Enter Age To";

    return 0;

    }

else
{    
    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("witnessoccupation_error").innerHTML = "";
    document.getElementById("witnessaddress_error").innerHTML = "";
    document.getElementById("witness_country_error").innerHTML = "";
    document.getElementById("witness_state_error").innerHTML = "";
    document.getElementById("witness_district_error").innerHTML = "";        
    document.getElementById("witness_ps_error").innerHTML = "";
    document.getElementById("witness_nationality_error").innerHTML = "";
    document.getElementById("witness_statement_error").innerHTML = "";
    document.getElementById("witness_sameaddress_error").innerHTML = "";
    document.getElementById("witness_samecountry_error").innerHTML = "";
    document.getElementById("witness_samestate_error").innerHTML = "";
    document.getElementById("witness_samedistrict_error").innerHTML = "";
    document.getElementById("witness_sameps_error").innerHTML = "";
    document.getElementById("witness_agetype_error").innerHTML = "";

    document.getElementById("witness_dob_error").innerHTML = "";
    document.getElementById("witness_yob_error").innerHTML = "";
    document.getElementById("witness_ageyear_error").innerHTML = "";
    document.getElementById("witness_agemonth_error").innerHTML = "";
    document.getElementById("witness_agefrom_error").innerHTML = "";
    document.getElementById("witness_ageto_error").innerHTML = "";

    create_witness_list(witness_list.length);
}
});

// Deletes the row from a given data table
function delete_witness_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    if(witness_list[row_no]['from_db'] == 'Yes'){
        witness_list[row_no]['soft_delete'] = "Yes";
    }else{
        witness_list[row_no]['soft_delete'] = "No";
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
    create_witness_list(row_id, from='update');
}

function reset_witness(){
    set_select("witnessevidencetender", "");
    set_select("witnessoccupation", "");
    set_select("witness_reltype", "0");
    set_select("witness_nationality", "80");
    set_select("witness_agetype", ""); $("#witness_agetype").click();
    set_select("witness_country", "80");
    set_select("witness_state", "");
    reset_select("witness_district", "Select District")
    reset_select("witness_ps", "Select Police Station")
    set_select("witness_samecountry", "80");
    set_select("witness_samestate", "");
    reset_select("witness_samedistrict", "Select District")
    reset_select("witness_sameps", "Select Police Station")

    reset_text(["witnessname", "witness_relname", "witnessaddress", "witness_statement", "witness_sameaddress", "witness_dob", "witness_yob", "witness_ageyear", "witness_agemonth", "witness_agefrom", "witness_ageto",]);
    reset_radio(["witnesssameasper1"]);
    $("#add_witness").parent().attr("style", "display:block");
    $("#update_witness").parent().attr("style", "display:none");
    $("#cancel_witness").parent().attr("style", "display:none");
}


function load_witness(row){

    $("#witnessname").val(row.witness_name.replace("<td>","").replace("</td>",""));
    $("#witnessaddress").val(row.witness_address.replace("<td>","").replace("</td>",""));
    $("#witness_statement").val(row.witness_statement.replace("<td>","").replace("</td>",""));

    $("#witness_dob").val(row.witness_dob.replace("<td>","").replace("</td>",""));
    $("#witness_yob").val(row.witness_yob.replace("<td>","").replace("</td>",""));
    $("#witness_ageyear").val(row.witness_ageyear.replace("<td>","").replace("</td>",""));
    $("#witness_agemonth").val(row.witness_agemonth.replace("<td>","").replace("</td>",""));
    $("#witness_agefrom").val(row.witness_agefrom.replace("<td>","").replace("</td>",""));
    $("#witness_ageto").val(row.witness_ageto.replace("<td>","").replace("</td>",""));
    $("#witness_agetype").val(row.witness_agetype_val).trigger("change");$("#witnes_agetype").click();

    $("#witness_reltype").val(row.witness_rel_type_val).trigger("change");
    $("#witness_relname").val(row.witness_relativename.replace("<td>","").replace("</td>",""));

    $("#witnessevidencetender").val(row.witness_evidence_val).trigger("change");

    $("#witness_occupation").val(row.witness_occupation).trigger("change");
    $("#witness_country").val(row.witness_country_val).trigger("change");
    $("#witness_state").val(row.witness_state_val).trigger("change");
    $("#witness_nationality").val(row.witness_nationality_val).trigger("change");

    load_district_ps("witness_district", "witness_ps", row.witness_state_val, row.witness_district_val, row.witness_ps_val, row.same_as_per, "witnesssameasper1");
    if(row.same_as_per=="No"){
        $('#witnesssameasper2').click();
        $("#witness_sameaddress").val(row.witness_sameaddress);
        $("#witness_samecountry").val(row.witness_samecountry_val).trigger("change");
        $("#witness_samestate").val(row.witness_samestate_val).trigger("change");
        load_district_ps("witness_samedistrict", "witness_sameps", row.witness_samestate_val, row.witness_samedistrict_val, row.witness_sameps_val, row.same_as_per, "witnesssameasper1");
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

            if (wildbodyrecovered === '9' || wildbodyrecovered === '15' || wildbodyrecovered === '17' || wildbodyrecovered === '19' || wildbodyrecovered === '29')
            {
              wildotherdesc = $("#wildotherdesc").val();
            }
            else{
              wildotherdesc = '';
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

// $('#add_property').click(function(){
//     create_property_list(property_list.length);
// });

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
    "cyberaquisitiondetail2", "cybernetworkaquisition2", "cyberismobiledevice2", "ischasisnoknown2", "isenginenoknown2", "isregnoknown2"]);
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
            $("#armscat").val(row.arms_category_val).trigger("blur").trigger("change");
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
            }, 1000);
            setTimeout(function(){
                     $("#armssubtype").val(row.arms_subtype_val).trigger("change");
            }, 1000);
            break;
        case "AUTOMOBILES AND OTHERS":
            $("#autoestimate").val(row.value.replace("<td>","").replace("</td>",""));
            
            $("#autotype").val(row.auto_type).trigger("blur").trigger("change");
            setTimeout(function(){
                $("#automake").val(row.auto_make).trigger("blur").trigger("change");
            }, 1000);

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

            setTimeout(function(){
                $("#automodel").val(row.auto_model);
            }, 2000);
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
            $("#jewellerydescription").val(row.jewellerydescription);
            $("#jewelleryweightingms").val(row.jewelleryweightingms);
            break;
        case "WILD LIFE":
            $("#speciestype").val(row.speciestype).trigger("change");
            if (row.speciestype == '1')
            {
              $("#abcspeciestype").val(row.abcspeciestype).trigger("change");
            }
            $("#wildbodyrecovered").val(row.wildbodyrecovered).trigger("change");

            if (row.wildbodyrecovered == '9' || row.wildbodyrecovered == '15' || row.wildbodyrecovered == '17' || row.wildbodyrecovered == '19' || row.wildbodyrecovered == '29')
            {
              $("#wildotherdesc").val(row.wildotherdesc);
            }
            else
            {
              reset_text(["wildotherdesc"]);
              $("#wildotherdesc").val(row.wildotherdesc);
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

//         END of Data table functions //
//--------------------------------------/

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


///////////////////////////////////////

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
                  .appendTo("#seizure_add_form");
    f_l2 = {};
    witness_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=row[key].replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l2[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "witness_list")
                  .attr("value", JSON.stringify(f_l2))
                  .appendTo("#seizure_add_form");
    f_l3 = {};
    property_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           console.log(row[key]);
           temp[key]=String(row[key]).replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
        f_l3[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "property_list")
                  .attr("value", JSON.stringify(f_l3))
                  .appendTo("#seizure_add_form");
 }


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

//Property Add Check

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



//-- Witness Age Panel --

function witnesclearFunction() {
  document.getElementById("witness_dob").value = null;
  document.getElementById("witness_yob").value = '';
  document.getElementById("witness_ageyear").value = '';
  document.getElementById("witness_agemonth").value = '';
  document.getElementById("witness_agefrom").value = '';
  document.getElementById("witness_ageto").value = '';
}


function witnesdobFunction() {

  var now = firdatepanel; //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witness_dob").value;
  var  today = firdatepanel;
  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];

  if ( dob > firdatepanel )
{

    document.getElementById("witness_dob").focus();
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
    return false;

}
  else if ( dobyearcheckyear < 1900 )
{
    document.getElementById("witness_dob").focus();
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
    return false;

}
  else if ( dobyearcheckyear > firdateyearcheck )
{

    document.getElementById("witness_dob").focus();
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
    return false;

}

else
{

  var now = new Date(); //Todays Date
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witness_dob").value;
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

  document.getElementById("witness_yob").value = yob;
  document.getElementById("witness_ageyear").value = ageyear;
  document.getElementById("witness_agemonth").value = agemonth;
  document.getElementById("witness_agefrom").value = ageyear;
  document.getElementById("witness_ageto").value = ageyear;
}
}

function witnesyobFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];
 
  var yob = document.getElementById("witness_yob").value;
  if (yob < 1900)
  {
    document.getElementById("witness_yob").focus();
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';

  }
  else if (yob > firdateyearcheck)
  {
    document.getElementById("witness_yob").focus();
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
  }
  else
{
  var now = new Date(); //Todays Date
  var yob = document.getElementById("witness_yob").value;
  var nowYear= firdateyearcheck;
  var dob = yob + "-01-" + "01";
  var ageyear = nowYear - yob;

  document.getElementById("witness_dob").value = dob;
  document.getElementById("witness_ageyear").value = ageyear;
  document.getElementById("witness_agemonth").value = 0;
  document.getElementById("witness_agefrom").value = ageyear;
  document.getElementById("witness_ageto").value = ageyear;

}
}

function witnessagemonth() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("witness_ageyear").value;
  var agemonth = document.getElementById("witness_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").focus();
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
}
else if (ageyear == '')
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").focus();
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
}
else if (ageyear < 10)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").focus();
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
}
else
{

}
}

function witnesageFunction() {
  var now = new Date(); //Todays Date 
  var ageyear = document.getElementById("witness_ageyear").value;
  var agemonth = document.getElementById("witness_agemonth").value;
if (ageyear > 120)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").focus();
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
}
else if (agemonth > 11)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").focus();  
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';

}
else if (agemonth == '')
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").focus();  
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';

}
else if (ageyear == '')
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").focus();
    document.getElementById("witness_agemonth").value = '';   
    document.getElementById("witness_agefrom").value = '';
    document.getElementById("witness_ageto").value = '';
}

else
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("witness_ageyear").value;
  var agemonth = document.getElementById("witness_agemonth").value;

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
    document.getElementById("witness_agemonth").value = '0';  
  }
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("witness_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  document.getElementById("witness_dob").value = dob;
  document.getElementById("witness_yob").value = yob;
  document.getElementById("witness_agefrom").value = ageyear;
  document.getElementById("witness_ageto").value = ageyear;
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
      document.getElementById("witness_agemonth").value = 0;
    }
  var dob = yob + "-"+ mob + "-" + "01";
  }
  else
  {
    if(agemonth=='')
    {
      document.getElementById("witness_agemonth").value = 0;
    }    
  var dob = yob + "-0"+ mob + "-" + "01";
  }
  document.getElementById("witness_dob").value = dob;
  document.getElementById("witness_yob").value = yob;
  document.getElementById("witness_agefrom").value = ageyear;
  document.getElementById("witness_ageto").value = ageyear;
}
}

//end of else

}

function witnesagerangefromFunction() 
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = Number(document.getElementById("witness_agefrom").value);
  var ageyearto = Number(document.getElementById("witness_ageto").value);

if (ageyear > 120)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_agefrom").focus();    
    document.getElementById("witness_ageto").value = ''; 
}

else if (ageyear < 10)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_agefrom").focus();
    document.getElementById("witness_ageto").value = '';  
}

else if (ageyearto == '')
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_ageto").focus();    
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

  var ageyear = Number(document.getElementById("witness_agefrom").value);
  var ageyearto = Number(document.getElementById("witness_ageto").value);

if (ageyear > 120)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_agefrom").focus();    
    document.getElementById("witness_ageto").value = ''; 
}

else if (ageyear < 10)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_agefrom").focus();
    document.getElementById("witness_ageto").value = '';  
}

else if (ageyearto > 120)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_ageto").focus();    
}

else if (ageyearto == '')
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_ageto").focus();    
}

else if (ageyearto < ageyear)
{
    document.getElementById("witness_dob").value = null;
    document.getElementById("witness_yob").value = '';
    document.getElementById("witness_ageyear").value = '';
    document.getElementById("witness_agemonth").value = '';
    document.getElementById("witness_ageto").focus();    
}
else
{

  var now = new Date(); //Todays Date
  var fircaldate=firdatepanel.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var ageyear = document.getElementById("witness_agefrom").value;

  var nowYear= firdateyearcheck;

  var yob = nowYear - ageyear;

  var dob = yob + "-"+ '01' + "-" + "01";

  document.getElementById("witness_dob").value = dob;
  document.getElementById("witness_yob").value = yob;
  document.getElementById("witness_ageyear").value = ageyear;
  document.getElementById("witness_agemonth").value = 0;

}
}

