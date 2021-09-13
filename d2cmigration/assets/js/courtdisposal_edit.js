/*
Manages the AJAX Load to the Project
*/

$(document).ready(function() {

console.log('Test');
console.log('{{disposal.0}}');
});

$('#cdiscasetransfer2').click(function(){
    enable_disable_casetransfer_acc(true);
    reset_text(["cdtransferjudicialcaseno", "cdtransferincourtof"]);
    set_select("cdtransfercourttype", "");
});

$('#cdiscasetransfer1').click(function(){
    enable_disable_casetransfer_acc(false);
    reset_text(["cdtransferjudicialcaseno", "cdtransferincourtof"]);
});

function enable_disable_casetransfer_acc(status){
    $('#cdtransferjudicialcaseno').prop("disabled", status);
    $('#cdtransferincourtof').prop("disabled", status);
    $('#cdtransfercourttype').prop("disabled", status);
}


function dateofframingcharges()
{
var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
cddateofcharges_var = $("#cddateofcharges").val();

if(currentdate<cddateofcharges_var)
{
document.getElementById("cddateofcharges").focus();
document.getElementById("cddateofcharges_error").innerHTML = " Should be less than Todays Date";
}
else
{    
document.getElementById("cddateofcharges_error").innerHTML = "";
}
}

function dateofjudgement()
{
var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
cddateofcharges_var = $("#cddateofjudgement").val();

if(currentdate<cddateofcharges_var)
{
document.getElementById("cddateofjudgement").focus();
document.getElementById("cddateofjudgement_error").innerHTML = "Should be less than Todays Date";
}
else
{ 
document.getElementById("cddateofjudgement_error").innerHTML = "";   
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


// Component Setting Throughout the application
function set_time_picker_min_val_today(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
    return date+"T00:00";
}

function getYearDropDown(){
    // Return list of year as html <option/>
}


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


// Accused Add & Delete --------------------------//

function build_rows_acc_ch(accused_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Name of Accused</th><th>Relative Name</th><th>Type of Disposal</th><th>Type of Punishment</th><th>Period Of Punishment</th><th>Amount Of Fine</th><th>Periof Of Bond</th><th>Amount Of Bond</th><th>Finger Print Taken</th><th>Edit</th></thead>"
    accused_list.forEach(function(row, index){
        index += 1;
        // edit_button = "<td><button id='chargeadd"+index+"' type='button' class='btn btn-icon btn-warning center mr-1 mb-1' data-toggle='modal' data-target='#EditaccuseddisposalForm' onclick='cur_index="+index+";load_charge(\""+index+"\");'><i class='feather icon-menu' tooltip='Edit'></i></button></td>";
        edit_button = "<td><a class='btn btn-icon btn-warning center mr-1 mb-1' title='Edit' data-toggle='modal' data-target='#EditaccuseddisposalForm' onclick='cur_index="+index+";load_charge(\""+index+"\");'><i class='step-icon feather icon-edit'></i>&nbsp;Edit</a></td>";
        no = '<td>'+index+'</td>';
        punishment_period = '<td>'+row.punishment_year+' Years '+row.punishment_month+' Months '+row.punishment_days+' Days </td>';
        bond_period = '<td>'+row.bond_year+' Years '+row.bond_month+' Months '+row.bond_days+' Days </td>';
        html = '<tr id="'+index+'">'+no+row.accusedname+row.relative_name+row.disposal_type+row.punishment_type+punishment_period+row.fine_amount+bond_period+row.bond_amount+row.finger_print+edit_button+'</tr>';
        rows.push(html)

    });
    return header+"<tbody>"+rows+"</tbody>";

}

function build_rows_acc_noch(accused_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Name</th><th>Relative Name</th><th>Type of Disposal</th><th>Type of Punishment</th><th>Period Of Detention/Care</th><th>Amount Of Fine</th><th>Name & Address of Special/Juvenile Home / Observation House to Which Sent</th><th>Finger Print Taken</th><th>Edit</th></thead>"
    accused_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><button id='chargeadd"+index+"' type='button' class='btn btn-icon btn-warning center mr-1 mb-1' data-toggle='modal' data-target='#EditaccusednondisposalFormNonChargeSheet' onclick='cur_index="+index+";load_noncharge(\""+index+"\");'><i class='feather icon-menu' tooltip='Edit'></i></button></td>";
        no = '<td>'+index+'</td>';
        period_of_care = '<td>'+row.punishment_year+' Years '+row.punishment_month+' Months '+row.punishment_days+' Days </td>';
        html = '<tr id="'+index+'">'+no+row.accusedname+row.relative_name+row.disposal_type+row.punishment_type+period_of_care+row.fine_amount+row.institute_address+row.finger_print+edit_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

$('#cdiscompensation2').click(function(){
    enable_disable_compensation_acc(true);
    reset_text(["cdacccompensationamt", "cdacccompensationby", "cdacccompensationcourtorder"]);
    set_select("cdacccompensationto", "");
});

$('#cdiscompensation1').click(function(){
    enable_disable_compensation_acc(false);
    reset_text(["cdacccompensationamt", "cdacccompensationby", "cdacccompensationcourtorder"]);
});

function enable_disable_compensation_acc(status){
    $('#cdacccompensationto').prop("disabled", status);
    $('#cdacccompensationamt').prop("disabled", status);
    $('#cdacccompensationby').prop("disabled", status);
    $('#cdacccompensationcourtorder').prop("disabled", status);
}

// Loads Charge Sheet, called when click on add/edit
function load_charge(row_no){
    row_no -= 1;
    $("#cdaccuseddisposalname").val(accused_list_ch[row_no].accusedname.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedgender").val(accused_list_ch[row_no].gender_cd.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedrelativename").val(accused_list_ch[row_no].relative_name.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedrelative").val(accused_list_ch[row_no].relation_type_cd);
    $("#cdaccusedage").val(accused_list_ch[row_no].age);
    $("#cdaccusedyob").val(accused_list_ch[row_no].yob);

    iscomp_req = accused_list_ch[row_no].is_compensation_req;

    if (iscomp_req == 'Y')
    {
    $('#cdiscompensation1').click();
    $('#cdacccompensationto').prop("disabled", false);
    $('#cdacccompensationamt').prop("disabled", false);
    $('#cdacccompensationby').prop("disabled", false);
    $('#cdacccompensationcourtorder').prop("disabled", false);

    $("#cdacccompensationto").val(accused_list_ch[row_no].cmpnsation_to_victim);
    $("#cdacccompensationamt").val(accused_list_ch[row_no].compensation_amt);
    $("#cdacccompensationby").val(accused_list_ch[row_no].compensation_by);      
    $("#cdacccompensationcourtorder").val(accused_list_ch[row_no].cmpnsation_order_num);
    }
    else
    {
    $('#cdiscompensation2').click();
    $('#cdacccompensationto').prop("disabled", true);
    $('#cdacccompensationamt').prop("disabled", true);
    $('#cdacccompensationby').prop("disabled", true);
    $('#cdacccompensationcourtorder').prop("disabled", true);
    }

    $("#cdaccusedfingerprint").val(accused_list_ch[row_no].finger_print.replace("<td>", "").replace("</td>", ""));
    $("#cdaccuseddisposaltype").val(accused_list_ch[row_no].disposal_type_val);
    $("#cdaccusedtypeofpunish").val(accused_list_ch[row_no].punishment_type_val);
    $("#cdaccusedpunishmentyear").val(accused_list_ch[row_no].punishment_year);
    $("#cdaccusedpunishmentmonth").val(accused_list_ch[row_no].punishment_month);
    $("#cdaccusedpunishmentdays").val(accused_list_ch[row_no].punishment_days);
    $("#cdaccusedamountoffine").val(accused_list_ch[row_no].fine_amount.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedbondyear").val(accused_list_ch[row_no].bond_year);
    $("#cdaccusedbondmonth").val(accused_list_ch[row_no].bond_month);
    $("#cdaccusedbondday").val(accused_list_ch[row_no].bond_days);
    $("#cdaccusedbondamountoffine").val(accused_list_ch[row_no].bond_amount.replace("<td>", "").replace("</td>", ""));
    header = "<thead class='thead-dark'><th>S.No.</th><th>Act CD</th><th>Acts</th><th>Section CD</th><th>Section</th</thead>";
    rows = [];
    accused_list_ch[row_no].act_sec.forEach(function(row, index){
        index += 1;
        act = "<td>"+row.act_cd+"</td>";
        act_txt = "<td>"+row.act_long+"</td>";
        sec = "<td>"+row.section_code+"</td>";
        sec_txt = "<td>"+row.section_code+"</td>";
        no = "<td>"+index+"</td>";
        html = '<tr id='+index+'>'+no+act+act_txt+sec+sec_txt+'</tr>';
        rows.push(html);
    });
    $("#chargesheet_accused_act_sec").html(header+"<tbody>"+rows+"</tbody>");

}

function save_chargesheet(row_no){

  is_acc_compensation = $('input[name="cdiscompensation"]:checked').val();

if($("#cdaccuseddisposaltype").find(":selected").val() == "" )
{
  alert(1);
  document.getElementById("cdaccuseddisposaltype_error").innerHTML = "Select Disposal Type";
  document.getElementById("cdaccusedtypeofpunish_error").innerHTML = "";
  document.getElementById("cdacccompensationto_error").innerHTML = "";
  document.getElementById("cdacccompensationamt_error").innerHTML = "";
  document.getElementById("cdacccompensationby_error").innerHTML = "";
  document.getElementById("cdacccompensationcourtorder_error").innerHTML = "";
  $('#EditaccuseddisposalForm').modal('show');
  return 0;
}
else if($("#cdaccusedtypeofpunish").find(":selected").val() == "" )
{
  alert(2);
  document.getElementById("cdaccuseddisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedtypeofpunish_error").innerHTML = "Select Punishment Type";
  document.getElementById("cdacccompensationto_error").innerHTML = "";
  document.getElementById("cdacccompensationamt_error").innerHTML = "";
  document.getElementById("cdacccompensationby_error").innerHTML = "";
  document.getElementById("cdacccompensationcourtorder_error").innerHTML = "";
  $('#EditaccuseddisposalForm').modal('show');
  return 0;
}

else if(is_acc_compensation == 'Y' && $("#cdacccompensationto").find(":selected").val() == "" )
{
  alert(3);
  document.getElementById("cdaccuseddisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedtypeofpunish_error").innerHTML = "";
  document.getElementById("cdacccompensationto_error").innerHTML = "Select Record";
  document.getElementById("cdacccompensationamt_error").innerHTML = "";
  document.getElementById("cdacccompensationby_error").innerHTML = "";
  document.getElementById("cdacccompensationcourtorder_error").innerHTML = "";
  $('#EditaccuseddisposalForm').modal('show');
  return 0;
}
else if (is_acc_compensation == 'Y' && $("#cdacccompensationamt").val() == "" )
{
  alert(4);
  document.getElementById("cdaccuseddisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedtypeofpunish_error").innerHTML = "";
  document.getElementById("cdacccompensationto_error").innerHTML = "";
  document.getElementById("cdacccompensationamt_error").innerHTML = "Enter Amount";
  document.getElementById("cdacccompensationby_error").innerHTML = "";
  document.getElementById("cdacccompensationcourtorder_error").innerHTML = "";
  $('#EditaccuseddisposalForm').modal('show');
  return 0;
}
else if (is_acc_compensation == 'Y' && $("#cdacccompensationby").val() == "" )
{
  alert(5);
  document.getElementById("cdaccuseddisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedtypeofpunish_error").innerHTML = "";
  document.getElementById("cdacccompensationto_error").innerHTML = "";
  document.getElementById("cdacccompensationamt_error").innerHTML = "";
  document.getElementById("cdacccompensationby_error").innerHTML = "Enter Compensation By";
  document.getElementById("cdacccompensationcourtorder_error").innerHTML = "";
  $('#EditaccuseddisposalForm').modal('show');
  return 0;
}
else if (is_acc_compensation == 'Y' && $("#cdacccompensationcourtorder").val() == "" )
{
  alert(6);
  document.getElementById("cdaccuseddisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedtypeofpunish_error").innerHTML = "";
  document.getElementById("cdacccompensationto_error").innerHTML = "";
  document.getElementById("cdacccompensationamt_error").innerHTML = "";
  document.getElementById("cdacccompensationby_error").innerHTML = "";
  document.getElementById("cdacccompensationcourtorder_error").innerHTML = "Enter Court Order No.";
  $('#EditaccuseddisposalForm').modal('show');
  return 0;
}
else{
  alert(7);
  document.getElementById("cdaccuseddisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedtypeofpunish_error").innerHTML = "";
  document.getElementById("cdacccompensationto_error").innerHTML = "";
  document.getElementById("cdacccompensationamt_error").innerHTML = "";
  document.getElementById("cdacccompensationby_error").innerHTML = "";
  document.getElementById("cdacccompensationcourtorder_error").innerHTML = "";
   row_no -= 1;
   accused_list_ch[row_no].disposal_type = "<td>"+$("#cdaccuseddisposaltype").find(":selected").text()+"</td>";
   accused_list_ch[row_no].disposal_type_val = $("#cdaccuseddisposaltype").find(":selected").val();
   accused_list_ch[row_no].punishment_type = "<td>"+$("#cdaccusedtypeofpunish").find(":selected").text()+"</td>";
   accused_list_ch[row_no].punishment_type_val = $("#cdaccusedtypeofpunish").find(":selected").val();
   accused_list_ch[row_no].punishment_year = $("#cdaccusedpunishmentyear").val();
   accused_list_ch[row_no].punishment_month = $("#cdaccusedpunishmentmonth").val();
   accused_list_ch[row_no].punishment_days = $("#cdaccusedpunishmentdays").val();
   accused_list_ch[row_no].fine_amount = "<td>"+$("#cdaccusedamountoffine").val()+"</td>";
   accused_list_ch[row_no].bond_year = $("#cdaccusedbondyear").val();
   accused_list_ch[row_no].bond_month = $("#cdaccusedbondmonth").val();
   accused_list_ch[row_no].bond_days = $("#cdaccusedbondday").val();
   accused_list_ch[row_no].bond_amount = "<td>"+$("#cdaccusedbondamountoffine").val()+"</td>";

   is_compensation_req = $('input[name="cdiscompensation"]:checked').val();
   cmpnsation_to_victim = $("#cdacccompensationto").val();
   cmpnsation_order_num = $("#cdacccompensationcourtorder").val();
   compensation_amt = $("#cdacccompensationamt").val();
   compensation_by = $("#cdacccompensationby").val();

   accused_list_ch[row_no].is_compensation_req = is_compensation_req;
   accused_list_ch[row_no].cmpnsation_to_victim = cmpnsation_to_victim;
   accused_list_ch[row_no].cmpnsation_order_num = cmpnsation_order_num;
   accused_list_ch[row_no].compensation_amt = compensation_amt;
   accused_list_ch[row_no].compensation_by = compensation_by;

   html = build_rows_acc_ch(accused_list_ch);
   $("#accused_chargesheet").html(html);
   $('#EditaccuseddisposalForm').modal('hide');

  // $("#chargesheet_save").attr("data-dismiss", "modal");
}
}

// Loads Non Charge Sheet, called when click on add/edit
function load_noncharge(row_no){
    row_no -= 1;
    $("#cdaccuseddisposalname").val(accused_list_non_ch[row_no].accusedname.replace("<td>", "").replace("</td>", ""));

    $("#cdaccusedchnonjuvenileadd").val(accused_list_non_ch[row_no].juvenile_address);
    $("#cdaccusedchnondisposaltype").val(accused_list_non_ch[row_no].disposal_type_val);

    $("#cdaccusedjvgender").val(accused_list_ch[row_no].gender_cd.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedjvrelativename").val(accused_list_ch[row_no].relative_name.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedjvrelative").val(accused_list_ch[row_no].relation_type_cd);
    $("#cdaccusedjvage").val(accused_list_ch[row_no].age);
    $("#cdaccusedjvyob").val(accused_list_ch[row_no].yob);
    $("#cdaccusedjvfingerprint").val(accused_list_ch[row_no].finger_print.replace("<td>", "").replace("</td>", ""));

    $("#cdaccusedchnonfineamt").val(accused_list_non_ch[row_no].fine_amount.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedchnonjuvinstname").val(accused_list_non_ch[row_no].institute_name);
    $("#cdaccusedchnonpunishjuvinstadd").val(accused_list_non_ch[row_no].institute_address.replace("<td>", "").replace("</td>", ""));
    $("#cdaccusedchnonjuvcareper").val(accused_list_non_ch[row_no].care_person);
    $("#cdaccusedjuvperadd").val(accused_list_non_ch[row_no].care_person_address);
    header = "<thead class='thead-dark'><th>S.No.</th><th>Act CD</th><th>Acts</th><th>Section CD</th><th>Section</th</thead>";
    rows = [];
    accused_list_non_ch[row_no].act_sec.forEach(function(row, index){
        index += 1;
        act = "<td>"+row.act_cd+"</td>";
        act_txt = "<td>"+row.act_long+"</td>";
        sec = "<td>"+row.section_code+"</td>";
        sec_txt = "<td>"+row.section_code+"</td>";
        no = "<td>"+index+"</td>";
        html = '<tr id='+index+'>'+no+act+act_txt+sec+sec_txt+'</tr>';
        rows.push(html);
    });
    $("#nonchargesheet_accused_act_sec").html(header+"<tbody>"+rows+"</tbody>");

}

function save_nonchargesheet(row_no){

if($("#cdaccusedchnondisposaltype").find(":selected").val() == "" )
{
  document.getElementById("cdaccusedchnondisposaltype_error").innerHTML = "Select Disposal Type";
  document.getElementById("cdaccusedchnonjuvinstname_error").innerHTML = "";
  document.getElementById("cdaccusedchnonpunishjuvinstadd_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvcareper_error").innerHTML = "";
  document.getElementById("cdaccusedjuvperadd_error").innerHTML = "";
  return 0;
}
else if($("#cdaccusedchnonjuvinstname").find(":selected").val() == "" )
{
  document.getElementById("cdaccusedchnondisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvinstname_error").innerHTML = "Select Juvenile Institute";
  document.getElementById("cdaccusedchnonpunishjuvinstadd_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvcareper_error").innerHTML = "";
  document.getElementById("cdaccusedjuvperadd_error").innerHTML = "";
  return 0;
}
else if($("#cdaccusedchnonpunishjuvinstadd").find(":selected").val() == "" )
{
  document.getElementById("cdaccusedchnondisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvinstname_error").innerHTML = "";
  document.getElementById("cdaccusedchnonpunishjuvinstadd_error").innerHTML = "Select Juvenile Address";
  document.getElementById("cdaccusedchnonjuvcareper_error").innerHTML = "";
  document.getElementById("cdaccusedjuvperadd_error").innerHTML = "";
  return 0;
}
else if($("#cdaccusedchnonjuvcareper").find(":selected").val() == "" )
{
  document.getElementById("cdaccusedchnondisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvinstname_error").innerHTML = "";
  document.getElementById("cdaccusedchnonpunishjuvinstadd_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvcareper_error").innerHTML = "Select Juvenile Care Person";
  document.getElementById("cdaccusedjuvperadd_error").innerHTML = "";
  return 0;
}
else if($("#cdaccusedjuvperadd").find(":selected").val() == "" )
{
  document.getElementById("cdaccusedchnondisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvinstname_error").innerHTML = "";
  document.getElementById("cdaccusedchnonpunishjuvinstadd_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvcareper_error").innerHTML = "";
  document.getElementById("cdaccusedjuvperadd_error").innerHTML = "Select Juvenile Person Address";
  return 0;
}
else
{
  document.getElementById("cdaccusedchnondisposaltype_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvinstname_error").innerHTML = "";
  document.getElementById("cdaccusedchnonpunishjuvinstadd_error").innerHTML = "";
  document.getElementById("cdaccusedchnonjuvcareper_error").innerHTML = "";
  document.getElementById("cdaccusedjuvperadd_error").innerHTML = "";

   row_no -= 1;
   accused_list_non_ch[row_no].disposal_type = "<td>"+$("#cdaccusedchnondisposaltype").find(":selected").text()+"</td>";
   accused_list_non_ch[row_no].disposal_type_val = $("#cdaccusedchnondisposaltype").find(":selected").val();
//   accused_list_non_ch[row_no].punishment_year = $("#cdaccusedpunishmentyear").val();
//   accused_list_non_ch[row_no].punishment_month = $("#cdaccusedpunishmentmonth").val();
//   accused_list_non_ch[row_no].punishment_days = $("#cdaccusedpunishmentdays").val();
   accused_list_non_ch[row_no].fine_amount = "<td>"+$("#cdaccusedchnonfineamt").val()+"</td>";
   accused_list_non_ch[row_no].institute_name = $("#cdaccusedchnonjuvinstname").val();
   accused_list_non_ch[row_no].institute_address = "<td>"+$("#cdaccusedchnonpunishjuvinstadd").val()+"</td>";
   accused_list_non_ch[row_no].care_person = $("#cdaccusedchnonjuvcareper").val();
   accused_list_non_ch[row_no].care_person_address = $("#cdaccusedjuvperadd").val();
   html = build_rows_acc_noch(accused_list_non_ch);
   $("#accused_non_chargesheet").html(html);

   $("#nonchargesheet_save").attr("data-dismiss", "modal");
}
}


function submitDataTableValues(){
document.getElementById('cdcourtname').value = court_name;
document.getElementById('cdcourttype').value = court_type;
document.getElementById('cdchargesheetno').value = chargesheetno;
document.getElementById('cdchargesheetdate').value = chargesheetdate;
    f_l = {};
    accused_list_ch.forEach(function(row, index){
        temp = {};
        if (disposal_type=='')
        {
          alert('Accused Disposal Type Missing!');
          return 0;
        }
        else if (punishment_type=='')
        {
          alert('Accused Punishment Type Missing!');
          return 0;
        }
        else if (punishment_year=='' || punishment_month=='' || punishment_days=='' || fine_amount=='')
        {
          alert('Accused Punishment Details Missing!');
          return 0;
        }
        else if (bond_year=='' || bond_month=='' || bond_days=='' || bond_amount=='')
        {
          alert('Accused Bond Details Missing!');
          return 0;
        }
        else
        {

        for (var key of Object.keys(row)) {
           if(key == "act_sec"){
            temp[key]=JSON.parse(JSON.stringify(row[key]))
           }
           else{
            temp[key]=String(row[key]).replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
           }
        }
        f_l[index] = temp;
        }
    });
    f_l2 = {};
    accused_list_non_ch.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           if(key == "act_sec"){
            temp[key]=JSON.parse(JSON.stringify(row[key]))
           }else{
            temp[key]=String(row[key]).replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
           }
        }
	    f_l2[index] = temp;
    });
    f_l3 = [];
    for(l in f_l){f_l3.push(f_l[l]);}
    for(l in f_l2){f_l3.push(f_l2[l]);}
    $("<input />").attr("type", "hidden")
                  .attr("name", "accused_list")
                  .attr("value", JSON.stringify(f_l3).replace(/\\/g,''))
                  .appendTo("#court_disposal_form");
}
