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

function set_select(id, val){
    $("#"+id).val(val);
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


approval_list = []; // Maintains the List global variable of Occurance


function build_rows_occ(approval_list){
    rows = []
        console.log(approval_list);
    header = "<thead class='thead-dark'><tr><th>S.No.</th><th>User</th><th>Approver</th><th>Approval Level</th><th>Edit</th><th>Delete</th></thead>"
    approval_list.forEach(function(row, index){
        index += 1;
        edit_button = "<td><a class='delete' title='Edit' data-toggle='tooltip' onclick='edit_occ_row(\"approval_table\",\""+index+"\");'><i class='step-icon feather icon-edit'></i></a></td>";
        delete_button = "<td><a class='delete' title='Delete' data-toggle='tooltip' onclick='delete_occ_row(\"approval_table\",\""+index+"\");'><i class='step-icon feather icon-trash-2'></i></a></td>";
        no = '<td>'+index+'</td>'
        html = '<tr id="'+index+'">'+no+row.user_name+row.approver_name+row.approval_level+edit_button+delete_button+'</tr>';
        rows.push(html)
    });
    return header+"<tbody>"+rows+"</tbody>";
}

$('#approval_addRow').click(function(){

    if ($("#userid").find(":selected").text() == 'Select')
    {
        alert('Select User');
        return 0;
    }

    else if ($("#approverid").find(":selected").text() == 'Select')
    {
        alert('Select Approver ID');
        return 0;        
    }

    else if ($("#user_approval_level").val() == '')
    {
        alert('Enter Approval Level');
        return 0;
    }
    else
    {

    user_name = "<td>"+$("#userid").find(":selected").text()+"</td>";
    user_name_val = $("#userid").find(":selected").val();
    approver_name = "<td>"+$("#approverid").find(":selected").text()+"</td>";
    approver_name_val = $("#approverid").find(":selected").val();
    approval_level = "<td>"+$("#user_approval_level").val()+"</td>";

    approval_list[approval_list.length] = {'user_name': user_name, 'user_name_val': user_name_val, 
    'approver_name': approver_name, 'approver_name_val': approver_name_val, 'approval_level': approval_level};
    html = build_rows_occ(approval_list);
    $("#approval_table").html(html);
    reset_occ();
    }
});

// Deletes the row from a given data table
function delete_occ_row(data_table_id, row_no){
    row_no -= 1;
    $("#"+data_table_id+" tr[id="+row_no+"]").remove();
    approval_list.splice(row_no, 1);
    $("#approval_table").html(build_rows_occ(approval_list));
}

// Edit the row from a given data table
function edit_occ_row(data_table_id, row_no){
    $("#approval_addRow").parent().attr("style", "display:none");
    $("#occ_update").parent().attr("style", "display:block");
    $("#occ_cancel").parent().attr("style", "display:block");
    row_no -= 1;
    load_occ(approval_list[row_no]);
    $('#occ_update').attr("onclick", "update_occ("+row_no+")");
}

// Update row of occurance
function update_occ(row_id){
    user_name = "<td>"+$("#userid").find(":selected").text()+"</td>";
    user_name_val = $("#userid").find(":selected").val();
    approver_name = "<td>"+$("#approverid").find(":selected").text()+"</td>";
    approver_name_val = $("#approverid").find(":selected").val();
    approval_level = "<td>"+$("#user_approval_level").val()+"</td>";

    approval_list[row_id] = {'user_name': user_name, 'user_name_val': user_name_val, 
    'approver_name': approver_name,
    'approver_name_val': approver_name_val, 'approval_level': approval_level};

    $("#approval_table").html(build_rows_occ(approval_list));
    reset_occ();
}


function reset_occ(){
    set_select("userid", "");
    set_select("approverid", "");
    reset_text(["user_approval_level"]);
    $("#approval_addRow").parent().attr("style", "display:block");
    $("#occ_update").parent().attr("style", "display:none");
    $("#occ_cancel").parent().attr("style", "display:none");
}

function reset_text(id_list){
    id_list.forEach(function(row){
        $("#"+row).val("");
        $("#"+row).text("");
    });
}

function load_occ(row){
    $("#userid").val(row.user_name_val);
    $("#approverid").val(row.approver_name_val);
    $("#user_approval_level").val(row.approval_level.replace("<td>","").replace("</td>",""));

}

function submitDataTableValues(){
    f_l = {};
    approval_list.forEach(function(row, index){
        temp = {};
        for (var key of Object.keys(row)) {
           temp[key]=(row[key]+"").replace("<td>","").replace("</td>","");
        }
        f_l[index] = temp;
    });
    $("<input />").attr("type", "hidden")
                  .attr("name", "approval_list")
                  .attr("value", JSON.stringify(f_l))
                  .appendTo("#approval_form");
}
