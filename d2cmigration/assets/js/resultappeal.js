/*
Manages the AJAX Load to the Project
*/

function ropappealdatecheck()
{
var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
cddateofcharges_var = $("#ropappealdate").val();

if(currentdate<cddateofcharges_var)
{
document.getElementById("ropappealdate").focus();
document.getElementById("ropappealdate_error").innerHTML = " Should be less than Todays Date";
}
else
{    
document.getElementById("ropappealdate_error").innerHTML = "";
}
}

function dateofjudgement()
{
var today = new Date();
var currentdate = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
cddateofcharges_var = $("#ropappealjudgementdate").val();

if(currentdate<cddateofcharges_var)
{
document.getElementById("ropappealjudgementdate").focus();
document.getElementById("ropappealjudgementdate_error").innerHTML = "Should be less than Todays Date";
}
else
{ 
document.getElementById("ropappealjudgementdate_error").innerHTML = "";   
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

 // Accused Add & Delete --------------------------//

function build_rows_acc_ch(accused_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Name of Accused</th><th>Provisional Crime No.</th><th>Regular Crime No.</th><th>Type of Disposal</th><th>Type of Punishment</th><th>Period Of Punishment</th><th>Amount Of Fine</th><th>Periof Of Bond</th><th>Amount Of Bond</th><th>Finger Print Taken</th><th>Edit</th></thead>"
    accused_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><button id='chargeadd"+index+"' type='button' class='btn btn-icon btn-warning center mr-1 mb-1' data-toggle='modal' data-target='#EditaccuseddisposalForm' onclick='cur_index="+index+";load_charge(\""+index+"\");'><i class='feather icon-menu' tooltip='Edit'></i></button></td>";
        no = '<td>'+index+'</td>';
        punishment_period = '<td>'+row.punishment_year+' Years '+row.punishment_month+' Months '+row.punishment_days+' Days </td>';
        bond_period = '<td>'+row.bond_year+' Years '+row.bond_month+' Months '+row.bond_days+' Days </td>';
        html = '<tr id="'+index+'">'+no+row.accusedname+row.provisonal_crime_no+row.regular_crime_no+row.disposal_type+row.punishment_type+punishment_period+row.fine_amount+bond_period+row.bond_amount+row.finger_print+edit_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

function build_rows_acc_noch(accused_list){
    rows = []
    header = "<thead class='thead-dark'><th>S.No.</th><th>Name</th><th>Provisional Crime No.</th><th>Regular Crime No.</th><th>Type of Disposal</th><th>Type of Punishment</th><th>Result of Appeal</th><th>Period Of Detention/Care</th><th>Amount Of Fine</th><th>Name & Address of Special/Juvenile Home / Observation House to Which Sent</th><th>Finger Print Taken</th><th>Edit</th></thead>"
    accused_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><button id='chargeadd"+index+"' type='button' class='btn btn-icon btn-warning center mr-1 mb-1' data-toggle='modal' data-target='#EditaccusednondisposalFormNonChargeSheet' onclick='cur_index="+index+";load_noncharge(\""+index+"\");'><i class='feather icon-menu' tooltip='Edit'></i></button></td>";
        no = '<td>'+index+'</td>';
        period_of_care = '<td>'+row.punishment_year+' Years '+row.punishment_month+' Months '+row.punishment_days+' Days </td>';
        html = '<tr id="'+index+'">'+no+row.accusedname+row.provisonal_crime_no+row.regular_crime_no+row.disposal_type+row.punishment_type+row.result_appeal+period_of_care+row.fine_amount+row.institute_name_address+row.finger_print+edit_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

// Loads Charge Sheet, called when click on add/edit
function load_charge(row_no){
    row_no -= 1;
    $("#roaaccuseddisposalname").val(accused_list_ch[row_no].accusedname.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedprovcrimeno").val(accused_list_ch[row_no].provisonal_crime_no.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedregcrimeno").val(accused_list_ch[row_no].regular_crime_no.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedappealresult").val(accused_list_ch[row_no].result_appeal_val);
    $("#roaaccusedpunishtype").val(accused_list_ch[row_no].punishment_type.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedpunishyear").val(accused_list_ch[row_no].punishment_year);
    $("#roaaccusedpunishmonth").val(accused_list_ch[row_no].punishment_month);
    $("#roaaccusedpunishdays").val(accused_list_ch[row_no].punishment_days);
    $("#roaaccusedamountoffine").val(accused_list_ch[row_no].fine_amount.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedbondyear").val(accused_list_ch[row_no].bond_year);
    $("#roaaccusedbondmonth").val(accused_list_ch[row_no].bond_month);
    $("#roaaccusedbondday").val(accused_list_ch[row_no].bond_days);
    $("#cdaccusedamountoffine").val(accused_list_ch[row_no].bond_amount.replace("<td>", "").replace("</td>", ""));
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
if($("#roaaccusedappealresult").find(":selected").val() == "" )
{
  document.getElementById("roaaccusedappealresult_error").innerHTML = "Select Result of Appeal";
  return 0;
}
else
{
  document.getElementById("roaaccusedappealresult_error").innerHTML = "";
   row_no -= 1;
   console.log('result of Appeal:')
   console.log($("#roaaccusedappealresult").find(":selected").val());
   accused_list_ch[row_no].result_appeal_val = $("#roaaccusedappealresult").find(":selected").val();
   html = build_rows_acc_ch(accused_list_ch);
   $("#accused_chargesheet").html(html);

  $("#resultappeal_save").attr("data-dismiss", "modal");
}
}
// Loads Non Charge Sheet, called when click on add/edit
function load_noncharge(row_no){
    row_no -= 1;
    $("#roaaccusednonchname").val(accused_list_non_ch[row_no].accusedname.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedchnonprovcrimeno").val(accused_list_non_ch[row_no].provisonal_crime_no.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedchnonregcrimeno").val(accused_list_non_ch[row_no].regular_crime_no.replace("<td>", "").replace("</td>", ""));
    $("#roanonaccusedpunishtype").val(accused_list_non_ch[row_no].punishment_type.replace("<td>", "").replace("</td>", ""));
    $("#roanonaccusedamountoffine").val(accused_list_non_ch[row_no].fine_amount.replace("<td>", "").replace("</td>", ""));
    $("#roaaccusedbondyear").val(accused_list_non_ch[row_no].punishment_year);
    $("#roaaccusedbondmonth").val(accused_list_non_ch[row_no].punishment_month);
    $("#roaaccusedbondday").val(accused_list_non_ch[row_no].punishment_days);
    $("#detailsofplaceofocc").val(accused_list_non_ch[row_no].institute_name_address.replace("<td>", "").replace("</td>", ""));
    $("#roanonaccusedappealresult").val(accused_list_non_ch[row_no].result_appeal_val);
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
   row_no -= 1;
   accused_list_non_ch[row_no].result_appeal_val = $("#roanonaccusedappealresult").find(":selected").val();
   accused_list_non_ch[row_no].result_appeal = "<td>"+$("#roanonaccusedappealresult").find(":selected").text()+"</td>";
   console.log(accused_list_non_ch);
   html = build_rows_acc_noch(accused_list_non_ch);
   $("#accused_non_chargesheet").html(html);
}


function submitDataTableValues(){
    f_l = {};
    accused_list_ch.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           if(key == "act_sec"){
            temp[key]=JSON.parse(JSON.stringify(row[key]))
           }else{
            temp[key]=String(row[key]).replace("<td>","").replace("</td>","").replace("<th>","").replace("</th>","");
           }
        }
        f_l[index] = temp;
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
                  .appendTo("#result_appeal_form");
}
