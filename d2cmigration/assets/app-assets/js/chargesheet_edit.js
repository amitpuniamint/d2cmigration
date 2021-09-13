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


function chs_court_forward_date_check()
{

var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
chsacccourtfrwddate = $("#chsaccusedcourtfrwddate").val();

if(currentdate<chsacccourtfrwddate)
{
document.getElementById("chsaccusedcourtfrwddate").focus();
document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = " Should be less than Todays Date";
}
else
{    
}
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

    if(document.getElementById('chstypeoffinal').value=='5')
    {
    document.getElementById('chsfirunoccurred').disabled=false;
    }
    else{
    document.getElementById('chsfirunoccurred').disabled=true;
    }

    
    $("#arrestdatetime").attr("max",set_time_picker_min_val_today());
    // $("#fir_gddatetime").attr("max",document.getElementById('fir_date'));
  if(document.getElementById('chstypefrorch').value=='10')
    {
    document.getElementById('chstypeoffinal').disabled=false;
    if(document.getElementById('chstypeoffinal').value=='5')
    {

    document.getElementById('chsfirunoccurred').disabled=false;
    }
    else
    {

    document.getElementById('chsfirunoccurred').disabled=true;
    
    }

var table = document.getElementById("accused_table");
for (var i = 0, row; row = table.rows[i]; i++) 
{
var brow = i + 1;
var chadd = 'chargeadd';
var res = chadd.concat(brow);
$("#"+res).prop("disabled", true);
$("#non"+res).prop("disabled", false);
// document.getElementById(res).disabled = true;
}
    }

  else
    {

document.getElementById('chstypeoffinal').disabled=true;
document.getElementById('chsfirunoccurred').disabled=true;


var table = document.getElementById("accused_table");
for (var i = 0, row; row = table.rows[i]; i++) 
{
var brow = i + 1;
var chadd = 'chargeadd';
var res = chadd.concat(brow);

var chsacc = "#"+res;
var nonchsacc = "#non"+res;

if (accused_list[i]['ischargesheet'] == 'Yes')
{

$("#nonchargeadd"+brow).prop("disabled", false);
$("#chargeadd"+brow).prop("disabled", true); 
}
if (accused_list[i]['ischargesheet'] == 'No')
{

$(chsacc).prop("disabled", true); 
$(nonchsacc).prop("disabled", false);    

}

}

    }
});

function chkfirunocc()
{
    if(document.getElementById('chstypeoffinal').value=='5')
    {
    document.getElementById('chsfirunoccurred').disabled=false;
    }
    else{
    document.getElementById('chsfirunoccurred').disabled=true;
    }
}


function checkfr(){
  if(document.getElementById('chstypefrorch').value=='10')
  {


    document.getElementById('chstypeoffinal').disabled=false;
    document.getElementById('chsfirunoccurred').disabled=false;

    if(document.getElementById('chstypeoffinal').value=='5')
    {
    document.getElementById('chsfirunoccurred').disabled=false;
    // document.getElementById('chsfirunoccreason').disabled=false;
    }
    else{
    document.getElementById('chsfirunoccurred').disabled=true;
        // document.getElementById('chsfirunoccreason').disabled=true;
        // document.getElementById('chsfirunoccreason').value = '';
    }


var table = document.getElementById("accused_table");
for (var i = 0, row; row = table.rows[i]; i++) 
{
var brow = i + 1;
console.log(brow);
var chadd = 'chargeadd';
var res = chadd.concat(brow);
console.log(res);
document.getElementById(res).disabled = true;
}

  }
  else
  {

document.getElementById('chstypeoffinal').disabled=true;
document.getElementById('chsfirunoccurred').disabled=true;

var table = document.getElementById("accused_table");
for (var i = 0, row; row = table.rows[i]; i++) 
{
var brow = i + 1;
console.log(brow);
var chadd = 'chargeadd';
var res = chadd.concat(brow);
console.log(res);
document.getElementById(res).disabled = false;
}

  }
}

function set_select(id, val){
    $("#"+id).val(val);
}

function checkheight(){
    var heightfrom = parseFloat(document.getElementById('accheight').value);
    var heightto = parseFloat(document.getElementById('accheighttocm').value);

    if (isNaN(heightfrom))
    {
        document.getElementById('accheight').value = '';
        document.getElementById("accheight").focus();
        return false;
    }
    else if (isNaN(heightto))
    {
        document.getElementById('accheighttocm').value = '';
        document.getElementById("accheighttocm").focus();
        return false;
    }

    else if (heightfrom > heightto) {
        document.getElementById("accheighttocm_error").innerHTML = " Should be greater than Height From";
        document.getElementById('accheighttocm').value = '';
        document.getElementById("accheighttocm").focus();
        return false;
    }
    else
    {
        document.getElementById("accheighttocm_error").innerHTML = "";
        return true;
    }
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

var arrfirDate = $("#firdate").val().split(" ");
var firdatecomp = arrfirDate[0].split("-");
firdatepanel = firdatecomp[2] + "-" + firdatecomp[1] + "-" + firdatecomp[0];

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

$("#chs_refernotice2").click(function(){
    $("#chs_refernotice_date").prop("disabled", true);
});

$("#chs_refernotice1").click(function(){
    $("#chs_refernotice_date").prop("disabled", false);
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
        s_country.val("");
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
    "witness_sameps", "witnessaddress","witness_country","witness_state","witness_district","witness_ps");
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
        delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' role='button' aria-pressed='true' onclick='delete_row_act(\"chargesheet_act_sec\",\""+index+"\");'><i class='feather icon-menu' tooltip='Delete'></i>&nbsp;Delete</a></td>";
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
    act_sec_list[act_sec_list.length] = {'act_cd': act_cd, 'act_text': act_text, 'sec_cd': sec_cd, 'sec_text': sec_text, 'from_db': "No", 'act_srno': '', 'soft_delete': 'No'};
    html = build_rows_act(act_sec_list);
    $("#chargesheet_act_sec").html(html);
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
    $("#chargesheet_act_sec").html(build_rows_act(act_sec_list));
}

// Accused Add & Delete --------------------------//


function create_accused_list(row_id, from='insert'){
    fir_accusedname = "<td>"+$("#accusedname").val()+"</td>";
    fir_accaddress = $("#acc_address").val();
    acc_type = $('input[name="accusedtypes"]:checked').val();
    acc_juvenile = $('input[name="accjuvenile"]:checked').val();
    acc_medical = $('input[name="accmmedical"]:checked').val();
    acc_sameasper = $('input[name="acc_sameasper"]:checked').val();
    acc_gender =  "<td>"+$("#accgender").find(":selected").text()+"</td>";
    acc_gender_val = $("#accgender").find(":selected").val();

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
    isarrestorsurrender = '';
    arrstate_val = '';
    arrdistrict_val = '';
    arrps_val = '';
    accusedtypeofcourt_val = '';
    accusedmegistrate = '';
    accusedactiontaken_val = '';

   accusedverified = $("#chsaccusedverified").find(":selected").val();
   accusedaddverified = $("#chsaccusedaddverified").find(":selected").val();
   accusedprovcrimno = $("#chsaccusedprovcrimno").val();
   accusedregcrimno = $("#chsaccusedregcrimno").val();
   accusedcourtfrwddate = $("#chsaccusedcourtfrwddate").val();
   accusedpreconviction = $("#chsaccusedpreconviction").val();
   accusedstatus = $("#chsaccusedstatus").find(":selected").val();
   ischargesheet = '';
   nonaccusedsplremark = '';
   accchs_act_sect = $("#addcharge_act_sect").val()
   accchs_act_sect = Object.assign({}, accchs_act_sect);
   act_sec = JSON.stringify(accchs_act_sect);
   temp_index = row_id+1;
   $("#nonchargeadd"+temp_index).prop("disabled", true);

    if(from == 'update'){

    if(accused_list[row_id].ischargesheet == 'Yes')
    {        
   accusedverified = accused_list[row_id].accusedverified;
   accusedaddverified = accused_list[row_id].accusedaddverified;
   accusedprovcrimno = accused_list[row_id].accusedprovcrimno;
   accusedregcrimno = accused_list[row_id].accusedregcrimno;
   accusedcourtfrwddate = accused_list[row_id].accusedcourtfrwddate;
   accusedpreconviction = accused_list[row_id].accusedpreconviction;
   accusedstatus = accused_list[row_id].accusedstatus;
   nonaccusedsplremark = '';
   ischargesheet = accused_list[row_id].ischargesheet;
   act_sec = accused_list[row_id].act_sec;
   temp_index = row_id+1;
   }

    else if(accused_list[row_id].ischargesheet == 'Y')
    {        
   accusedverified = accused_list[row_id].accusedverified;
   accusedaddverified = accused_list[row_id].accusedaddverified;
   accusedprovcrimno = accused_list[row_id].accusedprovcrimno;
   accusedregcrimno = accused_list[row_id].accusedregcrimno;
   accusedcourtfrwddate = accused_list[row_id].accusedcourtfrwddate;
   accusedpreconviction = accused_list[row_id].accusedpreconviction;
   accusedstatus = accused_list[row_id].accusedstatus;
   nonaccusedsplremark = '';
   ischargesheet = accused_list[row_id].ischargesheet;
   act_sec = accused_list[row_id].act_sec;
   temp_index = row_id+1;

    }

    else if(accused_list[row_id].ischargesheet == 'No')
    {        
   accusedverified = accused_list[row_id].accusedverified;
   accusedaddverified = accused_list[row_id].accusedaddverified;
   accusedprovcrimno = accused_list[row_id].accusedprovcrimno;
   accusedregcrimno = accused_list[row_id].accusedregcrimno;
   accusedcourtfrwddate = accused_list[row_id].accusedcourtfrwddate;
   nonaccusedsplremark = accused_list[row_id].nonaccusedsplremark;
   ischargesheet = 'N';
   accusedpreconviction = '';
   accusedstatus = '';
   act_sec = accused_list[row_id].act_sec;
   temp_index = row_id+1;
    }

    else if(accused_list[row_id].ischargesheet == 'N')
    {        
   accusedverified = accused_list[row_id].accusedverified;
   accusedaddverified = accused_list[row_id].accusedaddverified;
   accusedprovcrimno = accused_list[row_id].accusedprovcrimno;
   accusedregcrimno = accused_list[row_id].accusedregcrimno;
   accusedcourtfrwddate = accused_list[row_id].accusedcourtfrwddate;
   nonaccusedsplremark = accused_list[row_id].nonaccusedsplremark;
   ischargesheet = 'N';
   accusedpreconviction = '';
   accusedstatus = '';
   act_sec = accused_list[row_id].act_sec;
   temp_index = row_id+1;
    }


        if(accused_list[row_id]['from_db'] == "Yes"){
            from_db = "Yes";
            accused_srno = accused_list[row_id]['accused_srno']
            
        }else{
            from_db = "No";
        }
    }
    found = accused_list.some(el => el.accusedname == fir_accusedname && el.accaddress == fir_accaddress);
    if(found && from != 'update'){return 0;}
    accused_list[row_id] = {'accusedname': fir_accusedname, 'accaddress': fir_accaddress, 'acc_type': acc_type,
    'acc_rel_type': acc_rel_type, 'acc_rel_type_val': acc_rel_type_val, 'acc_relname': acc_relname,
    'acc_juvenile': acc_juvenile, 'acc_medical':acc_medical, 'acc_gender': acc_gender, 'acc_gender_val': acc_gender_val,
    'acc_agetype': acc_agetype, 'acc_agetype_val': acc_agetype_val, 'acc_dob': acc_dob, 'acc_yob': acc_yob, 'acc_ageyear': acc_ageyear,
    'acc_agemonth': acc_agemonth, 'acc_agefrom': acc_agefrom, 'acc_ageto': acc_ageto, 'acc_country': acc_country, 'acc_country_val': acc_country_val,
    'acc_state': acc_state, 'acc_state_val': acc_state_val, 'acc_district': acc_district, 'acc_district_val': acc_district_val,
    'acc_ps': acc_ps, 'acc_ps_val': acc_ps_val, 'acc_adddr_same': acc_adddr_same, 'acc_country_same': acc_country_same,
    'acc_country_same_val': acc_country_same_val, 'acc_state_same': acc_state_same, 'acc_state_same_val': acc_state_same_val,
    'acc_district_same': acc_district_same, 'acc_district_same_val': acc_district_same_val, 'acc_ps_same': acc_ps_same,
    'acc_ps_same_val': acc_ps_same_val, 'acc_nationality': acc_nationality, 'acc_nationality_val': acc_nationality_val, 'acc_sameasper': acc_sameasper,
    'accusedverified': accusedverified, 'accusedaddverified': accusedaddverified, 'accusedprovcrimno': accusedprovcrimno,
    'accusedregcrimno': accusedregcrimno, 'accusedcourtfrwddate': accusedcourtfrwddate, 'accusedpreconviction': accusedpreconviction,
    'accusedstatus': accusedstatus, 'ischargesheet': ischargesheet, 'act_sec': act_sec, 'nonaccusedsplremark': nonaccusedsplremark,
    'from_db': from_db, 'soft_delete': soft_delete,'accused_srno':accused_srno, 'module': '2', 'chargesheet_srno': chargesheet_srno }
    html = build_rows_acc(accused_list);
    // console.log(accused_list)
    $("#accused_table").html(html);
    reset_accused();
    check_chs_nonchs();
    // if(accused_list[row_id].ischargesheet == 'Yes')
    // {
    //     $("#nonchargeadd"+temp_index).prop("disabled", true);
    //     $("#chargeadd"+temp_index).prop("disabled", false);
    // }

    // if(accused_list[row_id].ischargesheet == 'Y')
    // {
    //     $("#nonchargeadd"+temp_index).prop("disabled", true);
    //     $("#chargeadd"+temp_index).prop("disabled", false);
    // }

    // if(accused_list[row_id].ischargesheet == 'No')
    // {
    //     $("#nonchargeadd"+temp_index).prop("disabled", false);
    //     $("#chargeadd"+temp_index).prop("disabled", true);
    // }

    // if(accused_list[row_id].ischargesheet == 'N')
    // {
    //     $("#nonchargeadd"+temp_index).prop("disabled", false);
    //     $("#chargeadd"+temp_index).prop("disabled", true);
    // }

}

function check_chs_nonchs()
{
var table = document.getElementById("accused_table");
var totalRowCount = $("#accused_table tr").length;

for (var i = 0, row; row = table.rows[i]; i++) 
{
var brow = i + 1;
var chadd = 'chargeadd';
var res = chadd.concat(brow);
// alert(brow);
// alert(row);
var chsacc = "#"+res;
var nonchsacc = "#non"+res;

if (totalRowCount == brow)
{

}
else
{
if (accused_list[i]['ischargesheet'] == 'Yes' || accused_list[i]['ischargesheet'] == 'Y')
{

$("#nonchargeadd"+brow).prop("disabled", true);
$("#chargeadd"+brow).prop("disabled", false); 
}
if (accused_list[i]['ischargesheet'] == 'No' || accused_list[i]['ischargesheet'] == 'N')
{

$(chsacc).prop("disabled", false); 
$(nonchsacc).prop("disabled", true);    

}

}

}

}


function build_rows_acc(accused_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Accused Name</th> <th>Gender</th><th>Edit</th><th>ChargeSheet</th><th>Non ChargeSheet</th><th>Clear</th><th>Delete Accused</th></thead>"
    accused_list.forEach(function(row, index){
        if(row['soft_delete'] == "Yes"){
            return true;
        }
        index += 1;
        charge_add_edit = "<td><button id='chargeadd"+index+"' type='button' class='btn btn-icon btn-success center mr-1 mb-1' data-toggle='modal' data-target='#AddChargesheetForm' onclick='cur_index=\""+index+"\";load_charge(\""+index+"\");'>Add/Edit</button></td>";
        ncharge_add_edit = "<td><button id='nonchargeadd"+index+"'  type='button' class='btn btn-icon btn-success center mr-1 mb-1' data-toggle='modal' data-target='#AddNonChargesheetForm' onclick='cur_index=\""+index+"\";load_noncharge(\""+index+"\");'>Add/Edit</button></td>";
        clear_add_edit = "<td><button id='cleardata"+index+"'  type='button' class='btn btn-icon btn-warning center mr-1 mb-1' data-toggle='modal' data-target='#arrest_danger_message' onclick='cur_index=\""+index+"\";clear_chargesheet(\""+index+"\");'>Clear</button></td>";
        delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' title='Delete' data-toggle='tooltip' onclick='delete_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i>&nbsp;Delete</a></td>";
        edit_button = "<td><a class='btn btn-icon btn-warning center mr-1 mb-1' title='Edit' data-toggle='modal' data-target='#addaccusedmodal' onclick='edit_acc_row(\"accused_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i>&nbsp;Edit</a></td>";
        // clear_add_edit = "<td><button id='cleardata"+index+"'  type='button' class='btn btn-icon btn-danger center mr-1 mb-1' data-target='#AddNonChargesheetForm' onclick='cur_index=\""+index+"\";clear_chargesheet(\""+index+"\");'>Clear</button></td>";

//        if(row.acc_juvenile=='No'){
//            ncharge_add_edit = "<td><button type='button' class='btn btn-icon btn-success center mr-1 mb-1' data-toggle='modal' data-target='#AddNonChargesheetForm' disabled>Add/Edit</button></td>";
//        }else{
//            charge_add_edit = "<td><button type='button' class='btn btn-icon btn-success center mr-1 mb-1' data-toggle='modal' data-target='#AddChargesheetForm' disabled>Add/Edit</button></td>";
//        }
        no = '<td>'+index+'</td>';
        html = '<tr id="'+index+'">'+no+row.accusedname+row.acc_gender+edit_button+charge_add_edit+ncharge_add_edit+clear_add_edit+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
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
    else{
        $('#acccomplsameasper1').click();
        $("#acc_sameasaddress").val(row.acc_adddr_same.replace("<td>","").replace("</td>",""));
        $("#acc_sameascountry").val(row.acc_country_same_val).trigger("change");
        $("#acc_sameasstate").val(row.acc_state_same_val).trigger("change");
        load_district_ps("acc_sameasdistrict", "acc_sameasps", row.acc_state_same_val, row.acc_district_same_val, row.acc_ps_same_val, row.acc_sameasper, "acccomplsameasper1");
    }
    $("#accagetype").change();
    hide();
}

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
        // $('#addaccused').attr('disabled','disabled');
    } else {
        // $('#addaccused').removeAttr('disabled');
    }
       
}

});

function delete_acc_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    if(accused_list[row_no]['from_db'] == 'Yes'){
        accused_list[row_no]['soft_delete'] = "Yes";
    }else{
        accused_list.splice(row_no, 1);
    }

    $("#accused_table").html(build_rows_acc(accused_list));
}

// Loads Charge Sheet, called when click on add/edit
function load_charge(row_no){
	reset_charge();
	checklength = '';
    row_no -= 1;
    // alert(row_no);
    $("#chsaccusedsno").val(accused_list[row_no].acc_srno);
    $("#chsaccusedname").val(accused_list[row_no].accusedname.replace("<td>", "").replace("</td>", ""));
    $("#chsaccusedgender").val(accused_list[row_no].acc_gender.replace("<td>", "").replace("</td>", ""));
    $("#chsaccusedyob").val(accused_list[row_no].acc_yob);
    $("#chsaccusednationality").val(accused_list[row_no].acc_nationality);
    $("#chsaccusedaddress").val(accused_list[row_no].accaddress);
    $("#chsaccusedstate").val(accused_list[row_no].acc_state);
    $("#chsaccuseddistrict").val(accused_list[row_no].acc_district);
    $("#chsaccusedps").val(accused_list[row_no].acc_ps.replace("<td>", "").replace("</td>", ""));
    $("#chsaccusedarrestdate").val(accused_list[row_no].acc_arrest_date);
    $("#chsaccusedbailreldate").val(accused_list[row_no].acc_bailrelease_date);
    $("#chsaccusedverified").val(accused_list[row_no].accusedverified);
    $("#chsaccusedaddverified").val(accused_list[row_no].accusedaddverified);
    $("#chsaccusedprovcrimno").val(accused_list[row_no].accusedprovcrimno);
    $("#chsaccusedregcrimno").val(accused_list[row_no].accusedregcrimno);
    $("#chsaccusedcourtfrwddate").val(accused_list[row_no].accusedcourtfrwddate);
    $("#chsaccusedpreconviction").val(accused_list[row_no].accusedpreconviction);
    $("#chsaccusedstatus").val(accused_list[row_no].accusedstatus);
    if(accused_list[row_no].ischargesheet==""){

// $("#addcharge_act_sect").val(81).trigger('change');
        $("#addcharge_act_sect").val("").change();
    }
        checklength = accused_list[row_no].act_sec;
        accusedsrno = accused_list[row_no].accused_srno;
        // alert(row_no);
        // console.log(row_no);
        // alert(checklength.length);
        // console.log(checklength.length);
        
        var Values = new Array();        
        if(JSON.stringify(checklength) === '{}')
        {
        var arrayLength = accused_act_sec.length;
        for (var i = 0; i < arrayLength; i++) {
        if (accusedsrno == accused_act_sec[i]['sec_acc_srno'])
        {
        Values.push(accused_act_sec[i]['sec_cd_val']);
        }
        else
        {

        }
        }	

        $("#addcharge_act_sect").val(Values).trigger('change');
        }

        else if (checklength == '{}')
        {
        	// alert(2);
        }
        else
        {            
        	// alert(3);
        	// console.log(checklength);
            data = accused_list[row_no].act_sec;
            // alert(data)
            var act_sec_obj = JSON.parse(data);
            // alert(act_sec_obj);
            $.each(act_sec_obj, function(i, item) {
            Values.push(item);
            });
        $("#addcharge_act_sect").val(Values).trigger('change');
        }

}


function load_accused_actsection_resource(url, data, elm_id, val_pos, text_pos, value){
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
        alert(resource[text_pos]);
        $("#"+elm_id).find(":selected").data("id");
     // $('#'+elm_id).append($("<option selected></option>").attr("value",resource[val_pos]+'$'+resource[text_pos]));
    });
  }});
}

// Clear ChargeSheet/Non-ChargeSheet, called when click on add/edit
function clear_chargesheet(row_no){
   row_no -= 1;
   accused_list[row_no].accusedverified = '';
   accused_list[row_no].accusedaddverified = '';
   accused_list[row_no].accusedprovcrimno = '';
   accused_list[row_no].accusedregcrimno = '';
   accused_list[row_no].accusedcourtfrwddate = '';
   accused_list[row_no].accusedpreconviction = '';
   accused_list[row_no].accusedstatus = '';
   accused_list[row_no].ischargesheet = '';
   accchs_act_sect = ''
   accchs_act_sect = Object.assign({}, accchs_act_sect);
   accused_list[row_no].act_sec = '';
   temp_index = row_no+1;

   accused_list[row_no].accusedverified = '';
   accused_list[row_no].accusedaddverified = '';
   accused_list[row_no].accusedprovcrimno = '';
   accused_list[row_no].accusedregcrimno = '';
   accused_list[row_no].accusedcourtfrwddate = '';
   accused_list[row_no].nonaccusedsplremark = '';
   accused_list[row_no].ischargesheet = '';
   accnonchs_act_sect = ''
   accnonchs_act_sect = Object.assign({}, accnonchs_act_sect);
   accused_list[row_no].act_sec = '';
   accused_list[row_no].ischargesheet = '';
   temp_index = row_no+1;

   $("#nonchargeadd"+temp_index).prop("disabled", false);

   if(document.getElementById('chstypefrorch').value=='10')
   {
   $("#chargeadd"+temp_index).prop("disabled", true); 
   }
   else
   {
    $("#chargeadd"+temp_index).prop("disabled", false); 
   }
   

}


function save_chargesheet(row_no){

    if($("#chsaccusedverified").val() == "")
{
    document.getElementById("chsaccusedverified").focus();

    $('#chsaccusedverified').css('border-color', 'red');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "Select Type";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = "";

    $('#AddChargesheetForm').modal('show');
}

    else if($("#chsaccusedaddverified").val() == "")
{
    document.getElementById("chsaccusedaddverified").focus();

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', 'red');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "Select Address";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = "";

    $('#AddChargesheetForm').modal('show');
}

    else if($("#chsaccusedprovcrimno").val() == "")
{
    document.getElementById("chsaccusedprovcrimno").focus();

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', 'red');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "Enter Crime Number";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = "";

    $('#AddChargesheetForm').modal('show');
}

    else if($("#chsaccusedregcrimno").val() == "")
{
    document.getElementById("chsaccusedregcrimno").focus();

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', 'red');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "Select Details";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = "";

    $('#AddChargesheetForm').modal('show');
}

    else if($("#chsaccusedcourtfrwddate").val() == "")
{
    document.getElementById("chsaccusedcourtfrwddate").focus();

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', 'red');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "Enter Date";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = "";

    $('#AddChargesheetForm').modal('show');
}

    else if($("#chsaccusedpreconviction").val() == "")
{
    document.getElementById("chsaccusedpreconviction").focus();

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', 'red');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "Enter Conviction Details";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = "";

    $('#AddChargesheetForm').modal('show');
}

    else if($("#chsaccusedstatus").val() == "")
{
    document.getElementById("chsaccusedstatus").focus();

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', 'red');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "Select Accused Status";
    document.getElementById("addcharge_act_sect_error").innerHTML = "";

    $('#AddChargesheetForm').modal('show');
}

    else if($("#addcharge_act_sect").val() == "")
{
    document.getElementById("addcharge_act_sect").focus();

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', 'red');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";

    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = "Select Act/Section";

    $('#AddChargesheetForm').modal('show');
}


    else
    {

   row_no -= 1;
   accused_list[row_no].accusedverified = $("#chsaccusedverified").find(":selected").val();
   accused_list[row_no].accusedaddverified = $("#chsaccusedaddverified").find(":selected").val();
   accused_list[row_no].accusedprovcrimno = $("#chsaccusedprovcrimno").val();
   accused_list[row_no].accusedregcrimno = $("#chsaccusedregcrimno").val();
   accused_list[row_no].accusedcourtfrwddate = $("#chsaccusedcourtfrwddate").val();
   accused_list[row_no].accusedpreconviction = $("#chsaccusedpreconviction").val();
   accused_list[row_no].accusedstatus = $("#chsaccusedstatus").find(":selected").val();
   accused_list[row_no].ischargesheet = 'Y';
   accchs_act_sect = $("#addcharge_act_sect").val()
   // accused_list[row_no].act_sec = JSON.stringify($("#addcharge_act_sect").val());
   accchs_act_sect = Object.assign({}, accchs_act_sect);
   accused_list[row_no].act_sec = JSON.stringify(accchs_act_sect);
   temp_index = row_no+1;
   $("#nonchargeadd"+temp_index).prop("disabled", true);

    hide();
    $('#AddChargesheetForm').modal('hide');    

    $('#chsaccusedverified').css('border-color', '');
    $('#chsaccusedaddverified').css('border-color', '');
    $('#chsaccusedprovcrimno').css('border-color', '');
    $('#chsaccusedregcrimno').css('border-color', '');
    $('#chsaccusedcourtfrwddate').css('border-color', '');
    $('#chsaccusedpreconviction').css('border-color', '');
    $('#chsaccusedstatus').css('border-color', '');
    $('#addcharge_act_sect').css('border-color', '');

    document.getElementById("chsaccusedverified_error").innerHTML = "";
    document.getElementById("chsaccusedaddverified_error").innerHTML = "";
    document.getElementById("chsaccusedprovcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedregcrimno_error").innerHTML = "";
    document.getElementById("chsaccusedcourtfrwddate_error").innerHTML = "";
    document.getElementById("chsaccusedpreconviction_error").innerHTML = "";
    document.getElementById("chsaccusedstatus_error").innerHTML = "";
    document.getElementById("addcharge_act_sect_error").innerHTML = ""; 
    reset_charge();       
}
}
function reset_charge(){
	// alert('Reset ChargeSheet');
    set_select("chsaccusedverified", "");
    $('#chsaccusedverified').val('');
    set_select("chsaccusedaddverified", "");
    $('#chsaccusedaddverified').val('');
    set_select("chsaccusedprovcrimno", "");
    $('#chsaccusedprovcrimno').val('');
    set_select("chsaccusedregcrimno", "");
    $('#chsaccusedregcrimno').val('');
    set_select("addcharge_act_sect", "");
    $('#addcharge_act_sect').val('');
    $('#chsaccusedstatus').val('');

    $("#addcharge_act_sect").val('').trigger('change')

    reset_text(["chsaccusedcourtfrwddate", "chsaccusedpreconviction"]);
}


// Loads Non Charge Sheet, called when click on add/edit
function load_noncharge(row_no){
    row_no -= 1;
    $("#chsnonaccusedsno").val(accused_list[row_no].acc_srno);
    $("#chsnonaccusedname").val(accused_list[row_no].accusedname.replace("<td>", "").replace("</td>", ""));
    $("#chsnonaccusedgender").val(accused_list[row_no].acc_gender.replace("<td>", "").replace("</td>", ""));
    $("#chsnonaccusedyob").val(accused_list[row_no].acc_yob);
    $("#chsnonaccusednationality").val(accused_list[row_no].acc_nationality);
    $("#chsnonaccusedaddress").val(accused_list[row_no].accaddress);
    $("#chsnonaccusedstate").val(accused_list[row_no].acc_state);
    $("#chsnonaccuseddistrict").val(accused_list[row_no].acc_district);
    $("#chsnonaccusedps").val(accused_list[row_no].acc_ps.replace("<td>", "").replace("</td>", ""));
    $("#chsnonaccusedarrestdate").val(accused_list[row_no].acc_arrest_date);
    $("#chsnonaccusedbailreldate").val(accused_list[row_no].acc_bailrelease_date);
    $("#chsnonaccusedverified").val(accused_list[row_no].accusedverified);
    $("#chsnonaccusedaddverified").val(accused_list[row_no].accusedaddverified);
    $("#chsnonaccusedprovcrimno").val(accused_list[row_no].accusedprovcrimno);
    $("#chsnonaccusedregcrimno").val(accused_list[row_no].accusedregcrimno);
    $("#chsnonaccusedcourtfrwddate").val(accused_list[row_no].accusedcourtfrwddate);
    $("#chsnonaccusedsplremark").val(accused_list[row_no].nonaccusedsplremark);
    if(accused_list[row_no].ischargesheet==""){
        $("#addnoncharge_act_sect").val("").change();
    }
    $("#addnoncharge_act_sect").val(accused_list[row_no].act_sec).trigger("change");
}

function save_nonchargesheet(row_no){
   row_no -= 1;

   accused_list[row_no].accusedverified = $("#chsnonaccusedverified").find(":selected").val();
   accused_list[row_no].accusedaddverified = $("#chsnonaccusedaddverified").find(":selected").val();
   accused_list[row_no].accusedprovcrimno = $("#chsnonaccusedprovcrimno").val();
   accused_list[row_no].accusedregcrimno = $("#chsaccusedregcrimno").val();
   accused_list[row_no].accusedcourtfrwddate = $("#chsnonaccusedcourtfrwddate").val();
   accused_list[row_no].nonaccusedsplremark = $("#chsnonaccusedsplremark").val();
   accused_list[row_no].ischargesheet = 'N';
   // accused_list[row_no].act_sec = JSON.stringify($("#addnoncharge_act_sect").val());

   accnonchs_act_sect = $("#addnoncharge_act_sect").val()
   accnonchs_act_sect = Object.assign({}, accnonchs_act_sect);
   accused_list[row_no].act_sec = JSON.stringify(accnonchs_act_sect);
   accused_list[row_no].ischargesheet = 'N';
   temp_index = row_no+1;
   $("#chargeadd"+temp_index).prop("disabled", true);
    hide();
    $('#AddNonChargesheetForm').modal('hide');    

    // $('#chsnonaccusedverified').css('border-color', '');
    // $('#chsnonaccusedaddverified').css('border-color', '');
    // $('#chsnonaccusedprovcrimno').css('border-color', '');
    // $('#chsnonaccusedregcrimno').css('border-color', '');
    // $('#chsnonaccusedcourtfrwddate').css('border-color', '');
    // $('#chsnonaccusedpreconviction').css('border-color', '');
    // $('#chsnonaccusedstatus').css('border-color', '');
    // $('#addnoncharge_act_sect').css('border-color', '');

    // document.getElementById("chsnonaccusedverified_error").innerHTML = "";
    // document.getElementById("chsnonaccusedaddverified_error").innerHTML = "";
    // document.getElementById("chsnonaccusedprovcrimno_error").innerHTML = "";
    // document.getElementById("chsnonaccusedregcrimno_error").innerHTML = "";
    // document.getElementById("chsnonaccusedcourtfrwddate_error").innerHTML = "";

    // document.getElementById("chsnonaccusedpreconviction_error").innerHTML = "";
    // document.getElementById("chsnonaccusedstatus_error").innerHTML = "";
    // document.getElementById("addnoncharge_act_sect_error").innerHTML = "";


}

$("#chs_iotype").change(function(){
    /*
    <option value="">Select</option>
    <option value="0">Known</option>
    <option value="1">Unknown</option>
    */
    io_type = $("#chs_iotype").find(":selected").val()
    switch(io_type){
        case "0":
            $("#chs_ionamerank").prop("disabled", true);
            $("#chs_pis_beltno").prop("disabled", true);
            $("#chs_iorank").prop("disabled", true);
            $("#chs_io").prop("disabled", false);
            break;
        case "1":
            $("#chs_ionamerank").prop("disabled", false);
            $("#chs_pis_beltno").prop("disabled", false);
            $("#chs_iorank").prop("disabled", false);
            $("#chs_io").prop("disabled", true);
            break;
    }
});


$("#chs_shotype").change(function(){
    /*
    <option value="">Select</option>
    <option value="0">Known</option>
    <option value="1">Unknown</option>
    */
    sho_type = $("#chs_shotype").find(":selected").val()
    switch(sho_type){
        case "0":
            $("#sho_shorank").prop("disabled", true);
            $("#csh_sho").prop("disabled", false);
            $("#chs_shonamerank").prop("disabled", true);
            $("#chs_shopis_beltno").prop("disabled", true);
            break;
        case "1":
            $("#sho_shorank").prop("disabled", false);
            $("#csh_sho").prop("disabled", true);
            $("#chs_shonamerank").prop("disabled", false);
            $("#chs_shopis_beltno").prop("disabled", false);
            break;
    }
});


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
    $('#EditWitnessForm').modal('hide');
}
});

// Witness Add & Delete
// Loads rows in to table
function build_rows_witness(witness_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Witness Name</th> <th>DOB</th><th>Relative Name</th><th>Address</th><th>Witness Type</th><th>Edit</th><th>Delete</th></thead>"

    witness_list.forEach(function(row, index){
        index += 1;
        if(row['soft_delete'] == "Yes"){
            return true;
        }
        edit_button = "<td><a class='btn btn-icon btn-warning center mr-1 mb-1' data-toggle='modal' data-target='#EditWitnessForm' onclick='edit_witness_row(\"witness_table\",\""+index+"\");'><i class='feather icon-menu' tooltip='Edit'></i></button></td>";
        delete_button = "<td><a class='btn btn-icon btn-danger mr-1 mb-1' title='Delete' data-toggle='tooltip' onclick='delete_witness_row(\"witness_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i>&nbsp;Delete</a></td>";
        no = '<td>'+index+'</td>';
        html = '<tr id="'+index+'">'+no+row.witness_name+row.witness_dob+row.witness_relativename+row.witness_address+row.witness_type_text+row.person_code+row.witness_from+edit_button+delete_button+'</tr>';
        rows.push(html);
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
    witness_statement = $('#witness_statement').val();
    witness_sameaddress = $("#witness_sameaddress").val();
    witness_samecountry_val = $("#witness_samecountry").find(":selected").val();
    witness_samestate_val = $("#witness_samestate").find(":selected").val();
    witness_samedistrict_val = $("#witness_samedistrict").find(":selected").val();
    witness_sameps_val = $("#witness_sameps").find(":selected").val();

    same_as_per = $('input[name="witnesssameasper"]:checked').val();

    witness_agetype = $("#witness_agetype").find(":selected").text();
    witness_agetype_val = $("#witness_agetype").find(":selected").val();
    witness_dob = "<td>"+$('#witness_dob').val()+"</td>";
    witness_yob = $('#witness_yob').val();
    witness_ageyear = $('#witness_ageyear').val();
    witness_agemonth = $('#witness_agemonth').val();
    witness_agefrom = $('#witness_agefrom').val();
    witness_ageto = $('#witness_ageto').val();
    witness_nationality_val = $('#witness_nationality').val();
    witness_type_text = "<td>"+$("#typeofwitness").find(":selected").text()+"</td>";
    witness_type_val = $("#typeofwitness").find(":selected").val();
    witness_evidencetender_val = $("#typeofevidence").find(":selected").val();
    witness_evidence_tendered = "<td>"+$("#typeofevidence").find(":selected").text()+"</td>";
    person_code = '';
    chsheet_witness_srno = '';
    witness_from = '';

    witness_occupation = "<td></td>";
    found = witness_list.some(el => el.witness_name == witness_name && el.witness_address == witness_address)
    if(found && from != 'update'){return 0;};
    from_db = "No";
    soft_delete = "No";
    if(from == 'update'){
        if(witness_list[row_id]['from_db'] == "Yes"){
            from_db = "Yes";
            chsheet_witness_srno = witness_list[row_id]['chsheet_witness_srno']
            person_code = witness_list[row_id]['person_code']
        }else{
            from_db = "No";
        }
    }

    witness_list[row_id] = {'witness_name': witness_name, 'witness_address': witness_address, 'witness_occupation':witness_occupation, 'witness_country_val': witness_country_val, 'witness_state_val': witness_state_val,
    'witness_rel_type': witness_rel_type, 'witness_rel_type_val': witness_rel_type_val, 'witness_relativename': witness_relativename, 
    'witness_statement': witness_statement, 'witness_district_val': witness_district_val, 'witness_ps_val': witness_ps_val, 'witness_sameaddress': witness_sameaddress,
    'witness_samecountry_val': witness_samecountry_val, 'witness_samestate_val': witness_samestate_val, 'witness_sameps_val': witness_sameps_val,  'same_as_per': same_as_per,
    'witness_samedistrict_val': witness_samedistrict_val, 'witness_agetype': witness_agetype, 'witness_dob': witness_dob, 'witness_yob': witness_yob, 'witness_ageyear': witness_ageyear,
    'witness_agemonth': witness_agemonth, 'witness_agefrom': witness_agefrom, 'witness_ageto': witness_ageto, 'witness_agetype_val': witness_agetype_val, 'from_db': from_db, "witness_occupation": witness_occupation,
    'witness_nationality_val': witness_nationality_val, 'witness_evidencetender_val': witness_evidencetender_val, 'witness_type_val': witness_type_val, 'witness_type_text': witness_type_text, 
    "witness_evidence_tendered":witness_evidence_tendered, "person_code": person_code, "witness_from": witness_from, "chsheet_witness_srno": chsheet_witness_srno, 
    'soft_delete': soft_delete};
    html = build_rows_witness(witness_list);
    $("#witness_table").html(html);
    reset_witness();
}


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

    if($("#witnessname").val() == "")
    {
    document.getElementById("witnessname_error").innerHTML = "Enter Witness Name";
    document.getElementById("typeofevidence_error").innerHTML = "";
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

    else if($("#witnessoccupation").find(":selected").val() == "")
{
    document.getElementById("witnessoccupation").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("typeofevidence_error").innerHTML = "";
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

    else if($("#typeofevidence").find(":selected").val() == "")
{
    document.getElementById("typeofevidence").focus();

    document.getElementById("witnessname_error").innerHTML = "";
    document.getElementById("typeofevidence_error").innerHTML = "Select Type Of Evidence";

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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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
    document.getElementById("typeofevidence_error").innerHTML = "";
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

    create_witness_list(row_id, from='update');

    $('#EditWitnessForm').modal('hide');
}

}



function reset_witness(){
    set_select("typeofwitness", "");
    set_select("typeofevidence", "");
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

    reset_text(["witnessname", "witnessaddress", "witness_statement", "witness_sameaddress", "witness_dob", "witness_yob", "witness_ageyear", "witness_agemonth", "witness_agefrom", "witness_ageto",]);
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
    $("#witness_agetype").val(row.witness_agetype_val).trigger("change");$("#witness_agetype").click();

    $("#witness_reltype").val(row.witness_rel_type_val).trigger("change");
    $("#witness_relname").val(row.witness_relativename.replace("<td>","").replace("</td>",""));

    $("#typeofevidence").val(row.witness_evidencetender_val).trigger("change");
    $("#typeofwitness").val(row.witness_type_val).trigger("change");
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
                  .appendTo("#charge_sheet_form");
    f_l2 = {};
    accused_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
	    f_l2[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "accused_list")
                  .attr("value", JSON.stringify(f_l2))
                  .appendTo("#charge_sheet_form");
    f_l3 = {};
    witness_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
        }
	    f_l3[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "witness_list")
                  .attr("value", JSON.stringify(f_l3))
                  .appendTo("#charge_sheet_form");
}



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
  var now = firdate; //Todays Date 
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witness_dob").value;
  var  today = firdate;
  var dobyearcheck=dob.split("-");
  var dobyearcheckyear =  dobyearcheck[0];

  if ( dob > firdate )
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
  var fircaldate=firdate.split("-");
  var firdateyearcheck = fircaldate[0];
  var firdatemonthcheck = fircaldate[1];
  var firdatedaycheck = fircaldate[2];

  var dob = document.getElementById("witness_dob").value;
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

  document.getElementById("witness_yob").value = yob;
  document.getElementById("witness_ageyear").value = ageyear;
  document.getElementById("witness_agemonth").value = agemonth;
  document.getElementById("witness_agefrom").value = ageyear;
  document.getElementById("witness_ageto").value = ageyear;
}
}

function witnesyobFunction() {
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
else if (agemonth > 11)
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
  var fircaldate=firdate.split("-");
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

//End of Else
}

function witnesagerangefromFunction() 
{
  var now = new Date(); //Todays Date 
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var fircaldate=firdate.split("-");
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
  var startyearcheck=dob.split("-");
  var firdateyearcheck = startyearcheck[0];

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
  // var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
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
